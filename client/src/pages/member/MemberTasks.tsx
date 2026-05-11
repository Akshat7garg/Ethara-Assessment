import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import MemberLayout from "../../layouts/MemberLayout";

const MemberTasks = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const response = await API.get("/task/myTasks");
            setTasks(response.data.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleStatusUpdate =
        async (
            taskId: string,
            status: string
        ) => {
            try {
                await API.patch(`/task/updateStatus/${taskId}`, { status });

                setTasks((prev) => prev.map((task) => task.id === taskId
                    ? {
                        ...task,
                        status
                    }
                    : task
                ));

                toast.success("Task updated");

            } catch (error: any) {
                toast.error(error.response?.data?.message || "Failed to update task");
            }
        };

    const handleDeleteTask = async (taskId: string) => {
        try {
            await API.delete(`/task/delete/${taskId}`);
            setTasks((prev) => prev.filter((task) => task.id !== taskId));

            toast.success("Task deleted");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete task");
        }
    };

    return (
        <MemberLayout>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-white">
                        My Tasks
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Tasks assigned
                        to you
                    </p>
                </div>

                <Link
                    to="/member/tasks/create"
                    className="h-12 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white flex items-center justify-center gap-2"
                >
                    <Plus size={18} />

                    Create Task
                </Link>
            </div>

            {loading ? (
                <div className="h-[60vh] flex items-center justify-center">
                    <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : tasks.length ===
                0 ? (
                <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-10 text-center">
                    <h2 className="text-2xl font-semibold text-white">
                        No Tasks
                    </h2>

                    <p className="text-zinc-400 mt-3">
                        Create your
                        first task
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs">
                                    {task.priority}
                                </span>

                                <select
                                    value={task.status}
                                    onChange={(e) =>
                                        handleStatusUpdate(
                                            task.id,
                                            e.target.value)
                                    }
                                    className="h-10 px-3 rounded-xl bg-[#111827] border border-zinc-800 text-white text-sm outline-none"
                                >
                                    <option value="TODO">
                                        TODO
                                    </option>

                                    <option value="IN_PROGRESS">
                                        IN
                                        PROGRESS
                                    </option>

                                    <option value="COMPLETED">
                                        COMPLETED
                                    </option>
                                </select>
                            </div>

                            <h2 className="text-2xl font-semibold text-white mt-6">
                                {task.title}
                            </h2>

                            <p className="text-zinc-400 text-sm mt-3 line-clamp-3">
                                {task.description}
                            </p>

                            <div className="mt-8 pt-5 border-t border-zinc-800 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-zinc-500 text-sm">
                                            Project
                                        </p>

                                        <p className="text-white mt-2">
                                            {task.project?.title || "Personal"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-zinc-500 text-sm">
                                            Due
                                        </p>

                                        <p className="text-white mt-2">
                                            {task.dueDate
                                                ? new Date(task.dueDate).toLocaleDateString()
                                                : "N/A"}
                                        </p>
                                    </div>
                                </div>

                                {!task.projectId && (
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="w-full h-11 rounded-2xl bg-red-600 hover:bg-red-700 transition text-white"
                                    >
                                        Delete
                                        Personal
                                        Task
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </MemberLayout>
    );
};

export default MemberTasks;