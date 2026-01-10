'use client';

import EventsIntro from "@/components/eventsPage/EventsIntro";
import FeaturedEvent from "@/components/eventsPage/FeaturedEvent";
import UpcomingEvents from "@/components/eventsPage/UpcomingEvents";
import EventsCTA from "@/components/eventsPage/EventsCTA";
import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";

const EventsPage = () => {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'events');

    return (
        <>
            <EventsIntro content={messages.intro} />
            <FeaturedEvent content={messages.featuredEvent} />
            <UpcomingEvents content={messages.upcomingEvents} />
            <EventsCTA content={messages.ctaSection} />
        </>
    );
};

export default EventsPage;