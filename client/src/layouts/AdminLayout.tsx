import AdminSidebar from "../components/layout/AdminSidebar";
import { Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }: { children: React.ReactNode; }) => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#050816] flex">
            <AdminSidebar />

            <div className="flex-1 min-w-0">
                <div className="h-20 border-b border-zinc-800 bg-[#0b1120] px-5 lg:px-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Dashboard
                        </h1>

                        <p className="text-zinc-400 text-sm mt-1">
                            Overview of your
                            projects and tasks
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/projects/create"
                            className="hidden md:flex items-center gap-2 h-12 px-5 rounded-2xl bg-purple-600 hover:bg-purple-700 transition text-white font-medium"
                        >
                            <Plus size={18} />

                            Projects
                        </Link>

                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                                {user?.name
                                    ?.charAt(0)
                                    ?.toUpperCase()}
                            </div>

                            <div className="hidden md:block">
                                <p className="text-white font-medium">
                                    {user?.name}
                                </p>

                                <p className="text-zinc-400 text-sm">
                                    {user?.role}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-5 lg:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;