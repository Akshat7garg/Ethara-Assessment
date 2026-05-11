import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import CreateProject from "../pages/projects/CreateProject";
import Projects from "../pages/projects/Projects";
import Tasks from "../pages/task/Tasks";
import Members from "../pages/member/Members";
import CreateTask from "../pages/task/CreateTask";
import SingleProject from "../pages/projects/SingleProject";
import MemberDashboard from "../pages/dashboard/MemberDashboard";
import MemberProjects from "../pages/member/MemberProject";
import MemberSingleProject from "../pages/member/MemberSingleProject";
import MemberTasks from "../pages/member/MemberTasks";
import MemberCreateTask from "../pages/member/MemberCreateTask";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>}
                />
                <Route
                    path="/projects"
                    element={
                        <ProtectedRoute>
                            <Projects />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/projects/create"
                    element={
                        <ProtectedRoute>
                            <CreateProject />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
                            <Tasks />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/members"
                    element={
                        <ProtectedRoute>
                            <Members />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tasks/create"
                    element={
                        <ProtectedRoute>
                            <CreateTask />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/projects/:projectId"
                    element={
                        <ProtectedRoute>
                            <SingleProject />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/member-dashboard"
                    element={
                        <ProtectedRoute>
                            <MemberDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/member/projects"
                    element={
                        <ProtectedRoute>
                            <MemberProjects />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/member/projects/:projectId"
                    element={
                        <ProtectedRoute>
                            <MemberSingleProject />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/member/tasks"
                    element={
                        <ProtectedRoute>
                            <MemberTasks />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/member/tasks/create"
                    element={
                        <ProtectedRoute>
                            <MemberCreateTask />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;