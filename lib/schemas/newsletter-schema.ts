import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(30, { message: 'First name must be less than 30 characters' })
    .optional()
    .or(z.literal('')),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(30, { message: 'Last name must be less than 30 characters' })
    .optional()
    .or(z.literal('')),

});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>; 