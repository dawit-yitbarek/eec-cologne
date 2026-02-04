const DEFAULT_LANG = "en";

export function getLanguage() {
    if (typeof window === "undefined") return DEFAULT_LANG;
    return localStorage.getItem("lang") || DEFAULT_LANG;
}

export function setLanguage(lang) {
    localStorage.setItem("lang", lang);
}