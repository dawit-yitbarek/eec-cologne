"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import SermonsIntro from "@/components/sermonsPage/SermonsIntro";
import FeaturedSermon from "@/components/sermonsPage/FeaturedSermon";
import SermonTabs from "@/components/sermonsPage/SermonTabs";
import SermonLibrary from "@/components/sermonsPage/VideoSermons";
import AudioSermons from "@/components/sermonsPage/AudioSermons";
import SermonsCTA from "@/components/sermonsPage/SermonsCTA";

export default function SermonsPageClient({ sermons }) {
  const { lang } = useLanguage();
  const messages = getContent(lang, "sermons");

  const videoSermonsAll = Array.isArray(sermons) ? sermons.filter((e) => e.type === "video") : [];
  const featuredSermon = videoSermonsAll[0] ?? null;
  const videoSermons = videoSermonsAll.slice(1);
  const audioSermons = Array.isArray(sermons) ? sermons.filter((e) => e.type === "audio") : [];

  return (
    <>
      <SermonsIntro content={messages.intro} />
      <FeaturedSermon content={messages.featuredSermon} featuredSermon={featuredSermon} lang={lang} />
      <SermonTabs
        content={messages.tabs}
        videoContent={
          <SermonLibrary
            content={messages.library}
            lang={lang}
            videoSermons={videoSermons}
          />
        }
        audioContent={
          <AudioSermons
            content={messages.audio}
            lang={lang}
            audioSermons={audioSermons}
          />
        }
      />
      <SermonsCTA content={messages.cta} />
    </>
  );
}
