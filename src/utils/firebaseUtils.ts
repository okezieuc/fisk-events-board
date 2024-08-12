import { Timestamp } from "firebase/firestore";

export const normalizeStoragePath = (path: string): string => {
    // Replace spaces with hyphens (or you could use underscores)
    let normalized = path.replace(/\s+/g, '-');

    // Remove or replace invalid characters for Firebase Storage paths
    normalized = normalized.replace(/[.#\[\]?]/g, '');

    // Convert to lowercase for consistency
    normalized = normalized.toLowerCase();

    // Optionally, you might want to trim any leading or trailing slashes or hyphens
    normalized = normalized.replace(/^-+|-+$/g, '');

    // Ensure the final path is not empty
    if (normalized.length === 0) {
        throw new Error("The provided path is not valid for a Firebase Storage path.");
    }

    return normalized;
};

export function dateTimeToTimestamp(date: string, time: string) : Timestamp{
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);

    const combinedDateTime = new Date(year, month - 1, day, hours, minutes);

    return Timestamp.fromDate(combinedDateTime);
};