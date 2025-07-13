import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { ProjectGallery } from '@/components/ProjectGallery';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { ProjectFilter } from '@/components/ProjectFilter';
import { TransformationProcess } from '@/components/TransformationProcess';
import { FadeIn, FadeInStagger } from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Before-After Transformations - Joffery Tile',
  description: 'Explore our stunning before and after tile transformation projects. See how Joffery Tile can transform your space with professional tile installation and renovation services in Sacramento.',
  openGraph: {
    title: 'Before-After Transformations - Joffery Tile',
    description: 'View our portfolio of stunning before and after tile transformations. Professional tile installation services in Sacramento.',
    images: [
      {
        url: '/user-asset-1.png',
        width: 1200,
        height: 630,
        alt: 'Joffery Tile Transformations',
      },
    ],
    type: 'website',
  },
};

export default function BeforeAfterTransformations() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Stunning Tile <span className="text-blue-700">Transformations</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10">
              Witness the remarkable before and after journeys of our tile renovation projects. 
              Each transformation showcases our commitment to quality craftsmanship and attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link 
                href="/contact" 
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-medium transition duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Request a Quote
              </Link>
              <Link 
                href="#gallery" 
                className="bg-white hover:bg-gray-100 text-blue-700 border-2 border-blue-700 px-8 py-4 rounded-lg font-medium transition duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
              >
                View Transformations
              </Link>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="relative mt-12 mx-auto max-w-5xl rounded-xl overflow-hidden shadow-2xl">
            <BeforeAfterSlider 
              beforeImage="/user-asset-1.png"
              afterImage="/user-asset-2.png"
              beforeAlt="Before renovation - original bathroom tile"
              afterAlt="After renovation - modern bathroom transformation by Joffery Tile"
              height={600}
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-lg md:text-xl font-medium">
                Bathroom Renovation in Sacramento, CA
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Transformation Showcase Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Transformation Showcase
            </h2>
            <p className="text-lg text-gray-600">
              Browse through our collection of remarkable before and after transformations. 
              Each project demonstrates our expertise in turning outdated spaces into stunning, 
              modern environments that our clients love. Filter by project type to find inspiration 
              for your own renovation.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ProjectFilter />
          </FadeIn>

          <FadeInStagger className="mt-12" faster>
            <ProjectGallery />
          </FadeInStagger>
          
          <FadeIn className="mt-16 text-center">
            <div className="bg-gray-50 rounded-xl p-8 md:p-10 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Space?</h3>
              <p className="text-gray-600 mb-6">
                Our expert team is ready to help you create your dream space with professional tile installation.
              </p>
              <Link 
                href="/contact" 
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-medium transition duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Schedule a Consultation
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Transformation Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Transformation Process
            </h2>
            <p className="text-lg text-gray-600">
              At Joffery Tile, we follow a proven process to ensure every transformation exceeds expectations.
              From initial consultation to final walkthrough, our systematic approach guarantees quality results
              and a seamless experience for our clients.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <TransformationProcess />
          </FadeIn>
        </div>
      </section>

      {/* Materials & Techniques Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Premium Materials & Expert Techniques
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The remarkable transformations we achieve are the result of combining premium quality materials with expert installation techniques. We carefully select the finest tiles and materials for each project, ensuring durability, beauty, and longevity.
              </p>
              <ul className="space-y-4 mb-8">
                <FadeInStagger faster>
                  {[
                    "Porcelain and ceramic tiles from leading manufacturers",
                    "Natural stone options including marble, granite, and travertine",
                    "Specialized waterproofing systems for wet areas",
                    "Premium setting materials and grouts for lasting installations",
                    "Custom mosaic and decorative accent pieces"
                  ].map((item, index) => (
                    <FadeIn key={index}>
                      <li className="flex items-start">
                        <span className="text-blue-700 mr-3">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    </FadeIn>
                  ))}
                </FadeInStagger>
              </ul>
              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">500+</p>
                    <p className="text-sm text-gray-600">Projects Completed</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">25+</p>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">98%</p>
                    <p className="text-sm text-gray-600">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-[1.02]">
                    <Image 
                      src="/user-asset-3.png" 
                      alt="Premium tile materials showcase" 
                      width={600} 
                      height={400} 
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-[1.02]">
                    <Image 
                      src="/user-asset-5.png" 
                      alt="Professional tile installation tools and workspace" 
                      width={600} 
                      height={400} 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-[1.02]">
                    <Image 
                      src="/user-asset-4.png" 
                      alt="Decorative tile patterns and design options" 
                      width={600} 
                      height={400} 
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-[1.02]">
                    <Image 
                      src="/user-asset-6.png" 
                      alt="High-end tile samples and finishes" 
                      width={600} 
                      height={400} 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600">
              Don't just take our word for it. Hear from our satisfied clients about their 
              transformation experiences with Joffery Tile. These testimonials reflect our 
              commitment to excellence and customer satisfaction.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <TestimonialCarousel />
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about our transformation process, materials, 
              timelines, and more. If you don't find what you're looking for, don't hesitate 
              to contact us directly.
            </p>
          </FadeIn>

          <FadeInStagger className="max-w-3xl mx-auto" faster>
            {[
              {
                question: "How long does a typical bathroom transformation take?",
                answer: "A standard bathroom transformation typically takes 2-3 weeks from start to finish. This timeline includes demolition, substrate preparation, waterproofing, tile installation, grouting, and final detailing. Larger or more complex projects may require additional time. During your consultation, we'll provide a detailed timeline specific to your project scope."
              },
              {
                question: "What types of tile do you recommend for high-moisture areas?",
                answer: "For high-moisture areas like showers and tub surrounds, we recommend porcelain tiles due to their extremely low water absorption rate and durability. Ceramic tiles are also suitable for bathroom walls and floors. Natural stone can be used but requires proper sealing and maintenance. We'll help you select the best option based on your aesthetic preferences, budget, and the specific requirements of your space."
              },
              {
                question: "Do you provide design assistance for selecting tiles?",
                answer: "Yes, we offer comprehensive design assistance to help you select the perfect tiles for your project. Our experienced team can guide you through various options, considering factors like color schemes, patterns, sizes, and textures. We can create custom layouts and designs to match your vision, and we're happy to work with any inspiration photos or ideas you may have."
              },
              {
                question: "What preparation is needed before you start a transformation project?",
                answer: "Before we begin, we'll need access to the project area and clear pathways for material transport. For bathroom or kitchen renovations, we recommend removing personal items and clearing adjacent spaces. We handle all necessary demolition, surface preparation, and material disposal. We'll provide a detailed pre-project checklist during your consultation to ensure everything is ready for a smooth transformation process."
              },
              {
                question: "Do you offer warranties on your transformation projects?",
                answer: "Yes, all our transformation projects come with a comprehensive warranty. We provide a 1-year warranty on our workmanship and installation. Additionally, the manufacturer's warranties on materials and fixtures remain valid. We stand behind the quality of our work and are committed to ensuring your complete satisfaction with the transformation."
              }
            ].map((faq, index) => (
              <FadeIn key={index} className="mb-6">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer">
                      <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                      <span className="ml-6 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </details>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto">
              Contact Joffery Tile today to schedule a consultation and take the first step toward 
              your dream space. Our expert team is ready to bring your vision to life with professional 
              tile installation and renovation services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact" 
                className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium transition duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Request a Free Quote
              </Link>
              <Link 
                href="/services" 
                className="bg-transparent hover:bg-blue-800 text-white border-2 border-white px-8 py-4 rounded-lg font-medium transition duration-300 transform hover:scale-[1.02]"
              >
                Explore Our Services
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Bottom spacing for footer */}
      <div className="pb-16"></div>
    </main>
  );
}