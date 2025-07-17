'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import type SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { COLLECTION_LINKS } from '../links';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import LoadingSkeleton from '../LoadingSkeleton';

const CollectionSection = () => {
  const t = useTranslations('collections');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});
  const swiperRef = useRef<SwiperCore>();
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (Fancybox.getInstance()) return;
  
      if (selectedCollection) {
        handleBackClick();
        window.history.pushState(null, '');
      }
    };
  
    if (selectedCollection) {
      window.history.pushState(null, '');
      window.addEventListener('popstate', handlePopState);
    }
  
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selectedCollection]);
  
  
  useEffect(() => {
    Fancybox.bind('[data-fancybox]', {
      Thumbs: false,
      Toolbar: false,
      closeButton: 'auto',
      Images: {
        zoom: true,
        click: true,
        wheel: 'slide',
      },
      on: {
        closing: () => {
          console.log('Fancybox bağlanır – carousel qalır yerində');
        },
      },
    } as any);
  
    return () => {
      Fancybox.unbind('[data-fancybox]');
      Fancybox.close();
    };
  }, []);
  
  const collectionItems = [
    {
      id: 1,
      ...COLLECTION_LINKS.rings,
      images: COLLECTION_LINKS.rings.images.map((url, i) => ({
        id: i + 1,
        url,
        alt: `ring ${i + 1}`,
      })),
    },
    {
      id: 2,
      ...COLLECTION_LINKS.earrings,
      images: COLLECTION_LINKS.earrings.images.map((url, i) => ({
        id: i + 1,
        url,
        alt: `earring ${i + 1}`,
      })),
    },
    {
      id: 3,
      ...COLLECTION_LINKS.necklaces,
      images: COLLECTION_LINKS.necklaces.images.map((url, i) => ({
        id: i + 1,
        url,
        alt: `necklace ${i + 1}`,
      })),
    },
    {
      id: 4,
      ...COLLECTION_LINKS.bracelets,
      images: COLLECTION_LINKS.bracelets.images.map((url, i) => ({
        id: i + 1,
        url,
        alt: `bracelet ${i + 1}`,
      })),
    },
  ];

  const handleCollectionClick = (collection: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCollection(collection);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBackClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCollection(null);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleThumbnailClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
      swiperRef.current.autoplay.stop();
    }
  };

  const handleSlideClick = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleImageLoad = (imageId: string) => {
    setLoadedImages((prev) => ({ ...prev, [imageId]: true }));
  };

  const selectedItem = collectionItems.find((item) => item.link === selectedCollection);

  const gridItemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section id="collections" className="pt-[90px] md:pt-24 pb-10 px-4 relative overflow-hidden min-h-screen">
      <div className="max-w-7xl 2xl:max-w-full mx-auto">
        {/* Collections Grid */}
        <AnimatePresence>
          {!selectedCollection && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-full"
            >
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="text-start text-2xl xl:text-3xl font-cormorant font-medium pl-2 xl:pl-[80px]"
              >
                {t('title')}
              </motion.h2>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-x-3 gap-y-6
                  sm:gap-x-4 sm:gap-y-8
                  md:grid-cols-2 md:gap-10
                  xl:grid-cols-4 xl:gap-8
                  max-w-full
                  mx-auto
                  pb-1
                "
              >
                {collectionItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={gridItemVariants}
                    className="
                      relative w-[90%] sm:w-[85%] aspect-[3/4] sm:aspect-[4/5] md:aspect-square h-[25vh] md:h-[30vh] 2xl:h-[55vh] overflow-hidden group mx-auto cursor-pointer
                    "
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => handleCollectionClick(item.link)}
                  >
                    <div className="absolute inset-0">
                      {!loadedImages[`grid-${item.id}`] && (
                        <LoadingSkeleton
                          width="100%"
                          height="100%"
                          className="absolute inset-0 rounded-2xl"
                        />
                      )}
                      <Image
                        src={item.bgImage}
                        alt={t(item.titleKey)}
                        fill
                        priority
                        className={`
                          object-cover rounded-2xl transition-all duration-700
                          ${hoveredItem === item.id ? 'opacity-100 scale-105 shadow-xl' : 'opacity-100'}
                          ${item.id === 1 ? 'object-[center_30%] md:object-center' : ''}
                          ${item.id === 2 ? 'object-[center_40%] md:object-center' : ''}
                          ${loadedImages[`grid-${item.id}`] ? 'opacity-100' : 'opacity-0'}
                        `}
                        onLoad={() => handleImageLoad(`grid-${item.id}`)}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 transition-all duration-500" />
                    </div>

                    <div
                      className={`
                        absolute font-cormorant font-medium antialiased bottom-3 2xl:bottom-6 left-1/2 transform -translate-x-1/2
                        text-gray-700 text-2xl md:text-2xl lg:text-2xl 2xl:text-3xl text-center
                        transition-all duration-500
                        ${hoveredItem === item.id ? '-translate-y-5 lg:-translate-y-7 2xl:-translate-y-8' : ''}
                      `}
                    >
                      {t(item.titleKey)}
                    </div>

                    <div
                      className={`
                        absolute font-cormorant font-medium antialiased bottom-3 2xl:bottom-6 left-1/2 transform -translate-x-1/2
                        text-gray-700 w-full text-md lg:text-xl 2xl:text-2xl text-center
                        transition-all duration-500
                        ${hoveredItem === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                      `}
                    >
                      {t(item.hoverTextKey)}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="mt-12 xl:mt-[80px] 3xl:mt-[120px] text-center px-4"
              >
                <p
                  className="
                    font-cormorant font-medium text-gray-700 text-xl md:text-2xl lg:text-2xl
                    max-w-3xl mx-auto relative
                  "
                >
                  {t('craftsmanshipDescription')}
                  <span
                    className="
                      absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-0.5
                      bg-gradient-to-r from-transparent via-gray-500 to-transparent
                    "
                  />
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`absolute inset-0 pt-[80px] pb-24 px-4 transition-all duration-300 ${
            selectedCollection ? (isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100') : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          {selectedCollection && (
            <div className="max-w-7xl 2xl:max-w-full mx-auto h-full flex flex-col">
              <button
                onClick={handleBackClick}
                className="mb-6 md:mb-8 flex items-center text-lg 2xl:text-2xl font-cormorant font-medium hover:underline transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                {t('backToCollections')}
              </button>

              <div className="relative">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  onSlideChange={handleSlideChange}
                  breakpoints={{
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                    1280: {
                      slidesPerView: 3,
                    },
                    1536: {
                      slidesPerView: 4,
                    },
                  }}
                  className="h-full"
                >
                  {selectedItem?.images.map((image) => (
                    <SwiperSlide
                      key={image.id}
                      className="flex items-center justify-center"
                      onClick={handleSlideClick}
                    >
                      <div
                       className="relative w-full rounded-lg overflow-hidden shadow-lg cursor-zoom-in"
                       style={{ height: 'calc(50vh - 50px)' }}
                        data-fancybox="gallery"
                        data-src={image.url}
                        
                      >
                        {!loadedImages[`carousel-${image.id}`] && (
                          <LoadingSkeleton
                            width="100%"
                            height="100%"
                            className="absolute inset-0"
                          />
                        )}
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className={`object-cover ${loadedImages[`carousel-${image.id}`] ? 'opacity-100' : 'opacity-0'}`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onLoad={() => handleImageLoad(`carousel-${image.id}`)}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {selectedItem && (
                  <div className=" flex gap-2 overflow-x-auto 2xl:overflow-x-hidden justify-start 2xl:justify-center py-1 px-2">
                    {selectedItem.images.map((image, index) => (
                      <div
                        key={image.id}
                        className={`
                          relative
                          min-w-[64px] min-h-[64px]
                          sm:min-w-[80px] sm:min-h-[80px]
                          md:w-20 md:h-20
                          rounded-md overflow-hidden cursor-pointer
                          transition-all shrink-0
                          ${activeIndex === index ? 'ring-2 ring-primary scale-105' : 'opacity-70 hover:opacity-100'}
                        `}
                        onClick={() => handleThumbnailClick(index)}
                      >
                        {!loadedImages[`thumbnail-${image.id}`] && (
                          <LoadingSkeleton
                            width="100%"
                            height="100%"
                            className="absolute inset-0"
                          />
                        )}
                        <Image
                          src={image.url}
                          alt={`Thumbnail ${image.id}`}
                          fill
                          className={`object-cover ${loadedImages[`thumbnail-${image.id}`] ? 'opacity-100' : 'opacity-0'}`}
                          sizes="64px"
                          unoptimized
                          onLoad={() => handleImageLoad(`thumbnail-${image.id}`)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;