import Link from "next/link";

const AnnouncementFooter = ({ content }) => {
    return (
        <section className="py-16 bg-[#F6F4EF]">
            <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">

                <Link
                    href="/announcements"
                    className="text-sm font-medium text-gray-700 hover:underline"
                >
                    {content.backLink}
                </Link>

                <Link
                    href="/contact"
                    className="text-sm font-medium text-yellow-700 hover:underline"
                >
                    {content.contactLink}
                </Link>

            </div>
        </section>
    );
};

export default AnnouncementFooter;