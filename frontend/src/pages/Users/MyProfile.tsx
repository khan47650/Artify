import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserEdit,
  FaCamera,
} from "react-icons/fa";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const MyProfile = () => {
  const { user } = useAuth();

  const isSeller = user?.role === "seller";
  const [hasChanges, setHasChanges] = useState(false);

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
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            {/* LEFT SIDE */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end">

              {/* IMAGE (SELLER ONLY) */}
              {isSeller && (
                <div className="relative">
                  <div className="h-[145px] w-[145px] overflow-hidden rounded-[32px] border-4 border-white bg-[#f7f4ee] shadow-2xl">
                    <img
                      src={
                        user?.artistPhoto ||
                        "https://via.placeholder.com/300x300.png?text=Artist"
                      }
                      alt="Artist"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <button
                    onClick={() => setHasChanges(true)}
                    className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white hover:bg-black/90"
                  >
                    <FaCamera />
                  </button>
                </div>
              )}

              {/* NAME + ROLE */}
              <div className="flex flex-col justify-end pb-5">
                <span className={`${bodyFont} inline-flex w-fit rounded-full bg-white/15 px-4 py-1 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur-md`}>
                  {user?.role || "buyer"}
                </span>

                <h2 className={`${headingFont} mt-4 text-[42px] leading-none text-white lg:text-[60px]`}>
                  {user?.firstName} {user?.lastName}
                </h2>

                <p className={`${bodyFont} mt-3 text-[14px] text-white/70`}>
                  Welcome to your Artify account dashboard.
                </p>
              </div>
            </div>

            {/* ACCOUNT STATUS */}
            <div className="self-start lg:self-end rounded-[26px] border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl lg:min-w-[290px] mb-2">
              <p className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-white/60`}>
                Account Status
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className={`${bodyFont} text-[15px] font-semibold text-white`}>
                  Active Account
                </span>
              </div>

              <p className={`${bodyFont} mt-4 text-[13px] leading-6 text-white/70`}>
                Your Artify account is active and verified successfully.
              </p>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <InfoCard icon={<FaEnvelope />} label="Email Address" value={user?.email || "Not Provided"} />
            <InfoCard icon={<FaPhoneAlt />} label="Phone Number" value={user?.phoneNumber || "Not Provided"} />
            <InfoCard icon={<FaMapMarkerAlt />} label="Country" value={user?.country || "Not Provided"} />
            <InfoCard icon={<FaMapMarkerAlt />} label="City" value={user?.city || "Not Provided"} />
            <InfoCard icon={<FaMapMarkerAlt />} label="State" value={user?.state || "Not Provided"} />
            <InfoCard icon={<FaMapMarkerAlt />} label="Postal Code" value={user?.postalCode || "Not Provided"} />
            <InfoCard icon={<FaMapMarkerAlt />} label="Address Line 1" value={user?.addressLine1 || "Not Provided"} />
            <InfoCard icon={<FaMapMarkerAlt />} label="Address Line 2" value={user?.addressLine2 || "Not Provided"} />
          </div>

          {/* ACTIONS */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              disabled={!hasChanges}
              className={`${bodyFont} rounded-full px-7 py-3 text-[13px] text-white transition ${
                hasChanges ? "bg-black hover:bg-black/90" : "cursor-not-allowed bg-[#bdbdbd]"
              }`}
            >
              Save Changes
            </button>

            <button className={`${bodyFont} rounded-full border border-[#d8d2c8] bg-white px-7 py-3 text-[13px] text-[#111] hover:bg-[#f7f4ee]`}>
              Change Password
            </button>
          </div>
        </div>
      </div>
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

export default MyProfile;