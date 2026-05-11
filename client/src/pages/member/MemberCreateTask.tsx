import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import MemberLayout from "../../layouts/MemberLayout";

const MemberCreateTask = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);

            await API.post("/task/createTask", {
                title,
                description,
                priority,
                dueDate
            }
            );

            toast.success("Task created");
            navigate("/member/tasks");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to create task");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MemberLayout>
            <div className="max-w-3xl">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-white">
                        Create
                        Task
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Create your
                        personal
                        task
                    </p>
                </div>

                <form
                    onSubmit={handleCreate}
                    className="space-y-6"
                >
                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full h-14 px-5 rounded-2xl bg-[#0f172a] border border-zinc-800 text-white outline-none"
                    />

                    <textarea
                        rows={6}
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-5 rounded-2xl bg-[#0f172a] border border-zinc-800 text-white outline-none resize-none"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="h-14 px-5 rounded-2xl bg-[#0f172a] border border-zinc-800 text-white outline-none"
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

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="h-14 px-5 rounded-2xl bg-[#0f172a] border border-zinc-800 text-white outline-none"
                        />
                    </div>

                    <button className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white">
                        {loading
                            ? "Creating..."
                            : "Create Task"}
                    </button>
                </form>
            </div>
        </MemberLayout>
    );
};

export default MemberCreateTask;