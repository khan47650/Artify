import * as Dialog from "@radix-ui/react-dialog";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

const ActivityDialog = ({ open, onClose, onSave, activity, loading }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (activity) {
      setTitle(activity.title);
      setDescription(activity.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [activity]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave({ title, description });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6">
          <Dialog.Close className="absolute top-4 right-4 text-black">
            <FaTimes />
          </Dialog.Close>
          <h2 className="mb-4 text-2xl font-semibold">{activity ? "Edit Activity" : "New Activity"}</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full rounded-lg border p-3 text-black outline-none"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full rounded-lg border p-3 text-black outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-60"
            >
              {loading ? "Saving..." : activity ? "Save Changes" : "Create Activity"}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ActivityDialog;