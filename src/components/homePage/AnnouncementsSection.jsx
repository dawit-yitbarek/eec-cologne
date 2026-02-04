import Link from "next/link";
import { formatedDate } from "@/lib/formatDate";
import { AnnouncementSkeleton } from "../LoadingSkeletons";
import { ErrorBlock } from "../ErrorBlock";

const AnnouncementsSection = ({ content, announcements, loading, error, retry, lang }) => {
    return (
        <section className="bg-[#EFECE3] text-[#030303] py-8">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="max-w-2xl mb-14">
                    <h2 className="font-heading text-3xl md:text-4xl tracking-tight">
                        {content.title}
                    </h2>
                    <p className="mt-4 font-body text-gray-700">
                        {content.subtitle}
                    </p>
                </div>

                {/* List */}
                <div className="max-w-5xl mx-auto px-6">

                    {loading && <AnnouncementSkeleton />}
                    {error && !loading && <ErrorBlock onRetry={retry} />}
                    {!loading && !error && announcements.length === 0 && (
                        <p className="col-span-full text-center text-gray-500">{content.noAnnouncement}</p>
                    )}
                    {announcements && announcements.map((announcement) => (
                        <div
                            key={(announcement.slug)}
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
                                href={`/announcements/${(announcement.slug)}`}
                                className="inline-block mt-6 text-sm text-yellow-700 font-medium"
                            >
                                {content.readMore}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* View More */}
                <div className="mt-12">
                    <Link
                        href="/announcements"
                        className="inline-block font-medium text-yellow-600 hover:underline"
                    >
                        {content.viewAll}
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default AnnouncementsSection;