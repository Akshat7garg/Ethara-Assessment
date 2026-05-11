import { Router } from "express";
import {
    createTask,
    getMyTasks,
    updateTaskStatus,
    deleteTask
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/createTask").post(
    verifyJWT,
    createTask
);
router.route("/myTasks").get(
    verifyJWT,
    getMyTasks
);
router.route("/updateStatus/:taskId").patch(
    verifyJWT,
    updateTaskStatus
);
router.route(
    "/delete/:taskId"
).delete(
    verifyJWT,
    deleteTask
);

export default router;