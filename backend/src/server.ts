import "dotenv/config";
import { createServer } from "http";
import app from "./app";

const server = createServer(app);

const { API_HOST, API_PORT } = process.env as {
  API_HOST: string;
  API_PORT: string;
};

server.listen(API_PORT, () => {
	console.log(`Api server is running at ${API_HOST}:${API_PORT}`);
});
