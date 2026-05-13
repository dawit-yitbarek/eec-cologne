import Link from "next/link";

export default function NotFound() {

    return (
        <html lang="en">
            <body>
                <main className="min-h-[70vh] bg-[#f9f7f2] flex items-center justify-center px-6 py-20">
                    <div className="max-w-2xl w-full text-center">
                        <div className="relative inline-block mb-8">
                            <h1 className="text-9xl font-heading text-yellow-500/20 select-none">
                                404
                            </h1>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-heading mb-6 text-gray-900">
                            Page Not Found
                        </h2>

                        <p className="text-gray-700 mb-10 leading-relaxed max-w-md mx-auto">
                            The page you are looking for might have been removed, had its name changed,
                            or is temporarily unavailable.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/"
                                className="inline-block bg-yellow-500 px-8 py-3 rounded-md font-medium hover:bg-yellow-400 transition shadow-sm"
                            >
                                Return Home
                            </Link>

                            <Link
                                href="/about"
                                className="inline-block bg-white border border-gray-200 px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition"
                            >
                                Learn About Us
                            </Link>
                        </div>
                    </div>
                </main>
            </body>
        </html>

    );
}