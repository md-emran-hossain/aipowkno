import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default asyncHandler(async (req: Request, res: Response) => {
	const { id: userId } = req.user;

	const articles = await prisma.article.findMany({
		where: {
			articleAuthors: {
				some: {
					userId
				}
			}
		}
	});

	res.json({ articles });
});
