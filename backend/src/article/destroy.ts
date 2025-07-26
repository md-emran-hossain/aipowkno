import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const articleId = Number(id);

	await prisma.article.delete({
		where: { id: articleId }
	});

	res.json({ message: "Article deleted" });
});
