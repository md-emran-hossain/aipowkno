import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default asyncHandler(async (_: Request, res: Response) => {
	const tags = await prisma.tag.findMany({
		select: {
			name: true
		}
	});

	res.json(tags);
});
