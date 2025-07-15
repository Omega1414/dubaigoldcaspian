'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className=" py-8 xl:py-5 2xl:py-8 bg-gray-100">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      {/* Logo */}
      <div className="w-[110px] h-auto mb-4 md:mb-0">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Caspian Jewellery Logo"
            width={200}
            height={48}
            className="h-full w-auto"
          />
        </Link>
      </div>
  
  
      {/* Copyright Notice */}
      <p className="font-cormorant text-gray-700 text-lg mt-4 md:mt-0 text-center md:text-right">
        © {new Date().getFullYear()} DubaiGold by Caspian Jewellery. All Rights Reserved.
      </p>
    </div>
  </footer>
  
  )
}

export default Footer