"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import DonateIntro from "@/components/donate/DonateIntro";
import DonationForm from "@/components/donate/DonationForm";
import ImpactSection from "@/components/donate/ImpactSection";
import TrustSection from "@/components/donate/TrustSection";
import ClosingMessage from "@/components/donate/ClosingMessage";

export default function Donate() {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'donate');
    console.log()
    return (
        <>
            <DonateIntro content={messages.intro} />
            <DonationForm content={messages.form} />
            <ImpactSection content={messages.impact} />
            <TrustSection content={messages.trust} />
            <ClosingMessage content={messages.closing} />
        </>
    )
}