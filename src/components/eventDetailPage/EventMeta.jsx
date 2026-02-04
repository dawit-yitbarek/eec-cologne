import { Clock, MapPin } from "lucide-react";
import { EventDetailMetaSkeleton } from "../LoadingSkeletons";
import { formatedDate, formatedTime } from "@/lib/formatDate";

const EventMeta = ({ content, loading, event }) => {
    return (
        <section className="relative -mt-10">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-2xl border border-black/5 shadow-xl shadow-black/5 p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">

                    {/* Date & Time Block */}
                    <div className="flex items-start gap-4 h-full">
                        <Clock className="text-yellow-600 mt-1" />
                        <div className="flex flex-col justify-between h-full">
                            <p className="font-heading text-sm text-[#030303]">
                                {content.dateTime}
                            </p>

                            {loading && <EventDetailMetaSkeleton />}

                            <p className="font-body text-gray-600">
                                {event.start_time && (
                                    <>
                                        {formatedDate(event.event_date)}<br />
                                        {formatedTime(event.start_time)}{" "}
                                        {event.end_time && `- ${formatedTime(event.end_time)}`}
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Location Block */}
                    <div className="flex items-start gap-4 h-full">
                        <MapPin className="text-yellow-600 mt-1" />
                        <div className="flex flex-col justify-between h-full">
                            <p className="font-heading text-sm text-[#030303]">
                                {content.location}
                            </p>

                            {loading && <EventDetailMetaSkeleton />}

                            <p className="font-body text-gray-600">
                                {event.location}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EventMeta;