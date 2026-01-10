import { Clock, MapPin } from "lucide-react";

const EventMeta = ({ content }) => {
    return (
        <section className="relative -mt-10">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-2xl border border-black/5 shadow-xl shadow-black/5 p-8 flex flex-col sm:flex-row gap-8 justify-center">

                    <div className="flex items-center gap-4">
                        <Clock className="text-yellow-600" />
                        <div>
                            <p className="font-heading text-sm text-[#030303]">
                                {content.dateTime}
                            </p>
                            <p className="font-body text-gray-600">
                                February 10 • 5:00 PM
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <MapPin className="text-yellow-600" />
                        <div>
                            <p className="font-heading text-sm text-[#030303]">
                                {content.location}
                            </p>
                            <p className="font-body text-gray-600">
                                Main Church Hall
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EventMeta;