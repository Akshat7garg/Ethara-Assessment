import { Router } from "express";
import {
    createProject,
    addMemberToProject,
    getMyProjects,
    getSingleProject,
    deleteProject
} from "../controllers/project.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

router.route("/createProject").post(
    verifyJWT,
    requireAdmin,
    createProject
);
router.route("/addMember").post(
    verifyJWT,
    requireAdmin,
    addMemberToProject
);
router.route("/myProjects").get(
    verifyJWT,
    getMyProjects
);
router.route("/:projectId").get(
    verifyJWT,
    getSingleProject
);
router.route(
    "/delete/:projectId"
).delete(
    verifyJWT,
    requireAdmin,
    deleteProject
);

export default router;