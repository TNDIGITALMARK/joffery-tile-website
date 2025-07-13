'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FadeIn } from './FadeIn';

const steps = [
  {
    id: 1,
    title: 'Initial Consultation',
    description: 'We begin with a thorough consultation to understand your vision, needs, and budget. This helps us create a transformation plan tailored specifically to your space and preferences.',
    image: '/user-asset-1.png',
    duration: '1-2 hours',
    icon: '💬',
    details: [
      'In-depth discussion of your design preferences',
      'Assessment of your space and existing conditions',
      'Exploration of material options and design possibilities',
      'Budget and timeline planning',
      'Addressing any questions or concerns'
    ]
  },
  {
    id: 2,
    title: 'Design & Planning',
    description: 'Our design team creates a detailed plan for your transformation, including material selections, layout designs, and technical specifications to ensure a successful project.',
    image: '/user-asset-2.png',
    duration: '3-5 days',
    icon: '📐',
    details: [
      'Custom design creation based on your preferences',
      'Material selection assistance and samples',
      'Detailed project specifications and requirements',
      'Technical planning for proper installation',
      'Final design approval and project scheduling'
    ]
  },
  {
    id: 3,
    title: 'Preparation & Demolition',
    description: 'We carefully prepare the space and remove existing materials, ensuring proper protection of surrounding areas and efficient disposal of debris.',
    image: '/user-asset-3.png',
    duration: '1-2 days',
    icon: '🔨',
    details: [
      'Protection of surrounding areas and furnishings',
      'Systematic removal of existing materials',
      'Proper disposal of demolition debris',
      'Assessment of substrate conditions',
      'Addressing any underlying issues before installation'
    ]
  },
  {
    id: 4,
    title: 'Professional Installation',
    description: 'Our skilled craftsmen execute the installation with precision and attention to detail, following industry best practices to ensure a flawless finish.',
    image: '/user-asset-4.png',
    duration: '3-10 days',
    icon: '🛠️',
    details: [
      'Substrate preparation and waterproofing (if needed)',
      'Precise layout and installation of tiles',
      'Expert cutting and fitting around fixtures',
      'Proper spacing and alignment for professional results',
      'Daily cleanup and progress updates'
    ]
  },
  {
    id: 5,
    title: 'Finishing Touches',
    description: 'We complete your project with meticulous attention to detail, including grouting, sealing, and final cleaning to reveal the stunning transformation.',
    image: '/user-asset-5.png',
    duration: '1-2 days',
    icon: '✨',
    details: [
      'Professional grouting with color-matched materials',
      'Sealing of grout and natural stone (if applicable)',
      'Installation of trim pieces and transitions',
      'Thorough cleaning and polishing',
      'Final inspection for quality assurance'
    ]
  },
  {
    id: 6,
    title: 'Final Walkthrough',
    description: 'We conduct a comprehensive walkthrough with you to ensure your complete satisfaction with the transformation and address any questions about maintenance.',
    image: '/user-asset-6.png',
    duration: '30 minutes',
    icon: '🎉',
    details: [
      'Detailed inspection of completed work',
      'Demonstration of any new features',
      'Maintenance and care instructions',
      'Warranty information and documentation',
      'Celebration of your beautiful new space!'
    ]
  }
];

export function TransformationProcess() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Step Navigation */}
        <div className="bg-gray-50 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our 6-Step Process</h3>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                  activeStep === step.id
                    ? 'bg-blue-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mr-4 ${
                    activeStep === step.id ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-lg">Step {step.id}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activeStep === step.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step.duration}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${
                      activeStep === step.id ? 'text-blue-100' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step Details */}
        <div className="p-8">
          {steps.map((step) => (
            <FadeIn 
              key={step.id} 
              className={`${activeStep === step.id ? 'block' : 'hidden'}`}
            >
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mr-4">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    <p className="text-blue-700 font-medium">Step {step.id} of 6 • {step.duration}</p>
                  </div>
                </div>
                
                <div className="relative h-48 rounded-lg overflow-hidden mb-6 shadow-lg">
                  <Image
                    src={step.image}
                    alt={`${step.title} process image`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {step.description}
                </p>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {step.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-gray-100 px-8 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Process Progress</span>
          <span className="text-sm text-gray-600">{activeStep} of {steps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-700 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(activeStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white px-8 py-4 flex justify-between">
        <button
          onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
          disabled={activeStep === 1}
          className="flex items-center px-4 py-2 text-blue-700 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous Step
        </button>
        
        <button
          onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
          disabled={activeStep === steps.length}
          className="flex items-center px-4 py-2 text-blue-700 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Next Step
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}