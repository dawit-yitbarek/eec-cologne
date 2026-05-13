import { GalleryPageClient } from "@/components/gallery/GalleryPageClient";
import { getContent } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const messages = getContent(lang, 'gallery');

    return {
        title: messages.seo.title,
        description: messages.seo.description
    };
}

export default async function GalleryPage({ params }) {
    const { lang } = await params;
    return (
        <GalleryPageClient lang={lang} />
    );
};