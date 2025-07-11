'use client'
import React, { useState, useRef } from 'react'
import { Pause, Play } from 'lucide-react'

const HomeSection = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="relative w-full h-screen">
      {/* Video Background */}
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/hoo.mp4" type="video/mp4" />
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
        aria-label={isPlaying ? "Pause video" : "Play video"}
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