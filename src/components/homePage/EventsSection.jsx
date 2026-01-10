import Link from "next/link";
import { Clock, MapPin } from "lucide-react";

const events = [
    {
        title: "Sunday Worship Service",
        date: "March 10, 2026",
        time: "9:00 AM",
        location: "Main Church Hall",
    },
    {
        title: "Youth Fellowship Meeting",
        date: "March 13, 2026",
        time: "4:00 PM",
        location: "Youth Center",
    },
    {
        title: "Prayer & Fasting Night",
        date: "March 15, 2026",
        time: "6:30 PM",
        location: "Prayer Hall",
    },
];

const EventsSection = ({ content }) => {
    return (
        <section className="bg-[#F1EFEC] text-[#030303] py-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <h2 className="font-heading text-3xl md:text-4xl tracking-tight">
                        {content.title}
                    </h2>
                    <p className="mt-4 font-body text-gray-700">
                        {content.subtitle}
                    </p>
                </div>

                {/* Events Grid */}
                <div className="space-y-12">
                    {events.map((event) => (
                        <Link
                            key={(event.title.split(" ")).join("-")}
                            href={`/events/${(event.title.split(" ")).join("-")}`}
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
                                {event.title}
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

                {/* CTA */}
                <div className="mt-14">
                    <Link
                        href="/events"
                        className="inline-block text-yellow-600 font-medium hover:underline"
                    >
                        {content.viewAll}
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default EventsSection;
