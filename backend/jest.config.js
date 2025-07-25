const config = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/src"],
	testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
	transform: {
		"^.+\.ts$": "ts-jest"
	}
};

export default config;
