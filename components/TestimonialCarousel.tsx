'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    location: 'Sacramento, CA',
    content: 'Joffery Tile transformed our bathroom into a spa-like retreat. The attention to detail and craftsmanship exceeded our expectations. The before and after difference is absolutely stunning!',
    rating: 5,
    project: 'Bathroom Renovation',
    beforeImage: '/user-asset-1.png',
    afterImage: '/user-asset-2.png',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b882?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'General Contractor',
    location: 'Folsom, CA',
    content: 'As a general contractor, I trust Joffery Tile for all my tile installations. They\'re reliable, professional, and deliver exceptional quality every time. My clients are always thrilled with the results.',
    rating: 5,
    project: 'Kitchen Backsplash',
    beforeImage: '/user-asset-3.png',
    afterImage: '/user-asset-4.png',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 3,
    name: 'Lisa Rodriguez',
    role: 'Restaurant Owner',
    location: 'Roseville, CA',
    content: 'They completed our restaurant renovation on time and within budget. The tile work is beautiful and has held up perfectly to heavy commercial use. Highly recommend for any business.',
    rating: 5,
    project: 'Commercial Flooring',
    beforeImage: '/user-asset-5.png',
    afterImage: '/user-asset-6.png',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Homeowner',
    location: 'El Dorado Hills, CA',
    content: 'The transformation of our master bathroom was incredible. From the initial design consultation to the final walkthrough, everything was handled professionally. The quality of work is outstanding.',
    rating: 5,
    project: 'Master Bathroom',
    beforeImage: '/user-asset-2.png',
    afterImage: '/user-asset-1.png',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 5,
    name: 'Jennifer Walsh',
    role: 'Interior Designer',
    location: 'Granite Bay, CA',
    content: 'I\'ve worked with many tile installers over the years, but Joffery Tile consistently delivers the highest quality work. Their attention to detail and commitment to excellence is unmatched.',
    rating: 5,
    project: 'Luxury Home',
    beforeImage: '/user-asset-4.png',
    afterImage: '/user-asset-3.png',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  }
];

export function TestimonialCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const current = testimonials[currentTestimonial];

  return (
    <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Before/After Images */}
        <div className="relative h-64 lg:h-auto bg-gray-100">
          <div className="absolute inset-0 grid grid-cols-2">
            <div className="relative">
              <Image
                src={current.beforeImage}
                alt={`Before image of ${current.project}`}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-opacity duration-500"
              />
              <div className="absolute top-4 left-4 bg-red-600/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                BEFORE
              </div>
            </div>
            <div className="relative">
              <Image
                src={current.afterImage}
                alt={`After image of ${current.project}`}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-opacity duration-500"
              />
              <div className="absolute top-4 right-4 bg-green-600/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                AFTER
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
            {current.project}
          </div>
        </div>

        {/* Testimonial Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          {/* Rating Stars */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(current.rating)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed">
            "{current.content}"
          </blockquote>

          {/* Author Info */}
          <div className="flex items-center">
            <Image
              src={current.avatar}
              alt={current.name}
              width={60}
              height={60}
              className="rounded-full object-cover mr-4"
            />
            <div>
              <div className="font-bold text-gray-900 text-lg">{current.name}</div>
              <div className="text-blue-700 font-medium">{current.role}</div>
              <div className="text-gray-600 text-sm flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {current.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button
          onClick={prevTestimonial}
          className="w-12 h-12 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button
          onClick={nextTestimonial}
          className="w-12 h-12 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 lg:bottom-8">
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentTestimonial
                  ? 'bg-blue-700 shadow-lg'
                  : 'bg-white/70 hover:bg-white/90'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Auto-play Toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center ${
            isAutoPlaying
              ? 'bg-blue-700/90 text-white'
              : 'bg-white/90 text-gray-700'
          }`}
          title={isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
        >
          {isAutoPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1" />
            </svg>
          )}
        </button>
      </div>

      {/* Testimonial Counter */}
      <div className="absolute top-4 left-4">
        <div className="bg-black/70 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
          {currentTestimonial + 1} of {testimonials.length}
        </div>
      </div>
    </div>
  );
}