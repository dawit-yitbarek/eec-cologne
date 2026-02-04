"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import GalleryIntro from "@/components/gallery/GalleryIntro";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { useCallback, useEffect, useState } from "react";
import { fetchContent } from "@/lib/fetchContent";

export default function Gallery() {
    const { lang } = useLanguage();
    const messages = getContent(lang, "gallery");

    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getGallery = useCallback(async () => {
        fetchContent('gallery', setGallery, setLoading, setError);
    }, []);

    useEffect(() => {
        getGallery();
    }, [getGallery]);

    return (
        <>
            <GalleryIntro content={messages} />
            <GalleryGrid
                content={messages}
                gallery={gallery}
                loading={loading}
                error={error}
                lang={lang}
                retry={getGallery}
            />
        </>
    );
}