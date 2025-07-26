import { encrypt, decrypt } from '../encrypter.util';

describe('Encrypter Utility', () => {
  const testString = 'Hello, World!';
  let encryptedString: string;

  it('should encrypt a string', () => {
    encryptedString = encrypt(testString);
    expect(encryptedString).toBeDefined();
    expect(encryptedString).not.toBe(testString);
  });

  it('should decrypt an encrypted string back to the original', () => {
    const decryptedString = decrypt(encryptedString);
    expect(decryptedString).toBe(testString);
  });

  it('should return an empty string if decrypting an invalid string', () => {
    const invalidString = 'invalid-encrypted-string';
    const decryptedString = decrypt(invalidString);
    expect(decryptedString).toBe('');
  });
});
