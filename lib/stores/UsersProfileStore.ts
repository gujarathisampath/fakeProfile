/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { debounce } from "@shared/debounce";
import { proxyLazy } from "@utils/lazy";
import { User } from "@vencord/discord-types";
import { useEffect, UserStore, useState, zustandCreate } from "@webpack/common";

import { Badge, Decoration, getEffects, getPresets, getUsers, ProfileEffects } from "../../lib/api";
import { settings } from "../../settings";
import { FETCH_COOLDOWN } from "../constants";

interface UserData {
    profileEffectId?: string;
    banner?: string;
    avatar?: string;
    decoration?: string | null;
    nameplate?: string;
    fetchedAt: Date;
}

interface UsersDecorationsState {
    users: Map<string, UserData>;
    decorations: Map<string, Decoration>;
    profileEffects: Map<string, ProfileEffects>;
    badges: Map<string, Badge[]>;
    addedBadges: any[];
    fetchQueue: Set<string>;
    bulkFetch: () => Promise<void>;
    fetch: (userId: string, force?: boolean) => Promise<void>;
    fetchMany: (userIds: string[]) => Promise<void>;
    get: (userId: string) => UserData | undefined;
    getDecorAsset: (userId: string) => string | null | undefined;
    getEffectAsset: (userId: string) => string | undefined;
    set: (userId: string, data: Partial<UserData>) => void;
    fetchProfileEffects: () => Promise<void>;
    fetchDecorations: () => Promise<void>;
    fetchBadges: () => Promise<void>;
}

export const useUsersProfileStore = proxyLazy(() => zustandCreate((set: any, get: any) => ({
    users: new Map<string, UserData>(),
    decorations: new Map<string, Decoration>(),
    profileEffects: new Map<string, ProfileEffects>(),
    badges: new Map<string, Badge[]>(),
    addedBadges: [],
    fetchBadges: debounce(async () => {
        if (!settings.store.enableCustomBadges) return;

        try {
            const { fetch: fetchUser } = get();
            const currentUser = UserStore.getCurrentUser();
            if (currentUser?.id) {
                await fetchUser(currentUser.id, true);
            }
        } catch (e) {
            console.error("[fakeProfile] fetchBadges failed:", e);
        }
    }),
    fetchProfileEffects: debounce(async () => {
        const fetchedProfileEffects = await getEffects();
        if (!Array.isArray(fetchedProfileEffects)) return;
        const newProfileEffects = new Map<string, ProfileEffects>(
            fetchedProfileEffects.map(effect => [effect.skuId, effect])
        );
        set({
            profileEffects: newProfileEffects,
        });
    }),
    fetchDecorations: debounce(async () => {
        const fetchedDecorations = await getPresets();
        if (!Array.isArray(fetchedDecorations)) return;
        const newDecorations = new Map(
            fetchedDecorations.map(decoration => [decoration.asset, decoration])
        );
        set({
            decorations: newDecorations,
        });

    }),
    fetchQueue: new Set(),
    bulkFetch: debounce(async () => {
        const { fetchQueue, users } = get();

        if (fetchQueue.size === 0) return;

        set({ fetchQueue: new Set() });

        const fetchIds = [...fetchQueue];
        const fetchedUsers = await getUsers(fetchIds);

        const newUsers = new Map(users);
        const newBadges = new Map(get().badges);

        const now = new Date();
        for (const fetchId of fetchIds) {
            const newUser = fetchedUsers[fetchId] ?? null;
            newUsers.set(fetchId, newUser ? { ...newUser as any, fetchedAt: now } : null as any);
            if (newUser && Array.isArray(newUser.badges)) {
                newBadges.set(fetchId, newUser.badges);
            } else {
                newBadges.set(fetchId, []);
            }
        }

        set({ users: newUsers, badges: newBadges });
    }),
    async fetch(userId: string, force: boolean = false) {
        const { users, fetchQueue, bulkFetch } = get();

        const { fetchedAt } = users.get(userId) ?? {};
        if (fetchedAt) {
            if (!force && Date.now() - fetchedAt.getTime() < FETCH_COOLDOWN) return;
        }

        set({ fetchQueue: new Set(fetchQueue).add(userId) });
        bulkFetch();
    },
    async fetchMany(userIds) {
        if (!userIds.length) return;
        const { users, fetchQueue, bulkFetch } = get();

        const newFetchQueue = new Set(fetchQueue);

        const now = Date.now();
        for (const userId of userIds) {
            const { fetchedAt } = users.get(userId) ?? {};
            if (fetchedAt) {
                if (now - fetchedAt.getTime() < FETCH_COOLDOWN) continue;
            }
            newFetchQueue.add(userId);
        }

        set({ fetchQueue: newFetchQueue });
        bulkFetch();
    },
    get(userId: string) { return get().users.get(userId); },
    getDecorAsset(userId: string) { return get().users.get(userId)?.decoration; },
    getEffectAsset(userId: string) { return get().users.get(userId)?.profileEffectId; },
    set(userId: string, data: Partial<UserData>) {
        const { users } = get();
        const newUsers = new Map(users);

        newUsers.set(userId, { ...data, fetchedAt: new Date() });
        set({ users: newUsers });
    }
} as UsersDecorationsState)));

export function useUserAvatarDecoration(user?: User): Decoration | null | undefined {
    try {
        const [AvatarDecoration, setAvatarDecoration] = useState<string | null>(user ? useUsersProfileStore.getState().getDecorAsset(user.id) ?? null : null);

        useEffect(() => {
            const destructor = (() => {
                try {
                    return useUsersProfileStore.subscribe(
                        state => {
                            if (!user) return;
                            const newAvatarDecoration = state.getDecorAsset(user.id);
                            if (!newAvatarDecoration) return;
                            if (AvatarDecoration !== newAvatarDecoration) setAvatarDecoration(newAvatarDecoration);
                        }
                    );
                } catch {
                    return () => { };
                }
            })();

            try {
                if (user) {
                    const { fetch: fetchuserAvatarDecoration } = useUsersProfileStore.getState();
                    fetchuserAvatarDecoration(user.id);
                }
            } catch { }

            return destructor;
        }, []);
        if (AvatarDecoration) {
            let decoration = useUsersProfileStore.getState().decorations.get(AvatarDecoration);
            if (!decoration) {
                // fire-and-forget: hook can't be async; next render will pick up the result via subscription
                void useUsersProfileStore.getState().fetchDecorations();
                decoration = useUsersProfileStore.getState().decorations.get(AvatarDecoration);
            }
            if (!decoration) return null;
            return { asset: AvatarDecoration, skuId: decoration.skuId, animated: decoration.animated };
        }
        return null;
    } catch (e) {
        console.error(e);
    }

    return null;
}
