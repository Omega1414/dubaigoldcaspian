'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CiPlay1, CiPause1 } from 'react-icons/ci';
import FadeInWhenVisible from '../FadeIn';

const AboutSection = () => {
  const t = useTranslations('about');
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => console.error('Play error:', err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      id="company-craft"
      className="pt-[90px] md:pt-24 pb-10 px-4 min-h-screen relative overflow-hidden bg-gray-50"
    >
      <div className="max-w-7xl 2xl:max-w-full mx-auto">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden"
        >
          <video
            ref={videoRef}
            autoPlay
            preload="none"
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/craft.webm" type="video/webm" />
            <source src="/craft.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-white text-3xl md:text-4xl lg:text-5xl font-cormorant font-medium text-center"
            >
              {t('heroTitle')}
            </motion.h1>
          </div>
          <button
            onClick={togglePlay}
            className="absolute bottom-4 right-4 md:bottom-8 md:right-8 p-3 bg-black bg-opacity-40 rounded-full hover:bg-opacity-60 transition-all"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <CiPause1 className="text-white w-6 h-6" />
            ) : (
              <CiPlay1 className="text-white w-6 h-6" />
            )}
          </button>
        </motion.div>

        {/* Company History */}
        <div className="mt-12 md:mt-16 text-center">
          <FadeInWhenVisible>
          <motion.h2
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
  className="relative w-fit mx-auto text-2xl md:text-3xl lg:text-4xl font-cormorant font-medium text-gray-700 mb-6"
>
  {t('historyTitle')}
  <motion.span
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.7 }}
    className="
      absolute -bottom-1 left-0 w-full h-0.5 origin-center
      bg-gradient-to-r from-transparent via-gray-500 to-transparent
    "
  />
</motion.h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <p className="font-cormorant font-medium text-gray-700 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto px-4 relative">
              {t('historyDescription')}
             
            </p>
          </FadeInWhenVisible>
        </div>

        {/* Factory Tour */}
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row gap-8 items-center justify-center">
          <FadeInWhenVisible className="w-full md:w-1/2 lg:max-w-sm">
            <Image
              src="https://res.cloudinary.com/dmnkgqbcu/image/upload/v1752357745/52471978294_315824afe8_b_ovi4z2.jpg"
              alt="Factory Tour"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-[300px] md:h-[400px] shadow-lg shadow-gray-500/30"
            />
          </FadeInWhenVisible>
          <FadeInWhenVisible className="w-full md:w-1/2 lg:max-w-md 2xl:max-w-xl 3xl:max-w-2xl text-center">
          <motion.h2
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
  className="text-2xl md:text-3xl lg:text-3xl 2xl:text-4xl font-cormorant font-medium text-gray-700 mb-6 relative inline-block"
>
  {t('tourTitle')}
  <motion.span
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.7 }}
    className="
    absolute -bottom-1 left-0 w-full h-0.5 origin-center
    bg-gradient-to-r from-transparent via-gray-500 to-transparent
  "
  />
</motion.h2>

            <p className="font-cormorant font-medium text-gray-700 text-lg md:text-xl lg:text-xl 2xl:text-2xl max-w-xl mx-auto">
              {t('tourDescription')}
            </p>
          </FadeInWhenVisible>
        </div>

        {/* Custom Design */}
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row-reverse gap-8 items-center justify-center">
          <FadeInWhenVisible className="w-full md:w-1/2 lg:max-w-sm">
            <Image
              src="https://res.cloudinary.com/dmnkgqbcu/image/upload/v1752357648/52472159295_5625251c0b_b_yxx7ku.jpg"
              alt="Custom Design Process"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-[300px] md:h-[400px] shadow-lg shadow-gray-500/30"
            />
          </FadeInWhenVisible>
          <FadeInWhenVisible className="w-full md:w-1/2 lg:max-w-md 2xl:max-w-xl 3xl:max-w-2xl text-center">
          <motion.h2
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
  className="text-2xl md:text-3xl lg:text-3xl 2xl:text-4xl font-cormorant font-medium text-gray-700 mb-6 relative inline-block"
>
  {t('designTitle')}
  <motion.span
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.7 }}
    className="
      absolute -bottom-1 left-0 w-full h-0.5 origin-center
      bg-gradient-to-r from-transparent via-gray-500 to-transparent
    "
  />
</motion.h2>
            <p className="font-cormorant font-medium text-gray-700 text-lg md:text-xl lg:text-xl 2xl:text-2xl max-w-xl mx-auto">
              {t('designDescription')}
            </p>
          </FadeInWhenVisible>
        </div>

        {/* Free Transfer */}
        <div className="mt-12 md:mt-16 text-center">
          <FadeInWhenVisible>
          <motion.h2
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
  className="text-2xl md:text-3xl lg:text-4xl font-cormorant font-medium text-gray-700 mb-6 relative inline-block"
>
  {t('transferTitle')}
  <motion.span
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.7 }}
    className="
      absolute -bottom-1 left-0 w-full h-0.5 origin-center
      bg-gradient-to-r from-transparent via-gray-500 to-transparent
    "
  />
</motion.h2>

          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <p className="font-cormorant font-medium text-gray-700 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto px-4 relative">
              {t('transferDescription')}
             
            </p>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
