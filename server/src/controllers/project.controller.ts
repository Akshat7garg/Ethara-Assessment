import prisma from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProject = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (
        typeof title !== "string" ||
        title.trim() === ""
    ) {
        throw new ApiError(400, "Project title is required!!!");
    }

    const userId = req.user?.userId;

    if (!userId) {
        throw new ApiError(401, "Unauthorized request!!!");
    }

    const newProject = await prisma.project.create({
        data: {
            title,
            description,
            createdBy: userId
        }
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            newProject,
            "Project created successfully!!!"
        )
    );
});

const addMemberToProject = asyncHandler(async (req, res) => {
    const { projectId, userId } = req.body;

    if (
        [projectId, userId].some(
            (field) =>
                typeof field !== "string" ||
                field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required!!!");
    }

    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        }
    });

    if (!project) {
        throw new ApiError(404, "Project not found!!!");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new ApiError(404, "User not found!!!");
    }

    const existingMember =
        await prisma.projectMember.findFirst({
            where: {
                projectId,
                userId
            }
        });

    if (existingMember) {
        throw new ApiError(
            409,
            "User already exists in project!!!"
        );
    }

    const newMember =
        await prisma.projectMember.create({
            data: {
                projectId,
                userId
            }
        });

    return res.status(201).json(
        new ApiResponse(
            201,
            newMember,
            "Member added successfully!!!"
        )
    );
});

const getMyProjects = asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    const role = req.user?.role;

    if (!userId || !role) {
        throw new ApiError(401, "Unauthorized request!!!");
    }

    const projectInclude = {
        members: {
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                }
            }
        }
    };

    let projects = [];

    if (role === "ADMIN") {
        projects = await prisma.project.findMany({
            where: {
                createdBy: userId
            },
            include: projectInclude
        });
    } else {
        const joinedProjects =
            await prisma.projectMember.findMany({
                where: {
                    userId
                },
                include: {
                    project: {
                        include: projectInclude
                    }
                }
            });

        projects = joinedProjects.map(
            (item) => item.project
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            projects,
            "Projects fetched successfully!!!"
        )
    );
});

const getSingleProject = asyncHandler(async (req, res) => {
    const projectId = req.params.projectId as string;

    const userId = req.user?.userId;
    const role = req.user?.role;

    if (!userId || !role) {
        throw new ApiError(401, "Unauthorized request!!!");
    }

    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        },

        include: {
            creator: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },

            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true
                        }
                    }
                }
            },

            tasks: true
        }
    });

    if (!project) {
        throw new ApiError(404, "Project not found!!!");
    }

    const isAdminOwner =
        role === "ADMIN" &&
        project.createdBy === userId;

    const isProjectMember =
        role === "MEMBER" &&
        project.members.some(
            (member) => member.userId === userId
        );

    if (!isAdminOwner && !isProjectMember) {
        throw new ApiError(403, "Access denied!!!");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            project,
            "Project fetched successfully!!!"
        )
    );
});

const deleteProject = asyncHandler(async (req, res) => {
    const projectId = req.params.projectId as string;
    const userId = req.user?.userId;

    const project =
        await prisma.project.findUnique(
            {
                where: {
                    id: projectId
                }
            }
        );

    if (!project) {
        throw new ApiError(
            404,
            "Project not found!!!"
        );
    }

    if (
        project.createdBy !==
        userId
    ) {
        throw new ApiError(
            403,
            "Unauthorized access!!!"
        );
    }

    await prisma.task.deleteMany(
        {
            where: {
                projectId
            }
        }
    );

    await prisma.projectMember.deleteMany(
        {
            where: {
                projectId
            }
        }
    );

    await prisma.project.delete(
        {
            where: {
                id: projectId
            }
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Project deleted successfully"
            )
        );
}
);

export {
    createProject,
    addMemberToProject,
    getMyProjects,
    getSingleProject,
    deleteProject
};