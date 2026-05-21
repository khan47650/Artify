import { useEffect, useState } from "react";
import { FaEnvelopeOpenText, FaEye, FaReply, FaTrash, FaTrashAlt } from "react-icons/fa";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const Message = () => {
  const { toast } = useToast();

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [reply, setReply] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/contact-messages");
      setMessages(data.messages || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleReply = async () => {
    if (!reply) {
      return toast({
        title: "Reply Required",
        description: "Please enter reply message.",
        variant: "destructive",
      });
    }

    try {
      setActionLoading(true);

      const { data } = await api.post(`/contact-messages/reply/${selectedMessage._id}`, {
        reply,
      });

      toast({
        title: "Success",
        description: data.message || "Reply sent successfully",
      });

      setReply("");
      setReplyDialogOpen(false);
      setSelectedMessage(null);
      fetchMessages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Reply failed",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/contact-messages/${id}`);
      toast({ title: "Deleted", description: "Message deleted successfully" });
      fetchMessages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Delete failed",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAll = async () => {
    try {
      await api.delete("/contact-messages/delete-all");
      toast({ title: "Deleted", description: "All messages deleted successfully" });
      fetchMessages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Delete all failed",
        variant: "destructive",
      });
    }
  };

  return (
    <section>
      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}>
            Admin Dashboard
          </p>

          <h1 className={`${headingFont} mt-2 text-[36px] leading-none text-[#111] lg:text-[54px]`}>
            Messages
          </h1>

          <p className={`${bodyFont} mt-3 text-[13px] text-[#6f6a63]`}>
            View customer messages, reply by email, and manage inbox.
          </p>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className={`${bodyFont} inline-flex items-center gap-2 rounded-full border border-[#d8d2c8] bg-[#f7f4ee] px-5 py-3 text-[12px] text-[#111] transition hover:bg-[#ece6dc]`}
          >
            <FaTrashAlt />
            Delete All
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="animate-pulse rounded-[26px] border border-[#ebe4d9] bg-white p-5">
              <div className="h-6 w-[45%] rounded bg-[#ececec]" />
              <div className="mt-3 h-4 w-[70%] rounded bg-[#ececec]" />
              <div className="mt-3 h-4 w-[90%] rounded bg-[#ececec]" />
            </div>
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="flex min-h-[260px] items-center justify-center rounded-[28px] border border-dashed border-[#d8d2c8] bg-white">
          <h2 className={`${headingFont} text-[42px] text-[#111]`}>No Messages Found</h2>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="rounded-[26px] border border-[#ebe4d9] bg-gradient-to-br from-white to-[#f8f5ef] p-5 shadow-[0_14px_35px_-24px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_50px_-22px_rgba(0,0,0,0.22)]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <FaEnvelopeOpenText />
                  </div>

                  <div>
                    <h2 className={`${headingFont} text-[28px] leading-none text-[#111]`}>
                      {msg.subject}
                    </h2>

                    <p className={`${bodyFont} mt-2 text-[13px] text-[#777]`}>
                      {msg.name} • {msg.email}
                    </p>

                    <p className={`${bodyFont} mt-3 line-clamp-2 text-[13px] leading-6 text-[#6f6a63]`}>
                      {msg.message}
                    </p>

                    <span className={`${bodyFont} mt-3 inline-flex rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${
                      msg.replied ? "bg-green-100 text-green-700" : "bg-[#fff4d6] text-[#b67a00]"
                    }`}>
                      {msg.replied ? "Replied" : "Pending Reply"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedMessage(msg)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
                  >
                    <FaEye className="text-[13px]" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedMessage(msg);
                      setReply(msg.reply || "");
                      setReplyDialogOpen(true);
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ddd6ca] bg-white text-[#111]"
                  >
                    <FaReply className="text-[13px]" />
                  </button>

                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ddd6ca] bg-white text-[#111]"
                  >
                    <FaTrash className="text-[13px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMessage && !replyDialogOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-[520px] rounded-[28px] bg-white p-6 shadow-2xl">
            <h2 className={`${headingFont} text-[36px] text-[#111]`}>{selectedMessage.subject}</h2>
            <p className={`${bodyFont} mt-2 text-[13px] text-[#777]`}>
              {selectedMessage.name} • {selectedMessage.email}
            </p>

            <p className={`${bodyFont} mt-5 rounded-[20px] bg-[#f7f4ee] p-4 text-[14px] leading-7 text-[#111]`}>
              {selectedMessage.message}
            </p>

            {selectedMessage.reply && (
              <p className={`${bodyFont} mt-4 rounded-[20px] bg-black p-4 text-[14px] leading-7 text-white`}>
                Reply: {selectedMessage.reply}
              </p>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedMessage(null)}
                className={`${bodyFont} rounded-full bg-black px-6 py-2.5 text-[12px] text-white`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {replyDialogOpen && selectedMessage && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-[500px] rounded-[28px] bg-white p-6 shadow-2xl">
            <h2 className={`${headingFont} text-[36px] text-[#111]`}>Reply Message</h2>

            <p className={`${bodyFont} mt-2 text-[13px] text-[#777]`}>
              To: {selectedMessage.email}
            </p>

            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write your reply..."
              className={`${bodyFont} mt-5 min-h-[150px] w-full resize-none rounded-[22px] border border-[#d8d2c8] bg-[#f7f4ee] p-4 text-[14px] outline-none`}
            />

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  setReplyDialogOpen(false);
                  setSelectedMessage(null);
                  setReply("");
                }}
                className={`${bodyFont} h-11 flex-1 rounded-full border border-[#d8d2c8] bg-white text-[12px] text-[#111]`}
              >
                Cancel
              </button>

              <button
                onClick={handleReply}
                disabled={actionLoading}
                className={`${bodyFont} h-11 flex-1 rounded-full bg-black text-[12px] text-white disabled:opacity-60`}
              >
                {actionLoading ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Message;