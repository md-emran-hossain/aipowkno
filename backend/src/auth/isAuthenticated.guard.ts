import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import getReqAuthToken from "./token/getReqAuthToken.util";
import verifyAuthToken from "./token/verifyAuthToken.util";

const prisma = new PrismaClient();

export default async (req: Request, res: Response, next: NextFunction) => {
	const authToken = getReqAuthToken(req);

	if (!authToken) {
		return res.status(401).json({
			message: "You need to sign in first"
		});
	}

	const tokenPayload = verifyAuthToken(authToken);

	if (!tokenPayload) {
		return res.status(401).json({
			message: "The authorization token is invalid"
		});
	}

	const user = await prisma.user.findUnique({
		where: {
			id: tokenPayload.id
		}
	});

	if (!user || user.status === "blocked") {
		return res.status(401).json({
			message: "This account is not authorized to use this service"
		});
	}

	req.user = {
		id: user.id
	};

	next();
};
