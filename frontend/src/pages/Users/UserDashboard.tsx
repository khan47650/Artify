import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserSidebar from "@/components/user/UserSidebar";

import {
    FaHome,
    FaSignOutAlt,
    FaBars,
} from "react-icons/fa";
import UserPendingOrders from "./UserPendingOrders";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState("pending-orders");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const userName =
        user?.lastName ||
        user?.firstName ||
        "User";

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
                className={`fixed left-0 top-0 z-50 h-screen w-[260px] bg-black text-white transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <UserSidebar
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
                            <h2
                                className={`${headingFont} truncate text-[20px] leading-none sm:text-[28px] lg:text-[34px]`}
                            >
                                Welcome {userName}
                            </h2>

                            <p
                                className={`${bodyFont} mt-1 hidden text-[11px] text-[#777] sm:block lg:text-[12px]`}
                            >
                                Manage your Artify account
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
                            onClick={() => {
                                logout();
                                navigate("/");
                            }}
                            className={`${bodyFont} inline-flex h-9 w-9 items-center justify-center gap-2 rounded-full bg-black text-[12px] text-white hover:bg-black/90 sm:h-10 sm:w-auto sm:px-5`}
                        >
                            <FaSignOutAlt />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </header>

                <main className="p-4 lg:p-8">
                    {activeTab === "pending-orders" && (
                        <UserPendingOrders />
                    )}
                    {activeTab === "confirm-orders" && (
                        <Section
                            title="My Confirm Orders"
                            subtitle="View all your confirmed artwork orders."
                        />
                    )}

                    {activeTab === "orders-history" && (
                        <Section
                            title="My Orders History"
                            subtitle="View your completed and delivered orders."
                        />
                    )}

                    {activeTab === "profile" && (
                        <Section
                            title="My Profile"
                            subtitle="Manage your account details and personal information."
                        />
                    )}

                    {activeTab === "messages" && (
                        <Section
                            title="Messages"
                            subtitle="Check your conversations and support messages."
                        />
                    )}

                    {activeTab === "my-artwork" && (
                        <Section
                            title="My Artwork"
                            subtitle="Manage all artworks uploaded by you."
                        />
                    )}

                    {activeTab === "sales-history" && (
                        <Section
                            title="My Sold Arts"
                            subtitle="Track all artwork sales and earnings."
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

const Section = ({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}) => {
    return (
        <section>
            <div className="mb-6">
                <p
                    className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}
                >
                    User Dashboard
                </p>

                <h1
                    className={`${headingFont} mt-2 text-[36px] leading-none text-[#111] lg:text-[52px]`}
                >
                    {title}
                </h1>

                <p
                    className={`${bodyFont} mt-3 text-[13px] text-[#6f6a63] lg:text-[14px]`}
                >
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
                        <p
                            className={`${bodyFont} text-[11px] uppercase tracking-[0.2em] text-[#777]`}
                        >
                            {label}
                        </p>

                        <h3
                            className={`${headingFont} mt-3 text-[40px] leading-none`}
                        >
                            {value}
                        </h3>
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-[#e6dfd4] bg-white p-5 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.18)]">
                <p
                    className={`${bodyFont} text-[13px] leading-6 text-[#6f6a63]`}
                >
                    Backend data will be connected here.
                </p>
            </div>
        </section>
    );
};

export default UserDashboard;