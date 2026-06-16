/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

const DB_NAME = "fakeProfileImages";
const STORE_NAME = "images";
const DB_VERSION = 1;

interface CacheEntry {
    url: string;
    blob: Blob;
    etag: string | null;
    lastModified: string | null;
}

function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "url" });
            }
        };
    });
}

async function getEntry(url: string): Promise<CacheEntry | null> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(url);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result || null);
    });
}

async function saveEntry(entry: CacheEntry): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(entry);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}

const localUrlMap = new Map<string, string>();

export async function getCachedImage(
    url: string,
    callback?: (blobUrl: string) => void
): Promise<string> {
    if (!url || (!url.startsWith("http://") && !url.startsWith("https://"))) {
        return url;
    }

    try {
        const entry = await getEntry(url);

        const validate = async (existingEntry?: CacheEntry) => {
            try {
                const headers: Record<string, string> = {};
                if (existingEntry) {
                    if (existingEntry.etag) headers["If-None-Match"] = existingEntry.etag;
                    if (existingEntry.lastModified) headers["If-Modified-Since"] = existingEntry.lastModified;
                }

                const response = await fetch(url, { headers });
                if (response.status === 304 && existingEntry) {
                    return;
                }

                if (response.ok) {
                    const blob = await response.blob();
                    const etag = response.headers.get("ETag");
                    const lastModified = response.headers.get("Last-Modified");

                    const oldLocalUrl = localUrlMap.get(url);
                    if (oldLocalUrl) {
                        URL.revokeObjectURL(oldLocalUrl);
                    }

                    const localUrl = URL.createObjectURL(blob);
                    localUrlMap.set(url, localUrl);

                    await saveEntry({
                        url,
                        blob,
                        etag,
                        lastModified
                    });

                    if (callback) {
                        callback(localUrl);
                    }
                }
            } catch (err) {
                console.error("[fakeProfile] Background validation failed for:", url, err);
            }
        };

        if (entry) {
            let localUrl = localUrlMap.get(url);
            if (!localUrl) {
                localUrl = URL.createObjectURL(entry.blob);
                localUrlMap.set(url, localUrl);
            }
            validate(entry);
            return localUrl;
        } else {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
            const blob = await response.blob();
            const etag = response.headers.get("ETag");
            const lastModified = response.headers.get("Last-Modified");

            const localUrl = URL.createObjectURL(blob);
            localUrlMap.set(url, localUrl);

            await saveEntry({
                url,
                blob,
                etag,
                lastModified
            });

            return localUrl;
        }
    } catch (e) {
        console.error("[fakeProfile] Failed to fetch or cache image:", url, e);
        return url;
    }
}
