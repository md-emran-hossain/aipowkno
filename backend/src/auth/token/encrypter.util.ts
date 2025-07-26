import Cryptr from "cryptr";
import "dotenv/config";

const cryptr = new Cryptr(process.env.JWT_ENCRYPTION_SECRET as string);

interface Encrypter {
	encrypt(token: string): string | null;
	decrypt(encryptedToken: string): string | null;
}

const encrypter: Encrypter = {
	encrypt(token: string): string | null {
		  		try {
  			return cryptr.encrypt(token);
  		} catch {
  			return null;
  		}
	},
	decrypt(encryptedToken: string): string | null {
		try {
			return cryptr.decrypt(encryptedToken);
		} catch {
			return null;
		}
	}
};

export default encrypter;
