import {
    useState
} from "react";
import { Menu } from "lucide-react";
import MemberSidebar from "../components/layout/MemberSidebar";

interface Props {
    children: React.ReactNode;
}

const MemberLayout = ({ children }: Props) => {
    const [open, setOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <div className="min-h-screen bg-[#020617]">
            <MemberSidebar
                open={open}
                setOpen={setOpen}
            />

            <div className="lg:ml-70">
                <header className="h-20 border-b border-zinc-800 bg-[#020617]/90 backdrop-blur-xl px-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => setOpen(true)}
                            className="lg:hidden text-white"
                        >
                            <Menu size={28} />
                        </button>

                        <h2 className="ml-4 text-white text-xl font-semibold">
                            Member
                            Workspace
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
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
                </header>

                <main className="p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MemberLayout;