import encrypter from "./encrypter.util";

interface AuthTokenRequest {
	headers?: {
		authorization?: string;
	};
	body?: {
		authorization?: string;
	};
	query?: {
		authorization?: string;
	};
}

type DecryptFunction = (token?: string) => string | undefined;

interface Encrypter {
	decrypt: DecryptFunction;
}

const getReqAuthToken = (req: AuthTokenRequest): string | undefined => {
	const encryptedToken =
		req.headers?.authorization ||
		req.body?.authorization ||
		req.query?.authorization;

	return (encrypter as Encrypter).decrypt(encryptedToken);
};

export default getReqAuthToken;
