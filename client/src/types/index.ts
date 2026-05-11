export interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "MEMBER";
}

export interface Project {
    id: string;
    title: string;
    description?: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string;

    status: "TODO" | "IN_PROGRESS" | "COMPLETED" | "OVERDUE";

    priority: "LOW" | "MEDIUM" | "HIGH";

    dueDate?: string;
    assignedTo: string;
    projectId?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}