import { Request, Response } from "express";
import { getPaginatedArticles } from "./article.service";
import asyncHandler from "express-async-handler";

export default asyncHandler(async (req: Request, res: Response) => {
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const keyword = req.query.keyword as string | undefined;
	const tags = req.query.tags ? (req.query.tags as string).split(",") : undefined;

	const { articles, total } = await getPaginatedArticles(
		page,
		limit,
		keyword,
		tags
	);

	res.json({ articles, total, page, limit });
});