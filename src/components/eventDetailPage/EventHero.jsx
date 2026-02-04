import { EventDetailHeroSkeleton } from "../LoadingSkeletons";

const EventHero = ({ content, event, loading, lang }) => {
    return (
        <section className="pt-32 pb-20 bg-gradient-to-b from-[#F1EFEC] via-[#F8F6F2] to-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <span className="inline-block mb-4 text-sm font-body text-yellow-700">
                    {content.eyebrow}
                </span>

                {loading && <EventDetailHeroSkeleton />}
                <h1 className="font-heading text-4xl md:text-5xl tracking-tight mb-6 text-[#030303]">
                    {event.title && event.title[lang]}
                </h1>

                <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
                    {event.description && event.description[lang]}
                </p>
            </div>
        </section>
    );
};

export default EventHero;