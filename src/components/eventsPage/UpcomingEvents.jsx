import Link from "next/link";
import { Clock, MapPin } from "lucide-react";

const events = [
    {
        date: "February 10, 2026",
        time: "6:00 PM",
        location: "Main Church Hall",
        title: "Women’s Fellowship",
        description: "A space for prayer, encouragement, and connection.",
        slug: "womens-fellowship",
    },
    {
        date: "February 21–23, 2026",
        time: "All Day",
        location: "Mountain Camp",
        title: "Youth Retreat",
        description: "A weekend of spiritual growth and fellowship.",
        slug: "youth-retreat",
    },
    {
        date: "March 5, 2026",
        time: "10:00 AM",
        location: "Community Center",
        title: "Community Outreach",
        description: "Serving our neighborhood with love and compassion.",
        slug: "community-outreach",
    },
];

const UpcomingEvents = ({ content }) => {
    return (
        <section className="py-32 bg-[#FAF8F4]">
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
                    {events.map((event) => (
                        <Link
                            key={event.slug}
                            href={`/events/${event.slug}`}
                            className="group block rounded-2xl bg-[#FFFEFC] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:ring-yellow-500/20"
                        >
                            {/* Accent line */}
                            <div className="h-[2px] w-12 bg-yellow-500 mb-6 transition-all group-hover:w-20" />

                            {/* Date */}
                            <span className="block text-sm text-yellow-700 font-body mb-2">
                                {event.date}
                            </span>

                            {/* Title */}
                            <h4 className="font-heading text-xl md:text-2xl mb-3 text-yellow-600 transition">
                                {event.title}
                            </h4>

                            {/* Description */}
                            <p className="font-body text-gray-600 max-w-2xl mb-6">
                                {event.description}
                            </p>

                            {/* Meta */}
                            <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-body">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default UpcomingEvents;