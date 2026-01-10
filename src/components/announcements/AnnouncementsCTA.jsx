import Link from "next/link";

const AnnouncementsCTA = ({ content }) => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <p className="font-body text-gray-600 mb-4">
                    {content.subtitle}
                </p>
                <Link
                    href="/contact"
                    className="text-yellow-700 font-medium hover:underline"
                >
                    {content.cta}
                </Link>
            </div>
        </section>
    );
};

export default AnnouncementsCTA;