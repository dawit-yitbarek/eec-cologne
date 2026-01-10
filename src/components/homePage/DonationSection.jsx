import Link from "next/link";

const DonationSection = ({ content }) => {
    return (
        <section className="bg-[#EFECE3] text-[#030303] py-28">
            <div className="max-w-4xl mx-auto px-6 text-center">

                <h2 className="font-heading text-3xl md:text-4xl tracking-tight">
                    {content.header}
                </h2>

                <p className="mt-6 font-body text-gray-700 max-w-2xl mx-auto">
                    {content.subtitle}
                </p>

                <div className="mt-10">
                    <Link
                        href="/donate"
                        className="inline-block bg-yellow-500 text-black px-8 py-4 rounded-md text-lg font-medium hover:bg-yellow-400 transition"
                    >
                        {content.cta}
                    </Link>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    {content.note}
                </p>

            </div>
        </section>
    );
};

export default DonationSection;