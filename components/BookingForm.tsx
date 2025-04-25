"use client";

import { useState } from 'react';
import { useForm } from '@/lib/hooks/useForm';
import { bookingSchema, type BookingFormValues } from '@/lib/schemas/booking';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    schema: bookingSchema,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: '',
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you'd submit this data to your API
      console.log('Form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <h3 className="text-2xl font-semibold mb-6">Book a Session</h3>
      
      {isSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-md mb-6">
          Thank you for your booking request! We'll contact you shortly to confirm your session.
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="name"
          label="Name"
          placeholder="Your full name"
          {...register('name')}
          error={errors.name?.message}
        />
        
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="your.email@example.com"
          {...register('email')}
          error={errors.email?.message}
        />
        
        <Input
          id="phone"
          label="Phone"
          placeholder="Your phone number"
          {...register('phone')}
          error={errors.phone?.message}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="date"
            type="date"
            label="Date"
            {...register('date')}
            error={errors.date?.message}
          />
          
          <Input
            id="time"
            type="time"
            label="Time"
            {...register('time')}
            error={errors.time?.message}
          />
        </div>
        
        <div className="space-y-2">
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Message (Optional)
          </label>
          <textarea
            id="message"
            rows={4}
            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-black dark:text-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Tell us about your project"
            {...register('message')}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Book Now'}
        </Button>
      </form>
    </div>
  );
} 