"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MicrophoneIcon, MusicalNoteIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { BookingForm } from "@/components/BookingForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Recording Studio</h1>
        <nav className="hidden md:flex space-x-4 items-center">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Services</Button>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Contact</Button>
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="outline">Menu</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-8 mb-16"
        >
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Create Your Best Music with Our Studio
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Professional recording equipment, experienced producers, and a creative environment
              to bring your musical vision to life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button>Book a Session</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
          <div className="md:w-1/2 relative h-72 md:h-96 rounded-xl overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04" 
              alt="Recording Studio" 
              fill 
              className="object-cover"
            />
          </div>
        </motion.section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <MicrophoneIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Professional Equipment</h3>
            <p className="text-gray-600 dark:text-gray-300">
              State-of-the-art microphones, mixing consoles, and monitors for pristine sound quality.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <MusicalNoteIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Producers</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Work with experienced producers who know how to get the best sound for your genre.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <UserGroupIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Collaborative Space</h3>
            <p className="text-gray-600 dark:text-gray-300">
              A comfortable and inspiring environment designed for creativity and collaboration.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            Book Your Session
          </h2>
          <div className="max-w-2xl mx-auto">
            <BookingForm />
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Recording Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
