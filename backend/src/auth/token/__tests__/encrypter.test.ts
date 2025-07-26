import encrypter from "../encrypter.util";
import "dotenv/config";

describe("Encrypter Utility", () => {
	const testString = "Hello, World!";
	let encryptedString: string | null;

	it("should encrypt a string", () => {
		encryptedString = encrypter.encrypt(testString);
		expect(encryptedString).toBeDefined();
		expect(encryptedString).not.toBe(testString);
	});

	it("should decrypt an encrypted string back to the original", () => {
		const decryptedString = encrypter.decrypt(encryptedString || "");
		expect(decryptedString).toBe(testString);
	});

	it("should return an empty string if decrypting an invalid string", () => {
		const invalidString = "invalid-encrypted-string";
		const decryptedString = encrypter.decrypt(invalidString);
		expect(decryptedString).toBe(null);
	});
});
