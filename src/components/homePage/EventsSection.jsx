import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { UpcomingEventsSkeleton } from "../LoadingSkeletons";
import { ErrorBlock } from "../ErrorBlock";
import { formatedDate, formatedTime } from "@/lib/formatDate";

const EventsSection = ({ content, events, loading, error, retry, lang }) => {
  return (
    <section className="bg-[#F1EFEC] text-[#030303] py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-heading text-3xl md:text-4xl tracking-tight">
            {content.title}
          </h2>
          <p className="mt-4 font-body text-gray-700">{content.subtitle}</p>
        </div>

        {/* Events Grid */}
        <div className="max-w-5xl mx-auto px-6">
          {loading && <UpcomingEventsSkeleton />}
          {error && !loading && <ErrorBlock onRetry={retry} />}
          {!loading && !error && events.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              {content.noEvent}
            </p>
          )}
          {events &&
            events.map((event) => (
              <div
                key={event.slug}
                href={`/events/${event.slug}`}
                className="group block rounded-2xl bg-[#FFFEFC] my-8 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:ring-yellow-500/20"
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
                  {event.description && event.description[lang]}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-body">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>
                      {formatedTime(event.start_time)}{" "}
                      {event.end_time && `- ${formatedTime(event.end_time)}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>

                <Link
                  href={`/events/${event.slug}`}
                  className="inline-block mt-6 text-sm text-yellow-700 font-medium"
                >
                  {content.readMore}
                </Link>
              </div>
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
