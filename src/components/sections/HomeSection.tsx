'use client'
import React, { useState, useRef, useEffect } from 'react'
import { CiPlay1, CiPause1  } from "react-icons/ci";
import { useTranslations } from 'next-intl'

const HomeSection = () => {
  const t = useTranslations('home')
  const [isPlaying, setIsPlaying] = useState(true)
  const [isUserPaused, setIsUserPaused] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Text content keys for transitions
  const textKeys = ['text1', 'text2', 'text3', 'text4']

  // Toggle play/pause and track user-initiated pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsUserPaused(true)
      } else {
        videoRef.current.play()
        setIsUserPaused(false)
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Intersection Observer for video play/pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting && !isUserPaused) {
            videoRef.current.play().catch((err) => console.error('Play error:', err))
            setIsPlaying(true)
          } else if (!entry.isIntersecting) {
            videoRef.current.pause()
            setIsPlaying(false)
          }
        }
      },
      {
        threshold: 0.5,
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isUserPaused])

  // Text transition with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textKeys.length)
        setFade(true)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Get translations for collections CTA
  const tCollections = useTranslations('collections')

  return (
    <div id="home" ref={sectionRef} className="relative w-full h-screen">
      {/* Video Background */}
      <video
        ref={videoRef}
         preload="none"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ opacity: 0.8 }}
      >
        <source src="/banner.webm" type="video/webm" />
        <source src="/banner.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10 pointer-events-none" />

      {/* Dynamic Text Overlay - Center with Fade */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div
          className={`text-center transition-opacity duration-500 ease-in-out ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h1 className="text-gray-100 text-3xl md:text-5xl lg:text-6xl font-cormorant font-medium mb-5">
            {t(`${textKeys[currentTextIndex]}.title`)}
          </h1>
          <p className="text-white text-lg md:text-xl lg:text-2xl font-montserrat font-light opacity-80">
            {t(`${textKeys[currentTextIndex]}.subtitle`)}
          </p>
        </div>
      </div>

     

      {/* Pause Button - Bottom Right */}
      <button
        onClick={togglePlay}
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 p-3 bg-black bg-opacity-40 rounded-full hover:bg-opacity-60 transition-all z-20"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <CiPause1  className="text-white w-6 h-6" />
        ) : (
          <CiPlay1  className="text-white w-6 h-6" />
        )}
      </button>
    </div>
  )
}

export default HomeSection