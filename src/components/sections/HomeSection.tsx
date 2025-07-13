'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Pause, Play } from 'lucide-react'

const HomeSection = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isUserPaused, setIsUserPaused] = useState(false) // Track user-initiated pause
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null) // Reference to the section

  // Toggle play/pause and track user-initiated pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsUserPaused(true) // User manually paused
      } else {
        videoRef.current.play()
        setIsUserPaused(false) // User manually played
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Intersection Observer to detect when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting && !isUserPaused) {
            // Play video if section is visible and not user-paused
            videoRef.current.play().catch((err) => console.error('Play error:', err))
            setIsPlaying(true)
          } else if (!entry.isIntersecting) {
            // Pause video if section is not visible
            videoRef.current.pause()
            setIsPlaying(false)
          }
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // Cleanup observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isUserPaused]) // Re-run effect if isUserPaused changes

  return (
    <div ref={sectionRef} className="relative w-full h-screen">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/banner.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Text Overlay - bottom left */}
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 p-4 bg-black bg-opacity-20 rounded">
        <p className="text-white text-lg md:text-2xl lg:text-2xl font-cormorant font-medium opacity-90">
          Welcome to DubaiGoldCaspian
        </p>
      </div>

      {/* Pause Button - bottom right */}
      <button
        onClick={togglePlay}
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 p-3 bg-black bg-opacity-40 rounded-full hover:bg-opacity-60 transition-all"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <Pause strokeWidth="1.2px" className="text-white w-6 h-6" />
        ) : (
          <Play strokeWidth="1.2px" className="text-white w-6 h-6" />
        )}
      </button>
    </div>
  )
}

export default HomeSection