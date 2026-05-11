import {
    NavLink,
    useNavigate
} from "react-router-dom";
import {
    LayoutDashboard,
    ClipboardList,
    FolderKanban,
    LogOut
} from "lucide-react";

interface Props {
    open: boolean;

    setOpen: (
        value: boolean
    ) => void;
}

const MemberSidebar = ({ open, setOpen }: Props) => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = () => {
        localStorage.clear();

        navigate("/");
    };

    const navClass = ({ isActive }: any) =>
        `flex items-center gap-3 h-12 px-4 rounded-2xl transition ${isActive
            ? "bg-blue-600 text-white"
            : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
        }`;

    return (
        <>
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition ${open
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                    }`}
            ></div>

            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-70 bg-[#0b1120] border-r border-zinc-800 p-6 flex flex-col transition-transform duration-300 lg:translate-x-0 ${open
                    ? "translate-x-0"
                    : "-translate-x-full"
                    }`}
            >
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        TaskFlow
                    </h1>

                    <p className="text-zinc-400 text-sm mt-2">
                        {user?.name}
                    </p>

                    <p className="text-blue-400 text-xs mt-1">
                        MEMBER
                    </p>
                </div>

                <nav className="mt-10 flex flex-col gap-3">
                    <NavLink
                        to="/member-dashboard"
                        className={navClass}
                        onClick={() => setOpen(false)
                        }
                    >
                        <LayoutDashboard
                            size={20}
                        />

                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/member/tasks"
                        className={navClass}
                        onClick={() => setOpen(false)}
                    >
                        <ClipboardList
                            size={20}
                        />

                        My Tasks
                    </NavLink>

                    <NavLink
                        to="/member/projects"
                        className={navClass}
                        onClick={() => setOpen(false)}
                    >
                        <FolderKanban
                            size={20}
                        />

                        My Projects
                    </NavLink>
                </nav>

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
                        onClick={handleLogout}
                        className="w-full h-12 rounded-2xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition flex items-center justify-center gap-3"
                    >
                        <LogOut size={18} />

                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default MemberSidebar;