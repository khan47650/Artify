import {
    FaClock,
    FaHistory,
    FaUser,
    FaEnvelope,
    FaPalette,
    FaDollarSign,
    FaTimes,
} from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";

const bodyFont = "font-['Encode_Sans_Condensed']";
const headingFont = "font-['Luvy_Mode'] font-normal";

interface Props {
    activeTab: string;
    onTabClick: (tabId: string) => void;
    onClose: () => void;
}

const UserSidebar = ({
    activeTab,
    onTabClick,
    onClose,
}: Props) => {
    const { user } = useAuth();

    const isSeller = user?.role === "seller";

    const tabs = [
        {
            id: "pending-orders",
            label: "My Pending Orders",
            icon: FaClock,
        },

        {
            id: "confirm-orders",
            label: "My Confirm Orders",
            icon: FaClock,
        },

        ...(!isSeller
            ? [
                {
                    id: "orders-history",
                    label: "Orders History",
                    icon: FaHistory,
                },
            ]
            : []),

        {
            id: "profile",
            label: "My Profile",
            icon: FaUser,
        },

        {
            id: "messages",
            label: "Messages",
            icon: FaEnvelope,
        },

        ...(isSeller
            ? [
                {
                    id: "my-artwork",
                    label: "My Artwork",
                    icon: FaPalette,
                },
                {
                    id: "sales-history",
                    label: "Sales History",
                    icon: FaDollarSign,
                },
            ]
            : []),
    ];

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
                        User Panel
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
                            className={`flex w-full items-center gap-4 px-7 py-4 text-left transition-all duration-200 ${isActive
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

export default UserSidebar;