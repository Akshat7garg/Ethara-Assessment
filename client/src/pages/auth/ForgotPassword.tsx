import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/axios";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !newPassword || !confirmPassword) {
            return toast.error(
                "All fields are required"
            );
        }

        if (!emailRegex.test(email)) {
            return toast.error(
                "Invalid email format"
            );
        }

        if (newPassword.length < 6) {
            return toast.error(
                "Password must be at least 6 characters"
            );
        }

        if (newPassword !== confirmPassword) {
            return toast.error(
                "Passwords do not match"
            );
        }

        try {
            setLoading(true);

            await API.put(
                "/user/changePassword",
                { email, newPassword }
            );

            toast.success(
                "Password updated successfully"
            );

            navigate("/");

        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Password reset failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#0f172a] border border-zinc-800 rounded-3xl p-8">
                <h1 className="text-4xl font-bold text-white">
                    Forgot Password
                </h1>

                <p className="text-zinc-400 mt-3">
                    Reset your password
                </p>

                <form
                    onSubmit={
                        handleResetPassword
                    }
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
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full h-14 px-4 rounded-2xl bg-[#111827] border border-zinc-700 text-white outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-14 px-4 rounded-2xl bg-[#111827] border border-zinc-700 text-white outline-none"
                    />

                    <button className="w-full h-14 rounded-2xl bg-purple-600 text-white font-semibold">
                        {loading
                            ? "Updating..."
                            : "Update Password"}
                    </button>
                </form>

                <p className="text-zinc-400 text-center mt-8">
                    Back to{" "}
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

export default ForgotPassword;