"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import ContactIntro from "@/components/contact/ContactIntro";
import ContactInfo from "@/components/contact/ContactInfo";
import SocialConnect from "@/components/contact/SocialConnect";

export default function contact() {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'contact');

    return (
        <>
            <ContactIntro content={messages.intro} />
            <ContactInfo content={messages.info} />
            <SocialConnect content={messages.social} />
        </>
    );
}