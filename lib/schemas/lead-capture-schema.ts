import { z } from 'zod';

export const leadCaptureSchema = z.object({
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
  company: z
    .string()
    .max(100, { message: 'Company name must be less than 100 characters' })
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .min(10, { message: 'Please enter a valid phone number' })
    .max(20, { message: 'Phone number is too long' })
    .optional()
    .or(z.literal('')),

  interests: z
    .array(z.string())
    .max(10, { message: 'Please select no more than 10 interests' })
    .optional(),
  message: z
    .string()
    .max(1000, { message: 'Message must be less than 1000 characters' })
    .optional()
    .or(z.literal('')),
});

export type LeadCaptureFormValues = z.infer<typeof leadCaptureSchema>; 