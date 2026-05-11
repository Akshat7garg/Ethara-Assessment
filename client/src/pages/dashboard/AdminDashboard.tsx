import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../api/axios";
import SummaryCards from "../../components/dashboard/SummaryCards";
import TaskChart from "../../components/dashboard/TaskChart";
import RecentProjects from "../../components/dashboard/RecentProjects";

const AdminDashboard = () => {
    const [summary, setSummary] = useState<any>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {
        try {
            const [summaryRes, projectsRes] = await Promise.all([
                API.get("/dashboard/summary"),
                API.get("/project/myProjects")
            ]);

            const projects = projectsRes.data.data;

            const detailedProjects = await Promise.all(projects.map((project: any) =>
                API.get(`/project/${project.id}`)
            ));

            const fullProjects = detailedProjects.map((item) =>
                item.data.data
            );

            const allTasks = fullProjects.flatMap((project: any) =>
                project.tasks || []
            );

            setSummary(summaryRes.data.data);
            setProjects(fullProjects);
            setTasks(allTasks);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <AdminLayout>
                <div className="h-[70vh] flex items-center justify-center">
                    <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </AdminLayout>
        );
    }

    const members = projects.flatMap((project) => project.members || []);

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold text-white">
                        Dashboard
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Overview of your
                        projects and tasks
                    </p>
                </div>

                {summary && (
                    <SummaryCards
                        summary={summary}
                    />
                )}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <TaskChart
                        tasks={tasks}
                    />

                    <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-semibold text-white">
                                Team Members
                            </h2>

                            <p className="text-zinc-400 text-sm">
                                {members.length}{" "}
                                members
                            </p>
                        </div>

                        <div className="space-y-5">
                            {members.slice(0, 6).map((member) => (
                                <div
                                    key={member.user.id}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                                            {member.user.name
                                                ?.charAt(0)
                                                ?.toUpperCase()}
                                        </div>

                                        <div>
                                            <p className="text-white font-medium">
                                                {member.user.name}
                                            </p>

                                            <p className="text-zinc-400 text-sm">
                                                {member.user.email}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs">
                                        {member.user.role}
                                    </span>
                                </div>
                            )
                            )}
                        </div>
                    </div>
                </div>

                <RecentProjects projects={projects} />
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;