import { formatedDate } from "@/lib/formatDate";
import { EventDetailHeroSkeleton } from "../LoadingSkeletons";

const AnnouncementHeader = ({ announcement, loading, lang }) => {
    return (
        <section className="pt-32 pb-10 bg-gradient-to-b from-[#F6F4EF] to-white">
            <div className="max-w-3xl mx-auto px-6 text-center">
                {loading && <EventDetailHeroSkeleton />}
                <span className="text-sm text-yellow-700 font-body">
                    {formatedDate(announcement?.published_at)}
                </span>

                <h1 className="font-heading text-4xl md:text-5xl leading-tight mt-4 mb-6">
                    {announcement?.title && announcement.title[lang]}
                </h1>

                <p className="font-body text-lg text-gray-600">
                    {announcement?.description && announcement.description[lang]}
                </p>
            </div>
        </section>
    );
};

export default AnnouncementHeader;