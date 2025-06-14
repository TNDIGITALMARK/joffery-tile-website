'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiSend } from 'react-icons/fi';

import { newsletterSchema, type NewsletterFormValues } from '@/lib/schemas/newsletter-schema';
import { cn } from '@/lib/utils';

interface NewsletterSignupProps {
  className?: string;
  onSuccess?: () => void;
  showNameFields?: boolean;

  title?: string;
  description?: string;
  compact?: boolean;
}

export function NewsletterSignup({ 
  className, 
  onSuccess,
  showNameFields = true,

  title = 'Subscribe to Our Newsletter',
  description = 'Stay updated with our latest news and exclusive content.',
  compact = false
}: NewsletterSignupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',

    },
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    // Use environment variable with fallback
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const apiUrl = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
    
    // Get tenant ID from environment variable
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    
    // Determine which endpoint to use based on tenant ID availability
    const endpoint = tenantId ? `${apiUrl}/tenant/newsletter/subscribe` : `${apiUrl}/newsletter/subscribe`;
    
    const submitData = data;
    
    console.log('Submitting newsletter subscription to:', endpoint);
    console.log('Tenant ID:', tenantId || 'None (using legacy endpoint)');
    console.log('Data:', submitData);
    
    try {
      // Prepare headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      
      // Add tenant ID header if available
      if (tenantId) {
        headers['X-Tenant-ID'] = tenantId;
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(submitData),
        mode: 'cors',
        credentials: 'omit',
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = 'Failed to subscribe to newsletter';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
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
      console.error('Newsletter subscription error:', err);
      setError(err instanceof Error ? err.message : 'Failed to subscribe to newsletter');
    } finally {
      setIsSubmitting(false);
    }
  };



  if (compact) {
    return (
      <div className={cn('w-full max-w-md mx-auto', className)}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-800"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
            {title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
            {description}
          </p>
          
          <div className="flex gap-2">
            <input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              className={cn(
                'flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200',
                errors.email && 'border-red-500 focus:ring-red-500'
              )}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition duration-200',
                isSubmitting && 'opacity-70 cursor-not-allowed'
              )}
            >
              {isSubmitting ? '...' : <FiSend className="h-4 w-4" />}
            </button>
          </div>
          
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg text-sm">
              {error}
            </div>
          )}

          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-sm"
            >
              Successfully subscribed! Check your email for confirmation.
            </motion.div>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          {title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 text-center">
          {description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <FiMail className="mr-2 h-4 w-4 text-gray-500" />
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address *
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

        {showNameFields && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <FiUser className="mr-2 h-4 w-4 text-gray-500" />
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name (Optional)
                </label>
              </div>
              <input
                {...register('firstName')}
                id="firstName"
                placeholder="John"
                className={cn(
                  'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200',
                  errors.firstName && 'border-red-500 focus:ring-red-500'
                )}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <FiUser className="mr-2 h-4 w-4 text-gray-500" />
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name (Optional)
                </label>
              </div>
              <input
                {...register('lastName')}
                id="lastName"
                placeholder="Doe"
                className={cn(
                  'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200',
                  errors.lastName && 'border-red-500 focus:ring-red-500'
                )}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>
        )}



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
            Successfully subscribed to our newsletter! Check your email for confirmation.
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
          <FiMail className="h-5 w-5" />
          {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
        </button>
      </form>
    </div>
  );
} 