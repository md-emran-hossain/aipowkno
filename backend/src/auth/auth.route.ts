import { Router } from "express";
import signUp from "./signUp";
import signIn from "./signIn";
import signInValidation from "./signin.validation";
import signUpValidation from "./signup.validation";
import { isValidated } from "../req/validator.util";

const authRoutes = Router({ mergeParams: true });

authRoutes.post("/signup", isValidated(signUpValidation), signUp);
authRoutes.post("/signin", isValidated(signInValidation), signIn);

export default authRoutes;
