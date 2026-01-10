"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import AnnouncementsIntro from "@/components/announcements/AnnouncementsIntro";
import AnnouncementsList from "@/components/announcements/Announcements";
import AnnouncementsCTA from "@/components/announcements/AnnouncementsCTA";

export default function announcements() {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'announcements');

    return (
        <>
            <AnnouncementsIntro content={messages.intro} />
            <AnnouncementsList content={messages.list} />
            <AnnouncementsCTA content={messages.ctaSection} />
        </>
    )
}