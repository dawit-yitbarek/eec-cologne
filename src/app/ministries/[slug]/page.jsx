'use client';

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import MinistryHero from "@/components/ministryDetailPage/MinistryHero";
import MinistryContent from "@/components/ministryDetailPage/MinistryContent";
import MinistryCTA from "@/components/ministryDetailPage/MinistryCTA";

const title = 'Youth ministry'
const subtitle = 'Guiding young people to grow in faith, character, and purpose.'
const image = '/images/ministries/youth.jpg'
const description = 'Guiding young people to grow in faith, character, and purpose.'

export default function MinistryDetailPage() {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'ministryDetail');

    return (
        <>
            <MinistryHero title={title} subtitle={subtitle} image={image} />
            <MinistryContent content={messages.content} description={description} />
            <MinistryCTA content={messages.ctaSection} />
        </>
    )
}