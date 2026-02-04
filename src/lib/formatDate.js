export function formatedDate(inputDate) {
    if (!inputDate) return;

    // If it's just a time string, skip
    if (/^\d{2}:\d{2}(:\d{2})?$/.test(inputDate)) {
        return null; // or return "" if you want empty
    }

    // Normalize Postgres-style timestamp (replace space with T)
    const normalized = inputDate.replace(" ", "T");
    const date = new Date(normalized);

    if (isNaN(date.getTime())) return null;

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function formatedTime(inputDate) {
    if (!inputDate) return;

    let date;

    if (/^\d{2}:\d{2}(:\d{2})?$/.test(inputDate)) {
        // Handle plain time string like "10:00:00"
        const [hours, minutes, seconds = "0"] = inputDate.split(":");
        date = new Date();
        date.setHours(Number(hours), Number(minutes), Number(seconds));
    } else {
        // Normalize Postgres-style timestamp
        const normalized = inputDate.replace(" ", "T");
        date = new Date(normalized);
    }

    if (isNaN(date.getTime())) return null;

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}