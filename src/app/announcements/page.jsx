"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import AnnouncementsIntro from "@/components/announcements/AnnouncementsIntro";
import AnnouncementsList from "@/components/announcements/Announcements";
import AnnouncementsCTA from "@/components/announcements/AnnouncementsCTA";
import { fetchContent } from "@/lib/fetchContent";
import { useState, useEffect } from "react";

export default function Announcements() {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'announcements');
    const [announcements, setAnnouncements] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchContent('announcements', setAnnouncements, setLoading, setError);
    }, [])
    return (
        <>
            <AnnouncementsIntro content={messages.intro} />
            <AnnouncementsList
                content={messages.list}
                announcements={announcements}
                loading={loading}
                error={error}
                refresh={() => fetchContent('announcements', setAnnouncements, setLoading, setError)}
                lang={lang}
            />
            <AnnouncementsCTA content={messages.ctaSection} />
        </>
    )
}