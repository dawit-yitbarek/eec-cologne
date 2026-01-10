import { SiTiktok, SiYoutube, SiFacebook, SiInstagram } from "react-icons/si";

const SocialConnect = ({ content }) => {
    return (
        <section className="py-8 bg-[#FFFEFC]">
            <div className="max-w-4xl mx-auto px-6 text-center">

                <h3 className="font-heading text-3xl mb-6">
                    {content.title}
                </h3>

                <p className="font-body text-gray-700 mb-10">
                    {content.subtitle}
                </p>

                <div className="flex justify-center gap-6">
                    <a href="https://www.facebook.com/share/1AotzS4MzT/" className="p-4 rounded-full bg-white shadow hover:shadow-lg transition">
                        <SiFacebook className="w-6 h-6" />
                    </a>
                    <a href="https://www.instagram.com/eec_cologne?igsh=MTN0ZzhrYTQ5dXRhZw==" className="p-4 rounded-full bg-white shadow hover:shadow-lg transition">
                        <SiInstagram className="w-6 h-6" />
                    </a>
                    <a href="https://youtube.com/@ethiopianevangelicalchurchinco?si=7KX4FKDOzSpijOs6" className="p-4 rounded-full bg-white shadow hover:shadow-lg transition">
                        <SiYoutube className="w-6 h-6" />
                    </a>
                    <a href="https://www.tiktok.com/@eec.cologne?_r=1&_t=ZG-92tPlUjvIDh" className="p-4 rounded-full bg-white shadow hover:shadow-lg transition">
                        <SiTiktok className="w-6 h-6" />
                    </a>
                </div>

            </div>
        </section>
    );
};

export default SocialConnect;