import express from "express";
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    forgotPassword, 
    resetPassword, 
    getUserDetails,
    updateUserPassword,
    updateUserProfile,
    getAllUsers,
    getOneUser
} from "../controllers/userController.js";
import { isUserAuthenticated, authorizeRoles } from "../middleware/auth.js";

const userRouter = express.Router();

// User Authentication Routes
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(logoutUser);
userRouter.route("/password/forgot").post(forgotPassword);
userRouter.route("/password/reset/:token").put(resetPassword)

// User CRUD
userRouter.route("/me").get(isUserAuthenticated, getUserDetails)
userRouter.route("/password/update").put(isUserAuthenticated, updateUserPassword)
userRouter.route("/me/update").put(isUserAuthenticated, updateUserProfile)

// Admin CRUD
userRouter.route("/admin/users").get(isUserAuthenticated, authorizeRoles("admin"), getAllUsers);
userRouter.route("/admin/user/:id").get(isUserAuthenticated, authorizeRoles("admin"), getOneUser);

export default userRouter;