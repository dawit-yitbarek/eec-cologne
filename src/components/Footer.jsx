import Link from "next/link";
import { getContent } from "@/lib/getMessages";

const Footer = ({ lang }) => {
  const messages = getContent(lang, "footer");

  return (
    <footer className="bg-gray-100 text-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Column 1: Contact */}
        <div>
          <h4 className="font-semibold mb-3">{messages.contact.title}</h4>
          <p>{messages.contact.address}: Regentenstraße 78-80, 51063 Köln</p>
          <p className="mt-2">{messages.contact.representative}: Haileselassie G. Gebrehiwot</p>
          {/* Phone number section column layout */}
          <div className="mt-2 flex flex-col sm:flex-row sm:gap-2">
            <span>{messages.contact.phone}:</span>
            <div className="flex flex-col">
              <a href="tel:+4915734409660" className="hover:underline">+49 157 34409660</a>
              <a href="tel:+4915254018740" className="hover:underline mt-1 sm:mt-0">+49 152 54018740</a>
            </div>
          </div>

          <p className="mt-2">{messages.contact.email}: <a href="mailto:info@aeg-koeln.de" className="hover:underline">info(at)aeg-koeln.de</a></p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">{messages.quickLinks.title}</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/impressum">{messages.quickLinks.legalNotice}</Link>
            </li>
            <li>
              <Link href="/privacy">{messages.quickLinks.privacy}</Link>
            </li>
            <li>
              <Link href="/about">{messages.quickLinks.aboutUs}</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Legal */}
        <div>
          <h4 className="font-semibold mb-3">{messages.legal.title}</h4>
          <p>Äthiopische Evangelische Gemeinde Köln Mülheim e.V.</p>
          <p>{messages.legal.registerNo}: VR 19124 (Amtsgericht Köln)</p>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t text-center py-4 text-sm text-gray-600">
        © 2026 Ethiopian Evangelical Congregation of Cologne Mülheim. All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;