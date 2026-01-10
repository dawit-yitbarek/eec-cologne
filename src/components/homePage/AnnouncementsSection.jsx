import Link from "next/link";

const announcements = [
    {
        title: "Sunday Worship Service",
        description:
            "Join us this Sunday at 9:00 AM for worship, prayer, and the Word.",
        date: "This Sunday",
    },
    {
        title: "Midweek Prayer Meeting",
        description:
            "A time of prayer and reflection every Wednesday at 6:30 PM.",
        date: "Every Wednesday",
    },
    {
        title: "Youth Fellowship Gathering",
        description:
            "Youth fellowship will meet this Saturday for discussion and fellowship.",
        date: "This Saturday",
    },
];

const AnnouncementsSection = ({ content }) => {
    return (
        <section className="bg-[#EFECE3] text-[#030303] py-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="max-w-2xl mb-14">
                    <h2 className="font-heading text-3xl md:text-4xl tracking-tight">
                        {content.title}
                    </h2>
                    <p className="mt-4 font-body text-gray-700">
                        {content.subtitle}
                    </p>
                </div>

                {/* List */}
                <div className="max-w-5xl mx-auto px-6">
                    {announcements.map((item) => (
                        <div
                            key={(item.title.split(" ")).join("-")}
                            className="bg-[#FFFEFC] border border-black/5 rounded-2xl shadow-xl shadow-black/10 my-4 p-8 md:p-10 hover:-translate-y-1 transition-all duration-300">

                            <span className="text-sm text-yellow-700 font-body">
                                {item.date}
                            </span>

                            <h2 className="font-heading text-2xl md:text-3xl mt-3 mb-4">
                                {item.title}
                            </h2>

                            <p className="font-body text-gray-700 max-w-3xl">
                                {item.description}
                            </p>

                            <Link
                                href={`/announcements/${(item.title.split(" ")).join("-")}`}
                                className="inline-block mt-6 text-sm text-yellow-700 font-medium"
                            >
                                {content.readMore}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* View More */}
                <div className="mt-12">
                    <Link
                        href="/announcements"
                        className="inline-block font-medium text-yellow-600 hover:underline"
                    >
                        {content.viewAll}
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default AnnouncementsSection;