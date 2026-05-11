import {
    useEffect,
    useState
} from "react";
import toast from "react-hot-toast";
import API from "../../api/axios";
import MemberLayout from "../../layouts/MemberLayout";

const MemberDashboard = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [tasksResponse, projectsResponse] = await Promise.all([
                API.get("/task/myTasks"),
                API.get("/project/myProjects")
            ]);

            setTasks(tasksResponse.data.data);
            setProjects(projectsResponse.data.data);

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch dashboard");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const completed = tasks.filter((task) => task.status === "COMPLETED").length;
    const inProgress = tasks.filter((task) => task.status === "IN_PROGRESS").length;
    const todo = tasks.filter((task) => task.status === "TODO").length;

    return (
        <MemberLayout>
            {loading ? (
                <div className="h-[70vh] flex items-center justify-center">
                    <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="space-y-10">
                    <div>
                        <h1 className="text-4xl font-bold text-white">
                            Dashboard
                        </h1>

                        <p className="text-zinc-400 mt-2">
                            Overview of
                            your tasks and
                            projects
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6">
                            <p className="text-zinc-400">
                                Total Tasks
                            </p>

                            <h2 className="text-5xl font-bold text-white mt-5">
                                {tasks.length}
                            </h2>
                        </div>

                        <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6">
                            <p className="text-zinc-400">
                                Todo
                            </p>

                            <h2 className="text-5xl font-bold text-yellow-500 mt-5">
                                {todo}
                            </h2>
                        </div>

                        <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6">
                            <p className="text-zinc-400">
                                In Progress
                            </p>

                            <h2 className="text-5xl font-bold text-blue-500 mt-5">
                                {inProgress}
                            </h2>
                        </div>

                        <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6">
                            <p className="text-zinc-400">
                                Completed
                            </p>

                            <h2 className="text-5xl font-bold text-green-500 mt-5">
                                {completed}
                            </h2>
                        </div>
                    </div>

                    <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-semibold text-white">
                                My Projects
                            </h2>

                            <span className="text-zinc-400">
                                {projects.length}{" "}
                                projects
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-[#111827] border border-zinc-800 rounded-2xl p-5"
                                >
                                    <h3 className="text-xl font-semibold text-white">
                                        {project.title}
                                    </h3>

                                    <p className="text-zinc-400 text-sm mt-3 line-clamp-3">
                                        {project.description}
                                    </p>
                                </div>
                            )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </MemberLayout>
    );
};

export default MemberDashboard;