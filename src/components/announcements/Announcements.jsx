import Link from "next/link";
import { ErrorBlock } from "../ErrorBlock";
import { formatedDate } from "@/lib/formatDate";
import { AnnouncementSkeleton } from "../LoadingSkeletons";

const AnnouncementsList = ({ content, announcements, lang, refresh, loading, error }) => {
    return (
        <section className="py-4 bg-white">
            <div className="max-w-5xl mx-auto px-6">

                {loading && <AnnouncementSkeleton />}
                {!loading && error && <ErrorBlock onRetry={refresh} />}
                {!loading && !error && announcements.length < 1 && (<p className="text-center py-16 text-gray-500 font-body">
                    {content.noAnnouncement}
                </p>)}

                {announcements && announcements.map((announcement) => (
                    <div
                        key={announcement.slug}
                        className="bg-[#FFFEFC] border border-black/5 rounded-2xl shadow-xl shadow-black/10 my-4 p-8 md:p-10 hover:-translate-y-1 transition-all duration-300">

                        <span className="text-sm text-yellow-700 font-body">
                            {formatedDate(announcement.published_at)}
                        </span>

                        <h2 className="font-heading text-2xl md:text-3xl mt-3 mb-4">
                            {announcement.title[lang]}
                        </h2>

                        <p className="font-body text-gray-700 max-w-3xl">
                            {announcement.description && announcement.description[lang]}
                        </p>

                        <Link
                            href={`/announcements/${announcement.slug}`}
                            className="inline-block mt-6 text-sm text-yellow-700 font-medium"
                        >
                            {content.cta}
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AnnouncementsList;