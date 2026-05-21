import * as Dialog from "@radix-ui/react-dialog";

const DeleteActivityDialog = ({ open, onClose, onConfirm, loading }: any) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6">
          <Dialog.Title className="text-xl font-semibold">Are you sure?</Dialog.Title>
          <Dialog.Description className="mt-2 text-black/70">
            Do you really want to delete this activity? This action cannot be undone.
          </Dialog.Description>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-lg border border-[#ccc] px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="rounded-lg bg-red-600 px-4 py-2 text-white disabled:opacity-60"
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteActivityDialog;