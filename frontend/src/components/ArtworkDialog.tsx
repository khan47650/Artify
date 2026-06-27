import { useState, useEffect } from "react";
import { toast } from "sonner";

type ArtworkDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  artwork?: any;
  loading?: boolean;
};

const categories = [
  "Paintings", "Drawings", "Photography", "Digital Art", "Sculpture",
  "Mixed Media", "Printmaking", "Calligraphy", "Ceramics & Pottery",
  "Textile Art", "Glass Art", "Metal Art", "Wood Art", "NFTs", "Installations",
];

const mediums = [
  "Oil", "Acrylic", "Watercolor", "Charcoal", "Pencil", "Ink",
  "Pastel", "Digital", "Resin", "Bronze", "Clay", "Wood", "Marble",
  "Glass", "Mixed Media",
];

const subjects = [
  "Abstract", "Landscape", "Seascape", "Cityscape", "Portrait",
  "Figurative", "Still Life", "Nature", "Wildlife", "Floral", "Animals",
  "Architecture", "Fantasy", "Religious", "Historical", "Contemporary",
  "Pop Art", "Minimalism", "Surrealism",
];

const styles = [
  "Realism", "Impressionism", "Expressionism", "Cubism", "Modern",
  "Contemporary", "Abstract", "Minimalist", "Street Art", "Pop Art",
  "Conceptual", "Traditional", "Islamic Art", "Folk Art",
];

const sizes = ["Small", "Medium", "Large", "Oversized"];

const orientations = ["Portrait", "Landscape", "Square", "Circular"];

const availabilities = [
  "Original", "Print", "Limited Edition", "Open Edition",
];

const colors = [
  "Black", "White", "Blue", "Green", "Red", "Yellow", "Orange",
  "Purple", "Brown", "Grey", "Multicolor",
];

const SelectField = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="mt-3 h-11 w-full rounded-full border border-black/15 bg-white px-4 text-sm text-black/70 outline-none appearance-none cursor-pointer"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
  >
    <option value="">{label}</option>
    {options.map((opt) => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
);

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
    medium: "",
    subject: "",
    style: "",
    size: "",
    orientation: "",
    availability: "",
    color: "",
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
        medium: artwork.medium || "",
        subject: artwork.subject || "",
        style: artwork.style || "",
        size: artwork.size || "",
        orientation: artwork.orientation || "",
        availability: artwork.availability || "",
        color: artwork.color || "",
        quantity: String(artwork.quantity ?? 1),
      });
    } else {
      setFormData({
        image: "",
        name: "",
        description: "",
        price: "",
        category: "",
        medium: "",
        subject: "",
        style: "",
        size: "",
        orientation: "",
        availability: "",
        color: "",
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
    if (!formData.name) { toast.error("Please enter artwork title"); return; }
    if (!formData.category) { toast.error("Please select a category"); return; }
    if (!formData.price) { toast.error("Please enter price"); return; }
    if (!formData.quantity || Number(formData.quantity) < 1) { toast.error("Please enter quantity"); return; }

    onSave({ ...formData, quantity: Number(formData.quantity || 1) });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-[26px] bg-white p-5 shadow-2xl">
        <h2 className="font-['Luvy_Mode'] text-[34px] leading-none text-black sticky top-0 bg-white pb-2">
          {artwork ? "Edit Artwork" : "Add Artwork"}
        </h2>

        {/* Image Upload */}
        <div className="mt-3">
          <label className="flex h-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-[20px] border border-black/15 bg-[#f7f4ee]">
            {formData.image ? (
              <img src={formData.image} alt="Artwork" className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm text-black/50">Upload Artwork Image</span>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        {/* Title */}
        <input
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          placeholder="Artwork title *"
          className="mt-3 h-11 w-full rounded-full border border-black/15 px-4 text-sm outline-none"
        />

        {/* Description */}
        <textarea
          value={formData.description}
          onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
          placeholder="Description"
          rows={3}
          className="mt-3 w-full rounded-[18px] border border-black/15 px-4 py-3 text-sm outline-none resize-none"
        />

        {/* Price + Quantity */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))}
            placeholder="Price ($) *"
            className="mt-3 h-11 w-full rounded-full border border-black/15 px-4 text-sm outline-none"
          />
          <input
            type="number"
            min={1}
            value={formData.quantity}
            onChange={(e) => setFormData((p) => ({ ...p, quantity: e.target.value }))}
            placeholder="Quantity *"
            className="mt-3 h-11 w-full rounded-full border border-black/15 px-4 text-sm outline-none"
          />
        </div>

        {/* Dropdowns */}
        <SelectField label="Category *" value={formData.category} options={categories} onChange={(v) => setFormData((p) => ({ ...p, category: v }))} />
        <SelectField label="Medium" value={formData.medium} options={mediums} onChange={(v) => setFormData((p) => ({ ...p, medium: v }))} />
        <SelectField label="Subject" value={formData.subject} options={subjects} onChange={(v) => setFormData((p) => ({ ...p, subject: v }))} />
        <SelectField label="Style" value={formData.style} options={styles} onChange={(v) => setFormData((p) => ({ ...p, style: v }))} />
        <SelectField label="Size" value={formData.size} options={sizes} onChange={(v) => setFormData((p) => ({ ...p, size: v }))} />
        <SelectField label="Orientation" value={formData.orientation} options={orientations} onChange={(v) => setFormData((p) => ({ ...p, orientation: v }))} />
        <SelectField label="Availability" value={formData.availability} options={availabilities} onChange={(v) => setFormData((p) => ({ ...p, availability: v }))} />
        <SelectField label="Color" value={formData.color} options={colors} onChange={(v) => setFormData((p) => ({ ...p, color: v }))} />

        {/* Buttons */}
        <div className="mt-5 flex gap-3 sticky bottom-0 bg-white pt-2">
          <button onClick={onClose} className="h-11 flex-1 rounded-full border border-black/15 text-sm">
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleSave}
            className="h-11 flex-1 rounded-full bg-black text-sm text-white disabled:bg-black/40"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDialog;