import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

const Projects = () => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const response = await API.get("/project/myProjects");
            setProjects(response.data.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDeleteProject = async (projectId: string) => {
        try {
            await API.delete(`/project/delete/${projectId}`);

            setProjects((prev) => prev.filter((project) => project.id !== projectId));
            toast.success("Project deleted successfully");

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete project");
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-white">
                        Projects
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Manage all your
                        projects
                    </p>
                </div>

                <button
                    onClick={() => navigate("/projects/create")}
                    className="h-12 px-5 rounded-2xl bg-purple-600 hover:bg-purple-700 transition text-white flex items-center justify-center gap-2"
                >
                    <Plus size={18} />

                    Create Project
                </button>
            </div>

            {loading ? (
                <div className="h-[60vh] flex items-center justify-center">
                    <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : projects.length ===
                0 ? (
                <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-10 text-center">
                    <h2 className="text-2xl font-semibold text-white">
                        No Projects
                        Found
                    </h2>

                    <p className="text-zinc-400 mt-3">
                        Create your
                        first project
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-semibold text-white">
                                        {project.title}
                                    </h2>

                                    <p className="text-zinc-400 text-sm mt-3 line-clamp-3">
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 pt-5 border-t border-zinc-800 flex items-center justify-between">
                                <div>
                                    <p className="text-zinc-500 text-sm">
                                        Members
                                    </p>

                                    <p className="text-white font-semibold mt-2">
                                        {project.members?.length}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-zinc-500 text-sm">
                                        Project
                                    </p>

                                    <p className="text-white font-semibold mt-2">
                                        Active
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <button
                                    onClick={() => navigate(`/projects/${project.id}`)}
                                    className="h-11 rounded-2xl bg-zinc-800 hover:bg-zinc-700 transition text-white"
                                >
                                    View
                                </button>

                                <button
                                    onClick={() => handleDeleteProject(project.id)}
                                    className="cursor-pointer h-11 rounded-2xl bg-red-600 hover:bg-red-700 transition text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
};

export default Projects;