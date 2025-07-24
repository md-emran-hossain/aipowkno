import { Router } from "express";
import signUp from "./signUp";
import signIn from "./signIn";
import { validate } from "../middleware/validate";
import { signInValidation } from "./signin.validation";
import { signUpValidation } from "./signup.validation";

const router = Router();

router.post("/signup", validate(signUpValidation), signUp);
router.post("/signin", validate(signInValidation), signIn);

export default router;
