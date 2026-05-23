import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// signup user
router.post("/signup", authController.signUpUser);

// login
router.post("/login", authController.loginUser);

export const authRoute = router;