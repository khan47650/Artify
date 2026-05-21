import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

import ActivityDialog from "@/components/ActivityDialog";
import DeleteActivityDialog from "@/components/DeleteActivityDialog";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const AdminActivities = () => {
    const { toast } = useToast();
    const { user } = useAuth();

    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<any>(null);

    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchActivities = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/activities"); 
            // filter only general type
            const generalActivities = (data.activities || []).filter(
                (act: any) => act.type === "general"
            );
            setActivities(generalActivities);
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
        fetchActivities();
    }, []);

    const handleSaveActivity = async (formData: any) => {
        try {
            setSaveLoading(true);

            if (selectedActivity) {
                // Edit
                await api.put(`/activities/${selectedActivity._id}`, formData);
                toast({ title: "Activity updated successfully" });
            } else {
                // Create new
                await api.post("/activities", { ...formData, type: "general" });
                toast({ title: "Activity created successfully" });
            }

            setDialogOpen(false);
            setSelectedActivity(null);
            fetchActivities();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Activity save failed",
                variant: "destructive",
            });
        } finally {
            setSaveLoading(false);
        }
    };

    const handleDeleteActivity = async () => {
        try {
            setDeleteLoading(true);
            await api.delete(`/activities/${selectedActivity._id}`);
            toast({ title: "Activity deleted successfully" });
            setDeleteDialogOpen(false);
            setSelectedActivity(null);
            fetchActivities();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Activity delete failed",
                variant: "destructive",
            });
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <section>
            {/* HEADER */}
            <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}>
                        Admin Dashboard
                    </p>
                    <h1 className={`${headingFont} mt-2 text-[36px] leading-none text-[#111] lg:text-[54px]`}>
                        Activities
                    </h1>
                    <p className={`${bodyFont} mt-3 max-w-[620px] text-[14px] leading-6 text-[#6f6a63]`}>
                        Manage general announcements and system activities for all users.
                    </p>
                </div>

                <button
                    onClick={() => {
                        setSelectedActivity(null);
                        setDialogOpen(true);
                    }}
                    className={`${bodyFont} inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-[13px] text-white transition-all duration-300 hover:scale-[1.02] hover:bg-black/90`}
                >
                    <FaPlus />
                    Announce Activity
                </button>
            </div>

            {/* GRID */}
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="animate-pulse rounded-[26px] border border-[#ebe4d9] bg-white p-5">
                            <div className="h-6 w-[40%] rounded bg-[#ececec]" />
                            <div className="mt-3 h-4 w-[90%] rounded bg-[#ececec]" />
                            <div className="mt-2 h-4 w-[80%] rounded bg-[#ececec]" />
                        </div>
                    ))}
                </div>
            ) : activities.length === 0 ? (
                <div className="flex min-h-[260px] items-center justify-center rounded-[28px] border border-dashed border-[#d8d2c8] bg-white">
                    <h2 className={`${headingFont} text-[42px] text-[#111]`}>No Activities Found</h2>
                </div>
            ) : (
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div
                            key={activity._id}
                            className="group rounded-[26px] border border-[#ebe4d9] bg-gradient-to-br from-white to-[#f8f5ef] p-5 shadow-[0_14px_35px_-24px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_50px_-22px_rgba(0,0,0,0.22)]"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h2 className={`${headingFont} text-[26px] text-[#111]`}>{activity.title}</h2>
                                    <p className={`${bodyFont} mt-2 text-[13px] text-[#6f6a63]`}>
                                        {activity.description}
                                    </p>
                                    <span className={`${bodyFont} mt-2 inline-block rounded-full bg-black/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#111]`}>
                                        {activity.userId ? "Personal" : "Announcement"}
                                    </span>
                                </div>

                                <div className="flex gap-2 mt-1">
                                    <button
                                        onClick={() => {
                                            setSelectedActivity(activity);
                                            setDialogOpen(true);
                                        }}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
                                    >
                                        <FaEdit className="text-[13px]" />
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedActivity(activity);
                                            setDeleteDialogOpen(true);
                                        }}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ddd6ca] bg-white text-[#111]"
                                    >
                                        <FaTrash className="text-[13px]" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ActivityDialog
                open={dialogOpen}
                activity={selectedActivity}
                loading={saveLoading}
                onClose={() => {
                    setDialogOpen(false);
                    setSelectedActivity(null);
                }}
                onSave={handleSaveActivity}
            />

            <DeleteActivityDialog
                open={deleteDialogOpen}
                loading={deleteLoading}
                onClose={() => {
                    setDeleteDialogOpen(false);
                    setSelectedActivity(null);
                }}
                onConfirm={handleDeleteActivity}
            />
        </section>
    );
};

export default AdminActivities;