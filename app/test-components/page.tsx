'use client';

import { ContactForm } from '@/components/contact/ContactForm';
import { BookingForm } from '@/components/booking/BookingForm';
import { NewsletterSignup } from '@/components/newsletter/NewsletterSignup';
import { LeadCaptureForm } from '@/components/lead/LeadCaptureForm';

export default function TestComponentsPage() {
  // Custom configurations for testing

  const bookingTimeSlots = [
    '9:00 AM',
    '10:30 AM',
    '12:00 PM',
    '1:30 PM',
    '3:00 PM',
    '4:30 PM'
  ];



  const leadInterests = [
    'Website Development',
    'E-commerce Solutions',
    'Mobile App Development',
    'Digital Marketing',
    'SEO Services',
    'Consulting'
  ];



  const handleSuccess = (componentName: string) => {
    console.log(`${componentName} submitted successfully!`);
    alert(`${componentName} submitted successfully! Check the console for details.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Component Testing Page
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Test all available form components with different configurations. 
            Each component integrates with the backend API and tenant system.
          </p>
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Note:</strong> Make sure the backend API is running on the configured endpoint. 
              Check the browser console for API call details and responses.
            </p>
          </div>
        </div>

        {/* Components Grid */}
        <div className="space-y-24">
          
          {/* Contact Form Section */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Contact Form
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Basic contact form with name, email, subject, and message fields
              </p>
            </div>
            <ContactForm 
              onSuccess={() => handleSuccess('Contact Form')}
              className="max-w-2xl mx-auto"
            />
          </section>

          {/* Booking Form Section */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Booking Form
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Calendly-style appointment booking with large calendar interface
              </p>
            </div>
            <BookingForm 
              timeSlots={bookingTimeSlots}
              onSuccess={() => handleSuccess('Booking Form')}
              className="max-w-4xl mx-auto"
            />
          </section>

          {/* Newsletter Signup Sections */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Newsletter Signup
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Newsletter subscription with name fields option
              </p>
            </div>
            
            {/* Full Newsletter Form */}
            <div className="mb-12">
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  Full Newsletter Form (with name fields)
                </h3>
                             <NewsletterSignup 
                 showNameFields={true}
                 title="Join Our Community"
                 description="Get weekly insights, tips, and exclusive content delivered to your inbox."
                 onSuccess={() => handleSuccess('Newsletter Signup (Full)')}
                 className="max-w-2xl mx-auto"
               />
            </div>

            {/* Compact Newsletter Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  Compact Newsletter (Sidebar Style)
                </h3>
                <NewsletterSignup 
                  compact={true}
                  showNameFields={false}
                  title="Stay Updated"
                  description="Weekly newsletter"
                  onSuccess={() => handleSuccess('Newsletter Signup (Compact)')}
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  Simple Newsletter
                </h3>
                                 <NewsletterSignup 
                   showNameFields={false}
                   title="Subscribe"
                   description="Get our latest updates and news."
                   onSuccess={() => handleSuccess('Newsletter Signup (Simple)')}
                 />
              </div>
            </div>
          </section>

          {/* Lead Capture Form Section */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Lead Capture Form
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive lead capture with business details and interest selection
              </p>
            </div>
            
            {/* Full Lead Capture Form */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Full Lead Capture Form (with all fields)
              </h3>
                             <LeadCaptureForm 
                 showOptionalFields={true}
                 showInterests={true}
                 interests={leadInterests}
                 title="Start Your Project Today"
                 description="Tell us about your vision and we'll help bring it to life with a customized solution."
                 ctaText="Get Started Now"
                 onSuccess={() => handleSuccess('Lead Capture Form (Full)')}
                 className="max-w-4xl mx-auto"
               />
            </div>

            {/* Simplified Lead Capture Form */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Simplified Lead Capture (essential fields only)
              </h3>
                             <LeadCaptureForm 
                 showOptionalFields={false}
                 showInterests={false}
                 title="Get a Quote"
                 description="Interested in our services? Let's discuss your project."
                 ctaText="Request Quote"
                 onSuccess={() => handleSuccess('Lead Capture Form (Simple)')}
                 className="max-w-2xl mx-auto"
               />
            </div>
          </section>

          {/* API Configuration Info */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              API Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Environment Variables
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">NEXT_PUBLIC_API_URL:</span>
                      <br />
                      <span className="text-blue-600 dark:text-blue-400">
                        {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">NEXT_PUBLIC_TENANT_ID:</span>
                      <br />
                      <span className="text-blue-600 dark:text-blue-400">
                        {process.env.NEXT_PUBLIC_TENANT_ID || 'Not configured (using legacy endpoints)'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  API Endpoints
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-sm">
                  <div className="space-y-2">
                    <div><strong>Contact:</strong> /api/contact/submit</div>
                    <div><strong>Booking:</strong> /api/booking/submit</div>
                    <div><strong>Newsletter:</strong> /api/newsletter/subscribe</div>
                    <div><strong>Lead Capture:</strong> /api/lead/capture</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      * Tenant endpoints available with /tenant/ prefix
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testing Instructions */}
          <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Testing Instructions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Before Testing:
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Ensure the backend API is running</li>
                  <li>• Configure environment variables</li>
                  <li>• Set up email credentials for testing</li>
                  <li>• Open browser developer tools</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  What to Test:
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Form validation (try invalid inputs)</li>
                  <li>• Successful submissions</li>
                  <li>• Email delivery (check inbox)</li>
                  <li>• Responsive design on mobile</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
} 