import {
  FaClock,
  FaCheckCircle,
  FaPalette,
  FaImage,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";

const bodyFont = "font-['Encode_Sans_Condensed']";
const headingFont = "font-['Luvy_Mode'] font-normal";

const tabs = [
  { id: "pending", label: "Pending Orders", icon: FaClock },
  { id: "confirmed", label: "Confirm Orders", icon: FaCheckCircle },
  { id: "artists", label: "Artists", icon: FaPalette },
  { id: "manage-art", label: "Manage Art", icon: FaImage },
  { id: "messages", label: "Messages", icon: FaEnvelope },
];

interface Props {
  activeTab: string;
  onTabClick: (tabId: string) => void;
  onClose: () => void;
}

const AdminSidebar = ({
  activeTab,
  onTabClick,
  onClose,
}: Props) => {
  return (
    <>
      <div className="flex items-start justify-between px-7 py-8">
        <div>
          <h1 className={`${headingFont} text-[42px] leading-none text-white`}>
            Artify
          </h1>

          <p
            className={`${bodyFont} mt-2 text-[11px] uppercase tracking-[0.28em] text-white/45`}
          >
            Admin Panel
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white lg:hidden"
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
              className={`flex w-full items-center gap-4 px-7 py-4 text-left transition-all duration-200 ${
                isActive
                  ? "border-r-4 border-white bg-white/20"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon className="text-[18px] text-white" />

              <span
                className={`${bodyFont} text-[15px] font-semibold text-white`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default AdminSidebar;