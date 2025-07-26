import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getArticleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const article = await prisma.article.findUnique({
    where: {
      id,
    },
  });

  if (!article) {
    return res.status(404).json({
      message: "Article not found",
    });
  }

  res.json({ article });
};