import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/axios";
import MemberLayout from "../../layouts/MemberLayout";

const MemberSingleProject = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchProject = async () => {
        try {
            const response = await API.get(`/project/${projectId}`);
            setProject(response.data.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch project");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProject();
    }, []);

    if (loading) {
        return (
            <MemberLayout>
                <div className="h-[70vh] flex items-center justify-center">
                    <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </MemberLayout>
        );
    }

    return (
        <MemberLayout>
            <div className="space-y-10">
                <div>
                    <h1 className="text-4xl font-bold text-white">
                        {project.title}
                    </h1>

                    <p className="text-zinc-400 mt-3">
                        {project.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6">
                        <h2 className="text-2xl font-semibold text-white mb-8">
                            Team Members
                        </h2>

                        <div className="space-y-5">
                            {project.members.map((member: any) => (
                                <div
                                    key={member.user.id}
                                    className="flex items-center justify-between"
                                >
                                    <div>
                                        <p className="text-white font-medium">
                                            {member.user.name}
                                        </p>

                                        <p className="text-zinc-400 text-sm mt-1">
                                            {member.user.email}
                                        </p>
                                    </div>

                                    <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs">
                                        {member.user.role}
                                    </span>
                                </div>
                            )
                            )}
                        </div>
                    </div>

                    <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-semibold text-white">
                                Tasks
                            </h2>

                            <span className="text-zinc-400 text-sm">
                                {project.tasks.length}{" "}                                    tasks
                            </span>
                        </div>

                        <div className="space-y-5">
                            {project.tasks.map((task: any) => (
                                <div
                                    key={task.id}
                                    className="bg-[#111827] border border-zinc-800 rounded-2xl p-5"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">
                                                {task.title}
                                            </h3>

                                            <p className="text-zinc-400 text-sm mt-2">
                                                {task.description}
                                            </p>
                                        </div>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs ${task.status ===
                                                "COMPLETED"
                                                ? "bg-green-500/20 text-green-400"

                                                : task.status ===
                                                    "IN_PROGRESS"
                                                    ? "bg-blue-500/20 text-blue-400"

                                                    : "bg-yellow-500/20 text-yellow-400"
                                                }`}
                                        >
                                            {task.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-5 mt-6">
                                        <div>
                                            <p className="text-zinc-500 text-sm">
                                                Priority
                                            </p>

                                            <p className="text-white mt-2">
                                                {task.priority}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-zinc-500 text-sm">
                                                Due Date
                                            </p>

                                            <p className="text-white mt-2">
                                                {task.dueDate
                                                    ? new Date(task.dueDate).toLocaleDateString()
                                                    : "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MemberLayout>
    );
};

export default MemberSingleProject;