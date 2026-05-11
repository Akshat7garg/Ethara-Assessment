import { useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

const CreateProject = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim()) {
            return toast.error("Project title is required");
        }

        try {
            setLoading(true);

            await API.post("/project/createProject", {
                title,
                description
            }
            );

            toast.success("Project created successfully");
            setTitle("");
            setDescription("");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to create project");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-3xl">
                <h1 className="text-4xl font-bold text-white">
                    Create Project
                </h1>

                <p className="text-zinc-400 mt-2">
                    Create and manage
                    your projects
                </p>

                <form
                    onSubmit={
                        handleCreateProject
                    }
                    className="mt-10 space-y-6"
                >
                    <div>
                        <label className="text-white block mb-3">
                            Project Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter project title"
                            className="w-full h-14 px-5 rounded-2xl bg-[#0f172a] border border-zinc-800 text-white outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-white block mb-3">
                            Description
                        </label>

                        <textarea
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Project description"
                            className="w-full p-5 rounded-2xl bg-[#0f172a] border border-zinc-800 text-white outline-none resize-none"
                        />
                    </div>

                    <button className="h-14 px-8 rounded-2xl bg-purple-600 hover:bg-purple-700 transition text-white font-semibold">
                        {loading
                            ? "Creating..."
                            : "Create Project"}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default CreateProject;