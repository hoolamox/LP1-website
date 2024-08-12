"use client";

import Image from "next/image";

type Props = {
    src: string,
    release: { appearance: { dark_containers: boolean, dark_text: boolean } }
}

export default function Cover({ src, release }: Props) {
    return <>
        <div className={`flex bg-white rounded-md overflow-hidden aspect-square shadow-lg`} style={{ userSelect: "none", pointerEvents: "none" }}>
            <Image src={src} alt="Cover Art" id="cover" width={240} height={240} />
        </div>
    </>
}