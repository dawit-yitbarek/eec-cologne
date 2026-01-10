import Link from "next/link";

const PastorCTA = ({ content }) => {
    return (
        <section className="py-20 bg-[#EFECE3]">
            <div className="max-w-4xl mx-auto px-6 text-center">

                <h3 className="font-heading text-3xl mb-4">
                    {content.title}
                </h3>

                <p className="font-body text-gray-700 mb-8">
                    {content.subtitle}
                </p>

                <Link
                    href="/contact"
                    className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-400 transition"
                >
                    {content.cta}
                </Link>

            </div>
        </section>
    );
};

export default PastorCTA;