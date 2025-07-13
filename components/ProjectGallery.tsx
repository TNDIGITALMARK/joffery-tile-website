'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { FadeIn } from './FadeIn';

const projects = [
  {
    id: 1,
    title: 'Modern Bathroom Renovation',
    category: 'bathroom',
    location: 'Sacramento, CA',
    description: 'Complete transformation of an outdated bathroom into a modern spa-like retreat with large format porcelain tiles and custom shower niche.',
    beforeImage: '/user-asset-1.png',
    afterImage: '/user-asset-2.png',
    duration: '2 Weeks',
    materials: 'Porcelain Tile, Custom Mosaic'
  },
  {
    id: 2,
    title: 'Contemporary Kitchen Backsplash',
    category: 'kitchen',
    location: 'Folsom, CA',
    description: 'Installation of a stunning geometric backsplash that transformed this kitchen from basic to breathtaking with custom tile pattern.',
    beforeImage: '/user-asset-3.png',
    afterImage: '/user-asset-4.png',
    duration: '1 Week',
    materials: 'Ceramic Subway Tile, Decorative Border'
  },
  {
    id: 3,
    title: 'Luxury Master Bathroom',
    category: 'bathroom',
    location: 'El Dorado Hills, CA',
    description: 'Complete renovation of a master bathroom featuring marble-look porcelain tile, custom shower, and heated floors for ultimate comfort.',
    beforeImage: '/user-asset-5.png',
    afterImage: '/user-asset-6.png',
    duration: '3 Weeks',
    materials: 'Marble-look Porcelain, Heated Floors'
  },
  {
    id: 4,
    title: 'Elegant Entryway Flooring',
    category: 'flooring',
    location: 'Roseville, CA',
    description: 'Transformation of a dated entryway with stunning porcelain tile in a decorative pattern that creates a welcoming first impression.',
    beforeImage: '/user-asset-1.png',
    afterImage: '/user-asset-3.png',
    duration: '1 Week',
    materials: 'Large Format Porcelain, Decorative Inlay'
  },
  {
    id: 5,
    title: 'Commercial Office Renovation',
    category: 'commercial',
    location: 'Sacramento, CA',
    description: 'Complete flooring renovation for a professional office space using durable, low-maintenance porcelain tile with a modern concrete look.',
    beforeImage: '/user-asset-2.png',
    afterImage: '/user-asset-4.png',
    duration: '2 Weeks',
    materials: 'Commercial Grade Porcelain'
  },
  {
    id: 6,
    title: 'Outdoor Patio Transformation',
    category: 'outdoor',
    location: 'Granite Bay, CA',
    description: 'Renovation of an outdoor living space with frost-resistant porcelain pavers, creating a beautiful and durable entertainment area.',
    beforeImage: '/user-asset-5.png',
    afterImage: '/user-asset-1.png',
    duration: '2 Weeks',
    materials: 'Frost-resistant Porcelain Pavers'
  },
];

interface ProjectGalleryProps {
  activeFilter?: string;
}

export function ProjectGallery({ activeFilter = 'all' }: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentFilter, setCurrentFilter] = useState(activeFilter);

  const filteredProjects = currentFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === currentFilter);

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {['all', 'bathroom', 'kitchen', 'flooring', 'commercial', 'outdoor'].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              currentFilter === filter
                ? 'bg-blue-700 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div 
            key={project.id}
            className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] group"
          >
            <div 
              className="relative h-64 cursor-pointer overflow-hidden"
              onClick={() => setSelectedProject(project.id)}
            >
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                beforeAlt={`Before image of ${project.title}`}
                afterAlt={`After image of ${project.title}`}
                height={256}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-gray-900 font-medium">
                  View Details
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  {project.category}
                </span>
              </div>
              <p className="text-sm text-blue-700 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {project.location}
              </p>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Duration:</span> {project.duration}
                </div>
                <button
                  onClick={() => setSelectedProject(project.id)}
                  className="text-blue-700 font-medium flex items-center hover:text-blue-800 transition-colors text-sm"
                >
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" 
          onClick={() => setSelectedProject(null)}
        >
          <FadeIn className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const project = projects.find(p => p.id === selectedProject);
              if (!project) return null;
              
              return (
                <div>
                  <div className="relative h-[50vh]">
                    <BeforeAfterSlider
                      beforeImage={project.beforeImage}
                      afterImage={project.afterImage}
                      beforeAlt={`Before image of ${project.title}`}
                      afterAlt={`After image of ${project.title}`}
                      height={500}
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h2>
                        <p className="text-blue-700 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {project.location}
                        </p>
                      </div>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-xl font-medium text-gray-900 mb-3">Project Overview</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                      <p className="text-gray-600 leading-relaxed">
                        This transformation showcases our attention to detail and commitment to quality craftsmanship. 
                        We worked closely with the client to select materials and design elements that would create a 
                        space that is both beautiful and functional, ensuring long-lasting satisfaction.
                      </p>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-xl font-medium text-gray-900 mb-4">Project Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Project Type</p>
                          <p className="font-medium text-gray-900">{project.category.charAt(0).toUpperCase() + project.category.slice(1)} Renovation</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Location</p>
                          <p className="font-medium text-gray-900">{project.location}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Duration</p>
                          <p className="font-medium text-gray-900">{project.duration}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Materials Used</p>
                          <p className="font-medium text-gray-900">{project.materials}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-medium text-gray-900 mb-4">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="space-y-2">
                          <li className="flex items-center text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Premium quality materials
                          </li>
                          <li className="flex items-center text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Professional installation techniques
                          </li>
                          <li className="flex items-center text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Custom design elements
                          </li>
                        </ul>
                        <ul className="space-y-2">
                          <li className="flex items-center text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Waterproof installation
                          </li>
                          <li className="flex items-center text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Lifetime warranty
                          </li>
                          <li className="flex items-center text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            On-time completion
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <a 
                        href="/contact" 
                        className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-medium transition duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                      >
                        Request a Similar Transformation
                      </a>
                    </div>
                  </div>
                </div>
              );
            })()}
          </FadeIn>
        </div>
      )}
    </div>
  );
}