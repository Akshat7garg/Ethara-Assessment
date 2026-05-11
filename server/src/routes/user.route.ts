import { Router } from "express"
import {
    changePassword,
    loginUser,
    registerUser,
    verifyUserByEmail
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/changePassword').put(changePassword);
router.route("/verifyUser").post(
    verifyJWT,
    requireAdmin,
    verifyUserByEmail
);

export default router;