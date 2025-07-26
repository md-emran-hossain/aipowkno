import { Router } from "express";
import createArticle from "./createArticle";
import destroy from "./destroy";
import articles from "./articles";
import isAuthenticated from "../auth/isAuthenticated.guard";
import isAuthorized from "../auth/isAuthorized.guard";
import createArticleValidation from "./createArticle.validation";
import { isValidated } from "../req/validator.util";
import summarizeArticle from "./summarizeArticle";

const articlesRoutes = Router({ mergeParams: true });

articlesRoutes.get("/", articles);

articlesRoutes.post(
	"/",
	isAuthenticated,
	isValidated(createArticleValidation),
	createArticle
);

articlesRoutes.post("/articles/:id/summarize", summarizeArticle);

articlesRoutes.delete("/:id", isAuthenticated, isAuthorized, destroy);

export default articlesRoutes;
