export function getYouTubeEmbedUrl(url) {
    try {
        const parsedUrl = new URL(url);

        if (parsedUrl.hostname === "youtu.be") {
            return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
        }

        if (parsedUrl.hostname.includes("youtube.com")) {
            return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`;
        }
    } catch {
        return "";
    }
}