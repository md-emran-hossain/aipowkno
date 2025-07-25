import express from "express";
import mapRoutes from "./routes";
import cors from "./cors/cors.guard";
import notFound from "./error/notFound";

const app = express();

app.use(cors);
app.use(express.json({ limit: "5mb" }));

mapRoutes(app);

app.use(notFound);

export default app;
