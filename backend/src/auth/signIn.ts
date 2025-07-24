import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as authService from "./auth.service";
import generateAuthToken from "./token/generateAuthToken.util";
import asyncHandler from "express-async-handler";

export default asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await authService.findUserByEmail(email);

	if (!user || !user.password) {
		res.status(StatusCodes.NOT_FOUND).json({ message: "Invalid credentials" });
		return;
	}

	const isPasswordCorrect = await authService.verifyPassword(
		password,
		user.password
	);

	if (!isPasswordCorrect) {
		res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ message: "Invalid credentials" });
		return;
	}

	const token = generateAuthToken({ ...user, id: String(user.id) });

	res.status(StatusCodes.OK).json({ token });
});
