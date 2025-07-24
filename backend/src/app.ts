import express from "express";
import mapRoutes from "./routes";
import cors from "./cors/cors.guard";
import notFound from "./error/notFound";

const app = express();

app.use(cors);

mapRoutes(app);

app.use(notFound);

export default app;
