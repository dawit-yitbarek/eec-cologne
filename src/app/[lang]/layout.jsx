import { DM_Serif_Display, Source_Sans_3 } from "next/font/google";
import { getContent } from "@/lib/getMessages";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const appUrl = process.env.APP_URL;

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export default async function LocaleLayout({ children, params }) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${dmSerif.variable} ${sourceSans.variable}`}>
      <body className="overflow-x-hidden">
        <Navbar lang={lang} />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const messages = getContent(lang, 'common');

  const metadata = {
    title: {
      default: messages.seo.title,
      template: `%s | ${messages.seo.churchShortName}`,
    },
    description: messages.seo.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'de': '/de',
        'am': '/am',
      },
    },
  };

  if (appUrl) {
    try {
      metadata.metadataBase = new URL(appUrl);
    } catch (error) {
    }
  }

  return metadata;
}