"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import PastorIntro from "@/components/pastorMessage/PastorMessageIntro";
import PastorMessageContent from "@/components/pastorMessage/PastorMessageContent";
import PastorScripture from "@/components/pastorMessage/PastorScripture";
import PastorCTA from "@/components/pastorMessage/PastorMessageCTA";
import { useState, useEffect } from "react";
import { fetchContent } from "@/lib/fetchContent";

export default function pastorMessage() {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'pastorMessage');
    const [pastorMessages, setPastorMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchContent('pastor-message', setPastorMessages, setLoading, setError);
    }, [])

    return (
        <>
            <PastorIntro content={messages.intro} />
            <PastorMessageContent
                content={messages.messages}
                lang={lang}
                loading={loading}
                error={error}
                messages={pastorMessages}
                retry={() => fetchContent('pastor-message', setPastorMessages, setLoading, setError)}
            />
            <PastorScripture content={messages.scripture} />
            <PastorCTA content={messages.ctaSection} />
        </>
    )
}