import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getPaginatedArticles = async (
	page: number,
	limit: number,
	keyword?: string,
	tags?: string[]
) => {
	const where: Prisma.ArticleWhereInput = {};

	if (keyword) {
		where.OR = [
			{ title: { contains: keyword, mode: "insensitive" } },
			{ content: { contains: keyword, mode: "insensitive" } }
		];
	}

	if (tags && tags.length > 0) {
		where.tags = {
			some: {
				tag: {
					name: {
						in: tags
					}
				}
			}
		};
	}

	const [articles, total] = await Promise.all([
		prisma.article.findMany({
			where,
			skip: (page - 1) * limit,
			take: limit,
			include: {
				tags: {
					select: {
						tag: {
							select: {
								name: true
							}
						}
					}
				}
			}
		}),
		prisma.article.count({ where })
	]);

	return { articles, total };
};

export const createArticle = async (data: {
	title: string;
	content: string;
	coverImage?: string;
	status: "published" | "draft";
}) => {
	return prisma.article.create({
		data
	});
};

export const findOrCreateTags = async (tagNames: string[]) => {
	const tags = await Promise.all(
		tagNames.map(async name => {
			let tag = await prisma.tag.findUnique({
				where: { name }
			});

			if (!tag) {
				tag = await prisma.tag.create({
					data: { name }
				});
			}

			return tag;
		})
	);

	return tags;
};

export const addArticleAuthor = async (articleId: string, userId: string) => {
	return prisma.articleAuthors.create({
		data: {
			articleId,
			userId
		}
	});
};

export const addArticleTags = async (articleId: string, tagIds: string[]) => {
	return prisma.articlesTag.createMany({
		data: tagIds.map(tagId => ({
			articleId,
			tagId
		}))
	});
};

export const isUserArticleAuthor = async (
	articleId: string,
	userId: string
) => {
	const articleAuthor = await prisma.articleAuthors.findFirst({
		where: {
			articleId,
			userId
		}
	});

	return !!articleAuthor;
};
