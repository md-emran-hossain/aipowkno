import { z } from "zod";

export default z.object({
	title: z.string().min(1),
	content: z.string().min(1),
	coverImage: z.string().optional(),
	status: z.enum(["published", "draft"]),
	tags: z.array(z.string()).optional()
});
