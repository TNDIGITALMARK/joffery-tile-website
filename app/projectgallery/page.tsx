'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Star, Search, ArrowRight, Grid3X3, List, Clock, Phone, Mail, MapPin } from 'lucide-react';

export default function ProjectGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsVisible(true);
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

  const projects = [
    {
      id: 1,
      title: "Modern Subway Tile Bathroom",
      category: "bathroom",
      location: "Sacramento, CA",
      image: "/user-asset-1.png",
      description: "Complete bathroom renovation featuring classic white subway tile with contrasting dark grout, custom niche, and hexagon floor tiles.",
      duration: "12 days",
      featured: true
    },
    {
      id: 2,
      title: "Marble Herringbone Backsplash",
      category: "kitchen",
      location: "Folsom, CA",
      image: "/user-asset-2.png",
      description: "Elegant kitchen renovation featuring Carrara marble tiles in a herringbone pattern, extending from countertop to ceiling.",
      duration: "5 days",
      featured: true
    },
    {
      id: 3,
      title: "Wood-Look Porcelain Flooring",
      category: "flooring",
      location: "Roseville, CA",
      image: "/user-asset-3.png",
      description: "Open concept living area featuring durable wood-look porcelain tile flooring with seamless installation and custom transition details.",
      duration: "8 days",
      featured: false
    },
    {
      id: 4,
      title: "Luxury Mosaic Shower Design",
      category: "bathroom",
      location: "El Dorado Hills, CA",
      image: "/user-asset-4.png",
      description: "Master bathroom featuring custom glass mosaic tile shower with rainfall showerhead, built-in bench, and coordinating floor tile.",
      duration: "15 days",
      featured: true
    },
    {
      id: 5,
      title: "Geometric Pattern Backsplash",
      category: "kitchen",
      location: "Davis, CA",
      image: "/user-asset-5.png",
      description: "Contemporary kitchen featuring bold geometric pattern cement tiles as a statement backsplash with coordinating quartz countertops.",
      duration: "4 days",
      featured: false
    },
    {
      id: 6,
      title: "Corporate Office Lobby",
      category: "commercial",
      location: "Sacramento, CA",
      image: "/user-asset-6.png",
      description: "Modern office lobby featuring large-format porcelain tiles in a staggered pattern with precision installation and minimal grout lines.",
      duration: "10 days",
      featured: false
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = selectedFilter === 'all' || project.category === selectedFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'bathroom', label: 'Bathroom Renovations' },
    { id: 'kitchen', label: 'Kitchen Backsplashes' },
    { id: 'flooring', label: 'Floor Installations' },
    { id: 'custom', label: 'Custom Designs' },
    { id: 'commercial', label: 'Commercial Projects' }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      bathroom: 'bg-blue-600',
      kitchen: 'bg-amber-600',
      flooring: 'bg-green-600',
      custom: 'bg-purple-600',
      commercial: 'bg-gray-600'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-600';
  };

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-[1]"></div>
        <Image
          src="/user-asset-1.png"
          alt="Stunning tile installation showcase"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-[2] container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our Project Gallery
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Explore our portfolio of stunning tile installations and renovations across Sacramento and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#gallery" 
                className="bg-white text-gray-900 hover:bg-gray-100 transition-all px-8 py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                View Gallery <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link 
                href="/contact" 
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all px-8 py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Introduction */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Craftsmanship That Speaks For Itself</h2>
            <p className="text-lg text-gray-700 mb-8">
              At Joffery Tile, we take pride in transforming ordinary spaces into extraordinary showcases of craftsmanship and design. Our gallery features a diverse collection of completed projects that demonstrate our expertise in tile installation across bathrooms, kitchens, floors, and custom designs. Each project represents our commitment to quality, attention to detail, and dedication to exceeding client expectations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-gray-700">100+ Projects</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-gray-700">Sacramento Area</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="text-gray-700">5-Star Rated</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-gray-700">Professional Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Filter Section */}
      <section id="gallery" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse Our Projects</h2>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <input 
                    type="text" 
                    placeholder="Search projects..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 w-full focus:outline-none"
                  />
                  <button className="bg-gray-100 px-4 py-2 text-gray-600 hover:bg-gray-200 transition-colors">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-gray-700' : 'bg-white text-gray-400 hover:bg-gray-100'}`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-gray-700' : 'bg-white text-gray-400 hover:bg-gray-100'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8 fade-in">
            {filters.map((filter) => (
              <button 
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedFilter === filter.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          {/* Gallery Grid */}
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'} fade-in`}>
            {filteredProjects.map((project) => (
              <div key={project.id} className={`group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${viewMode === 'list' ? 'flex gap-6' : ''}`}>
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-80 h-48 flex-shrink-0' : 'h-64'}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute top-4 left-4 text-white text-sm font-medium px-3 py-1 rounded-full ${getCategoryColor(project.category)}`}>
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      FEATURED
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">{project.location}</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{project.duration}</span>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
              <button 
                onClick={() => {setSelectedFilter('all'); setSearchTerm('');}}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filters and show all projects
              </button>
            </div>
          )}
          
          {/* Load More Button */}
          <div className="mt-12 text-center fade-in">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors hover:scale-[1.02]">
              Load More Projects
            </button>
          </div>
        </div>
      </section>

      {/* Before & After Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Before & After Transformations</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              See the dramatic difference our tile installations make. Slide to compare the before and after results of some of our most impressive renovation projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Before & After Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg fade-in">
              <div className="relative h-80 bg-gray-200">
                <Image
                  src="/user-asset-1.png"
                  alt="Master bathroom before and after transformation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/80 pointer-events-none"></div>
                <div className="absolute top-4 left-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                  Hover to reveal transformation
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Master Bathroom Renovation</h3>
                <p className="text-gray-600 mb-4">
                  Transformed an outdated 1990s bathroom into a modern spa-like retreat with large format porcelain tile, custom shower niche, and heated floors.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-sm text-gray-500">Completed in 12 days</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    View Project <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Before & After Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg fade-in">
              <div className="relative h-80 bg-gray-200">
                <Image
                  src="/user-asset-2.png"
                  alt="Kitchen before and after transformation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/80 pointer-events-none"></div>
                <div className="absolute top-4 left-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                  Hover to reveal transformation
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Kitchen Transformation</h3>
                <p className="text-gray-600 mb-4">
                  Revitalized a dated kitchen with a stunning marble-look porcelain backsplash extending to the ceiling, creating a dramatic focal point.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-sm text-gray-500">Completed in 5 days</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    View Project <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center fade-in">
            <Link 
              href="/before-after" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-lg hover:gap-3 transition-all"
            >
              View All Before & After Projects <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Project Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Project Process</h2>
            <p className="text-lg text-gray-700">
              Every stunning project in our gallery follows our proven process that ensures quality, timeliness, and client satisfaction from start to finish.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Process Step 1 */}
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-md transition-all hover:scale-[1.02] fade-in">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Consultation & Design</h3>
              <p className="text-gray-700">
                We begin with a thorough consultation to understand your vision, needs, and budget. Our design team works with you to select the perfect tiles and create a customized plan for your space.
              </p>
            </div>
            
            {/* Process Step 2 */}
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-md transition-all hover:scale-[1.02] fade-in">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Preparation & Installation</h3>
              <p className="text-gray-700">
                Our skilled technicians meticulously prepare the surface to ensure a perfect foundation. We then install your tile with precision, paying careful attention to every detail from layout to grout lines.
              </p>
            </div>
            
            {/* Process Step 3 */}
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-md transition-all hover:scale-[1.02] fade-in">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Finishing & Maintenance</h3>
              <p className="text-gray-700">
                After installation, we apply appropriate sealants and finishes to protect your investment. We provide detailed care instructions and are always available for future maintenance needs.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center fade-in">
            <Link 
              href="/services" 
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors hover:scale-[1.02] inline-block"
            >
              Learn More About Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from homeowners, contractors, and commercial clients who have experienced our exceptional tile installation services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all fade-in">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6">
                "Joffery Tile transformed our outdated bathroom into a modern oasis. Their attention to detail was impressive, and they completed the project on time and within budget. The subway tile shower with custom niche looks absolutely stunning!"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <Image 
                    src="/user-asset-5.png" 
                    alt="Sarah Johnson" 
                    width={48} 
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Homeowner in Sacramento</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all fade-in">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6">
                "As a general contractor, I've worked with many tile installers, but Joffery Tile stands out for their professionalism and quality. Their team is reliable, skilled, and always delivers exceptional results. They're my go-to for all tile subcontracting."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <Image 
                    src="/user-asset-6.png" 
                    alt="Michael Rodriguez" 
                    width={48} 
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Michael Rodriguez</p>
                  <p className="text-sm text-gray-500">Contractor in Folsom</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all fade-in">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6">
                "We hired Joffery Tile for our restaurant's renovation and couldn't be happier. The large-format tiles in our dining area look incredible and have withstood heavy foot traffic beautifully. Professional work from start to finish."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <Image 
                    src="/user-asset-4.png" 
                    alt="Lisa Rodriguez" 
                    width={48} 
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Lisa Rodriguez</p>
                  <p className="text-sm text-gray-500">Business Owner in Davis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Create Your Own Stunning Project?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Join the hundreds of satisfied clients who have transformed their spaces with Joffery Tile. Contact us today for a free consultation and quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors hover:scale-[1.02] inline-flex items-center justify-center gap-2"
              >
                Get Free Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="tel:(416) 984-8290" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors hover:scale-[1.02] inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" /> Call Now
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="fade-in">
              <Phone className="w-8 h-8 text-blue-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">(416) 984-8290</h3>
              <p className="text-blue-100">Call for immediate assistance</p>
            </div>
            <div className="fade-in">
              <Mail className="w-8 h-8 text-blue-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">tylerthomlinson@icloud.com</h3>
              <p className="text-blue-100">Email for quotes and inquiries</p>
            </div>
            <div className="fade-in">
              <MapPin className="w-8 h-8 text-blue-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Sacramento & Surrounding Areas</h3>
              <p className="text-blue-100">Serving all of Sacramento County</p>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
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
  );
}