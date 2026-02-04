'use client';

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { CheckCircle, Loader, XCircle } from "lucide-react";
import Link from "next/link";

export default function VerifyClient() {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'verify');
    const searchParams = useSearchParams();
    const orderID = searchParams.get("token");

    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!orderID) {
            setStatus("error");
            setMessage(messages.error.invalidSession );
            return;
        }

        const capturePayment = async () => {
            try {
                const res = await axios.post("/api/capture-order", { orderID });

                if (res.data.status === "COMPLETED") {
                    setStatus("success");
                } else {
                    setStatus("error");
                    setMessage(`${messages.error.notCompleted} (${res.data.status})`);
                }
            } catch {
                setStatus("error");
                setMessage(messages.error.failedVerification);
            }
        };

        capturePayment();
    }, [orderID]);

    return (
        <section className="min-h-screen flex items-center justify-center bg-[#F1EFEC] px-6">
            <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-lg text-center">

                {status === "loading" && (
                    <>
                        <Loader size={48} className="animate-spin mx-auto mb-6 text-yellow-500" />
                        <h2 className="font-heading text-2xl mb-2">
                            {messages.loading.title}
                        </h2>
                        <p className="text-gray-500 font-body">
                            {messages.loading.subtitle}
                        </p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <CheckCircle size={56} className="mx-auto mb-6 text-green-500" />
                        <h2 className="font-heading text-2xl mb-2">
                            {messages.success.title}
                        </h2>
                        <p className="text-gray-600 font-body mb-6">
                            {messages.success.subtitle}
                        </p>
                        <Link href="/" className="inline-block rounded-xl bg-yellow-500 px-6 py-3 font-heading text-black hover:bg-yellow-400 transition">
                            {messages.success.button}
                        </Link>
                    </>
                )}

                {status === "error" && (
                    <>
                        <XCircle size={56} className="mx-auto mb-6 text-red-500" />
                        <h2 className="font-heading text-2xl mb-2">
                            {messages.error.title}
                        </h2>
                        <p className="text-gray-600 font-body mb-6">
                            {message}
                        </p>
                        <Link href="/donate" className="inline-block rounded-xl bg-black px-6 py-3 font-heading text-white hover:bg-gray-800 transition">
                            {messages.error.button}
                        </Link>
                    </>
                )}

            </div>
        </section>
    );
}