"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import EventHero from "@/components/eventDetailPage/EventHero";
import EventMeta from "@/components/eventDetailPage/EventMeta";
import EventContent from "@/components/eventDetailPage/EventContent";
import EventCTA from "@/components/eventDetailPage/EventCTA";
import BackToEvents from "@/components/eventDetailPage/BackToEvents";

const EventDetailPage = () => {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'eventDetail');

    return (
        <div className="bg-white">
            <EventHero content={messages.hero} />
            <EventMeta content={messages.meta} />
            <EventContent content={messages.content} />
            <EventCTA content={messages.ctaSection} />
            <BackToEvents content={messages.backLink} />
        </div>
    );
};

export default EventDetailPage;