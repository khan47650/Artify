import { useState, useEffect } from "react";
import { toast } from "sonner";

type ArtworkDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  artwork?: any;
  loading?: boolean;
};

const ArtworkDialog = ({
  open,
  onClose,
  onSave,
  artwork,
  loading,
}: ArtworkDialogProps) => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
  });

  useEffect(() => {
    if (artwork) {
      setFormData({
        image: artwork.image || "",
        name: artwork.name || "",
        description: artwork.description || "",
        price: artwork.price || "",
        category: artwork.category || "",
        quantity: String(artwork.quantity ?? 1),
      });
    } else {
      setFormData({
        image: "",
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
      });
    }
  }, [artwork, open]);

  if (!open) return null;

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const dataUrl = await fileToDataUrl(file);
    setFormData((prev) => ({ ...prev, image: dataUrl }));
  };

  const handleSave = () => {
    if (!formData.quantity || Number(formData.quantity) < 1) {
      toast.error("Please enter quantity");
      return;
    }
    onSave({
      ...formData,
      quantity: Number(formData.quantity || 1),
    });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-[460px] rounded-[26px] bg-white p-5 shadow-2xl">
        <h2 className="font-['Luvy_Mode'] text-[34px] leading-none text-black">
          {artwork ? "Edit Artwork" : "Add Artwork"}
        </h2>

        <div className="mt-5">
          <label className="flex h-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-[20px] border border-black/15 bg-[#f7f4ee]">
            {formData.image ? (
              <img src={formData.image} alt="Artwork" className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm text-black/50">Upload Artwork Image</span>
            )}

            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        <input
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          placeholder="Artwork title"
          className="mt-3 h-11 w-full rounded-full border border-black/15 px-4 outline-none"
        />

        <textarea
          value={formData.description}
          onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
          placeholder="Description"
          className="mt-3 min-h-[90px] w-full rounded-[18px] border border-black/15 px-4 py-3 outline-none"
        />

        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))}
          placeholder="Price in dollars"
          className="mt-3 h-11 w-full rounded-full border border-black/15 px-4 outline-none"
        />

        <input
          value={formData.category}
          onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
          placeholder="Category"
          className="mt-3 h-11 w-full rounded-full border border-black/15 px-4 outline-none"
        />

        <input
          type="number"
          min={1}
          value={formData.quantity}
          onChange={(e) => setFormData((p) => ({ ...p, quantity: e.target.value }))}
          placeholder="Quantity"
          className="mt-3 h-11 w-full rounded-full border border-black/15 px-4 outline-none"
        />

        <div className="mt-5 flex gap-3">
          <button onClick={onClose} className="h-11 flex-1 rounded-full border border-black/15">
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSave}
            className="h-11 flex-1 rounded-full bg-black text-white disabled:bg-black/40"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDialog;