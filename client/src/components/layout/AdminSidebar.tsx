import { useState } from "react";
import {
    LayoutDashboard,
    FolderKanban,
    ListTodo,
    Users,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
    const { logout, user } = useAuth();

    const [open, setOpen] = useState(false);

    const navClass = ({ isActive }: { isActive: boolean; }) =>
        `flex items-center gap-3 h-12 px-4 rounded-2xl transition ${isActive
            ? "bg-purple-600 text-white"
            : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
        }`;

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="lg:hidden fixed top-5 left-5 z-50 w-11 h-11 rounded-2xl bg-[#0f172a] border border-zinc-800 flex items-center justify-center text-white"
            >
                <Menu size={22} />
            </button>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                />
            )}

            <div
                className={`fixed lg:static top-0 left-0 z-50 w-70 min-h-screen bg-[#0b1120] border-r border-zinc-800 flex flex-col justify-between transition-all duration-300 ${open
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="p-5">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                TaskForge
                            </h1>

                            <p className="text-zinc-400 mt-1">
                                Team Manager
                            </p>
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="lg:hidden text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-2">
                        <NavLink
                            to="/dashboard"
                            className={navClass}
                            onClick={() => setOpen(false)}
                        >
                            <LayoutDashboard
                                size={19}
                            />

                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/projects"
                            className={navClass}
                            onClick={() => setOpen(false)}
                        >
                            <FolderKanban
                                size={19}
                            />

                            Projects
                        </NavLink>

                        <NavLink
                            to="/tasks"
                            className={navClass}
                            onClick={() => setOpen(false)}
                        >
                            <ListTodo
                                size={19}
                            />

                            Tasks
                        </NavLink>

                        <NavLink
                            to="/members"
                            className={navClass}
                            onClick={() => setOpen(false)}
                        >
                            <Users
                                size={19}
                            />

                            Members
                        </NavLink>
                    </div>
                </div>

                <div className="p-5 border-t border-zinc-800">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                            {user?.name
                                ?.charAt(0)
                                ?.toUpperCase()}
                        </div>

                        <div>
                            <p className="text-white font-medium">
                                {user?.name}
                            </p>

                            <p className="text-zinc-400 text-sm">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="w-full h-12 rounded-2xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition flex items-center justify-center gap-3"
                    >
                        <LogOut size={18} />

                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;