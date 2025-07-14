'use client'

import Link from 'next/link'
import LocaleSwitcher from './LocaleSwitcher'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleSectionClick = (sectionId: string) => {
    setIsOpen(false)
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }, 100)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{  opacity: 0.8 }}
      animate={{  opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`w-full px-6 py-2 fixed top-0 z-50 transition-all ease-in-out duration-300
        ${scrolled
          ? 'opacity-90 backdrop-blur-md shadow-sm bg-white/70 text-gray-700'
          : 'opacity-100 bg-transparent text-gray-200'
        }
        `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="w-[110px] h-auto"> {/* Adjust height/width as needed */}
  <Link href="/">
    <Image
      src="/logo.png"
      alt="MyLogo"
      width={200}  // Set your desired display width
      height={48}  // Set your desired display height (maintain aspect ratio)
      className={`h-full w-auto transition-all duration-300 ${
        scrolled ? '' : 'invert brightness-0'
      }`}
      
    />
  </Link>
</div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-10 text-[19px]   font-medium mt-1 font-work-sans">

          {['home', 'collections', 'company-craft', 'contacts'].map((section) => (
            <Link 
              key={section}
              href={`#${section}`}
              onClick={() => handleSectionClick(section)}
              className="hover:text-white  transition"
            >
             {section === 'company-craft' ? 'Company & Craft' : section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-4">
          <LocaleSwitcher scrolled={scrolled} />
          
          </div>

          <button
            className="md:hidden text-gray-800 "
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 font-work-sans font-medium space-y-4 flex flex-col bg-white/70  p-4 rounded shadow"
          >
           {['home', 'collections', 'company-craft', 'contacts'].map((section) => (
              <Link 
                key={section}
                href={`#${section}`}
                onClick={() => handleSectionClick(section)}
                className="hover:text-white transition py-2"
              >
                {section === 'company-craft' ? 'Company & Craft' : section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}

            <div className="flex gap-4 pt-2 border-t border-gray-300 ">
              <LocaleSwitcher scrolled={scrolled} />
            
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}