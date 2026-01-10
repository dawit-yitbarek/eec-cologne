'use client';

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import MinistriesIntro from "@/components/ministriesPage/MinistriesIntro";
import MinistriesGrid from "@/components/ministriesPage/Ministries";
import MinistriesPurpose from "@/components/ministriesPage/MinistriesPurpose";
import MinistriesCTA from "@/components/ministriesPage/MinistriesCTA";

export default function ministries() {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'ministries');

    return (
        <>
            <MinistriesIntro content={messages.intro} />
            <MinistriesGrid content={messages.grid} />
            <MinistriesPurpose content={messages.purpose} />
            <MinistriesCTA content={messages.ctaSection} />
        </>
    )
}