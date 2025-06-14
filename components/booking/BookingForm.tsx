'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiUser, FiMail, FiPhone, FiMessageSquare, FiChevronLeft, FiChevronRight, FiArrowLeft } from 'react-icons/fi';

import { bookingFormSchema, type BookingFormValues } from '@/lib/schemas/booking-form-schema';
import { cn } from '@/lib/utils';

interface BookingFormProps {
  className?: string;
  onSuccess?: () => void;
  timeSlots?: string[];
}

export function BookingForm({ 
  className, 
  onSuccess, 
  timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']
}: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [step, setStep] = useState<'date' | 'time' | 'form'>('date');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
    },
  });

  // Calendar logic
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(date);
    }
    
    return days;
  }, [currentMonth]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const selectDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(dateString);
    setValue('preferredDate', dateString);
    setStep('time');
  };

  const selectTime = (time: string) => {
    setSelectedTime(time);
    setValue('preferredTime', time);
    setStep('form');
  };

  const goBack = () => {
    if (step === 'time') {
      setStep('date');
    } else if (step === 'form') {
      setStep('time');
    }
  };

  const resetSelection = () => {
    setSelectedDate('');
    setSelectedTime('');
    setStep('date');
    setValue('preferredDate', '');
    setValue('preferredTime', '');
  };

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    // Use environment variable with fallback
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const apiUrl = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
    
    // Get tenant ID from environment variable
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    
    // Determine which endpoint to use based on tenant ID availability
    const endpoint = tenantId ? `${apiUrl}/tenant/booking/submit` : `${apiUrl}/booking/submit`;
    
    console.log('Submitting booking to:', endpoint);
    console.log('Tenant ID:', tenantId || 'None (using legacy endpoint)');
    console.log('Data:', data);
    
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
        body: JSON.stringify(data),
        mode: 'cors',
        credentials: 'omit',
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = 'Failed to submit booking';
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
      resetSelection();
      onSuccess?.();
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error('Booking form error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatSelectedDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Book an Appointment
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Schedule a time that works for you. We'll confirm your appointment shortly.
              </p>
            </div>
            {(step === 'time' || step === 'form') && (
              <button
                onClick={goBack}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FiArrowLeft className="h-4 w-4" />
                Back
              </button>
            )}
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mt-4">
            <div className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
              step === 'date' ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : 
              selectedDate ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" :
              "bg-gray-100 dark:bg-gray-800 text-gray-500"
            )}>
              <FiCalendar className="h-3 w-3" />
              {selectedDate ? formatSelectedDate(selectedDate) : 'Select Date'}
            </div>
            
            {selectedDate && (
              <>
                <div className="w-2 h-px bg-gray-300 dark:bg-gray-600" />
                <div className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
                  step === 'time' ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : 
                  selectedTime ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" :
                  "bg-gray-100 dark:bg-gray-800 text-gray-500"
                )}>
                  <FiClock className="h-3 w-3" />
                  {selectedTime || 'Select Time'}
                </div>
              </>
            )}
            
            {selectedTime && (
              <>
                <div className="w-2 h-px bg-gray-300 dark:bg-gray-600" />
                <div className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
                  step === 'form' ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" :
                  "bg-gray-100 dark:bg-gray-800 text-gray-500"
                )}>
                  <FiUser className="h-3 w-3" />
                  Your Details
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 'date' && (
              <motion.div
                key="date"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Calendar */}
                <div className="max-w-md mx-auto">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      disabled={currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()}
                    >
                      <FiChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    
                    <button
                      onClick={() => navigateMonth('next')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <FiChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map(day => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {daysInMonth.map((date, index) => {
                      if (!date) {
                        return <div key={index} className="p-2" />;
                      }
                      
                      const isToday = date.toDateString() === today.toDateString();
                      const isPast = date < today;
                      const isSelected = selectedDate === date.toISOString().split('T')[0];
                      
                      return (
                        <button
                          key={date.toISOString()}
                          onClick={() => !isPast && selectDate(date)}
                          disabled={isPast}
                          className={cn(
                            "p-2 text-sm rounded-lg transition-all duration-200 hover:scale-105",
                            isPast 
                              ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                              : isSelected
                              ? "bg-blue-600 text-white shadow-lg"
                              : isToday
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          )}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'time' && (
              <motion.div
                key="time"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
                    Select a time for {formatSelectedDate(selectedDate)}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => selectTime(time)}
                        className={cn(
                          "p-4 text-center rounded-lg border-2 transition-all duration-200 hover:scale-105",
                          selectedTime === time
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 text-gray-700 dark:text-gray-300"
                        )}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <FiClock className="h-4 w-4" />
                          <span className="font-medium">{time}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Almost done! Please provide your details
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      We'll use this information to confirm your appointment
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FiUser className="mr-2 h-4 w-4 text-gray-500" />
                        <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Full Name *
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

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FiPhone className="mr-2 h-4 w-4 text-gray-500" />
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone Number *
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

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FiMessageSquare className="mr-2 h-4 w-4 text-gray-500" />
                        <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Additional Message (Optional)
                        </label>
                      </div>
                      <textarea
                        {...register('message')}
                        id="message"
                        rows={4}
                        placeholder="Any additional information or special requests..."
                        className={cn(
                          'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none',
                          errors.message && 'border-red-500 focus:ring-red-500'
                        )}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>
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
                      Your booking request has been submitted successfully! We'll contact you soon to confirm your appointment.
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition duration-200 text-lg',
                      isSubmitting && 'opacity-70 cursor-not-allowed'
                    )}
                  >
                    <FiCalendar className="h-5 w-5" />
                    {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 