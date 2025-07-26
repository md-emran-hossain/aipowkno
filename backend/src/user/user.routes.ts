import { Router } from "express";
import articles from "./articles";
import isAuthenticated from "../auth/isAuthenticated.guard";

const userRouters = Router();

userRouters.get("/articles", isAuthenticated, articles);

export default userRouters;
