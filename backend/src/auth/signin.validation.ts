import { z } from 'zod';

export const signInValidation = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});
