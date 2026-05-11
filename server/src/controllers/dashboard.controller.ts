import prisma from "../config/prisma.js";
import { TaskStatus } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getDashboardSummary = asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    const role = req.user?.role;

    if (!userId || !role) {
        throw new ApiError(401, "Unauthorized request");
    }
    
    if (role === "ADMIN") {
        const [
            totalProjects,
            totalTasks,
            completedTasks,
            overdueTasks,
            totalMembers
        ] = await Promise.all([
            prisma.project.count({
                where: {
                    createdBy: userId
                }
            }),

            prisma.task.count({
                where: {
                    creator: {
                        id: userId
                    }
                }
            }),

            prisma.task.count({
                where: {
                    createdBy: userId,
                    status: TaskStatus.COMPLETED
                }
            }),

            prisma.task.count({
                where: {
                    createdBy: userId,
                    dueDate: {
                        lt: new Date()
                    },

                    status: {
                        not: TaskStatus.COMPLETED
                    }
                }
            }),

            prisma.projectMember.count()
        ]);

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    totalProjects,
                    totalTasks,
                    completedTasks,
                    overdueTasks,
                    totalMembers
                },
                "Admin dashboard fetched successfully!!!"
            )
        );
    }
    
    const [
        myTasks,
        completedTasks,
        overdueTasks,
        myProjects,
        personalTasks
    ] = await Promise.all([
        prisma.task.count({
            where: {
                assignedTo: userId
            }
        }),

        prisma.task.count({
            where: {
                assignedTo: userId,
                status: TaskStatus.COMPLETED
            }
        }),

        prisma.task.count({
            where: {
                assignedTo: userId,

                dueDate: {
                    lt: new Date()
                },

                status: {
                    not: TaskStatus.COMPLETED
                }
            }
        }),

        prisma.projectMember.count({
            where: {
                userId
            }
        }),

        prisma.task.count({
            where: {
                assignedTo: userId,
                projectId: null
            }
        })
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                myTasks,
                completedTasks,
                overdueTasks,
                myProjects,
                personalTasks
            },
            "Member dashboard fetched successfully!!!"
        )
    );
});

export {
    getDashboardSummary
};