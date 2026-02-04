"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import EventHero from "@/components/eventDetailPage/EventHero";
import EventMeta from "@/components/eventDetailPage/EventMeta";
import EventContent from "@/components/eventDetailPage/EventContent";
import EventCTA from "@/components/eventDetailPage/EventCTA";
import BackToEvents from "@/components/eventDetailPage/BackToEvents";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const EventDetailPage = () => {
    const params = useParams();
    const { slug } = params;
    const { lang } = useLanguage();
    const messages = getContent(lang, 'eventDetail');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [event, setEvent] = useState({});

    const fetchEvent = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await fetch(`/api/events/detail?slug=${slug}`);
            if (!res.ok) { setError(true); throw new Error(`Failed to fetch event`); }
            const data = await res.json();
            if (data && data.length > 0) setEvent(data[0]);
        } catch (error) {
            console.error("Error fetching event:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, []);

    return (
        <div className="bg-white">
            {event?.title && <EventHero content={messages.hero} event={event} loading={loading} lang={lang} />}
            {event?.title && <EventMeta content={messages.meta} event={event} loading={loading} />}
            <EventContent content={messages.content} event={event} loading={loading} error={error} lang={lang} retry={fetchEvent} />
            <EventCTA content={messages.ctaSection} />
            <BackToEvents content={messages.backLink} />
        </div>
    );
};

export default EventDetailPage;