import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { formatedTime, formatedDate } from "@/lib/formatDate";
import { FeaturedEventSkeleton } from "../LoadingSkeletons";

const FeaturedEvent = ({ content, event, lang, loading }) => {

    return (
        <section className="bg-[#F1EFEC] py-24">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                {/* Image */}
                <div className="relative h-[380px] rounded-xl overflow-hidden">
                    <Image
                        src="/images/event-featured.jpg"
                        alt="Sunday Worship"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div>
                    <span className="inline-block mb-4 text-sm uppercase tracking-widest text-yellow-600 font-heading">
                        {content.eyebrow}
                    </span>

                    {loading && <FeaturedEventSkeleton />}

                    {!loading && !event && (
                        <p className="text-center text-gray-500 font-body">
                            {content.noFeatured}
                        </p>
                    )}

                    {event && (
                        <>
                            <h2 className="font-heading text-black text-3xl md:text-4xl leading-tight mb-4">
                                {event.title[lang]}
                            </h2>

                            <p className="font-body text-gray-700 mb-6 text-lg">
                                {event?.description[lang]}
                            </p>

                            <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-600 font-body">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{formatedDate(event.event_date)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>{event?.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{formatedTime(event.start_time)} {event.end_time && (`- ${formatedTime(event.end_time)}`)}</span>
                                </div>
                            </div>

                            <Link
                                href={`/events/${event.slug}`}
                                className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-400 transition"
                            >
                                {content.cta}
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </section>
    );
};

export default FeaturedEvent;