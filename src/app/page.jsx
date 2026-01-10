"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import Hero from "@/components/homePage/Hero";
import MinistriesSection from "@/components/homePage/MinistriesSection"
import AnnouncementsSection from "@/components/homePage/AnnouncementsSection"
import EventsSection from "@/components/homePage/EventsSection"
import DonationSection from "@/components/homePage/DonationSection";

export default function HomePage() {
  const { lang } = useLanguage();
  const messages = getContent(lang, 'home');

  return (
    <>
      <Hero content={messages.hero} />
      <MinistriesSection content={messages.ministriesSection} />
      <AnnouncementsSection content={messages.announcementsSection} />
      <EventsSection content={messages.eventsSection} />
      <DonationSection content={messages.donationSection} />
    </>
  );
}