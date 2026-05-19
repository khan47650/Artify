import { useEffect, useState } from "react";
import { FaBell, FaBullhorn, FaCheckCircle, FaShoppingBag, FaUserShield } from "react-icons/fa";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const getIcon = (type: string) => {
    if (type === "announcement") return <FaBullhorn />;
    if (type === "artwork_approved") return <FaCheckCircle />;
    if (type === "order") return <FaShoppingBag />;
    if (type === "account") return <FaUserShield />;
    return <FaBell />;
};

const Activities = () => {
    const { user } = useAuth();
    const { toast } = useToast();

    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchActivities = async () => {
        try {
            setLoading(true);

            const { data } = await api.get(`/activities/user/${user?.id}`);
            setActivities(data.activities || []);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to fetch activities",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id) fetchActivities();
    }, [user]);

    return (
        <section className="w-full">
            <div className="mb-8">
                <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}>
                    User Dashboard
                </p>

                <h1 className={`${headingFont} mt-2 text-[38px] leading-none text-[#111] lg:text-[56px]`}>
                    Activities
                </h1>

                <p className={`${bodyFont} mt-3 max-w-[620px] text-[14px] leading-6 text-[#6f6a63]`}>
                    Stay updated with approvals, announcements, orders and account messages.
                </p>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="animate-pulse rounded-[26px] border border-[#ebe4d9] bg-white p-5"
                        >
                            <div className="flex gap-4">
                                <div className="h-12 w-12 rounded-full bg-[#ececec]" />
                                <div className="flex-1">
                                    <div className="h-5 w-[45%] rounded bg-[#ececec]" />
                                    <div className="mt-3 h-4 w-[80%] rounded bg-[#ececec]" />
                                    <div className="mt-2 h-4 w-[55%] rounded bg-[#ececec]" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : activities.length === 0 ? (
                <div className="flex min-h-[260px] items-center justify-center rounded-[28px] border border-dashed border-[#d8d2c8] bg-white">
                    <h2 className={`${headingFont} text-[42px] text-[#111]`}>
                        No Activities Found
                    </h2>
                </div>
            ) : (
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div
                            key={activity._id}
                            className="
                group
                rounded-[26px]
                border
                border-[#ebe4d9]
                bg-gradient-to-br
                from-white
                to-[#f8f5ef]
                p-5
                shadow-[0_14px_35px_-24px_rgba(0,0,0,0.18)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-[0_22px_50px_-22px_rgba(0,0,0,0.22)]
              "
                        >
                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-lg">
                                    {getIcon(activity.type)}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                        <h2 className={`${headingFont} text-[26px] leading-none text-[#111]`}>
                                            {activity.title}
                                        </h2>

                                        <span className={`${bodyFont} text-[11px] uppercase tracking-[0.18em] text-[#8a847c]`}>
                                            {new Date(activity.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <p className={`${bodyFont} mt-2 text-[13px] leading-6 text-[#6f6a63]`}>
                                        {activity.description}
                                    </p>

                                    <span className={`${bodyFont} mt-4 inline-flex rounded-full bg-black/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#111]`}>
                                        {activity.userId ? "Personal" : "Announcement"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Activities;