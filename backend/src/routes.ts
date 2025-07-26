import { Application } from "express";
import authRoutes from "./auth/auth.route";
import articleRoutes from "./article/articles.route";
import tagsRouters from "./tags/tags.route";
import userRouters from "./user/user.routes";

export default (app: Application): void => {
	app.use("/auth", authRoutes);
	app.use("/articles", articleRoutes);
	app.use("/tags", tagsRouters);
	app.use("/user", userRouters);
};