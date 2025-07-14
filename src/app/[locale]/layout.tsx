// app/layout.tsx
import { notFound } from 'next/navigation';
import { Locale, hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';

import { Cormorant_Garamond, DM_Serif_Display, Inter, Josefin_Sans, Montserrat, Playfair_Display, Poppins, Raleway, Work_Sans } from 'next/font/google';
import { routing } from '../../i18n/routing';
import '../globals.css';






type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-montserrat',
  display: 'swap',
});
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})
const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400', // bu font sadəcə 400-ü dəstəkləyir
  variable: '--font-dmserif',
  display: 'swap',
})
const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-josefin',
  display: 'swap',
})
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway',
  display: 'swap',
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: '--font-playfair',
  display: 'swap',
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],  // GothamSSmBook kimi normal 400-ü istifadə edirik
  variable: '--font-poppins',
  display: 'swap',
});
const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400'],  // GothamSSmBook kimi normal 400 istifadə edirik
  variable: '--font-work-sans',
  display: 'swap',
});
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  return {
    title: t('title'),
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
        { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
        { url: '/apple-touch-icon.png', sizes: '180x180', rel: 'apple-touch-icon' },
        { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/android-chrome-384x384.png', sizes: '384x384', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}  className={`${cormorant.variable} ${josefin.variable} ${dmSerif.variable} ${raleway.variable}
     ${playfair.variable} ${montserrat.variable} ${poppins.variable} ${workSans.variable} antialiased`}>
      <body >
    
        <NextIntlClientProvider locale={locale}>
     {children}
        </NextIntlClientProvider>
       
      </body>
    </html>
  );
}
