const tokenName = "apk/auth-token";

const authTokenStorage = {
	getToken() {
		return localStorage.getItem(tokenName);
	},
  setToken(token: string) {
    return localStorage.setItem(tokenName, token);
  },
	removeToken() {
		return localStorage.removeItem(tokenName);
	}
};

export default authTokenStorage;
