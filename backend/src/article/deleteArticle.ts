import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const deleteArticle = async (req: Request, res: Response) => {
	const { id } = req.params;

	await prisma.article.delete({
		where: {
			id
		}
	});

	res.status(204).send();
};
