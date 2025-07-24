import { z } from "zod";

export const signUpValidation = z.object({
	body: z.object({
		email: z.string().email().nonempty(),
		password: z.string().min(8).nonempty()
	})
});
