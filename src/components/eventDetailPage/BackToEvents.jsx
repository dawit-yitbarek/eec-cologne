import Link from "next/link";

const BackToEvents = ({ content }) => {
    return (
        <div className="py-8 text-center flex justify-center items-center">
            <Link
                href="/events"
                className="font-body text-sm text-gray-500 hover:text-gray-700 transition"
            >
                {content}
            </Link>
        </div>
    );
};

export default BackToEvents;