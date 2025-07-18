'use client';

import React from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaYoutube, FaEnvelope, FaPhone } from 'react-icons/fa';
import { RiMapPin2Fill } from 'react-icons/ri';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import FadeInWhenVisible from '../FadeIn';
import { motion } from 'framer-motion';

const Map = dynamic(() => import('../Map'), { ssr: false });

const ContactsSection = () => {
  const t = useTranslations('contacts');

  return (
    <section
      id="contacts"
      className="pb-5 3xl:pb-0 pt-16 sm:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 bg-white min-h-screen overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeInWhenVisible className="text-center mb-8 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="relative w-fit mx-auto text-2xl md:text-3xl lg:text-4xl font-cormorant font-medium text-gray-700 mb-2 lg:mb-4"
          >
            {t('title')}
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.7 }}
              className="absolute -bottom-1 left-0 w-full h-0.5 origin-center bg-gradient-to-r from-transparent via-gray-500 to-transparent"
            />
          </motion.h2>

          <div className="relative">
            <p className="font-cormorant font-medium text-gray-700 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto px-4 pb-1">
              {t('description')}
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left: Contact Information */}
          <FadeInWhenVisible className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              {/* Mobile */}
              <div className="group">
                <div className="relative overflow-hidden flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-400 transition-all duration-1000 hover:shadow-lg cursor-pointer">
                  <div className="absolute inset-0 bg-gray-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out" />
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-colors duration-1000">
                    <FaPhone className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-1000" />
                  </div>
                  <div className="relative z-10 ml-3 lg:ml-4 flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium font-montserrat text-gray-700 uppercase mb-1 group-hover:text-white transition-colors duration-1000">
                      {t('mobileLabel')}
                    </p>
                    <p className="text-base sm:text-md font-montserrat text-gray-700 group-hover:text-white transition-colors duration-1000">
                      {t('mobileValue')}
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="group">
                <Link
                  href="https://api.whatsapp.com/message/KXDR3KZ7YZG7C1?autoload=1&app_absent=0"
                  target="_blank"
                  className="relative overflow-hidden flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-400 transition-all duration-1000 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gray-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out" />
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-colors duration-1000">
                    <FaWhatsapp className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-1000" />
                  </div>
                  <div className="relative z-10 ml-3 lg:ml-4 flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium font-montserrat text-gray-700 uppercase mb-1 group-hover:text-white transition-colors duration-1000">
                      {t('whatsappLabel')}
                    </p>
                    <p className="text-base sm:text-md font-montserrat text-gray-700 group-hover:text-white transition-colors duration-1000">
                      {t('whatsappValue')}
                    </p>
                  </div>
                </Link>
              </div>

              {/* Email */}
              <div className="group">
                <div className="relative overflow-hidden flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-400 transition-all duration-1000 hover:shadow-lg cursor-pointer">
                  <div className="absolute inset-0 bg-gray-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out" />
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-colors duration-1000">
                    <FaEnvelope className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-1000" />
                  </div>
                  <div className="relative z-10 ml-3 lg:ml-4 flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium font-montserrat text-gray-700 uppercase mb-1 group-hover:text-white transition-colors duration-1000">
                      {t('emailLabel')}
                    </p>
                    <p className="text-base sm:text-md font-montserrat text-gray-700 group-hover:text-white transition-colors duration-1000 break-all sm:break-normal">
                      {t('emailValue')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="group">
                <div className="relative overflow-hidden flex items-start p-4 rounded-lg border border-gray-200 hover:border-gray-400 transition-all duration-1000 hover:shadow-lg cursor-pointer">
                  <div className="absolute inset-0 bg-gray-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out" />
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-colors duration-1000 mt-1">
                    <RiMapPin2Fill className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-1000" />
                  </div>
                  <div className="relative z-10 ml-3 lg:ml-4 flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium font-montserrat text-gray-700 uppercase mb-1 group-hover:text-white transition-colors duration-1000">
                      {t('addressLabel')}
                    </p>
                    <p className="text-base sm:text-md font-montserrat text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-1000 whitespace-pre-line">
                      {t('addressValue')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-2 lg:pt-4">
              <h3 className="text-lg sm:text-xl font-cormorant font-medium text-gray-700 mb-3 lg:mb-4 text-center lg:text-left">
                {t('followUs')}
              </h3>
              <div className="flex gap-3 lg:gap-4 justify-center lg:justify-start">
                <Link
                  href="https://www.instagram.com/dubaigoldcaspian/"
                  target="_blank"
                  className="group w-11 h-11 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-700 hover:shadow-lg transform hover:scale-105"
                >
                  <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-white transition-colors duration-700" />
                </Link>
                <Link
                  href="https://www.youtube.com/@dubaigold3249"
                  target="_blank"
                  className="group w-11 h-11 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-700 hover:shadow-lg transform hover:scale-105"
                >
                  <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-white transition-colors duration-700" />
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Right: Map */}
          <FadeInWhenVisible className="w-full order-first lg:order-last">
            <div className="h-64 sm:h-80 md:h-96 lg:h-[450px] xl:h-[500px] rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl border border-gray-200 bg-gray-50">
              <Map />
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
