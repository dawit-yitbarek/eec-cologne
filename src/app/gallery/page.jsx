"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import GalleryIntro from "@/components/gallery/GalleryIntro";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export default function gallery() {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'gallery');

    return (
        <>
            <GalleryIntro content={messages} />
            <GalleryGrid />
        </>
    );
}