"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'footer');

    return (
        <footer className="bg-[#E8E5DC] text-[#030303]">
            <div className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid gap-12 md:grid-cols-5">

                    {/* Church Identity */}
                    <div>
                        <h3 className="font-heading text-xl mb-4">{messages.identity.title}</h3>
                        <p className="font-body text-sm text-gray-700 leading-relaxed">
                            {messages.identity.subtitle}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-heading text-sm uppercase tracking-wide mb-4">{messages.navigation.title}</h4>
                        <ul className="space-y-3 text-sm font-body text-gray-700">
                            <li><Link href="/about" className="hover:text-black">{messages.navigation.links.about}</Link></li>
                            <li><Link href="/events" className="hover:text-black">{messages.navigation.links.events}</Link></li>
                            <li><Link href="/contact" className="hover:text-black">{messages.navigation.links.contact}</Link></li>
                        </ul>
                    </div>

                    {/* Get Involved */}
                    <div>
                        <h4 className="font-heading text-sm uppercase tracking-wide mb-4">{messages.involved.title}</h4>
                        <ul className="space-y-3 text-sm font-body text-gray-700">
                            <li><Link href="/ministries" className="hover:text-black">{messages.involved.links.ministries}</Link></li>
                            <li><Link href="/donate" className="hover:text-black">{messages.involved.links.donate}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading text-sm uppercase tracking-wide mb-4">{messages.contact.title}</h4>
                        <ul className="space-y-3 text-sm font-body text-gray-700">
                            <li className="flex items-center gap-2">
                                <FaPhoneAlt className="text-black" aria-hidden="true" />
                                <a href="tel:+4915254018740" className="hover:text-black" aria-label="Call us at +49 1525 4018740">
                                    +49 1525 4018740
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-black" aria-hidden="true" />
                                <a href="https://maps.app.goo.gl/x4YoMz5uVSKyCxDD8" target="_blank" rel="noopener noreferrer" className="hover:text-black" aria-label="Find us on Google Maps" >
                                    Gemeinde Köln-Mülheim <br /> Regentenstraße 78-80 51063 Köln
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="flex flex-col items-center">
                        <h4 className="font-heading text-sm uppercase tracking-wide mb-4">{messages.social.title}</h4>
                        <div className="flex space-x-4 text-xl text-gray-700">
                            <a
                                href="https://www.facebook.com/share/1AotzS4MzT/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our Facebook page"
                                className="hover:text-black">
                                <FaFacebookF />
                            </a>
                            <a
                                href="https://www.instagram.com/eec_cologne?igsh=MTN0ZzhrYTQ5dXRhZw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our Instagram page"
                                className="hover:text-black">
                                <FaInstagram />
                            </a>
                            <a
                                href="https://youtube.com/@ethiopianevangelicalchurchinco?si=7KX4FKDOzSpijOs6"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our Youtube page"
                                className="hover:text-black">
                                <FaYoutube />
                            </a>
                            <a
                                href="https://www.tiktok.com/@eec.cologne?_r=1&_t=ZG-92tPlUjvIDh"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our Tiktok page"
                                className="hover:text-black">
                                <FaTiktok />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="mt-16 border-t border-black/10 pt-8 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
                    <span>© {new Date().getFullYear()} {messages.identity.title} {messages.divider.rights}</span>
                    <span>{messages.divider.rights}</span>
                </div>

            </div>
        </footer>
    );
};

export default Footer;