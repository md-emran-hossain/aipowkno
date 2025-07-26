import { Request, Response } from "express";
import {
	createArticle as createArticleService,
	findOrCreateTags,
	addArticleAuthor,
	addArticleTags
} from "./article.service";
import asyncHandler from "express-async-handler";

export default asyncHandler(async (req: Request, res: Response) => {
	const { title, content, coverImage, status, tags } = req.body;
	const { id: userId } = req.user;

	const article = await createArticleService({
		title,
		content,
		coverImage,
		status
	});

	await addArticleAuthor(article.id, userId);

	if (tags && tags.length > 0) {
		const createdTags = await findOrCreateTags(tags);
		await addArticleTags(
			article.id,
			createdTags.map(tag => tag.id)
		);
	}

	res.status(201).json(article);
});
