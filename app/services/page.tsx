'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  Star, Shield, Award, Phone, Mail, MapPin, Clock, Users, Home, Building2, Palette, Heart, ArrowRight, Droplets, 
  Thermometer, Eye, Wrench, Zap, Globe 
} from 'lucide-react';

// SEO and Structured Data
const servicesData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Tile Renovation Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joffery Tile",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sacramento",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "telephone": "(416) 984-8290",
    "email": "tylerthomlinson@icloud.com"
  },
  "areaServed": "Sacramento County, CA",
  "serviceType": "Tile Installation and Renovation",
  "description": "Professional tile installation and renovation services for bathrooms, kitchens, floors, and custom designs in Sacramento, CA.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tile Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Bathroom Renovations",
          "description": "Complete bathroom tile renovation and installation services"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Kitchen Backsplashes",
          "description": "Custom kitchen backsplash design and installation"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Flooring Installation",
          "description": "Professional tile flooring installation for residential and commercial properties"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Tile Design",
          "description": "Unique custom tile patterns and artistic installations"
        }
      }
    ]
  }
};

export default function TileRenovationServices() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer for scroll animations
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
          __html: JSON.stringify(servicesData),
        }}
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 animate-gradient-shift" />
          
          {/* Hero Image - Prioritizing User Asset */}
          <div className="absolute inset-0 opacity-30">
            <Image
              src="/user-asset-1.png"
              alt="Professional tile renovation showcase - Joffery Tile Sacramento"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Expert Tile Renovation
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                  Services in Sacramento
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
                Transform your space with Sacramento's premier tile specialists. From stunning bathroom renovations to custom kitchen backsplashes and premium flooring solutions, we deliver craftsmanship that lasts a lifetime.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link 
                  href="#quote-request" 
                  className="group bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Request Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform inline-block" />
                </Link>
                
                <Link 
                  href="#services" 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
                >
                  Explore Our Services
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-gray-300">
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

        {/* Services Overview Section */}
        <section id="services" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-16 fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Comprehensive Tile Renovation Solutions
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                At Joffery Tile, we specialize in transforming ordinary spaces into extraordinary showcases through expert tile installation. Our comprehensive services are designed to meet the unique needs of homeowners, contractors, and commercial clients throughout Sacramento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Service Card 1 - Using User Asset 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl fade-in">
                <div className="h-56 relative">
                  <Image 
                    src="/user-asset-2.png"
                    alt="Bathroom tile renovation showcase"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-blue-600 text-white p-2 rounded-full">
                      <Home className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Bathroom Renovations</h3>
                  <p className="text-gray-700 mb-4">
                    Transform your bathroom with our expert tile installation services. From shower walls to floor tiling, we create waterproof, beautiful spaces built to last.
                  </p>
                  <Link 
                    href="#bathroom-renovations" 
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 flex items-center"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Service Card 2 - Using User Asset 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl fade-in">
                <div className="h-56 relative">
                  <Image 
                    src="/user-asset-3.png"
                    alt="Kitchen backsplash installation showcase"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-teal-600 text-white p-2 rounded-full">
                      <Palette className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Kitchen Backsplashes</h3>
                  <p className="text-gray-700 mb-4">
                    Elevate your kitchen with a stunning backsplash that combines beauty and functionality. We offer a wide range of styles from classic subway tiles to intricate mosaics.
                  </p>
                  <Link 
                    href="#kitchen-backsplashes" 
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 flex items-center"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Service Card 3 - Using User Asset 4 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl fade-in">
                <div className="h-56 relative">
                  <Image 
                    src="/user-asset-4.png"
                    alt="Tile flooring installation showcase"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-green-600 text-white p-2 rounded-full">
                      <Building2 className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Flooring Installation</h3>
                  <p className="text-gray-700 mb-4">
                    Create durable, beautiful floors with our expert tile installation. From porcelain and ceramic to natural stone, we deliver flawless results built to withstand daily use.
                  </p>
                  <Link 
                    href="#flooring-installation" 
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 flex items-center"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Service Card 4 - Using User Asset 5 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl fade-in">
                <div className="h-56 relative">
                  <Image 
                    src="/user-asset-5.png"
                    alt="Custom tile design showcase"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-purple-600 text-white p-2 rounded-full">
                      <Heart className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Tile Design</h3>
                  <p className="text-gray-700 mb-4">
                    Express your unique style with our custom tile design services. From intricate mosaics to one-of-a-kind patterns, we bring your creative vision to life.
                  </p>
                  <Link 
                    href="#custom-tile-design" 
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 flex items-center"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bathroom Renovations Section */}
        <section id="bathroom-renovations" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-1/2 fade-in">
                <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="/user-asset-6.png"
                    alt="Luxury bathroom renovation with custom tile work"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 fade-in">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Bathroom Renovation Expertise
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Your bathroom is more than just a functional space—it's a personal sanctuary. At Joffery Tile, we specialize in transforming ordinary bathrooms into luxurious retreats through expert tile installation. Our comprehensive bathroom renovation services combine technical expertise with design excellence to create spaces that are both beautiful and built to last.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From waterproofing and proper substrate preparation to flawless tile installation, we handle every aspect of your bathroom renovation with meticulous attention to detail. Our team specializes in shower enclosures, tub surrounds, bathroom floors, accent walls, and custom features that elevate your space.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Bathroom Renovation Services Include:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: <Droplets className="w-5 h-5" />, text: "Shower tile installation" },
                    { icon: <Home className="w-5 h-5" />, text: "Bathtub surrounds" },
                    { icon: <Building2 className="w-5 h-5" />, text: "Bathroom floor tiling" },
                    { icon: <Palette className="w-5 h-5" />, text: "Custom feature walls" },
                    { icon: <Eye className="w-5 h-5" />, text: "Vanity backsplashes" },
                    { icon: <Shield className="w-5 h-5" />, text: "Waterproofing systems" },
                    { icon: <Thermometer className="w-5 h-5" />, text: "Heated floor installation" },
                    { icon: <Users className="w-5 h-5" />, text: "Accessibility modifications" }
                  ].map((service, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                        {service.icon}
                      </div>
                      <span className="text-gray-700">{service.text}</span>
                    </div>
                  ))}
                </div>
                
                <Link 
                  href="#quote-request" 
                  className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Request a Bathroom Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Kitchen Backsplashes Section */}
        <section id="kitchen-backsplashes" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="w-full lg:w-1/2 fade-in">
                <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="/user-asset-2.png"
                    alt="Modern kitchen with custom backsplash"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 fade-in">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Kitchen Backsplash Specialists
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  The kitchen backsplash is more than just a practical element—it's an opportunity to add personality and style to the heart of your home. At Joffery Tile, we specialize in creating stunning kitchen backsplashes that combine beauty with durability, protecting your walls while making a design statement.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our expert team works with a wide range of materials, from classic subway tiles to intricate mosaics, natural stone, and contemporary large-format tiles. We help you navigate the countless options to find the perfect backsplash solution that complements your countertops, cabinetry, and overall kitchen design.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Backsplash Options:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-5 rounded-lg shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">Subway Tile</h4>
                    <p className="text-gray-700">Classic, timeless design that works in traditional and modern kitchens. Available in countless colors and finishes.</p>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">Mosaic Tile</h4>
                    <p className="text-gray-700">Intricate designs using small tiles to create patterns, images, or texture. Perfect for creating a focal point.</p>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">Natural Stone</h4>
                    <p className="text-gray-700">Marble, travertine, and slate offer unique natural patterns and textures for an organic, luxurious look.</p>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">Glass Tile</h4>
                    <p className="text-gray-700">Reflective surfaces that brighten kitchens and create a sense of depth. Available in countless colors and finishes.</p>
                  </div>
                </div>
                
                <Link 
                  href="#quote-request" 
                  className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Design Your Kitchen Backsplash
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Flooring Installation Section */}
        <section id="flooring-installation" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-1/2 fade-in">
                <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="/user-asset-3.png"
                    alt="Modern tile flooring installation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 fade-in">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Premium Tile Flooring Solutions
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Tile flooring combines timeless beauty with unmatched durability, making it the perfect choice for Sacramento homes and businesses. At Joffery Tile, we specialize in creating stunning tile floors that withstand the demands of daily life while elevating your space with exceptional design.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our flooring installation process begins with thorough substrate preparation—the foundation of a long-lasting tile floor. We address any subfloor issues, ensure proper leveling, and install appropriate underlayment systems before laying a single tile. This meticulous approach prevents future problems like cracking, lippage, or moisture damage.
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Flooring Expertise Includes:</h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: <Building2 className="w-6 h-6 text-blue-600" />,
                        title: "Porcelain & Ceramic Tile",
                        description: "Durable, water-resistant options ideal for high-traffic areas, available in countless styles."
                      },
                      {
                        icon: <Globe className="w-6 h-6 text-blue-600" />,
                        title: "Natural Stone Flooring",
                        description: "Marble, travertine, slate, and limestone installations with proper sealing for longevity."
                      },
                      {
                        icon: <Zap className="w-6 h-6 text-blue-600" />,
                        title: "Large Format Tile Installation",
                        description: "Specialized techniques for installing oversized tiles that create a seamless, contemporary look."
                      },
                      {
                        icon: <Thermometer className="w-6 h-6 text-blue-600" />,
                        title: "Heated Floor Systems",
                        description: "Integration of radiant heating systems beneath tile floors for year-round comfort."
                      }
                    ].map((expertise, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                          {expertise.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{expertise.title}</h4>
                          <p className="text-gray-700">{expertise.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Link 
                  href="#quote-request" 
                  className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Explore Flooring Options
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Tile Design Section */}
        <section id="custom-tile-design" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="w-full lg:w-1/2 fade-in">
                <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="/user-asset-4.png"
                    alt="Custom mosaic tile design"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 fade-in">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Custom Tile Design & Artistic Installations
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  For homeowners and businesses seeking truly unique spaces, our custom tile design services transform ordinary rooms into extraordinary showcases. At Joffery Tile, we combine technical expertise with artistic vision to create one-of-a-kind tile installations that reflect your personal style and elevate your space.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our design process begins with understanding your vision, architectural elements, and functional requirements. We then develop custom patterns, mosaics, or feature elements that make a statement while seamlessly integrating with your overall design scheme. From concept to completion, we handle every aspect of bringing your unique tile design to life.
                </p>
                
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Design Possibilities:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Mosaic feature walls", "Decorative borders", "Inlaid patterns", "Medallion designs",
                      "Mixed material designs", "Custom shower niches", "Waterjet cut designs", "Artistic murals"
                    ].map((possibility, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{possibility}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Custom Design Process:</h3>
                  <div className="space-y-4">
                    {[
                      {
                        step: "1",
                        title: "Consultation & Concept Development",
                        description: "We discuss your vision, preferences, and requirements to develop initial design concepts."
                      },
                      {
                        step: "2", 
                        title: "Material Selection & Design Refinement",
                        description: "We help you select the perfect materials and refine the design for optimal visual impact."
                      },
                      {
                        step: "3",
                        title: "Precision Installation", 
                        description: "Our skilled artisans execute the design with meticulous attention to detail and technical excellence."
                      },
                      {
                        step: "4",
                        title: "Final Finishing & Protection",
                        description: "We apply appropriate sealing and finishing treatments to protect your custom design for years to come."
                      }
                    ].map((process, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-semibold flex-shrink-0">
                          {process.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{process.title}</h4>
                          <p className="text-gray-700">{process.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Link 
                  href="#quote-request" 
                  className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Discuss Your Custom Design
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-16 fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Joffery Tile
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                When you choose Joffery Tile for your renovation project, you're partnering with Sacramento's premier tile specialists. Our commitment to quality craftsmanship, attention to detail, and customer satisfaction sets us apart.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="w-8 h-8 text-blue-600" />,
                  title: "Specialized Expertise",
                  description: "Unlike general contractors, we focus exclusively on tile installation, giving us specialized knowledge and techniques that ensure superior results. Our team stays current with the latest industry innovations and best practices."
                },
                {
                  icon: <Wrench className="w-8 h-8 text-blue-600" />,
                  title: "Customized Solutions", 
                  description: "We understand that every project is unique. Our approach is tailored to your specific needs, preferences, and space requirements. We work closely with you to develop personalized solutions that achieve your vision while addressing practical considerations."
                },
                {
                  icon: <Users className="w-8 h-8 text-blue-600" />,
                  title: "Clear Communication",
                  description: "We believe in transparent, consistent communication throughout your project. From initial consultation to final walkthrough, we keep you informed and involved. Our process eliminates surprises and ensures your vision is realized exactly as planned."
                },
                {
                  icon: <MapPin className="w-8 h-8 text-blue-600" />,
                  title: "Local Sacramento Expertise",
                  description: "As a Sacramento-based company, we understand the local market, building codes, and regional design preferences. Our deep roots in the community give us unique insights that benefit your project and ensure compliance with all local requirements."
                },
                {
                  icon: <Award className="w-8 h-8 text-blue-600" />,
                  title: "Quality Guarantee",
                  description: "We stand behind our work with comprehensive warranties and quality guarantees. Our commitment to excellence means you can trust that your tile installation will look beautiful and perform flawlessly for years to come."
                },
                {
                  icon: <Clock className="w-8 h-8 text-blue-600" />,
                  title: "Timely Completion",
                  description: "We respect your time and understand the importance of completing projects on schedule. Our efficient planning and project management ensure timely completion without compromising quality or attention to detail."
                }
              ].map((reason, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl fade-in"
                >
                  <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    {reason.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Request Section */}
        <section id="quote-request" className="py-20 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Space?
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Contact Sacramento's premier tile specialists today for a free consultation and quote. Let's bring your vision to life with expert craftsmanship and unmatched attention to detail.
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