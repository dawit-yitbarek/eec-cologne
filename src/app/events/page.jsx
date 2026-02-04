'use client';

import EventsIntro from "@/components/eventsPage/EventsIntro";
import FeaturedEvent from "@/components/eventsPage/FeaturedEvent";
import UpcomingEvents from "@/components/eventsPage/UpcomingEvents";
import EventsCTA from "@/components/eventsPage/EventsCTA";
import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import { useState, useEffect } from "react";
import { fetchContent } from "@/lib/fetchContent";

const EventsPage = () => {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'events');
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const featuredEvent = events[0] ?? null
    const upcomingEvents = events.length > 1 ? events.slice(1) : []

    useEffect(() => {
        fetchContent('events', setEvents, setLoading, setError);
    }, [])


    return (
        <>
            <EventsIntro
                content={messages.intro} />
            <FeaturedEvent
                content={messages.featuredEvent}
                lang={lang}
                loading={loading}
                error={error}
                event={featuredEvent} />
            <UpcomingEvents
                content={messages.upcomingEvents}
                lang={lang} loading={loading}
                error={error}
                events={upcomingEvents}
                refresh={() => fetchContent('events', setEvents, setLoading, setError)} />
            <EventsCTA
                content={messages.ctaSection} />
        </>
    );
};

export default EventsPage;