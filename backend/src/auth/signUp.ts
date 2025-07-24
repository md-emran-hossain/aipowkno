import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as authService from "./auth.service";
import asyncHandler from "express-async-handler";

export default asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const existingUser = await authService.findUserByEmail(email);

	if (existingUser) {
		res.status(StatusCodes.CONFLICT).json({ message: "User already exists" });
		return;
	}

	const user = await authService.createUser(email, password);

	res.status(StatusCodes.CREATED).json({ user });
});
