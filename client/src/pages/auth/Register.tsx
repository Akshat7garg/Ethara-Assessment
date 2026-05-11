import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [role, setRole] = useState("MEMBER");

    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !password || !confirmPassword) {
            return toast.error("All fields are required");
        }

        if (name.length < 3) {
            return toast.error("Name must be at least 3 characters");
        }

        if (!emailRegex.test(email)) {
            return toast.error("Invalid email format");
        }

        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            setLoading(true);

            await API.post(
                "/user/register",
                {
                    name,
                    email,
                    password,
                    role
                }
            );

            const response = await API.post(
                "/user/login",
                {
                    email,
                    password
                }
            );

            const data = response.data.data;
            login(data);

            toast.success("Account created successfully");
            const user = response.data.data.user;

            if (user.role === "ADMIN") {
                navigate("/dashboard");
            } else {
                navigate("/member-dashboard");
            }

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#0f172a] border border-zinc-800 rounded-3xl p-8">
                <h1 className="text-4xl font-bold text-white">
                    Create Account
                </h1>

                <p className="text-zinc-400 mt-3">
                    Register your account
                </p>

                <form
                    onSubmit={handleRegister}
                    className="space-y-5 mt-10"
                >
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-14 px-4 rounded-2xl bg-[#111827] border border-zinc-700 text-white outline-none"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-14 px-4 rounded-2xl bg-[#111827] border border-zinc-700 text-white outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-14 px-4 rounded-2xl bg-[#111827] border border-zinc-700 text-white outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-14 px-4 rounded-2xl bg-[#111827] border border-zinc-700 text-white outline-none"
                    />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full h-14 px-4 rounded-2xl bg-[#111827] border border-zinc-700 text-white outline-none"
                    >
                        <option value="MEMBER">
                            Member
                        </option>

                        <option value="ADMIN">
                            Admin
                        </option>
                    </select>

                    <button className="w-full h-14 rounded-2xl bg-purple-600 text-white font-semibold">
                        {loading
                            ? "Creating..."
                            : "Create Account"}
                    </button>
                </form>

                <p className="text-zinc-400 text-center mt-8">
                    Already have an
                    account?{" "}
                    <Link
                        to="/"
                        className="text-purple-400"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;