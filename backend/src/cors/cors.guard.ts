import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { Request } from "express";

const allowedOrigins = [
	// production
	// development
	"http://localhost:3000"
];

const getOrigin = (_: Request) => {
	return allowedOrigins;
};

interface CorsOptions {
	origin: string[] | string | boolean;
	methods: string[];
	allowedHeaders: string[];
	optionsSuccessStatus: number;
	credentials: boolean;
}

interface CorsCallback {
	(err: Error | null, options?: CorsOptions): void;
}

export default cors(function (req: Request, callback: CorsCallback) {
	const options: CorsOptions = {
		origin: getOrigin(req),
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		allowedHeaders: ["Accept", "Content-Type"],
		optionsSuccessStatus: StatusCodes.OK,
		credentials: true
	};

	return callback(null, options);
});
