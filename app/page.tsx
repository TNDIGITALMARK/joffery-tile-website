'use client';

import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('features');
  
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-32 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(147,197,253,0.15)_0%,rgba(255,255,255,0)_60%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(192,132,252,0.15)_0%,rgba(255,255,255,0)_60%)]"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 md:text-7xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Modern Template</span>
            <br />For Your Next Big Project
          </h1>
          <p className="mb-10 text-xl text-gray-600 md:text-2xl">
            A professional starting point with everything you need to build something amazing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 text-base font-medium text-white transition-all bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400">
              Get Started
            </button>
            <button className="px-8 py-4 text-base font-medium transition-all border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <div className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center pt-1">
            <div className="w-1 h-3 bg-gray-400 animate-bounce rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Statistics Section - NEW */}
      <section className="px-4 py-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24">
            {[
              { number: '98%', label: 'Customer Satisfaction' },
              { number: '24/7', label: 'Support Available' },
              { number: '15+', label: 'Components' },
              { number: '100+', label: 'Happy Users' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="mb-1 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Why Choose This Template</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Designed with both aesthetics and functionality in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Modern Design',
                description: 'Sleek interfaces with the latest design trends and animations',
                icon: '✨'
              },
              {
                title: 'Responsive',
                description: 'Perfectly optimized for all devices and screen sizes',
                icon: '📱'
              },
              {
                title: 'Performance',
                description: 'Optimized for speed and the best user experience',
                icon: '⚡'
              },
              {
                title: 'Customizable',
                description: 'Easy to customize and extend to fit your project needs',
                icon: '🎨'
              },
              {
                title: 'Well Documented',
                description: 'Comprehensive documentation to get you started quickly',
                icon: '📚'
              },
              {
                title: 'SEO Ready',
                description: 'Built with search engine optimization as a priority',
                icon: '🔍'
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 transition-all duration-300 bg-white rounded-xl hover:shadow-lg border border-gray-100">
                <div className="flex items-center justify-center w-12 h-12 mb-4 text-xl bg-purple-100 rounded-lg text-purple-600">
                  <span>{feature.icon}</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - NEW */}
      <section className="px-4 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Simple process to get your project up and running in no time
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute top-0 left-1/2 h-full w-1 bg-gray-200 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-12">
              {[
                {
                  title: 'Choose Your Components',
                  description: 'Browse through our extensive library of pre-built components and select the ones that fit your project needs.',
                  icon: '01'
                },
                {
                  title: 'Customize Your Design',
                  description: 'Easily modify colors, typography, and layouts to match your brand identity and requirements.',
                  icon: '02'
                },
                {
                  title: 'Integrate With Your Stack',
                  description: 'Seamlessly connect with your existing technology stack and backend systems.',
                  icon: '03'
                },
                {
                  title: 'Launch Your Project',
                  description: 'Deploy your polished, professional project with confidence.',
                  icon: '04'
                }
              ].map((step, index) => (
                <div key={index} className="relative flex flex-col md:flex-row">
                  <div className="flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                    <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white bg-purple-600 rounded-full">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className={`mt-6 md:mt-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'}`}>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="px-4 py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Showcase</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              See what you can build with this professional template
            </p>
          </div>
          
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 rounded-lg bg-gray-100">
              {['features', 'design', 'components'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="overflow-hidden transition-all duration-300 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl hover:shadow-lg border border-gray-100">
              <div className="p-8">
                <h3 className="mb-4 text-2xl font-semibold text-gray-900">Ready To Use Components</h3>
                <p className="mb-6 text-gray-600">
                  This template includes meticulously crafted components that you can use immediately in your projects.
                </p>
                <button className="inline-flex items-center text-purple-600 hover:text-purple-700">
                  Learn more 
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="overflow-hidden transition-all duration-300 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl hover:shadow-lg border border-gray-100">
              <div className="p-8">
                <h3 className="mb-4 text-2xl font-semibold text-gray-900">Optimized Workflow</h3>
                <p className="mb-6 text-gray-600">
                  Build faster with a streamlined development process designed for modern applications.
                </p>
                <button className="inline-flex items-center text-blue-600 hover:text-blue-700">
                  Explore
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section - NEW */}
      <section className="px-4 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Don't just take our word for it — hear from the people who use our template
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "This template saved me countless hours of development time. The components are beautifully designed and incredibly easy to customize.",
                author: "Sarah Johnson",
                role: "Frontend Developer",
                avatar: "SJ"
              },
              {
                quote: "The attention to detail is impressive. Every component is thoughtfully crafted and the documentation is clear and comprehensive.",
                author: "Michael Chen",
                role: "Product Manager",
                avatar: "MC"
              },
              {
                quote: "Using this template was a game-changer for our startup. We launched our MVP in record time with a professional look from day one.",
                author: "Emily Rodriguez",
                role: "Startup Founder",
                avatar: "ER"
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 transition-all duration-300 bg-white rounded-xl hover:shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-full font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.author}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section - NEW */}
      <section className="px-4 py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Everything you need to know about the template
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "How can I customize the template?",
                answer: "The template is built with modularity in mind. You can easily edit components, change colors, and adjust layouts through the well-organized codebase."
              },
              {
                question: "Is the template responsive?",
                answer: "Yes, the template is fully responsive and works seamlessly across all devices and screen sizes, from mobile phones to large desktop monitors."
              },
              {
                question: "Do I need to know advanced programming to use this template?",
                answer: "Basic knowledge of HTML, CSS, and JavaScript is helpful, but the template is designed to be user-friendly with comprehensive documentation to guide you."
              },
              {
                question: "Can I use this template for commercial projects?",
                answer: "Absolutely! The template comes with a commercial license allowing you to use it for both personal and commercial projects."
              },
              {
                question: "Is support available if I need help?",
                answer: "Yes, we offer dedicated support to help you with any questions or issues you might encounter while using the template."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-white">
        <div className="relative max-w-5xl p-8 mx-auto overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay">
            <svg className="absolute left-0 w-full h-full" viewBox="0 0 800 800">
              <defs>
                <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="white" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
          
          <div className="relative z-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to get started?</h2>
            <p className="mb-8 text-xl text-white/90">
              Start building your next project with this premium template today.
            </p>
            <button className="px-8 py-3 text-lg font-medium transition-all bg-white rounded-lg text-purple-600 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600">
              Start Building Now
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section - NEW */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Stay Updated</h2>
          <p className="mb-6 text-gray-600">
            Subscribe to our newsletter to receive updates, new features, and tips.
          </p>
          <div className="flex flex-col justify-center w-full gap-2 mx-auto md:flex-row md:max-w-xl">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button className="px-6 py-3 font-medium text-white transition-all bg-purple-600 rounded-lg hover:bg-purple-700">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">Template<span className="text-purple-600">.</span></p>
              <p className="mt-4 text-gray-600">A modern, professional template for your next web project.</p>
              <div className="flex gap-4 mt-6">
                {['Twitter', 'GitHub', 'Discord', 'LinkedIn'].map((social) => (
                  <a key={social} href="#" className="text-gray-600 hover:text-gray-900">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Product</h3>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Testimonials', 'Documentation', 'Updates'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-gray-900">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Company</h3>
              <ul className="space-y-2">
                {['About', 'Team', 'Careers', 'Press', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-gray-900">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Legal</h3>
              <ul className="space-y-2">
                {['Terms', 'Privacy', 'Cookies', 'Licenses', 'Settings'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-gray-900">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 mt-8 text-center border-t border-gray-100">
            <p className="text-gray-500">
              © {new Date().getFullYear()} Template. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
