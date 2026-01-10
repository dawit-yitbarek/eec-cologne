const EventHero = ({ content }) => {
    return (
        <section className="pt-32 pb-20 bg-gradient-to-b from-[#F1EFEC] via-[#F8F6F2] to-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <span className="inline-block mb-4 text-sm font-body text-yellow-700">
                    {content.eyebrow}
                </span>

                <h1 className="font-heading text-4xl md:text-5xl tracking-tight mb-6 text-[#030303]">
                    Women’s Fellowship
                </h1>

                <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
                    A space for prayer, encouragement, and meaningful connection
                    within our church family.
                </p>
            </div>
        </section>
    );
};

export default EventHero;