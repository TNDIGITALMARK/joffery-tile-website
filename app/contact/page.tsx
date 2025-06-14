import { ContactForm } from '@/components/contact';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with our team',
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions or want to learn more about our services? 
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
        
        {/* Pass the API URL directly to the form for testing */}
        <ContactForm />
        
        {/* Debug information */}
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
          <p className="font-medium mb-2">Debug Information:</p>
          <p>API URL: <code>http://localhost:3001/api</code></p>
          <p className="mt-2">Make sure your backend server is running at this URL.</p>
        </div>
      </div>
    </main>
  );
} 