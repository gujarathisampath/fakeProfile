/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { useEffect, useState } from "@webpack/common";

import { getCachedImage } from "../lib/utils/imageCache";

interface CachedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
}

export function CachedImage({ src, ...props }: CachedImageProps) {
    const [displaySrc, setDisplaySrc] = useState<string>(src);

    useEffect(() => {
        let isMounted = true;

        getCachedImage(src, newUrl => {
            if (isMounted) {
                setDisplaySrc(newUrl);
            }
        }).then(cachedUrl => {
            if (isMounted) {
                setDisplaySrc(cachedUrl);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [src]);

    return <img src={displaySrc} {...props} />;
}
