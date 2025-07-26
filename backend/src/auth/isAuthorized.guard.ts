import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const { id: userId } = req.user;

	const article = await prisma.article.findUnique({
		where: {
			id
		},
		include: {
			articleAuthors: true
		}
	});

	if (!article) {
		return res.status(404).json({
			message: "Article not found"
		});
	}

	const isAuthor = article.articleAuthors.some(
		author => author.userId === userId
	);

	if (!isAuthor) {
		return res.status(403).json({
			message: "Forbidden"
		});
	}

	return next();
};
