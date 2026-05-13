import VerifyPageClient from "@/components/verify/VerifyPageClient";

export const metadata = {
    title: "Verifying Donation...",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function VerifyPage({ params }) {
    const { lang } = await params;
    return <VerifyPageClient lang={lang} />

}