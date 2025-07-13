import Link from 'next/link';
import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-16 py-8 bg-gray-100">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <p className="font-cormorant text-gray-700 text-lg">
        &copy; {new Date().getFullYear()} Caspian Jewellery
      </p>
      <div className="flex gap-6 mt-4 md:mt-0">
        {['home', 'collections', 'factory', 'contacts'].map((section) => (
          <Link
            key={section}
            href={`#${section}`}
            onClick={() => {
              const element = document.getElementById(section);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="font-cormorant text-gray-700 hover:text-blue-600 transition"
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  </footer>
  )
}

export default Footer