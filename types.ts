/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { User } from "discord-types/general";

export interface Badge {
    description: string;
    icon: string;
    link?: string;
    id?: string;
    badge_id?: string;
}

export interface DecorationData {
    asset: string;
    skuId: string;
    animated: boolean;
}
export interface AvatarDecoration {
    asset: string;
    skuId: string;
    animated: boolean;
}
export interface UserProfile extends User {
    profileEffectId: string;
    userId: string;
    themeColors?: Array<number>;

}
export interface UserProfileData {
    profile_effect: string;
    custom_profile_effect?: string;
    banner: string;
    avatar: string;
    badges: Badge[];
    decoration: DecorationData;
}

export interface ProfileEffectConfig {
    type: number;
    id: string;
    sku_id: string;
    title: string;
    description: string;
    accessibilityLabel: string;
    animationType: number;
    thumbnailPreviewSrc: string;
    reducedMotionSrc: string;
    effects: Array<EffectConfig>;
}

export interface EffectConfig {
    src: string;
    loop: boolean;
    height: number;
    width: number;
    duration: number;
    start: number;
    loopDelay: number;
    position: {
        x: number;
        y: number;
    };
    zIndex: number;
}


export interface Colors {
    primary: number;
    accent: number;
}

export interface fakeProfileSectionProps {
    hideTitle?: boolean;
    hideDivider?: boolean;
    noMargin?: boolean;
}
