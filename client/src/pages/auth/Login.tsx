import { useEffect, useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();

    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (token && user?.role === "ADMIN") {
            navigate("/dashboard");
        }

        if (token && user?.role === "MEMBER") {
            navigate("/member-dashboard");
        }
    }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password) {
            return toast.error(
                "All fields are required"
            );
        }

        if (!emailRegex.test(email)) {
            return toast.error(
                "Invalid email format"
            );
        }

        try {
            setLoading(true);

            const response = await API.post(
                "/user/login",
                { email, password }
            );

            const data = response.data.data;

            login(data);

            toast.success("Login successful");

            const user = response.data.data.user;

            if (user.role === "ADMIN") {
                navigate("/dashboard");
            } else {
                navigate("/member-dashboard");
            }

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#0f172a] border border-zinc-800 rounded-3xl p-8">
                <h1 className="text-4xl font-bold text-white">
                    Welcome Back
                </h1>

                <p className="text-zinc-400 mt-3">
                    Login to continue
                </p>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5 mt-10"
                >
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

                    <button className="w-full h-14 rounded-2xl bg-purple-600 text-white font-semibold">
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>
                </form>

                <div className="mt-8 space-y-3 text-center">
                    <Link
                        to="/forgot-password"
                        className="text-purple-400 text-sm"
                    >
                        Forgot Password?
                    </Link>

                    <p className="text-zinc-400">
                        Don’t have an
                        account?{" "}
                        <Link
                            to="/register"
                            className="text-purple-400"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;