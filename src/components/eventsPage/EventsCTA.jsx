import Link from "next/link";

const EventsCTA = ({ content }) => {
    return (
        <section className="relative py-24 bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0d0d0d] text-white">

            {/* Subtle decorative element */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-yellow-500/10 blur-3xl rounded-full" />
            </div>

            {/* Soft top glow separator */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

            <div className="max-w-4xl mx-auto px-6 text-center relative">
                <h3 className="font-heading text-3xl md:text-4xl mb-5 tracking-tight">
                    {content.title}
                </h3>

                <p className="font-body text-gray-300/90 mb-10 max-w-2xl mx-auto">
                    {content.subtitle}
                </p>

                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-yellow-500 text-black px-7 py-3 rounded-md font-medium transition-all hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/30"
                >
                    {content.cta}
                </Link>
            </div>
        </section>
    );
};

export default EventsCTA;