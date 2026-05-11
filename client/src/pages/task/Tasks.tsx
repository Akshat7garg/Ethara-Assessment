import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

const Tasks = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const [personalTasksResponse, projectsResponse] = await Promise.all([
                API.get("/task/myTasks"),
                API.get("/project/myProjects")
            ]);

            const personalTasks = personalTasksResponse.data.data || [];
            const projects = projectsResponse.data.data || [];

            const detailedProjects = await Promise.all(projects.map((project: any) =>
                API.get(`/project/${project.id}`)
            ));

            const fullProjects = detailedProjects.map((item) =>
                item.data?.data).filter(Boolean);

            const projectTasks = fullProjects.flatMap((project: any) =>
                Array.isArray(project.tasks)
                    ? project.tasks.map((task: any) => ({
                        ...task,
                        project: {
                            title: project.title
                        }
                    }))
                    : []
            );

            const mergedTasks =
                [
                    ...personalTasks,
                    ...projectTasks
                ];

            const uniqueTasks = mergedTasks.filter((task, index, self) =>
                index === self.findIndex((t) => t.id === task.id)
            );

            setTasks(uniqueTasks);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const personalTasks = tasks.filter((task) => !task.projectId);

    const projectTasks = tasks.filter((task) => task.projectId);

    const handleDeleteTask = async (taskId: string) => {
        try {
            await API.delete(`/task/delete/${taskId}`);
            setTasks((prev) => prev.filter((task) => task.id !== taskId));

            toast.success("Task deleted successfully");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete task");
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-white">
                        Tasks
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Manage personal
                        and project tasks
                    </p>
                </div>

                <Link
                    to="/tasks/create"
                    className="h-12 px-5 rounded-2xl bg-purple-600 hover:bg-purple-700 transition text-white flex items-center justify-center gap-2"
                >
                    <Plus size={18} />

                    New Task
                </Link>
            </div>

            {loading ? (
                <div className="h-[60vh] flex items-center justify-center">
                    <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="space-y-14">
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-semibold text-white">
                                    Personal
                                    Tasks
                                </h2>

                                <p className="text-zinc-400 mt-2">
                                    Tasks
                                    created
                                    for
                                    yourself
                                </p>
                            </div>

                            <span className="px-4 py-2 rounded-full bg-zinc-800 text-zinc-300 text-sm">
                                {
                                    personalTasks.length
                                }{" "}
                                tasks
                            </span>
                        </div>

                        {personalTasks.length ===
                            0 ? (
                            <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-10 text-center">
                                <h2 className="text-2xl font-semibold text-white">
                                    No Personal
                                    Tasks
                                </h2>

                                <p className="text-zinc-400 mt-3">
                                    Create your
                                    first
                                    personal
                                    task
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {personalTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs">
                                                {task.priority}
                                            </span>

                                            <span className="text-sm text-zinc-400">
                                                {task.status}
                                            </span>
                                        </div>

                                        <h2 className="text-2xl font-semibold text-white mt-6">
                                            {task.title}
                                        </h2>

                                        <p className="text-zinc-400 text-sm mt-3 line-clamp-3">
                                            {task.description}
                                        </p>

                                        <div className="mt-8 pt-5 border-t border-zinc-800">
                                            <p className="text-zinc-500 text-sm">
                                                Due
                                                Date
                                            </p>

                                            <p className="text-white mt-2">
                                                {task.dueDate
                                                    ? new Date(task.dueDate).toLocaleDateString()
                                                    : "N/A"}
                                            </p>
                                        </div>

                                        <div className="mt-6">
                                            <button
                                                onClick={() => handleDeleteTask(task.id)}
                                                className="cursor-pointer w-full h-11 rounded-2xl bg-red-600 hover:bg-red-700 transition text-white"
                                            >
                                                Delete
                                                Task
                                            </button>
                                        </div>
                                    </div>
                                )
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-semibold text-white">
                                    Project
                                    Tasks
                                </h2>

                                <p className="text-zinc-400 mt-2">
                                    Tasks
                                    associated
                                    with
                                    projects
                                </p>
                            </div>

                            <span className="px-4 py-2 rounded-full bg-zinc-800 text-zinc-300 text-sm">
                                {
                                    projectTasks.length
                                }{" "}
                                tasks
                            </span>
                        </div>

                        {projectTasks.length ===
                            0 ? (
                            <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-10 text-center">
                                <h2 className="text-2xl font-semibold text-white">
                                    No Project
                                    Tasks
                                </h2>

                                <p className="text-zinc-400 mt-3">
                                    Create your
                                    first
                                    project
                                    task
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {projectTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs">
                                                {task.priority}
                                            </span>

                                            <span className="text-sm text-zinc-400">
                                                {task.status}
                                            </span>
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
                                                        {task.project?.title}
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

                                            {task.assignedUser && (
                                                <div className="pt-4 border-t border-zinc-800">
                                                    <p className="text-zinc-500 text-sm">
                                                        Assigned
                                                        To
                                                    </p>

                                                    <p className="text-white font-medium mt-2">
                                                        {task.assignedUser.name}
                                                    </p>

                                                    <p className="text-zinc-400 text-sm mt-1">
                                                        {task.assignedUser.email}
                                                    </p>
                                                </div>
                                            )}

                                            <button
                                                onClick={() => handleDeleteTask(task.id)}
                                                className="cursor-pointer w-full h-11 rounded-2xl bg-red-600 hover:bg-red-700 transition text-white"
                                            >
                                                Delete
                                                Task
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default Tasks;