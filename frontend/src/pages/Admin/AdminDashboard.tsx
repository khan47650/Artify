import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClock,
  FaCheckCircle,
  FaPalette,
  FaImage,
  FaEnvelope,
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const tabs = [
  { id: "pending", label: "Pending Orders", icon: FaClock },
  { id: "confirmed", label: "Confirm Orders", icon: FaCheckCircle },
  { id: "artists", label: "Artists", icon: FaPalette },
  { id: "manage-art", label: "Manage Art", icon: FaImage },
  { id: "messages", label: "Messages", icon: FaEnvelope },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("artify_admin_logged_in");
    navigate("/login");
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] text-[#111]">
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/55 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[260px] bg-black text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          activeTab={activeTab}
          onTabClick={handleTabClick}
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      <div className="min-h-screen lg:ml-[260px]">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-[#e2e2e8] bg-white px-3 py-3 sm:gap-4 sm:px-4 sm:py-4 lg:h-[78px] lg:px-8 lg:py-0">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white lg:hidden"
              aria-label="Open sidebar"
            >
              <FaBars />
            </button>

            <div className="min-w-0">
              <h2 className={`${headingFont} truncate text-[20px] leading-none sm:text-[28px] lg:text-[34px]`}>
                Welcome Admin
              </h2>

              <p className={`${bodyFont} mt-1 hidden text-[11px] text-[#777] sm:block lg:text-[12px]`}>
                Manage your Artify dashboard
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/")}
              className={`${bodyFont} inline-flex h-9 w-9 items-center justify-center gap-2 rounded-full border border-[#d8d2c8] bg-white text-[12px] text-[#111] hover:bg-[#f7f4ee] sm:h-10 sm:w-auto sm:px-5`}
            >
              <FaHome />
              <span className="hidden sm:inline">Home</span>
            </button>

            <button
              onClick={logout}
              className={`${bodyFont} inline-flex h-9 w-9 items-center justify-center gap-2 rounded-full bg-black text-[12px] text-white hover:bg-black/90 sm:h-10 sm:w-auto sm:px-5`}
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {activeTab === "pending" && <Section title="Pending Orders" subtitle="Orders waiting for confirmation." />}
          {activeTab === "confirmed" && <Section title="Confirm Orders" subtitle="Successfully confirmed customer orders." />}
          {activeTab === "artists" && <Section title="Artists" subtitle="Manage artist accounts and profiles." />}
          {activeTab === "manage-art" && <Section title="Manage Art" subtitle="Add, edit, remove and review artworks." />}
          {activeTab === "messages" && <Section title="Messages" subtitle="Customer and artist support messages." />}
        </main>
      </div>
    </div>
  );
};

const SidebarContent = ({
  activeTab,
  onTabClick,
  onClose,
}: {
  activeTab: string;
  onTabClick: (tabId: string) => void;
  onClose: () => void;
}) => {
  return (
    <>
      <div className="flex items-start justify-between px-7 py-8">
        <div>
          <h1 className={`${headingFont} text-[42px] leading-none`}>Artify</h1>
          <p className={`${bodyFont} mt-2 text-[11px] uppercase tracking-[0.28em] text-white/45`}>
            Admin Panel
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <FaTimes />
        </button>
      </div>

      <nav className="mt-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={`flex w-full items-center gap-4 px-7 py-4 text-left transition ${
                isActive ? "border-r-4 border-white bg-white/20" : "hover:bg-white/10"
              }`}
            >
              <Icon className="text-[18px] text-white" />
              <span className={`${bodyFont} text-[15px] font-semibold text-white`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

const Section = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <section>
      <div className="mb-6">
        <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}>
          Admin Dashboard
        </p>

        <h1 className={`${headingFont} mt-2 text-[36px] leading-none text-[#111] lg:text-[52px]`}>
          {title}
        </h1>

        <p className={`${bodyFont} mt-3 text-[13px] text-[#6f6a63] lg:text-[14px]`}>
          {subtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          ["Total", "24"],
          ["Active", "18"],
          ["Review", "06"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-[24px] border border-[#e6dfd4] bg-white p-5 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.18)]"
          >
            <p className={`${bodyFont} text-[11px] uppercase tracking-[0.2em] text-[#777]`}>
              {label}
            </p>

            <h3 className={`${headingFont} mt-3 text-[40px] leading-none`}>
              {value}
            </h3>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[24px] border border-[#e6dfd4] bg-white p-5 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.18)]">
        <p className={`${bodyFont} text-[13px] leading-6 text-[#6f6a63]`}>
          Backend data will be connected here.
        </p>
      </div>
    </section>
  );
};

export default AdminDashboard;