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
} from "../controllers/userAuthController.js";
import { isUserAuthenticated, authorizeRoles } from "../middleware/auth.js";

const userAuthRouter = express.Router();

// User Authentication Routes
userAuthRouter.route("/register").post(registerUser);
userAuthRouter.route("/login").post(loginUser);
userAuthRouter.route("/logout").get(logoutUser);
userAuthRouter.route("/password/forgot").post(forgotPassword);
userAuthRouter.route("/password/reset/:token").put(resetPassword)

// User CRUD
userAuthRouter.route("/me").get(isUserAuthenticated, getUserDetails)
userAuthRouter.route("/password/update").put(isUserAuthenticated, updateUserPassword)
userAuthRouter.route("/me/update").put(isUserAuthenticated, updateUserProfile)

// Admin CRUD
userAuthRouter.route("/admin/users").get(isUserAuthenticated, authorizeRoles("admin"), getAllUsers);
userAuthRouter.route("/admin/user/:id").get(isUserAuthenticated, authorizeRoles("admin"), getOneUser);

export default userAuthRouter;