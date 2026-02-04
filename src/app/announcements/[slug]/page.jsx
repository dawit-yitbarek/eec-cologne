"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import AnnouncementHeader from "@/components/announcementDetail/AnnouncementHeader";
import AnnouncementContent from "@/components/announcementDetail/AnnouncementContent";
import AnnouncementFooter from "@/components/announcementDetail/AnnouncementFooter";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AnnouncementDetailPage() {
    const params = useParams();
    const { slug } = params;
    const { lang } = useLanguage();
    const messages = getContent(lang, 'announcementDetail');
    const [announcement, setAnnouncement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchAnnouncement = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await fetch(`/api/announcements/detail?slug=${slug}`);
            if (!res.ok) { setError(true); throw new Error(`Failed to fetch announcement`); }
            const data = await res.json();
            if (data && data.length > 0) setAnnouncement(data[0]);
        } catch (error) {
            console.error("Error fetching announcement:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncement();
    }, []);

    return (
        <>
            {announcement?.title && <AnnouncementHeader announcement={announcement} loading={loading} lang={lang} /> }
            <AnnouncementContent announcement={announcement} loading={loading} lang={lang} error={error} retry={fetchAnnouncement} />
            <AnnouncementFooter content={messages} />
        </>
    )
}