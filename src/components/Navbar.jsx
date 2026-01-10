"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import NavDropdown from "./NavDropdown";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { lang } = useLanguage();
    const messages = getContent(lang, 'navbar');

    return (
        <>
            {/* Navbar */}
            <header className="w-full fixed top-0 z-50 bg-black/60 backdrop-blur-md">
                <nav className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">

                    {/* Logo (fixed width and height) */}
                    <Link
                        href="/"
                        className="font-heading flex gap-2 justify-center items-center text-xl tracking-wide text-white"
                    >
                        <Image
                            src='/images/logo.png'
                            alt='logo'
                            width={50} // Set a specific width for the logo
                            height={40} // Set a specific height for the logo
                            className="object-contain" // Ensure the logo maintains its aspect ratio
                        />
                        <span>{messages.logo}</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8 font-heading">
                        <ul className="flex items-center gap-8 text-md text-gray-200">
                            <li><Link href="/about">{messages.links.about}</Link></li>
                            <li><Link href="/events">{messages.links.events}</Link></li>
                            <li><Link href="/gallery">{messages.links.gallery}</Link></li>
                            <li><Link href="/ministries">{messages.links.ministries}</Link></li>
                            <li><Link href="/contact">{messages.links.contact}</Link></li>
                            <li>
                                <NavDropdown
                                    label={messages.label}
                                    links={[
                                        { href: "/sermons", label: messages.links.sermons },
                                        { href: "/pastor-message", label: messages.links.pastorMessage },
                                        { href: "/announcements", label: messages.links.announcements }
                                    ]}
                                />
                            </li>
                        </ul>

                        <Link
                            href="/donate"
                            className="bg-yellow-500 text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-400 transition"
                        >
                            {messages.links.donate}
                        </Link>

                        <LanguageSwitcher sidebar={false} />

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(true)}
                        className="lg:hidden text-white"
                        aria-label="Open menu"
                    >
                        <Menu size={26} />
                    </button>
                </nav>
            </header>


            {/* Backdrop */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`fixed top-0 right-0 z-50 h-screen w-1/2 max-w-xs bg-[#F1EFEC] transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-6 flex flex-col h-full overflow-y-auto">
                    {/* Close */}
                    <button
                        onClick={() => setOpen(false)}
                        className="self-end mb-10"
                        aria-label="Close menu"
                    >
                        <X size={26} />
                    </button>

                    {/* Links */}
                    <nav className="flex flex-col gap-6 font-heading text-lg">
                        <Link href="/about" onClick={() => setOpen(false)}>{messages.links.about}</Link>
                        <Link href="/events" onClick={() => setOpen(false)}>{messages.links.events}</Link>
                        <Link href="/sermons" onClick={() => setOpen(false)}>{messages.links.sermons}</Link>
                        <Link href="/ministries" onClick={() => setOpen(false)}>{messages.links.ministries}</Link>
                        <Link href="/announcements" onClick={() => setOpen(false)}>{messages.links.announcements}</Link>
                        <Link href="/pastor-message" onClick={() => setOpen(false)}>{messages.links.pastorMessage}</Link>
                        <Link href="/gallery" onClick={() => setOpen(false)}>{messages.links.gallery}</Link>
                        <Link href="/contact" onClick={() => setOpen(false)}>{messages.links.contact}</Link>
                    </nav>

                    {/* Donate */}
                    <Link
                        href="/donate"
                        onClick={() => setOpen(false)}
                        className="my-4 bg-yellow-500 text-black text-center py-3 rounded-md font-medium hover:bg-yellow-400 transition"
                    >
                        {messages.links.donate}
                    </Link>
                    <LanguageSwitcher sidebar={true} />
                </div>
            </aside>
        </>
    );
};

export default Navbar;