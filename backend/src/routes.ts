import { Application } from "express";
import authRoutes from "./auth/auth.routes";

export default (app: Application): void => {
	app.use("/auth", authRoutes);
};
