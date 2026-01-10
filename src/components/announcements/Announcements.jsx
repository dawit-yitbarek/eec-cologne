import Link from "next/link";

const announcements = [
    {
        title: "Sunday Worship Service",
        description:
            "Join us every Sunday for worship, teaching, and fellowship.",
        date: "February 11, 2026",
        slug: "sunday-worship",
    },
    {
        title: "Youth Bible Study",
        description:
            "Weekly Bible study for youth every Saturday afternoon.",
        date: "February 13, 2026",
        slug: "youth-bible-study",
    },
    {
        title: "Community Outreach",
        description:
            "Volunteers needed for our upcoming outreach program.",
        date: "February 15, 2026",
        slug: "community-outreach",
    },
];

const AnnouncementsList = ({ content }) => {
    return (
        <section className="py-4 bg-white">
            <div className="max-w-5xl mx-auto px-6">
                {announcements.map((item) => (
                    <div
                        key={item.slug}
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
                            href={`/announcements/${item.slug}`}
                            className="inline-block mt-6 text-sm text-yellow-700 font-medium"
                        >
                            {content.cta}
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AnnouncementsList;