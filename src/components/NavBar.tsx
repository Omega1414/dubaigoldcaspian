'use client'

import Link from 'next/link'
import LocaleSwitcher from './LocaleSwitcher'
import { useState, useEffect } from 'react'
import { IoMdMenu, IoMdCloseCircleOutline  } from "react-icons/io";
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Navbar() {
  const t = useTranslations('navbar'); 
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
          : 'opacity-100 bg-gray-900/20 text-white'
        }
        `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="w-[110px] h-auto"> 
  <Link href="/">
    <Image
      src="/logo.png"
      alt="MyLogo"
      width={200} 
      height={48}  
      className={`h-full w-auto transition-all duration-300 ${
        scrolled ? '' : 'invert brightness-0'
      }`}
      
    />
  </Link>
</div>


{/* Desktop Nav Links */}
  <div className="hidden md:flex gap-10 text-[20px] font-light  mt-1 font-rokkitt">
    {['home', 'collections', 'company-craft', 'contacts'].map((section) => (
      <motion.div
        key={section}
        className="relative inline-block"
        whileHover="hover"
      >
        <Link
          href={`#${section}`}
          onClick={() => handleSectionClick(section)}
          className={`${scrolled ? "text-gray-700 hover:text-gray-500" : "text-gray-200 hover:text-gray-100"} transition-colors duration-300`}
        >
          {t(section)}
        </Link>
        <motion.span
          variants={{
            hover: { scaleX: 1, opacity: 1 }
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className={`
            absolute -bottom-1 left-0 w-full h-0.5 origin-center
            bg-gradient-to-r from-transparent ${scrolled ? "via-gray-700" : "via-white"}  to-transparent
          `}
        />
      </motion.div>
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
            {isOpen ? <IoMdCloseCircleOutline size={26} className={`${scrolled ? "text-black" : "text-white"}`} /> : <IoMdMenu size={26} className={`${scrolled ? "text-black" : "text-white"}`} />}
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
            className={`md:hidden mt-4 font-work-sans font-medium space-y-4 flex flex-col ${scrolled ? "bg-transparent" : "bg-gray-600"}   p-4 rounded shadow`}
          >
         {['home', 'collections', 'company-craft', 'contacts'].map((section) => (
  <Link 
    key={section}
    href={`#${section}`}
    onClick={() => handleSectionClick(section)}
    className="hover:text-white transition"
  >
    {t(section)}
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