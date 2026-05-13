import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

let locales = ['en', 'de', 'am'];
let defaultLocale = 'en';

function getLocale(request) {
    const negotiatorHeaders = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    return match(languages, locales, defaultLocale);
}

export function proxy(request) {
    const { pathname } = request.nextUrl;

    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = request.cookies.get('NEXT_LOCALE')?.value || getLocale(request);

        const url = request.nextUrl.clone();
        url.pathname = `/${locale}${pathname}`;

        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)'],
};