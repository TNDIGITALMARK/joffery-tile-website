'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';

import { contactFormSchema, type ContactFormValues } from '@/lib/schemas/contact-form-schema';
import { cn } from '@/lib/utils';

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
}

export function ContactForm({ className, onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    // Use environment variable with fallback
    // Make sure we're using the correct URL structure
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const apiUrl = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
    
    console.log('Submitting to:', `${apiUrl}/contact`);
    console.log('Data:', data);
    
    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
        // Add mode: 'cors' to explicitly allow cross-origin requests
        mode: 'cors',
        // Add credentials: 'omit' to avoid sending cookies
        credentials: 'omit',
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = 'Failed to send message';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
          console.log('Error data:', errorData);
        } catch (e) {
          console.log('Could not parse error response as JSON');
        }
        throw new Error(errorMessage);
      }
      
      setIsSuccess(true);
      reset();
      onSuccess?.();
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error('Contact form error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Get in Touch
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Have a question or want to work together? Send us a message!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center">
              <FiUser className="mr-2 h-4 w-4 text-gray-500" />
              <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Name
              </label>
            </div>
            <input
              {...register('name')}
              id="name"
              placeholder="John Doe"
              className={cn(
                'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200',
                errors.name && 'border-red-500 focus:ring-red-500'
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <FiMail className="mr-2 h-4 w-4 text-gray-500" />
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Email
              </label>
            </div>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="you@example.com"
              className={cn(
                'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200',
                errors.email && 'border-red-500 focus:ring-red-500'
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <FiMessageSquare className="mr-2 h-4 w-4 text-gray-500" />
            <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Subject
            </label>
          </div>
          <input
            {...register('subject')}
            id="subject"
            placeholder="How can we help you?"
            className={cn(
              'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200',
              errors.subject && 'border-red-500 focus:ring-red-500'
            )}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <FiMessageSquare className="mr-2 h-4 w-4 text-gray-500" />
            <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
          </div>
          <textarea
            {...register('message')}
            id="message"
            rows={5}
            placeholder="Your message here..."
            className={cn(
              'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none',
              errors.message && 'border-red-500 focus:ring-red-500'
            )}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg"
          >
            Your message has been sent successfully! We'll get back to you soon.
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition duration-200',
            isSubmitting && 'opacity-70 cursor-not-allowed'
          )}
        >
          <FiSend className="h-5 w-5" />
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
} 