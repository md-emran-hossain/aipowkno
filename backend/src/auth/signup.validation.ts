import { z } from "zod";

export default z.object({
	body: z.object({
		email: z.string().email().nonempty(),
		password: z.string().min(8).nonempty()
	})
});
