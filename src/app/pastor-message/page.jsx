"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import PastorIntro from "@/components/pastorMessage/PastorMessageIntro";
import PastorMessageContent from "@/components/pastorMessage/PastorMessageContent";
import PastorScripture from "@/components/pastorMessage/PastorScripture";
import PastorCTA from "@/components/pastorMessage/PastorMessageCTA";

export default function pastorMessage() {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'pastorMessage');

    return (
        <>
            <PastorIntro content={messages.intro} />
            <PastorMessageContent content={messages.messages} />
            <PastorScripture content={messages.scripture} />
            <PastorCTA content={messages.ctaSection} />
        </>
    )
}