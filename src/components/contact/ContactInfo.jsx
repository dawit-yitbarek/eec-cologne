import { MapPin, Phone, Clock } from "lucide-react";

const ContactInfo = ({ content }) => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-3">

                <div className="flex gap-4">
                    <MapPin className="text-yellow-600 mt-1" />
                    <div>
                        <h3 className="font-heading text-lg mb-1">
                            {content.location}
                        </h3>
                        <a
                            href="https://maps.app.goo.gl/x4YoMz5uVSKyCxDD8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-body text-gray-600">
                            Gemeinde Köln-Mülheim Regentenstraße 78-80 51063 Köln
                        </a>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Phone className="text-yellow-600 mt-1" />
                    <div>
                        <h3 className="font-heading text-lg mb-1">
                            {content.phone}
                        </h3>
                        <a
                            href="tel:+4915254018740"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-body text-gray-600">
                            +49 1525 4018740
                        </a>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Clock className="text-yellow-600 mt-1" />
                    <div>
                        <h3 className="font-heading text-lg mb-1">
                            {content.serviceTimes}
                        </h3>
                        <p className="font-body text-gray-600">
                            {content.services.sunday}<br />
                            {content.services.midweek}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContactInfo;