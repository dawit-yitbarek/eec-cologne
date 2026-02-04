'use client';

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import SermonsIntro from "@/components/sermonsPage/SermonsIntro";
import FeaturedSermon from "@/components/sermonsPage/FeaturedSermon";
import SermonTabs from "@/components/sermonsPage/SermonTabs";
import SermonLibrary from "@/components/sermonsPage/VideoSermons";
import AudioSermons from "@/components/sermonsPage/AudioSermons";
import SermonsCTA from "@/components/sermonsPage/SermonsCTA";
import { useState, useEffect } from "react";
import { fetchContent } from "@/lib/fetchContent";

export default function sermons() {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'sermons');
    const [sermons, setSermons] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const videoSermons = Array.isArray(sermons.slice(1)) ? sermons.slice(1).filter(e => e.type === "video") : [];
    const audioSermons = Array.isArray(sermons) ? sermons.filter(e => e.type === "audio") : [];
    const featuredSermon = sermons.filter(e => e.type === "video")[0] ?? null

    useEffect(() => {
        fetchContent('sermons', setSermons, setLoading, setError);
    }, [])

    return (
        <>
            <SermonsIntro content={messages.intro} />
            <FeaturedSermon content={messages.featuredSermon} featuredSermon={featuredSermon} loading={loading} error={error} lang={lang} />
            <SermonTabs
                content={messages.tabs}
                videoContent={
                    <SermonLibrary
                        content={messages.library}
                        loading={loading}
                        error={error}
                        lang={lang}
                        videoSermons={videoSermons}
                        retry={() => fetchContent('sermons', setSermons, setLoading, setError)}
                    />
                }
                audioContent={
                    <AudioSermons
                        content={messages.audio}
                        loading={loading}
                        error={error}
                        lang={lang}
                        audioSermons={audioSermons}
                        retry={() => fetchContent('sermons', setSermons, setLoading, setError)}
                    />
                }
            />
            <SermonsCTA content={messages.cta} />
        </>
    )
}