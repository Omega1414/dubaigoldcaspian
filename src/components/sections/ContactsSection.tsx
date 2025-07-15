'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaYoutube, FaEnvelope, FaPhone } from 'react-icons/fa';
import { RiMapPin2Fill } from 'react-icons/ri';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const sectionVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};

const ContactsSection = () => {
  const Map = dynamic(() => import('../Map'), { ssr: false });
  const t = useTranslations('contacts'); 
  return (
    <section
      id="contacts"
      className="pt-24 px-4 sm:px-6 lg:px-8 bg-white min-h-screen overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Başlıq */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-cormorant font-medium text-gray-700 mb-2 lg:mb-6">
          {t('title')}
          </h2>
          <motion.p
            variants={textVariants}
            className="font-cormorant font-medium text-gray-700 text-lg sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto px-4 relative"
          >
                {t('description')}
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
          </motion.p>
        </motion.div>

        {/* Kontent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-5 lg:mt-16 2xl:mt-[90px] items-start text-gray-700">
          {/* Sol tərəf: Əlaqə */}
          <div className="flex flex-col items-center md:items-start w-full">
            {/* Sosial Düymələr */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mb-8 w-full justify-center items-center md:justify-start">
              {[
                {
                  href: 'https://api.whatsapp.com/message/KXDR3KZ7YZG7C1?autoload=1&app_absent=0',
                  icon: <FaWhatsapp className="w-4 h-4 mr-2" />,
                  text: 'WhatsApp',
                },
                {
                  href: 'https://www.instagram.com/dubaigoldcaspian/',
                  icon: <FaInstagram className="w-4 h-4 mr-2" />,
                  text: 'Instagram',
                },
                {
                  href: 'https://www.youtube.com/@dubaigold3249',
                  icon: <FaYoutube className="w-4 h-4 mr-2" />,
                  text: 'YouTube',
                },
              ].map(({ href, icon, text }, idx) => (
                <Link
                  key={idx}
                  href={href}
                  target="_blank"
                  className="relative overflow-hidden group flex items-center px-4 py-2 border border-gray-300 rounded-full w-fit text-sm sm:text-base"
                >
                  <span className="absolute inset-0 bg-gray-700 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out z-0" />
                  <span className="relative z-10 flex items-center text-gray-800 group-hover:text-white transition-colors duration-300">
                    {icon}
                    <span className="font-medium">{text}</span>
                  </span>
                </Link>
              ))}
            </div>

            {/* Əlaqə məlumatları */}
            <div className="space-y-4 2xl:space-y-6 mt-0 2xl:mt-10 w-full text-left text-md sm:text-base md:text-lg font-work-sans">
  <p className="flex items-center">
    <FaEnvelope className="w-5 h-5 mr-3 text-gray-600" />
    dubaigoldbycaspian@gmail.com
  </p>
  <p className="flex items-center">
    <FaPhone className="w-5 h-5 mr-3 text-gray-600" />
    +971569701771
  </p>
  <p className="flex items-start">
    <RiMapPin2Fill className="w-5 h-5 mr-3 mt-1 text-gray-600" />
    <span>
      Jewellery & Gemplex Building 1,
      <br /> Floor 8, Dubai, United Arab Emirates
    </span>
  </p>
</div>
          </div>

          {/* Sağ tərəf: Xəritə */}
          <div className="w-full h-64 sm:h-72 md:h-80 lg:h-60 2xl:h-80 rounded-xl overflow-hidden shadow-xl border border-gray-200">
            <Map />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
