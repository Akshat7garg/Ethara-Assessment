import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Search, UserPlus } from "lucide-react";
import API from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

const Members = () => {
    const [members, setMembers] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedProject, setSelectedProject] = useState("");
    const [email, setEmail] = useState("");
    const [verifiedUser, setVerifiedUser] = useState<any>(null);

    const fetchMembers = async () => {
        try {
            const response = await API.get("/project/myProjects");
            const projectsData = response.data.data;
            setProjects(projectsData);

            const detailedProjects = await Promise.all(projectsData.map((project: any) =>
                API.get(`/project/${project.id}`)
            ));

            const fullProjects = detailedProjects.map((item) => item.data.data);

            const extractedMembers = fullProjects.flatMap((project: any) => project.members.map((member: any) => ({
                ...member,

                projectTitle: project.title,

                tasks:
                    project.tasks.filter((task: any) =>
                        task.assignedTo === member.user.id
                    )
            })));

            const uniqueMembers = extractedMembers.filter(
                (
                    member,
                    index,
                    self
                ) =>
                    index === self.findIndex((m) =>
                        m.user.id === member.user.id
                    )
            );

            setMembers(uniqueMembers);

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch members");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const verifyUser = async () => {
        if (!email.trim()) {
            return toast.error("Enter email");
        }

        try {
            const response = await API.post("/user/verifyUser", { email });

            setVerifiedUser(response.data.data);
            toast.success("User verified");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "User not found");
        }
    };

    const handleAddMember = async () => {
        if (!selectedProject) {
            return toast.error("Select project");
        }

        if (!verifiedUser) {
            return toast.error("Verify user first");
        }

        try {
            await API.post("/project/addMember", {
                projectId: selectedProject,
                userId: verifiedUser.id
            }
            );

            toast.success("Member added successfully");
            setEmail("");
            setVerifiedUser(null);
            fetchMembers();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to add member");
        }
    };

    const filteredMembers = members.filter((member) => member.user.name.toLowerCase().includes(search.toLowerCase()) ||
        member.user.email.toLowerCase().includes(search.toLowerCase()));

    return (
        <AdminLayout>
            <div className="space-y-10">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white">
                            Members
                        </h1>

                        <p className="text-zinc-400 mt-2">
                            Manage your
                            team members
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative">
                            <Search
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                            />

                            <input
                                type="text"
                                placeholder="Search member"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full md:w-65 h-12 pl-11 pr-4 rounded-2xl bg-[#0f172a] border border-zinc-800 text-white outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <UserPlus
                            size={22}
                            className="text-purple-500"
                        />

                        <h2 className="text-2xl font-semibold text-white">
                            Add Member
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <select
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                            className="h-12 px-4 rounded-2xl bg-[#111827] border border-zinc-800 text-white outline-none"
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

                        <input
                            type="email"
                            placeholder="Member email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 px-4 rounded-2xl bg-[#111827] border border-zinc-800 text-white outline-none"
                        />

                        <button
                            onClick={verifyUser}
                            className="h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white"
                        >
                            Verify User
                        </button>

                        <button
                            onClick={handleAddMember}
                            className="h-12 rounded-2xl bg-purple-600 hover:bg-purple-700 transition text-white"
                        >
                            Add Member
                        </button>
                    </div>

                    {verifiedUser && (
                        <div className="mt-6 bg-[#111827] border border-zinc-800 rounded-2xl p-5">
                            <p className="text-white font-medium">
                                {verifiedUser.name}
                            </p>

                            <p className="text-zinc-400 text-sm mt-1">
                                {verifiedUser.email}
                            </p>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="h-[50vh] flex items-center justify-center">
                        <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredMembers.length ===
                    0 ? (
                    <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-10 text-center">
                        <h2 className="text-2xl font-semibold text-white">
                            No Members
                            Found
                        </h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredMembers.map((member) => (
                            <div
                                key={member.user.id}
                                className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-semibold">
                                        {member.user.name
                                            ?.charAt(0)
                                            ?.toUpperCase()}
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-semibold text-white">
                                            {member.user.name}
                                        </h2>

                                        <p className="text-zinc-400 text-sm mt-1">
                                            {member.user.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-zinc-500 text-sm">
                                            Role
                                        </span>

                                        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs">
                                            {member.user.role}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-zinc-500 text-sm">
                                            Project
                                        </span>

                                        <span className="text-white">
                                            {member.projectTitle}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-zinc-500 text-sm">
                                            Tasks
                                        </span>

                                        <span className="text-white font-semibold">
                                            {member.tasks.length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Members;