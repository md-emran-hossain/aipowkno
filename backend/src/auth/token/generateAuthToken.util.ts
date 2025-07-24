import jwt from "jsonwebtoken";
import moment from "moment";
import encrypter from "./encrypter.util";

interface User {
	id: string;
	email: string;
	passwordUpdatedAt?: Date | string | null;
}

interface Payload {
	id: string;
	email: string;
	passwordUpdatedAt: number | null;
}

const generateAuthToken = (user: User): string | null => {
	const payload: Payload = {
		id: user.id,
		email: user.email,
		passwordUpdatedAt: user.passwordUpdatedAt
			? moment(user.passwordUpdatedAt).unix() * 1000
			: null
	};

	const jwtToken: string = jwt.sign(payload, process.env.JWT_SECRET as string, {
		expiresIn: "7d"
	});

	return encrypter.encrypt(jwtToken);
};

export default generateAuthToken;
