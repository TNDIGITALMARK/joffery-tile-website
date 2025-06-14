'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiHome, FiPhone, FiMessageSquare, FiSend, FiCheck } from 'react-icons/fi';

import { leadCaptureSchema, type LeadCaptureFormValues } from '@/lib/schemas/lead-capture-schema';
import { cn } from '@/lib/utils';

interface LeadCaptureFormProps {
  className?: string;
  onSuccess?: () => void;
  showOptionalFields?: boolean;
  showInterests?: boolean;
  interests?: string[];

  title?: string;
  description?: string;
  ctaText?: string;
}

export function LeadCaptureForm({ 
  className, 
  onSuccess,
  showOptionalFields = true,
  showInterests = false,
  interests = ['Product Demo', 'Pricing Information', 'Partnership', 'Support', 'Consultation', 'Other'],

  title = 'Get Started Today',
  description = 'Tell us about your needs and we\'ll get back to you with a customized solution.',
  ctaText = 'Get Started'
}: LeadCaptureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadCaptureFormValues>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      company: '',
      phone: '',

      interests: [],
      message: '',
    },
  });

  const onSubmit = async (data: LeadCaptureFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    // Use environment variable with fallback
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const apiUrl = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
    
    // Get tenant ID from environment variable
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    
    // Determine which endpoint to use based on tenant ID availability
    const endpoint = tenantId ? `${apiUrl}/tenant/lead/capture` : `${apiUrl}/lead/capture`;
    
    // Include selected interests
    const submitData = {
      ...data,
      interests: selectedInterests
    };
    
    console.log('Submitting lead capture to:', endpoint);
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
        let errorMessage = 'Failed to submit your information';
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
      setSelectedInterests([]);
      onSuccess?.();
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error('Lead capture error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit your information');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              placeholder="you@company.com"
              className={cn(
                'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200',
                errors.email && 'border-red-500 focus:ring-red-500'
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <FiUser className="mr-2 h-4 w-4 text-gray-500" />
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
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
                Last Name
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

          <div className="space-y-2">
            <div className="flex items-center">
                              <FiHome className="mr-2 h-4 w-4 text-gray-500" />
              <label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Company
              </label>
            </div>
            <input
              {...register('company')}
              id="company"
              placeholder="Acme Corp"
              className={cn(
                'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200',
                errors.company && 'border-red-500 focus:ring-red-500'
              )}
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
            )}
          </div>
        </div>

        {showOptionalFields && (
          <div className="space-y-2">
            <div className="flex items-center">
              <FiPhone className="mr-2 h-4 w-4 text-gray-500" />
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
            </div>
            <input
              {...register('phone')}
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              className={cn(
                'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200',
                errors.phone && 'border-red-500 focus:ring-red-500'
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        )}

        {showInterests && interests.length > 0 && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              What are you interested in? (Optional)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={cn(
                    'px-3 py-2 rounded-lg border text-sm font-medium transition duration-200',
                    selectedInterests.includes(interest)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-blue-500'
                  )}
                >
                  <div className="flex items-center justify-center gap-1">
                    {selectedInterests.includes(interest) && <FiCheck className="h-3 w-3" />}
                    {interest}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center">
            <FiMessageSquare className="mr-2 h-4 w-4 text-gray-500" />
            <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tell us about your project or needs (Optional)
            </label>
          </div>
          <textarea
            {...register('message')}
            id="message"
            rows={4}
            placeholder="Describe your project, goals, or any specific requirements..."
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
            Thank you for your interest! We've received your information and will be in touch with you soon.
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
          {isSubmitting ? 'Submitting...' : ctaText}
        </button>
      </form>
    </div>
  );
} 