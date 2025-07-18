'use client'
import React, { useState, useRef, useEffect } from 'react'
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { useTranslations } from 'next-intl'

const HomeSection = () => {
  const t = useTranslations('home')
  const [isPlaying, setIsPlaying] = useState(true)
  const [isUserPaused, setIsUserPaused] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Text content keys for transitions
  const textKeys = ['text1', 'text2', 'text3', 'text4']

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
    if (!isMounted) return

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
  }, [isUserPaused, isMounted])

  // Text transition with fade effect, only when video is playing
  useEffect(() => {
    if (!isMounted || !isPlaying) return

    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textKeys.length)
        setFade(true)
      }, 1200)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPlaying, isMounted])

  if (!isMounted) {
    return (
      <div id="home" className="relative w-full h-screen">
        {/* Simple static fallback while hydrating */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10" />
      </div>
    )
  }

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

      {/* Dynamic Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div
          className={`text-center transition-all duration-700 ease-out transform ${
            fade ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          } relative max-w-screen mx-4`}
        >
          {/* Glassmorphism Background with Gradients - Now hydration-safe */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent  border border-white/20 shadow-2xl overflow-hidden">
            {/* Animated gradient overlay - now using opacity instead of animate-pulse */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10  to-pink-500/10 opacity-60" />
            
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-2xl shadow-inner shadow-white/10" />
            
            {/* Corner accents - now simpler implementation */}
            <div className="absolute top-2 left-2 right-2 bottom-2 border border-white/10 rounded-lg pointer-events-none">
              <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/30 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/30 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/30 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/30 rounded-br-lg" />
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 p-6 md:p-8">
            <h1 className="text-gray-100 text-3xl md:text-5xl lg:text-6xl font-cinzel font-medium mb-5 relative">
              {t(`${textKeys[currentTextIndex]}.title`)}
              {/* Text glow effect - now simplified */}
              <span className="absolute inset-0 text-3xl md:text-5xl lg:text-6xl font-cinzel font-medium text-white/20 blur-sm -z-10 pointer-events-none select-none">
                {t(`${textKeys[currentTextIndex]}.title`)}
              </span>
            </h1>
            <p className="text-white text-lg md:text-xl lg:text-2xl font-montserrat font-light opacity-80 relative">
              {t(`${textKeys[currentTextIndex]}.subtitle`)}
              {/* Subtitle glow effect - now simplified */}
              <span className="absolute inset-0 text-lg md:text-xl lg:text-2xl font-montserrat font-light text-white/15 blur-sm -z-10 pointer-events-none select-none">
                {t(`${textKeys[currentTextIndex]}.subtitle`)}
              </span>
            </p>
          </div>
          
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
      </div>

      {/* Pause Button */}
      <button
        onClick={togglePlay}
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 p-3 bg-black bg-opacity-40 rounded-full hover:bg-opacity-60 transition-all z-20"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <CiPause1 className="text-white w-6 h-6" />
        ) : (
          <CiPlay1 className="text-white w-6 h-6" />
        )}
      </button>
    </div>
  )
}

export default HomeSection