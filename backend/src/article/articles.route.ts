import { Router } from "express";
import createArticle from "./createArticle";
import destroy from "./destroy";
import articles from "./articles";
import { isAuthenticate } from "../auth/isAuthenticate.guard";
import isAuthorized from "../auth/isAuthorized.guard";
import createArticleValidation from "./createArticle.validation";
import { isValidated } from "../req/validator.util";

const articlesRoutes = Router({ mergeParams: true });

articlesRoutes.get("/", articles);

articlesRoutes.post(
	"/",
	isAuthenticate,
	isValidated(createArticleValidation),
	createArticle
);

articlesRoutes.delete("/:id", isAuthenticate, isAuthorized, destroy);

export default articlesRoutes;
