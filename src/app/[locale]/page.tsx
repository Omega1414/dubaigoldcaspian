"use client"
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/NavBar";
import HomeSection from "@/components/sections/HomeSection";
import CollectionSection from "@/components/sections/CollectionSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactsSection from "@/components/sections/ContactsSection";
import LoadingSkeleton from "@/components/LoadingSkeleton"; // varsa, istifadə et
import Footer from "@/components/Footer";

export default function Home() {
  const t = useTranslations("LocaleLayout");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // 1 saniyəlik fake loading (realda bunu collection section statusuna bağlaya bilərsən)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <HomeSection />
      <div className="relative bg-white z-10 space-y-8 md:space-y-16">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 pt-10">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="w-full h-[300px] rounded-2xl overflow-hidden">
                <LoadingSkeleton width="100%" height="100%" />
              </div>
            ))}
          </div>
        ) : (
          <CollectionSection />
        )}
        <AboutSection />
        <ContactsSection />
      </div>
      <Footer />
    </div>
  );
}
