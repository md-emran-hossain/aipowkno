import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export default (_: Request, res: Response) => {
	res
		.status(StatusCodes.NOT_FOUND)
		.json({ message: "API endpoint does not exist" });
};
