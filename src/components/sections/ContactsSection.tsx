'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin, Phone, Youtube, MessageCircleMore } from 'lucide-react';
import dynamic from 'next/dynamic';

const ContactsSection = () => {
  const Map = dynamic(() => import('../Map'), { ssr: false });

  return (
    <section
      id="contact"
      className="pt-[90px] md:pt-24 pb-16 px-4 min-h-screen bg-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-medium text-gray-800 mb-12"
        >
          Contact Us
        </motion.h2>

        {/* Social Buttons */}
        <div className="flex justify-center gap-6 flex-wrap mb-12">
          <Link
            href="https://api.whatsapp.com/message/KXDR3KZ7YZG7C1?autoload=1&app_absent=0"
            target="_blank"
            className="bg-green-500 hover:bg-green-600 transition-all text-white p-4 rounded-full shadow-md hover:scale-105"
          >
            <MessageCircleMore className="w-6 h-6" />
          </Link>
          <Link
            href="https://www.instagram.com/dubaigoldcaspian/"
            target="_blank"
            className="bg-pink-500 hover:bg-pink-600 transition-all text-white p-4 rounded-full shadow-md hover:scale-105"
          >
            <Instagram className="w-6 h-6" />
          </Link>
          <Link
            href="https://www.youtube.com/@dubaigold3249"
            target="_blank"
            className="bg-red-600 hover:bg-red-700 transition-all text-white p-4 rounded-full shadow-md hover:scale-105"
          >
            <Youtube className="w-6 h-6" />
          </Link>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-8 text-gray-700 mb-12">
          <div className="text-left">
            <p className="flex items-center mb-4 text-lg">
              <Mail className="w-5 h-5 mr-2" /> dubaigoldbycaspian@gmail.com
            </p>
            <p className="flex items-center mb-4 text-lg">
              <Phone className="w-5 h-5 mr-2" /> +971569701771
            </p>
            <p className="flex items-start text-lg">
              <MapPin className="w-5 h-5 mr-2 mt-1" />
              Jewellery & Gemplex Building 1,
              <br /> Floor 8, Dubai, United Arab Emirates
            </p>
          </div>

          <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            <Map />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
