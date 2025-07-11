/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { User } from "discord-types/general";

export interface UserProfile extends User {
    profileEffectId: string;
    userId: string;
    themeColors?: Array<number>;
}
export interface Nameplate {
    imgAlt: string;
    palette: {
        darkBackground: string;
        lightBackground: string;
        name: string;
    };
    src: string;
}
