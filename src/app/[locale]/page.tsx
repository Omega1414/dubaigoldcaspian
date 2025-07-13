import { useTranslations } from "next-intl"
import Navbar from "@/components/NavBar"
import HomeSection from "@/components/sections/HomeSection"
import CollectionSection from "@/components/sections/CollectionSection"
import AboutSection from "@/components/sections/AboutSection"
import FactorySection from "@/components/sections/FactorySection"
import ContactsSection from "@/components/sections/ContactsSection"

export default function Home() {
  const t = useTranslations("LocaleLayout")

  return (
    <div className="relative">
      <Navbar />
      <HomeSection />
      <div className="relative bg-white z-10 space-y-8 md:space-y-16 "> {/* Added spacing between sections */}
        <CollectionSection />
        <AboutSection />
        <FactorySection />
        <ContactsSection />
      </div>
    </div>
  )
}