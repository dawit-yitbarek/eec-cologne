'use client';

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import SermonsIntro from "@/components/sermonsPage/SermonsIntro";
import FeaturedSermon from "@/components/sermonsPage/FeaturedSermon";
import SermonTabs from "@/components/sermonsPage/SermonTabs";
import SermonLibrary from "@/components/sermonsPage/VideoSermons";
import AudioSermons from "@/components/sermonsPage/AudioSermons";
import SermonsCTA from "@/components/sermonsPage/SermonsCTA";

export default function sermons() {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'sermons');

    return (
        <>
            <SermonsIntro content={messages.intro} />
            <FeaturedSermon content={messages.featuredSermon} />
            <SermonTabs content={messages.tabs} videoContent={<SermonLibrary content={messages.library} />} audioContent={<AudioSermons content={messages.audio} />} />
            <SermonsCTA content={messages.cta} />
        </>
    )
}