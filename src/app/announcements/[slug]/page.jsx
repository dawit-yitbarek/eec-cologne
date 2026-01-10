"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import AnnouncementHeader from "@/components/announcementDetail/AnnouncementHeader";
import AnnouncementContent from "@/components/announcementDetail/AnnouncementContent";
import AnnouncementFooter from "@/components/announcementDetail/AnnouncementFooter";

export default function AnnouncementDetailPage() {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'announcementDetail');

    return (
        <>
            <AnnouncementHeader />
            <AnnouncementContent />
            <AnnouncementFooter content={messages} />
        </>
    )
}