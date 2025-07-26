import jwt from "jsonwebtoken";

export default token => {
	try {
		return jwt.verify(token, process.env.JWT_ENCRYPTION_SECRET as string);
	} catch (err) {
		return null;
	}
};
