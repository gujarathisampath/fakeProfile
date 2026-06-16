/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ErrorBoundary } from "@components/index";
import { copyWithToast } from "@utils/discord";
import { Margins } from "@utils/margins";
import definePlugin from "@utils/types";
import { User } from "@vencord/discord-types";
import { Button, ReactDOM, Toasts, useLayoutEffect, useMemo, useRef, UserStore, useState } from "@webpack/common";
import virtualMerge from "virtual-merge";

function CustomNameplatePortal({ userId, url }: { userId: string, url: string; }) {
    const ref = useRef<HTMLSpanElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [portalTarget, setPortalTarget] = useState<Element | null>(null);
    const [hovered, setHovered] = useState(false);

    useLayoutEffect(() => {
        if (ref.current) {
            const childContainer = ref.current.closest('[class*="childContainer"]') ||
                ref.current.parentElement?.querySelector('[class*="childContainer"]') ||
                ref.current.parentElement?.closest('[class*="childContainer"]');
            if (childContainer) {
                const layout = childContainer.querySelector('[class*="layout"]');
                if (layout) {
                    layout.classList.add("vc-nameplated");
                }
                childContainer.classList.add("vc-nameplated-container");

                const hoverTarget = childContainer.closest('[class*="member"]') ||
                    childContainer.closest('[class*="clickable"]') ||
                    childContainer;

                const handleMouseEnter = () => setHovered(true);
                const handleMouseLeave = () => setHovered(false);

                hoverTarget.addEventListener("mouseenter", handleMouseEnter);
                hoverTarget.addEventListener("mouseleave", handleMouseLeave);

                setPortalTarget(childContainer);

                return () => {
                    hoverTarget.removeEventListener("mouseenter", handleMouseEnter);
                    hoverTarget.removeEventListener("mouseleave", handleMouseLeave);
                };
            }
        }
    }, [userId]);

    const { hasVideo, videoUrl } = useMemo(() => {
        const isDiscordCDN = url.includes("discordapp.com") || url.includes("discord.com");
        const isStaticImage = /\.(png|jpe?g|webp|gif)(?:\?.*)?$/i.test(url);
        const match = (isDiscordCDN && !isStaticImage) ? url.match(/\/(\d+)\/[^/]+(?:\?.*)?$/) : null;
        return {
            hasVideo: !!match,
            videoUrl: match ? `https://cdn.discordapp.com/media/v1/collectibles-shop/${match[1]}/video` : ""
        };
    }, [url]);

    useLayoutEffect(() => {
        if (!hasVideo) return;
        const video = videoRef.current;
        if (!video) return;

        if (hovered) {
            video.load();
            video.play();
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }, [hovered, hasVideo]);

    const nameplateEl = (
        <div className="vc-custom-nameplate-container" aria-hidden="true">
            <div className="vc-custom-nameplate-video-container">
                {hasVideo ? (
                    <video
                        ref={videoRef}
                        tabIndex={-1}
                        poster={url}
                        loop
                        muted
                        playsInline
                        className="vc-custom-nameplate-img"
                    >
                        <source src={videoUrl} type="video/webm" />
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                ) : (
                    <CachedImage src={url} className="vc-custom-nameplate-img" />
                )}
            </div>
        </div>
    );

    return (
        <span ref={ref} style={{ display: "none" }}>
            {portalTarget && ReactDOM.createPortal(nameplateEl, portalTarget)}
        </span>
    );
}

import { addProfileBadge, BadgePosition, ProfileBadge, removeProfileBadge } from "@api/Badges";

import style from "./index.css?managed";
import { Decoration } from "./lib/api";
import { BASE_URL, SKU_ID } from "./lib/constants";
import { useUserAvatarDecoration, useUsersProfileStore } from "./lib/stores/UsersProfileStore";
import { Nameplate, UserProfile } from "./lib/types";
import { decode, encode } from "./lib/utils/profile";
import { settings } from "./settings";
import { CachedImage } from "./ui/CachedImage";
import { fakeProfileSection } from "./ui/fakeProfileSection";

const globalBadgeLoader: ProfileBadge = {
    id: "fake_profile_global_badge_loader",
    getBadges(userInfo) {
        if (!settings.store.enableCustomBadges) return [];
        const userBadges = useUsersProfileStore.getState().badges.get(userInfo.userId);
        if (!userBadges || !Array.isArray(userBadges)) return [];
        return userBadges.map((badge, idx) => ({
            id: badge.badge_id || `fake_profile_badge_${userInfo.userId}_${idx}`,
            iconSrc: badge.badge,
            description: badge.tooltip,
            position: BadgePosition.START
        }));
    }
};

export default definePlugin({
    name: "fakeProfile",
    description: "Unlock Discord profile effects, themes, avatar decorations, and custom badges without the need for Nitro.",
    authors: [{
        name: "Sampath",
        id: 984015688807100419n,
    }],
    tags: ["Appearance", "Customisation"],
    managedStyle: style,
    dependencies: ["MessageDecorationsAPI", "BadgeAPI", "MemberListDecoratorsAPI"],
    start: async () => {
        addProfileBadge(globalBadgeLoader);
        useUsersProfileStore.getState().fetchProfileEffects();
        useUsersProfileStore.getState().fetchDecorations();
        useUsersProfileStore.getState().fetch(UserStore.getCurrentUser().id, true);
    },
    stop() {
        const { addedBadges } = useUsersProfileStore.getState();
        addedBadges.forEach(badge => removeProfileBadge(badge));
    },
    flux: {
        USER_PROFILE_MODAL_OPEN: data => {
            useUsersProfileStore.getState().fetch(data.userId, true);
        },
    },
    settings,
    patches: [
        {
            find: "UserProfileStore",
            replacement: {
                match: /(?<=getUserProfile\(\i\){return )(.+?)(?=})/,
                replace: "$self.profileDecodeHook($1)"
            }
        },
        {
            find: "getAvatarDecorationURL:",
            replacement: {
                match: /(?<=function \i\((\i)\){)(?=.{0,20}let{avatarDecoration)/,
                replace: "const vcDecoration=$self.getAvatarDecorationURL(arguments[0]);if(vcDecoration)return vcDecoration;"
            }
        },
        {
            find: "#{intl::USER_SETTINGS_RESET_PROFILE_THEME}),onClick:",
            replacement: {
                match: /#{intl::USER_SETTINGS_RESET_PROFILE_THEME}\).+?}\)(?=\])(?<=color:(\i),.{0,500}?color:(\i),.{0,500}?)/,
                replace: "$&,$self.addCopy3y3Button({primary:$1,accent:$2})"
            }
        },
        {
            find: "DefaultCustomizationSections",
            replacement: {
                match: /(?<=#{intl::USER_SETTINGS_AVATAR_DECORATION}\)},"decoration"\),)/,
                replace: "$self.fakeProfileSection(),"
            }
        },
        {
            find: "=!1,canUsePremiumCustomization:",
            replacement: {
                match: /(\i)\.premiumType/,
                replace: "$self.premiumHook($1)||$&"
            }
        },
        {
            find: ':"SHOULD_LOAD");',
            replacement: {
                match: /\i(?:\?)?.getPreviewBanner\(\i,\i,\i\)(?=.{0,100}"COMPLETE")/,
                replace: "$self.useBannerHook(arguments[0])||$&"

            }
        },
        {
            find: "\"data-selenium-video-tile\":",
            predicate: () => settings.store.voiceBackground,
            replacement: [
                {
                    match: /(?<=function\((\i),\i\)\{)(?=let.{20,40},style:)/,
                    replace: "Object.assign($1.style=$1.style||{},$self.getVoiceBackgroundStyles($1));"
                }
            ]
        },
        {
            find: "getUserAvatarURL:",
            replacement: [
                {
                    match: /(getUserAvatarURL:)(\i),/,
                    replace: "$1$self.getAvatarHook($2),"
                }
            ]
        },

        {
            find: "isAvatarDecorationAnimating:",
            group: true,
            replacement: [
                {
                    match: /(?<=\.avatarDecoration,guildId:\i\}\)\),)(?<=user:(\i).+?)/,
                    replace: "vcAvatarDecoration=$self.useUserAvatarDecoration($1),"
                },
                {
                    match: /(?<={avatarDecoration:).{1,20}?(?=,)(?<=avatarDecorationOverride:(\i).+?)/,
                    replace: "$1??vcAvatarDecoration??($&)"
                },
                {
                    match: /(?<=size:\i}\),\[)/,
                    replace: "vcAvatarDecoration,"
                }
            ]
        },
        {
            find: ".DISPLAY_NAME_STYLES_COACHMARK)",
            replacement: [
                // Use Decor avatar decoration hook
                {
                    match: /(?<=\i\)\({avatarDecoration:)\i(?=,)(?<=currentUser:(\i).+?)/,
                    replace: "$self.useUserAvatarDecoration($1)??$&"
                }
            ]
        },
        ...[
            "#{intl::GUILD_COMMUNICATION_DISABLED_ICON_TOOLTIP_BODY}", // Messages
            "#{intl::COLLECTIBLES_NAMEPLATE_PREVIEW_A11Y}", // Nameplate preview
            "#{intl::COLLECTIBLES_PROFILE_PREVIEW_A11Y}", // Avatar preview
        ].map(find => ({
            find,
            replacement: [
                {
                    match: /(?<=userValue:)((\i(?:\.author)?)\?\.avatarDecoration)/,
                    replace: "$self.useUserAvatarDecoration($2)??$1"
                }
            ]
        })),
        {
            find: "#{intl::GUILD_OWNER}),",
            replacement: [
                {
                    match: /user:(\i).{0,150}nameplate:(\i).*?name:null.*?(?=avatar:)/,
                    replace: "$&banner:$self.customnameplate($1, $2),",
                },
                {
                    match: /(?<=\),nameplate:)(\i)/,
                    replace: "$self.nameplate($1,arguments[0]?.user)"
                },
            ]
        },
        {
            find: "role:\"listitem\",innerRef",
            replacement: {
                match: /children:\[(?=.{0,100}\.MEMBER_LIST)/,
                replace: "$&arguments[0].banner,"
            }
        },
        {
            find: ".WIDGETS_RTC_UPSELL_COACHMARK),",
            replacement: [
                {
                    match: /(?<=\i\)\({avatarDecoration:)\i(?=,)(?<=currentUser:(\i).+?)/,
                    replace: "$self.useUserAvatarDecoration($1)??$&"
                }
            ]
        }
    ],
    profileDecodeHook(user: UserProfile) {
        if (user) {
            if (settings.store.enableProfileEffects || settings.store.enableProfileThemes) {
                let mergeData: Partial<UserProfile> = {};
                const userData = useUsersProfileStore.getState().get(user.userId);
                const colors = decode(user.bio);
                if (settings.store.enableProfileEffects && userData?.profileEffectId) {
                    mergeData = {
                        ...mergeData,
                        profileEffect: {
                            expireAt: null,
                            skuId: userData.profileEffectId,
                        }
                    };
                }
                if (settings.store.enableProfileThemes && colors) {
                    mergeData = {
                        ...mergeData,
                        premiumType: 2,
                        themeColors: colors
                    };
                }
                return virtualMerge(user, mergeData as UserProfile);
            }
            return user;
        }

        return user;
    },
    useUserAvatarDecoration,
    premiumHook({ userId }: any) {
        const user = useUsersProfileStore.getState().get(userId);
        if (user)
            return 2;
    },
    getAvatarHook: (original: any) => (user: User, animated: boolean, size: number) => {
        if (settings.store.nitroFirst && user.avatar?.startsWith("a_")) return original(user, animated, size);
        const userData = useUsersProfileStore.getState().get(user.id);
        if (animated) {
            return userData?.avatar ?? original(user, animated, size);
        } else {
            const avatarUrl = userData?.avatar;
            if (avatarUrl && typeof avatarUrl === "string") {
                const parsedUrl = new URL(avatarUrl);
                const image_name = parsedUrl.pathname.split("/").pop()?.replace(/\.(gif|webp)$/i, ".png");
                if (image_name) {
                    return BASE_URL + "/image/" + image_name;
                }
            }
            return original(user, animated, size);
        }
    },
    getAvatarDecorationURL({ avatarDecoration, canAnimate }: { avatarDecoration: Decoration | null; canAnimate?: boolean; }) {
        if (!avatarDecoration || !settings.store.enableAvatarDecorations) return;
        if (canAnimate && avatarDecoration?.animated) {
            if (avatarDecoration?.skuId === SKU_ID) {
                const url = new URL(`${BASE_URL}/avatar-decoration-presets/a_${avatarDecoration?.asset}.png`);
                return url.toString();
            } else {
                const url = new URL(`https://cdn.discordapp.com/avatar-decoration-presets/${avatarDecoration?.asset}.png`);
                return url.toString();
            }
        } else {
            if (avatarDecoration?.skuId === SKU_ID) {
                const url = new URL(`${BASE_URL}/avatar-decoration-presets/${avatarDecoration?.asset.replace("a_", "")}.png`);
                return url.toString();
            } else {
                const url = new URL(`https://cdn.discordapp.com/avatar-decoration-presets/${avatarDecoration?.asset}.png?passthrough=false`);
                return url.toString();
            }
        }
    },
    nameplate(nameplate: Nameplate | undefined, user: User | undefined) {
        return nameplate;
    },
    customnameplate(user: User | undefined, nameplate: Nameplate | undefined) {
        if (!user) return null;
        const userData = useUsersProfileStore.getState().get(user.id);
        if (userData && userData?.nameplate && settings.store.enableNameplate) {
            const raw = userData.nameplate;
            const urlStr = typeof raw === "object" && raw !== null
                ? (raw as Nameplate).src
                : raw as string;
            if (!urlStr) return null;
            return <CustomNameplatePortal userId={user.id} url={urlStr} />;
        }
        return null;
    },
    useBannerHook({ displayProfile }: any) {
        if (displayProfile?.banner && settings.store.nitroFirst) return;
        const UsersData = useUsersProfileStore.getState().get(displayProfile?.userId);
        if (UsersData && UsersData.banner) return UsersData.banner;
    },
    getProfileEffectById(skuId: string, effects: Record<string, any>) {
        const { profileEffects } = useUsersProfileStore.getState();
        const effect = profileEffects.get(skuId);
        return effect || (effects && effects[skuId]) || null;
    },
    getVoiceBackgroundStyles({ className, participantUserId }: any) {
        if (className.includes("tile_")) {
            const userData = useUsersProfileStore.getState().get(participantUserId);
            if (userData && userData.banner) {
                return {
                    backgroundImage: `url(${userData.banner})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                };
            }
        }
    },
    fakeProfileSection: ErrorBoundary.wrap(fakeProfileSection),
    toolboxActions: {
        async "Refetch fakeProfile"() {
            useUsersProfileStore.getState().fetch(UserStore.getCurrentUser().id, true);
            useUsersProfileStore.getState().fetchDecorations();
            useUsersProfileStore.getState().fetchProfileEffects();
            useUsersProfileStore.getState().fetchBadges();
            Toasts.show({
                message: "Successfully refetched fakeProfile!",
                id: Toasts.genId(),
                type: Toasts.Type.SUCCESS
            });
        }
    },
    addCopy3y3Button: ErrorBoundary.wrap(function ({ primary, accent }: { primary: number; accent: number; }) {
        return <Button
            onClick={() => {
                const colorString = encode(primary, accent);
                copyWithToast(colorString);
            }}
            color={Button.Colors.PRIMARY}
            size={Button.Sizes.XLARGE}
            className={Margins.left16}
        >Copy 3y3
        </Button >;
    }, { noop: true }),
});
