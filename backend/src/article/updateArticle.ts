import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const updateArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, coverImage, status, tags } = req.body;

  const article = await prisma.article.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      coverImage,
      status,
      tags: {
        set: tags.map((tag: string) => ({ id: tag })),
      },
    },
  });

  res.json({ article });
};