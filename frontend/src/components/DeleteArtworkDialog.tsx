const DeleteArtworkDialog = ({ open, onClose, onConfirm, loading }: any) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-[340px] rounded-[24px] bg-white p-6 text-center shadow-2xl">
                <h2 className="font-['Luvy_Mode'] text-[32px] text-black">Are you sure?</h2>
                <p className="mt-2 text-sm text-black/60">This artwork will be deleted permanently.</p>

                <div className="mt-6 flex gap-3">
                    <button onClick={onClose} className="h-11 flex-1 rounded-full border border-black/15">
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="h-11 flex-1 rounded-full bg-black text-white disabled:bg-black/40"
                    >
                        {loading ? "Deleting..." : "Yes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteArtworkDialog;