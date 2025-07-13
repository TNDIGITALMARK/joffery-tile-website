'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Star, Shield, Award, Phone, Mail, MapPin, CheckCircle, Clock, Users, Hammer, Home as HomeIcon, Building2, Palette, Heart } from 'lucide-react';

// SEO Metadata (handled by layout, but structured data here)
const businessData = {
  "@context": "https://schema.org",
  "@type": "HomeImprovementBusiness",
  "name": "Joffery Tile",
  "description": "Sacramento's premier tile installation specialists. Expert bathroom renovations, kitchen backsplashes, and flooring installation.",
  "telephone": "(416) 984-8290",
  "email": "tylerthomlinson@icloud.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sacramento",
    "addressRegion": "CA",
    "addressCountry": "US"
  },
  "areaServed": "Sacramento County, CA",
  "priceRange": "$5,000 - $50,000+",
  "yearsInOperation": "25+"
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // User asset images for carousel
  const heroImages = [
    '/user-asset-1.png',
    '/user-asset-2.png',
    '/user-asset-3.png',
    '/user-asset-4.png',
    '/user-asset-5.png',
    '/user-asset-6.png'
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Image carousel rotation
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessData),
        }}
      />
      
    <main className="min-h-screen">
      {/* Hero Section - The Showstopper */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 animate-gradient-shift" />
        
        {/* Hero Image Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-30' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`Joffery Tile professional work showcase ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Sacramento's Premier
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                Tile Specialists
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your space with expert tile installation. From stunning bathroom renovations to custom kitchen backsplashes, we deliver craftsmanship that lasts a lifetime.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                Get Free Quote
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </button>
              
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200">
                View Our Work
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-300">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>500+ Projects Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-teal-400" />
                <span>25+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Joffery Tile?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don't just install tiles—we transform spaces with precision, artistry, and unmatched attention to detail.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Hammer className="w-12 h-12 text-blue-600" />,
                title: "Expert Craftsmanship",
                description: "25+ years of specialized tile installation experience with meticulous attention to detail and superior quality standards."
              },
              {
                icon: <Clock className="w-12 h-12 text-teal-600" />,
                title: "On-Time Delivery",
                description: "We respect your schedule and complete projects on time, every time. No delays, no excuses, just professional service."
              },
              {
                icon: <Shield className="w-12 h-12 text-green-600" />,
                title: "Warranty Guarantee",
                description: "Every installation backed by comprehensive warranty coverage for your peace of mind and long-term protection."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-lg hover:scale-105 transition-transform duration-200 fade-in bg-gray-50">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Tile Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From residential bathrooms to commercial spaces, we handle every type of tile project with expertise and precision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <HomeIcon className="w-8 h-8" />,
                title: "Bathroom Renovations",
                description: "Complete bathroom transformations with waterproof installation and stunning design.",
                image: '/user-asset-1.png'
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Kitchen Backsplashes",
                description: "Custom kitchen backsplashes that combine functionality with beautiful aesthetics.",
                image: '/user-asset-2.png'
              },
              {
                icon: <Building2 className="w-8 h-8" />,
                title: "Flooring Installation",
                description: "Durable, beautiful tile flooring for residential and commercial applications.",
                image: '/user-asset-3.png'
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Custom Design",
                description: "Unique tile patterns and custom designs that reflect your personal style.",
                image: '/user-asset-4.png'
              }
            ].map((service, index) => (
              <div key={index} className="group cursor-pointer fade-in">
                <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      {service.icon}
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    </div>
                    <p className="text-sm text-gray-200">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof & Statistics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 fade-in">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "25+", label: "Years Experience" },
              { number: "100%", label: "Customer Satisfaction" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Homeowner",
                content: "Joffery Tile transformed our bathroom into a spa-like retreat. The attention to detail and craftsmanship exceeded our expectations.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b882?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
              },
              {
                name: "Mike Chen",
                role: "Contractor",
                content: "As a general contractor, I trust Joffery Tile for all my tile installations. They're reliable, professional, and deliver exceptional quality.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
              },
              {
                name: "Lisa Rodriguez",
                role: "Business Owner",
                content: "They completed our restaurant renovation on time and within budget. The tile work is beautiful and has held up perfectly.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg fade-in">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About/Story Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Built on Craftsmanship, Driven by Excellence
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                For over 25 years, Joffery Tile has been Sacramento's trusted tile installation specialist. What started as a passion for transforming spaces has grown into a legacy of exceptional craftsmanship.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                We believe every project tells a story. Whether it's a family bathroom renovation, a stunning kitchen backsplash, or a commercial space transformation, we approach each project with the same dedication to quality and attention to detail.
              </p>

              <div className="space-y-4">
                {[
                  "Licensed and insured professionals",
                  "Specialized tile installation expertise",
                  "Serving Sacramento and surrounding areas",
                  "Commitment to customer satisfaction"
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-teal-400 flex-shrink-0" />
                    <span className="text-gray-300">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-in">
              <div className="relative">
                <Image
                  src="/user-asset-5.png"
                  alt="Joffery Tile team and workspace"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                  <div className="text-3xl font-bold">25+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section className="py-20 pb-32 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Contact Sacramento's premier tile specialists today for a free consultation and quote. Let's bring your vision to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 fade-in">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-blue-200" />
                  <div>
                    <div className="font-semibold">(416) 984-8290</div>
                    <div className="text-blue-200 text-sm">Call for immediate assistance</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-blue-200" />
                  <div>
                    <div className="font-semibold">tylerthomlinson@icloud.com</div>
                    <div className="text-blue-200 text-sm">Email for quotes and inquiries</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-blue-200" />
                  <div>
                    <div className="font-semibold">Sacramento & Surrounding Areas</div>
                    <div className="text-blue-200 text-sm">Serving all of Sacramento County</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                <h4 className="font-bold mb-2">Business Hours</h4>
                <div className="text-blue-100 text-sm space-y-1">
                  <div>Monday - Friday: 7:00 AM - 6:00 PM</div>
                  <div>Saturday: 8:00 AM - 4:00 PM</div>
                  <div>Sunday: Emergency calls only</div>
                </div>
              </div>
            </div>

            {/* Quote Request Form */}
            <div className="lg:col-span-2 fade-in">
              <div className="bg-white text-gray-900 p-8 rounded-lg shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 text-center">Request Your Free Quote</h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Type
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select project type</option>
                      <option value="bathroom">Bathroom Renovation</option>
                      <option value="kitchen">Kitchen Backsplash</option>
                      <option value="flooring">Flooring Installation</option>
                      <option value="commercial">Commercial Project</option>
                      <option value="custom">Custom Design</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please describe your project in detail, including size, timeline, and any specific requirements..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-20k">$10,000 - $20,000</option>
                      <option value="20k-50k">$20,000 - $50,000</option>
                      <option value="over-50k">Over $50,000</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Get My Free Quote
                  </button>

                  <p className="text-sm text-gray-600 text-center">
                    * Required fields. We'll respond within 24 hours with your detailed quote.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="text-center mt-16 fade-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 inline-block">
              <h4 className="text-xl font-bold mb-2">Need Emergency Tile Repair?</h4>
              <p className="text-blue-100 mb-4">Available 24/7 for urgent tile repairs and emergencies</p>
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Call Emergency Line: (416) 984-8290
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }

        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 600ms ease-out, transform 600ms ease-out;
        }

        .fade-in.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stagger animation delays */
        .fade-in:nth-child(1) { transition-delay: 0ms; }
        .fade-in:nth-child(2) { transition-delay: 100ms; }
        .fade-in:nth-child(3) { transition-delay: 200ms; }
        .fade-in:nth-child(4) { transition-delay: 300ms; }
      `}</style>
    </main>
    </>
  );
}