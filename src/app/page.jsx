"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import Hero from "@/components/homePage/Hero";
import MinistriesSection from "@/components/homePage/MinistriesSection"
import AnnouncementsSection from "@/components/homePage/AnnouncementsSection"
import EventsSection from "@/components/homePage/EventsSection"
import DonationSection from "@/components/homePage/DonationSection";
import { fetchContent } from "@/lib/fetchContent";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { lang } = useLanguage();
  const messages = getContent(lang, 'home');
  const [announcements, setAnnouncements] = useState([])
  const [events, setEvents] = useState([])
  const [eventsLoading, setEventsLoading] = useState(true)
  const [announcementsLoading, setAnnouncementsLoading] = useState(true)
  const [eventsError, setEventsError] = useState(false)
  const [announcementsError, setAnnouncementsError] = useState(false)

  function fetchEvents() {
    fetchContent('events', setEvents, setEventsLoading, setEventsError, 3);
  }

  function fetchAnnouncements() {
    fetchContent('announcements', setAnnouncements, setAnnouncementsLoading, setAnnouncementsError, 3);
  }

  useEffect(() => {
    fetchAnnouncements();
    fetchEvents();
  }, [])

  return (
    <>
      <Hero content={messages.hero} />
      <MinistriesSection content={messages.ministriesSection} />
      <AnnouncementsSection
        lang={lang}
        announcements={announcements}
        loading={announcementsLoading}
        error={announcementsError}
        content={messages.announcementsSection}
        retry={fetchAnnouncements}
      />

      <EventsSection
        lang={lang}
        events={events}
        loading={eventsLoading}
        error={eventsError}
        content={messages.eventsSection}
        retry={fetchEvents}
      />
      <DonationSection content={messages.donationSection} />
    </>
  );
}