import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { formatedTime, formatedDate } from "@/lib/formatDate";
import { UpcomingEventsSkeleton } from "../LoadingSkeletons";
import { ErrorBlock } from "../ErrorBlock";

const UpcomingEvents = ({ content, lang, events, loading, error, refresh }) => {

    return (
        <section className="py-20 bg-[#FAF8F4]">
            <div className="max-w-5xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-20">
                    <h3 className="font-heading text-3xl md:text-4xl mb-4 text-[#1C1C1C]">
                        {content.title}
                    </h3>
                    <p className="font-body text-gray-600 max-w-2xl mx-auto">
                        {content.subtitle}
                    </p>
                </div>

                {/* Events */}
                <div className="space-y-12">

                    {loading && <UpcomingEventsSkeleton />}

                    {!loading && error && <ErrorBlock onRetry={refresh} />}

                    {events.length === 0 && !loading && !error && (
                        <p className="text-center text-gray-500 font-body">
                            {content.noUpcoming}
                        </p>
                    )}

                    {events && events.map((event) => (
                        <Link
                            key={event.slug}
                            href={`/events/${event.slug}`}
                            className="group block rounded-2xl bg-[#FFFEFC] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:ring-yellow-500/20"
                        >
                            {/* Accent line */}
                            <div className="h-[2px] w-12 bg-yellow-500 mb-6 transition-all group-hover:w-20" />

                            {/* Date */}
                            <span className="block text-sm text-yellow-700 font-body mb-2">
                                {formatedDate(event.event_date)}
                            </span>

                            {/* Title */}
                            <h4 className="font-heading text-xl md:text-2xl mb-3 text-yellow-600 transition">
                                {event.title[lang]}
                            </h4>

                            {/* Description */}
                            <p className="font-body text-gray-600 max-w-2xl mb-6">
                                {event?.description[lang]}
                            </p>

                            {/* Meta */}
                            <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-body">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{formatedTime(event.start_time)} {event.end_time && (`- ${formatedTime(event.end_time)}`)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>{event?.location}</span>
                                </div>
                            </div>
                        </Link>
                    ))
                    }
                </div>

            </div>
        </section>
    );
};

export default UpcomingEvents;