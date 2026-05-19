import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserEdit,
  FaCamera,
  FaUserCircle,
} from "react-icons/fa";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const MyProfile = () => {
  const { user, login } = useAuth();
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    addressLine1: user?.addressLine1 || "",
    addressLine2: user?.addressLine2 || "",
    city: user?.city || "",
    state: user?.state || "",
    postalCode: user?.postalCode || "",
    country: user?.country || "",
    artistPhoto: user?.artistPhoto || "",
  });

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

  const handleSaveProfile = async () => {
    setLoading(true);

    try {
      const { data } = await api.put("/auth/profile", {
        userId: user?.id,
        ...formData,
      });

      const token = localStorage.getItem("token") || localStorage.getItem("artify_token") || "";
      login(token, data.user);

      setHasChanges(false);
      setIsEditing(false);
      toast({
        title: "Success",
        description: data.message || "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Profile update failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const dataUrl = await fileToDataUrl(file);
    setFormData((prev) => ({ ...prev, artistPhoto: dataUrl }));
    setHasChanges(true);
  };

  const handleChangePassword = async () => {
    if (!newPassword) {
      return toast({
        title: "Password Required",
        description: "Please enter a new password",
        variant: "destructive",
      });
    }

    setLoading(true);

    try {
      const { data } = await api.put("/auth/change-password", {
        userId: user?.id,
        newPassword,
      });

      setNewPassword("");
      setPasswordDialogOpen(false);
      toast({
        title: "Success",
        description: data.message || "Password updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Password update failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-140px)]">
      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}>
            User Dashboard
          </p>

          <h1 className={`${headingFont} mt-2 text-[38px] leading-none text-[#111] lg:text-[56px]`}>
            My Profile
          </h1>

          <p className={`${bodyFont} mt-3 text-[14px] text-[#6f6a63]`}>
            Manage your personal information and account settings.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className={`${bodyFont} inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-[13px] text-white transition hover:bg-black/90`}
        >
          <FaUserEdit />
          Edit Profile
        </button>
      </div>

      {/* PROFILE CARD */}
      <div className="relative overflow-hidden rounded-[34px] border border-[#e6dfd4] bg-[#fcfcfc] shadow-[0_30px_80px_-25px_rgba(0,0,0,0.22)]">

        {/* TOP GRADIENT */}
        <div className="absolute inset-x-0 top-0 h-[240px] bg-gradient-to-r from-black via-[#151515] to-[#2c2c2c]" />

        <div className="relative p-6 lg:p-10">

          {/* TOP SECTION */}
          <div className="flex flex-col  gap-5 lg:flex-row lg:items-end lg:justify-between">

            {/* LEFT SIDE */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end">


              {/* PROFILE IMAGE */}
              <div className="relative">
                <div className="flex h-[145px] w-[145px] items-center justify-center overflow-hidden rounded-[32px] border-4 border-white bg-[#f7f4ee] shadow-2xl">
                  {formData.artistPhoto ? (
                    <img
                      src={formData.artistPhoto}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-[90px] text-[#b8b2aa]" />
                  )}
                </div>

                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <label
                  htmlFor="profile-image"
                  className="absolute bottom-2 right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black text-white hover:bg-black/90"
                >
                  <FaCamera />
                </label>
              </div>

              {/* NAME + ROLE */}
              <div className="flex flex-col justify-end pb-0 lg:pb-5">
                <span className={`${bodyFont} inline-flex w-fit rounded-full bg-white/15 px-4 py-1 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur-md`}>
                  {user?.role || "buyer"}
                </span>

                <h2 className={`${headingFont} mt-4 text-[38px] leading-none text-[#111] lg:text-[60px] lg:text-white`}>
                  {formData.firstName} {formData.lastName}
                </h2>

                <p className={`${bodyFont} mt-3 text-[13px] text-[#6f6a63] lg:text-[14px] lg:text-white/70`}>
                  Welcome to your Artify account dashboard.
                </p>
              </div>
            </div>

            {/* ACCOUNT STATUS */}
            <div className="w-full lg:w-auto self-start rounded-[22px] border border-black/10 bg-white px-5 py-4 shadow-sm lg:self-end lg:mb-2 lg:min-w-[290px] lg:rounded-[26px] lg:border-white/10 lg:bg-white/10 lg:px-6 lg:py-5 lg:backdrop-blur-xl">
              <p className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-black/55 lg:text-white/60`}>
                Account Status
              </p>

              <div className="mt-3 flex items-center gap-3 lg:mt-4">
                <div className="h-3 w-3 shrink-0 rounded-full bg-green-500" />
                <span className={`${bodyFont} text-[15px] font-semibold text-black lg:text-white`}>
                  Active Account
                </span>
              </div>

              <p className={`${bodyFont} mt-3 text-[13px] leading-5 text-black/60 lg:mt-4 lg:leading-6 lg:text-white/70`}>
                Your Artify account is active and verified successfully.
              </p>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <InfoCard icon={<FaEnvelope />} label="Email Address" value={user?.email || "Not Provided"} />

            <EditableInfoCard
              icon={<FaUserEdit />}
              label="First Name"
              value={formData.firstName}
              disabled={!isEditing}
              onChange={(value) => handleFieldChange("firstName", value)}
            />

            <EditableInfoCard
              icon={<FaUserEdit />}
              label="Last Name"
              value={formData.lastName}
              disabled={!isEditing}
              onChange={(value) => handleFieldChange("lastName", value)}
            />

            <EditableInfoCard
              icon={<FaPhoneAlt />}
              label="Phone Number"
              value={formData.phoneNumber}
              disabled={!isEditing}
              onChange={(value) => handleFieldChange("phoneNumber", value)}
            />

            <EditableInfoCard icon={<FaMapMarkerAlt />} label="Country" value={formData.country} disabled={!isEditing} onChange={(value) => handleFieldChange("country", value)} />
            <EditableInfoCard icon={<FaMapMarkerAlt />} label="City" value={formData.city} disabled={!isEditing} onChange={(value) => handleFieldChange("city", value)} />
            <EditableInfoCard icon={<FaMapMarkerAlt />} label="State" value={formData.state} disabled={!isEditing} onChange={(value) => handleFieldChange("state", value)} />
            <EditableInfoCard icon={<FaMapMarkerAlt />} label="Postal Code" value={formData.postalCode} disabled={!isEditing} onChange={(value) => handleFieldChange("postalCode", value)} />
            <EditableInfoCard icon={<FaMapMarkerAlt />} label="Address Line 1" value={formData.addressLine1} disabled={!isEditing} onChange={(value) => handleFieldChange("addressLine1", value)} />
            <EditableInfoCard icon={<FaMapMarkerAlt />} label="Address Line 2" value={formData.addressLine2} disabled={!isEditing} onChange={(value) => handleFieldChange("addressLine2", value)} />
          </div>



          {/* ACTIONS */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={handleSaveProfile}
              disabled={!hasChanges || loading}
              className={`${bodyFont} rounded-full px-7 py-3 text-[13px] text-white transition ${hasChanges ? "bg-black hover:bg-black/90" : "cursor-not-allowed bg-[#bdbdbd]"
                }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => setPasswordDialogOpen(true)}
              className={`${bodyFont} rounded-full border border-[#d8d2c8] bg-white px-7 py-3 text-[13px] text-[#111] hover:bg-[#f7f4ee]`}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
      {passwordDialogOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-[360px] rounded-[24px] bg-white p-6 shadow-2xl">
            <h3 className={`${headingFont} text-[32px] text-black`}>Change Password</h3>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="mt-5 h-12 w-full rounded-full border border-black/15 px-4 outline-none"
            />

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setPasswordDialogOpen(false)}
                className="h-11 flex-1 rounded-full border border-black/15 bg-white text-sm text-black"
              >
                Cancel
              </button>

              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="h-11 flex-1 rounded-full bg-black text-sm text-white"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

/* INFO CARD */
const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-[24px] border border-[#ececec] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(0,0,0,0.16)]">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
          {icon}
        </div>

        <div>
          <p className={`${bodyFont} text-[11px] uppercase tracking-[0.18em] text-[#888]`}>
            {label}
          </p>

          <h3 className={`${bodyFont} mt-1 text-[15px] font-semibold text-[#111]`}>
            {value}
          </h3>
        </div>
      </div>
    </div>
  );
};

const EditableInfoCard = ({
  icon,
  label,
  value,
  disabled,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="rounded-[24px] border border-[#ececec] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(0,0,0,0.16)]">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
          {icon}
        </div>

        <div className="w-full">
          <p className={`${bodyFont} text-[11px] uppercase tracking-[0.18em] text-[#888]`}>
            {label}
          </p>

          <input
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Not Provided"
            className={`${bodyFont} mt-1 w-full rounded-full border px-3 py-2 text-[15px] font-semibold text-[#111] outline-none ${disabled
              ? "border-transparent bg-transparent px-0"
              : "border-black/15 bg-[#f7f4ee]"
              }`}
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;