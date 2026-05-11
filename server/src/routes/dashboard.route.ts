import { Router } from "express";
import {
    getDashboardSummary
} from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/summary").get(
    verifyJWT,
    getDashboardSummary
);

export default router;