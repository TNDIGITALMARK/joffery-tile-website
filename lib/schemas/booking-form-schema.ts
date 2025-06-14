import { z } from 'zod';

export const bookingFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be less than 50 characters' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  phone: z
    .string()
    .min(10, { message: 'Please enter a valid phone number' })
    .max(20, { message: 'Phone number is too long' }),

  preferredDate: z
    .string()
    .min(1, { message: 'Please select a preferred date' }),
  preferredTime: z
    .string()
    .min(1, { message: 'Please select a preferred time' }),
  message: z
    .string()
    .max(500, { message: 'Message must be less than 500 characters' })
    .optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>; 