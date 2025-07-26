import jwt from "jsonwebtoken";

export default (token: string) => {
	try {
		return jwt.verify(token, process.env.JWT_ENCRYPTION_SECRET as string);
	} catch (err) {
		console.error("Token verification failed:", err);
		return null;
	}
};
