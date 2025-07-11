"use client"
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { COLLECTION_LINKS } from '../links';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const CollectionSection = () => {
  const t = useTranslations('collections');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperCore>();
  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      // @ts-ignore
      Thumbs: false,
      // @ts-ignore
      Toolbar: false,
      closeButton: "auto",
      Images: {
        zoom: true,
        click: true,
        wheel: "slide",
      },
    } as any);
  
    return () => {
      Fancybox.unbind("[data-fancybox]");
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
        alt: `ring ${i + 1}`
      }))
    },
    {
      id: 2,
      ...COLLECTION_LINKS.earrings,
      images: COLLECTION_LINKS.earrings.images.map((url, i) => ({
        id: i + 1,
        url,
        alt: `earring ${i + 1}`
      }))
    },
    {
      id: 3,
      ...COLLECTION_LINKS.necklaces,
      images: COLLECTION_LINKS.necklaces.images.map((url, i) => ({
        id: i + 1,
        url,
        alt: `necklace ${i + 1}`
      }))
    },
    {
      id: 4,
      ...COLLECTION_LINKS.bracelets,
      images: COLLECTION_LINKS.bracelets.images.map((url, i) => ({
        id: i + 1,
        url,
        alt: `bracelet ${i + 1}`
      }))
    }
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

  const selectedItem = collectionItems.find(item => item.link === selectedCollection);

  return (
    <section id="collections" className="py-16 md:py-24 px-4 xl:h-screen relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-full mx-auto h-full">
        {/* Collections Grid */}
        <div className={`transition-all duration-300 ${selectedCollection ? 'opacity-0 scale-95 pointer-events-none' : isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <h2 className="text-center text-4xl font-serif mb-8 md:mb-16">{t('title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {collectionItems.map((item) => (
              <div 
                key={item.id}
                className="relative w-full aspect-[3/4] md:aspect-square 2xl:h-[60vh] overflow-hidden group mx-auto cursor-pointer" 
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleCollectionClick(item.link)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={item.bgImage}
                    alt={item.titleKey}
                    fill
                    className={`object-cover transition-all rounded-2xl duration-700 ${hoveredItem === item.id ? 'opacity-100 scale-105' : 'opacity-70'}
                    ${item.id === 1 ? 'object-[center_30%] md:object-center' : ''}
                    ${item.id === 2 ? 'object-[center_40%] md:object-center' : ''}`}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-500" /> 
                </div>

                {/* Title */}
                <div className={`absolute font-cormorant font-medium antialiased top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl text-center transition-all duration-500 ${hoveredItem === item.id ? '-translate-y-[90%]' : ''}`}>
  {t(item.titleKey)}
</div>

<div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-cormorant font-medium text-center transition-all duration-500 ${hoveredItem === item.id ? 'opacity-100 translate-y-[50%]' : 'opacity-0 translate-y-0'}`}>
  {t(item.hoverTextKey)}
</div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Carousel */}
        <div className={`absolute inset-0 pt-16 pb-24 px-4 transition-all duration-300 ${selectedCollection ? (isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100') : 'opacity-0 scale-95 pointer-events-none'}`}>
          {selectedCollection && (
            <div className="max-w-7xl 2xl:max-w-full mx-auto h-full flex flex-col">
              {/* Back Button */}
              <button 
                onClick={handleBackClick}
                className="mb-6 md:mb-8 flex items-center text-lg font-cormorant font-medium hover:underline transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                {t('backToCollections')}
              </button>

              {/* Collection Title */}
              <h2 className="text-3xl md:text-4xl font-serif mb-8 text-center">
              {selectedItem ? t(selectedItem.titleKey) : t('title')}
              </h2>

              {/* Swiper Carousel */}
              <div className="relative">
              <Swiper
  modules={[Pagination, Autoplay]} // Navigation çıxarıldı
  spaceBetween={20}
  slidesPerView={1}
  pagination={{ clickable: true }}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  onSwiper={(swiper) => swiperRef.current = swiper}
  onSlideChange={handleSlideChange}
  breakpoints={{
    1024: {
      slidesPerView: 2,
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
                  className="relative w-full h-64 md:h-80 lg:h-96 xl:h-[30rem] rounded-lg overflow-hidden shadow-lg cursor-zoom-in"
                  data-fancybox="gallery"
                  data-src={image.url}
                  data-caption={image.alt}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </SwiperSlide>
              
                  ))}
                </Swiper>

                {/* Thumbnails */}
                {selectedItem && (
              <div className="mt-1 md:mt-2 lg:mt-3 flex justify-center gap-2 overflow-x-auto py-0.5">


                    {selectedItem.images.map((image, index) => (
                      <div
                        key={image.id}
                        className={`relative w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden cursor-pointer transition-all ${activeIndex === index ? 'ring-2 ring-primary scale-105' : 'opacity-70 hover:opacity-100'}`}
                        onClick={() => handleThumbnailClick(index)}
                      >
                        <Image
                          src={image.url}
                          alt={`Thumbnail ${image.id}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                          unoptimized // Temporary for development
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