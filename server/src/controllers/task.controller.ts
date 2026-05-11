import prisma from "../config/prisma.js";
import { TaskStatus } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTask = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        priority,
        dueDate,
        assignedTo,
        projectId
    } = req.body;

    const userId = req.user?.userId;
    const role = req.user?.role;

    if (!userId || !role) {
        throw new ApiError(401, "Unauthorized request!!!");
    }

    if (
        typeof title !== "string" ||
        title.trim() === ""
    ) {
        throw new ApiError(400, "Task title is required!!!");
    }

    if (!projectId) {
        const personalTask =
            await prisma.task.create({
                data: {
                    title,
                    description,
                    priority,
                    dueDate: dueDate
                        ? new Date(dueDate)
                        : null,

                    assignedTo: userId,
                    createdBy: userId
                }
            });

        return res.status(201).json(
            new ApiResponse(
                201,
                personalTask,
                "Personal task created successfully!!!"
            )
        );
    }

    if (role !== "ADMIN") {
        throw new ApiError(
            403,
            "Only admins can create project tasks!!!"
        );
    }

    if (
        typeof assignedTo !== "string" ||
        assignedTo.trim() === ""
    ) {
        throw new ApiError(
            400,
            "Assigned user is required"
        );
    }

    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        }
    });

    if (!project) {
        throw new ApiError(404, "Project not found!!!");
    }

    const projectMember =
        await prisma.projectMember.findFirst({
            where: {
                projectId,
                userId: assignedTo
            }
        });

    if (!projectMember) {
        throw new ApiError(
            400,
            "User does not belong to project!!!"
        );
    }

    const projectTask = await prisma.task.create({
        data: {
            title,
            description,
            priority,

            dueDate: dueDate
                ? new Date(dueDate)
                : null,

            assignedTo,
            createdBy: userId,
            projectId
        }
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            projectTask,
            "Project task created successfully!!!"
        )
    );
});

const getMyTasks = asyncHandler(async (req, res) => {
    const userId = req.user?.userId;

    if (!userId) {
        throw new ApiError(401, "Unauthorized request!!!");
    }

    const tasks = await prisma.task.findMany({
        where: {
            assignedTo: userId
        },

        include: {
            project: {
                select: {
                    id: true,
                    title: true
                }
            },

            creator: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        },

        orderBy: {
            createdAt: "desc"
        }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            tasks,
            "Tasks fetched successfully!!!"
        )
    );
});

const updateTaskStatus = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId as string;

    const { status } = req.body;

    const userId = req.user?.userId;

    if (!userId) {
        throw new ApiError(401, "Unauthorized request!!!");
    }

    if (
        typeof status !== "string" ||
        status.trim() === ""
    ) {
        throw new ApiError(400, "Task status is required!!!");
    }

    const validStatuses = Object.values(TaskStatus);

    if (!validStatuses.includes(status as TaskStatus)) {
        throw new ApiError(400, "Invalid task status!!!");
    }

    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        }
    });

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    if (task.assignedTo !== userId) {
        throw new ApiError(
            403,
            "You can only update your own tasks!!!"
        );
    }

    const updatedTask = await prisma.task.update({
        where: {
            id: taskId
        },

        data: {
            status: status as TaskStatus
        }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedTask,
            "Task status updated successfully!!!"
        )
    );
});

const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId as string;

    const userId = req.user?.userId;

    const role = req.user?.role;

    const task =
        await prisma.task.findUnique(
            {
                where: {
                    id: taskId
                }
            }
        );

    if (!task) {
        throw new ApiError(
            404,
            "Task not found!!!"
        );
    }

    const canDelete =
        task.createdBy ===
        userId ||
        task.assignedTo ===
        userId ||
        role === "ADMIN";

    if (!canDelete) {
        throw new ApiError(
            403,
            "Unauthorized access!!!"
        );
    }

    await prisma.task.delete(
        {
            where: {
                id: taskId
            }
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Task deleted successfully!!!"
            )
        );
}
);

export {
    createTask,
    getMyTasks,
    updateTaskStatus,
    deleteTask
};