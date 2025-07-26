import { Router } from "express";
import tags from "./tags";

const tagsRouters = Router();

tagsRouters.get("/", tags);

export default tagsRouters;
