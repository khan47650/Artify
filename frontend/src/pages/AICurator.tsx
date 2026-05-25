import { KeyboardEvent, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Sparkles, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

type Msg = { role: "user" | "assistant"; content: string };

type Conversation = {
  _id?: string;
  id: string;
  title: string;
  messages: Msg[];
  updatedAt: number;
};

const CHAT_API_BASE = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/chat`;
const CHAT_URL = `${CHAT_API_BASE}/ai-curator`;

const starterPrompts = [
  "I want bold abstract art for a modern living room.",
  "Suggest calm pieces for a bedroom with soft lighting.",
  "I am new to collecting. Recommend affordable starter artworks.",
  "I like portrait-focused pieces with strong emotion.",
];

const createConversation = (): Conversation => ({
  id:
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  title: "New chat",
  messages: [],
  updatedAt: Date.now(),
});

const summarizeTitle = (content: string) => {
  if (content.length <= 34) return content;
  return `${content.slice(0, 34)}...`;
};

const AICurator = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [chatHistory, setChatHistory] = useState<Conversation[]>([
    createConversation(),
  ]);
  const [activeChatId, setActiveChatId] = useState<string>(
    chatHistory[0].id
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const activeConversation =
    chatHistory.find((chat) => chat.id === activeChatId) || chatHistory[0];

  const messages = activeConversation?.messages || [];

  const fetchHistory = async () => {
    if (!user?.id) {
      const fresh = createConversation();
      setChatHistory([fresh]);
      setActiveChatId(fresh.id);
      return;
    }

    try {
      setHistoryLoading(true);

      const { data } = await api.get(`/chat/history/${user.id}`);

      const chats: Conversation[] = (data.chats || []).map((chat: any) => ({
        _id: chat._id,
        id: chat._id,
        title: chat.title || "New chat",
        messages: chat.messages || [],
        updatedAt: new Date(chat.updatedAt).getTime(),
      }));

      if (chats.length === 0) {
        const fresh = createConversation();
        setChatHistory([fresh]);
        setActiveChatId(fresh.id);
      } else {
        setChatHistory(chats);
        setActiveChatId(chats[0].id);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to load chat history",
        variant: "destructive",
      });
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveConversation = async (conversation: Conversation) => {
    if (!user?.id) return conversation;

    if (conversation._id) {
      const { data } = await api.put(`/chat/history/${conversation._id}`, {
        title: conversation.title,
        messages: conversation.messages,
      });

      return {
        ...conversation,
        _id: data.chat._id,
        id: data.chat._id,
        updatedAt: new Date(data.chat.updatedAt).getTime(),
      };
    }

    const { data } = await api.post("/chat/history", {
      userId: user.id,
      title: conversation.title,
      messages: conversation.messages,
    });

    return {
      ...conversation,
      _id: data.chat._id,
      id: data.chat._id,
      updatedAt: new Date(data.chat.updatedAt).getTime(),
    };
  };

  const updateActiveConversationLocal = (
    updater: (conversation: Conversation) => Conversation
  ) => {
    setChatHistory((prev) =>
      prev
        .map((conversation) =>
          conversation.id === activeChatId ? updater(conversation) : conversation
        )
        .sort((a, b) => b.updatedAt - a.updatedAt)
    );
  };

  const handleNewChat = () => {
    const fresh = createConversation();
    setChatHistory((prev) => [fresh, ...prev]);
    setActiveChatId(fresh.id);
    setInput("");
    setIsLoading(false);
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setInput("");
    setIsLoading(false);
  };

  const handleDeleteChat = async (chatId: string) => {
    const chat = chatHistory.find((item) => item.id === chatId);

    try {
      if (chat?._id) {
        await api.delete(`/chat/history/${chat._id}`);
      }

      setChatHistory((prev) => {
        const remaining = prev.filter((item) => item.id !== chatId);

        if (remaining.length === 0) {
          const fresh = createConversation();
          setActiveChatId(fresh.id);
          return [fresh];
        }

        if (activeChatId === chatId) {
          setActiveChatId(remaining[0].id);
        }

        return remaining;
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Chat delete failed",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async () => {
    if (!user?.id) {
      navigate("/login");
      return;
    }

    if (!input.trim() || isLoading || !activeConversation) return;

    const question = input.trim();

    const userMsg: Msg = {
      role: "user",
      content: question,
    };

    const nextMessages = [...messages, userMsg];

    let workingConversation: Conversation = {
      ...activeConversation,
      title:
        activeConversation.messages.length === 0
          ? summarizeTitle(question)
          : activeConversation.title,
      messages: nextMessages,
      updatedAt: Date.now(),
    };

    updateActiveConversationLocal(() => workingConversation);

    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      workingConversation = await saveConversation(workingConversation);

      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId ? workingConversation : chat
        )
      );

      setActiveChatId(workingConversation.id);

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || `Request failed (${resp.status})`);
      }

      const reader = resp.body?.getReader();

      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();

      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;

        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);

          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);

          if (line.startsWith(":") || line.trim() === "") continue;

          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();

          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);

            const content = parsed.choices?.[0]?.delta?.content;

            if (content) {
              assistantSoFar += content;

              updateActiveConversationLocal((conversation) => {
                const last =
                  conversation.messages[conversation.messages.length - 1];

                const updatedMessages =
                  last?.role === "assistant"
                    ? conversation.messages.map((message, index) =>
                      index === conversation.messages.length - 1
                        ? { ...message, content: assistantSoFar }
                        : message
                    )
                    : [
                      ...conversation.messages,
                      {
                        role: "assistant" as const,
                        content: assistantSoFar,
                      },
                    ];

                return {
                  ...conversation,
                  messages: updatedMessages,
                  updatedAt: Date.now(),
                };
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      const finalMessages: Msg[] = [
        ...nextMessages,
        {
          role: "assistant",
          content: assistantSoFar || "Sorry, I could not generate a response.",
        },
      ];

      await api.put(`/chat/history/${workingConversation._id}`, {
        title: workingConversation.title,
        messages: finalMessages,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      fetchHistory();
    }
  };

  const handleComposerKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#f7f7f8] text-zinc-900">
      <Navbar />

      <div className="mx-auto flex h-screen w-full max-w-[1700px] overflow-hidden pt-[78px]">
        <aside className="hidden h-full w-[280px] flex-col overflow-hidden border-r border-zinc-200 bg-zinc-100/80 p-3 md:flex">
          <Button
            onClick={handleNewChat}
            className="mb-3 h-11 justify-start gap-2 rounded-xl bg-zinc-900 px-4 text-sm text-white hover:bg-zinc-800"
          >
            <Plus className="h-4 w-4" />
            New chat
          </Button>

          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <p className="mb-2 px-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              Recent
            </p>

            <div className="space-y-1.5">
              {historyLoading ? (
                [1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-[58px] animate-pulse rounded-xl bg-zinc-200"
                  />
                ))
              ) : (
                chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className={`group flex items-center gap-1 rounded-xl px-2 py-1.5 ${chat.id === activeConversation?.id
                      ? "bg-zinc-200 text-zinc-950"
                      : "text-zinc-700 hover:bg-zinc-200/70"
                      }`}
                  >
                    <button
                      onClick={() => handleSelectChat(chat.id)}
                      className="min-w-0 flex-1 rounded-lg px-2 py-1 text-left"
                    >
                      <p className="line-clamp-1 text-sm font-medium">
                        {chat.title}
                      </p>

                      <p className="mt-0.5 text-xs text-zinc-500">
                        {chat.messages.length} msg
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteChat(chat.id)}
                      className="rounded-lg p-2 text-zinc-500 opacity-0 transition hover:bg-zinc-300/60 hover:text-zinc-800 group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-10 border-b border-zinc-200 bg-[#f7f7f8]/95 px-4 py-3 backdrop-blur md:px-8">
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
              <div>
                <h1 className="font-['IVY_Mode'] text-lg font-semibold text-zinc-900">
                  AI Curator
                </h1>

                <p className="text-xs text-zinc-500">Artify assistant</p>
              </div>

              <Button
                onClick={handleNewChat}
                variant="ghost"
                className="h-9 rounded-lg px-3 text-zinc-700 hover:bg-zinc-200 md:hidden"
              >
                <Plus className="mr-1.5 h-4 w-4" />
                New
              </Button>
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-[88px]">
            <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-4 py-3 md:px-8">
              {messages.length === 0 && (
                <div className="rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-center shadow-sm">
                  <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <h2 className="mt-2 font-['IVY_Mode'] text-2xl font-semibold text-zinc-900">
                    How can I help with your art selection?
                  </h2>

                  <p className="font-['Encode_Sans_Condensed'] mx-auto mt-2 max-w-xl text-sm text-zinc-600">
                    Ask about styles, placements, mood, budget, or collector
                    recommendations.
                  </p>

                  <div className="font-['Encode_Sans_Condensed'] mt-3 grid gap-2 sm:grid-cols-2">
                    {starterPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => setInput(prompt)}
                        className="min-h-[40px] rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-left text-sm leading-5 text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-6 pt-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    {msg.role === "user" ? (
                      <div className="max-w-[85%] rounded-2xl bg-zinc-900 px-4 py-3 text-sm leading-6 text-white">
                        {msg.content}
                      </div>
                    ) : (
                      <div className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm leading-7 text-zinc-900 shadow-sm">
                        <div className="prose prose-sm max-w-none prose-zinc prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:my-2 prose-li:my-1">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isLoading &&
                  messages[messages.length - 1]?.role !== "assistant" && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-center shadow-sm">
                        <div className="flex gap-1.5">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:120ms]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:240ms]" />
                        </div>
                      </div>
                    </div>
                  )}

                <div ref={bottomRef} />
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 left-0 right-0 border-t border-zinc-200 bg-[#f7f7f8] px-4 py-3 md:px-8">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="mx-auto flex w-full max-w-3xl items-end gap-2"
            >
              <div className="flex-1 rounded-2xl border border-zinc-300 bg-white px-3 py-2 shadow-sm focus-within:border-zinc-400">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleComposerKeyDown}
                  placeholder="Message AI Curator..."
                  disabled={isLoading}
                  rows={1}
                  className="max-h-32 min-h-[28px] w-full resize-none border-0 bg-transparent text-sm leading-6 text-zinc-900 placeholder:text-zinc-500 focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="h-11 w-11 rounded-xl bg-zinc-900 p-0 text-white hover:bg-zinc-800 disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AICurator;