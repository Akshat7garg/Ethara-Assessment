import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

const CreateTask = () => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState<any[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [dueDate, setDueDate] = useState("");
    const [projectId, setProjectId] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const [verifiedUser, setVerifiedUser] = useState<any>(null);
    const [isPersonalTask, setIsPersonalTask] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchProjects = async () => {
        try {
            const response = await API.get("/project/myProjects");
            setProjects(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const verifyUser = async () => {
        if (!memberEmail.trim()) {
            return toast.error("Enter member email");
        }

        try {
            const response = await API.post("/user/verifyUser", {
                email: memberEmail
            });
            setVerifiedUser(response.data.data);

            toast.success("User verified");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "User not found");
            setVerifiedUser(null);
        }
    };

    const addMemberToProject =
        async () => {
            if (!projectId) {
                return toast.error("Select project first");
            }

            if (!verifiedUser) {
                return toast.error("Verify user first");
            }

            try {
                await API.post("/project/addMember", {
                    projectId,
                    userId: verifiedUser.id
                });

                toast.success("Member added to project");
            } catch (error: any) {
                toast.error(error.response?.data?.message || "Failed to add member");
            }
        };

    const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim()) {
            return toast.error("Task title is required");
        }

        try {
            setLoading(true);

            const payload: any = {
                title,
                description,
                priority,
                dueDate
            };

            if (!isPersonalTask) {
                if (!projectId) {
                    return toast.error("Select project");
                }

                if (!verifiedUser) {
                    return toast.error("Verify member first");
                }

                payload.projectId = projectId;
                payload.assignedTo = verifiedUser.id;
            }

            await API.post("/task/createTask", payload);
            toast.success("Task created successfully");

            navigate("/tasks");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to create task");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-white">
                        Create Task
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Create personal
                        or project tasks
                    </p>
                </div>

                <form
                    onSubmit={handleCreateTask}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsPersonalTask(true)}
                            className={`h-12 px-5 rounded-2xl transition ${isPersonalTask
                                ? "bg-purple-600 text-white"
                                : "bg-zinc-800 text-zinc-300"
                                }`}
                        >
                            Personal
                            Task
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsPersonalTask(false)}
                            className={`h-12 px-5 rounded-2xl transition ${!isPersonalTask
                                ? "bg-purple-600 text-white"
                                : "bg-zinc-800 text-zinc-300"
                                }`}
                        >
                            Project Task
                        </button>
                    </div>

                    <div>
                        <label className="text-white block mb-3">
                            Task Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full h-14 px-5 rounded-2xl bg-[#0f172a] border border-zinc-800 text-white outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-white block mb-3">
                            Description
                        </label>

                        <textarea
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-5 rounded-2xl bg-[#0f172a] border border-zinc-800 text-white outline-none resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-white block mb-3">
                                Priority
                            </label>

                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full h-14 px-5 rounded-2xl bg-[#0f172a] border border-zinc-800 text-white outline-none"
                            >
                                <option value="LOW">
                                    LOW
                                </option>

                                <option value="MEDIUM">
                                    MEDIUM
                                </option>

                                <option value="HIGH">
                                    HIGH
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="text-white block mb-3">
                                Due Date
                            </label>

                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full h-14 px-5 rounded-2xl bg-[#0f172a] border border-zinc-800 text-white outline-none"
                            />
                        </div>
                    </div>

                    {!isPersonalTask && (
                        <>
                            <div>
                                <label className="text-white block mb-3">
                                    Select
                                    Project
                                </label>

                                <select
                                    value={projectId}
                                    onChange={(e) => setProjectId(e.target.value)}
                                    className="w-full h-14 px-5 rounded-2xl bg-[#0f172a] border border-zinc-800 text-white outline-none"
                                >
                                    <option value="">
                                        Select
                                        Project
                                    </option>

                                    {projects.map((project) => (
                                        <option
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.title}
                                        </option>
                                    )
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className="text-white block mb-3">
                                    Member
                                    Email
                                </label>

                                <div className="flex gap-3">
                                    <input
                                        type="email"
                                        value={memberEmail}
                                        onChange={(e) => setMemberEmail(e.target.value)}
                                        className="flex-1 h-14 px-5 rounded-2xl bg-[#0f172a] border border-zinc-800 text-white outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={verifyUser}
                                        className="h-14 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white"
                                    >
                                        Verify
                                    </button>
                                </div>
                            </div>

                            {verifiedUser && (
                                <div className="bg-[#0f172a] border border-zinc-800 rounded-2xl p-5">
                                    <p className="text-white font-medium">
                                        {verifiedUser.name}
                                    </p>

                                    <p className="text-zinc-400 text-sm mt-1">
                                        {verifiedUser.email}
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    <button
                        type="button"
                        onClick={addMemberToProject}
                        className="mt-4 mr-2 h-11 px-5 rounded-xl bg-green-600 hover:bg-green-700 transition text-white"
                    >
                        Add To Project
                    </button>

                    <button className="h-14 px-8 rounded-2xl bg-purple-600 hover:bg-purple-700 transition text-white font-semibold">
                        {loading
                            ? "Creating..."
                            : "Create Task"}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default CreateTask;