import { Router } from "express";
import { getArticles } from "./getArticles";
import { getArticleById } from "./getArticleById";
import { createArticle } from "./createArticle";
import { updateArticle } from "./updateArticle";
import { deleteArticle } from "./deleteArticle";
import { isAuthenticate } from "../auth/isAuthenticated.guard";
import { isAuthorize } from "../auth/isAuthorize.guard";

const router = Router();

router.get("/", getArticles);
router.post("/", isAuthenticate, createArticle);
router.get("/:id", getArticleById);
router.put("/:id", isAuthenticate, isAuthorize, updateArticle);
router.delete("/:id", isAuthenticate, isAuthorize, deleteArticle);

export const articleRoutes = router;
