import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import MemberLayout from "../../layouts/MemberLayout";

const MemberProjects = () => {
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

    return (
        <MemberLayout>
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-white">
                    My Projects
                </h1>

                <p className="text-zinc-400 mt-2">
                    Projects assigned
                    to you
                </p>
            </div>

            {loading ? (
                <div className="h-[60vh] flex items-center justify-center">
                    <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : projects.length ===
                0 ? (
                <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-10 text-center">
                    <h2 className="text-2xl font-semibold text-white">
                        No Projects
                    </h2>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6"
                        >
                            <h2 className="text-2xl font-semibold text-white">
                                {project.title}
                            </h2>

                            <p className="text-zinc-400 text-sm mt-4 line-clamp-3">
                                {project.description}
                            </p>

                            <button
                                onClick={() => navigate(`/member/projects/${project.id}`)}
                                className="mt-8 h-11 w-full rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white"
                            >
                                View Project
                            </button>
                        </div>
                    )
                    )}
                </div>
            )}
        </MemberLayout>
    );
};

export default MemberProjects;