import { getContent } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const messages = getContent(lang, 'privacy');

    return {
        title: messages.seo.title,
        description: messages.seo.description
    };
}

export default async function PrivacyPage({ params }) {
    const { lang } = await params;
    const data = getContent(lang, "privacy");

    return (
        <main className="bg-[#f9f7f2] py-20 md:py-24 min-h-screen">
            <div className="max-w-3xl mx-auto px-6 bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-3xl font-bold mb-8 text-gray-900 border-b pb-4">
                    {data.title}
                </h1>

                <div className="space-y-8">
                    {data.sections.map((section, idx) => (
                        <section key={idx} className="text-gray-700 leading-relaxed">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                {section.heading}
                            </h2>

                            {section.intro && <p className="mb-4">{section.intro}</p>}

                            {/* Indented, structured block for the address info */}
                            {section.controllerDetails ? (
                                <address className="not-italic pl-6 border-l-2 border-yellow-500/30 text-gray-800 space-y-1 my-4 text-md md:text-base">
                                    <strong className="text-gray-900 block mb-2">{section.controllerDetails.name}</strong>
                                    <strong className="block">{section.controllerDetails.street}</strong>
                                    <strong className="block mb-2">{section.controllerDetails.city}</strong>
                                    <strong className="block">{section.controllerDetails.email} </strong>
                                    <strong className="block">{section.controllerDetails.phone}</strong>
                                </address>
                            ) : (
                                <p className="whitespace-pre-line text-md md:text-base">
                                    {section.text}
                                </p>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}