type PageProps = {
    params: { shortcode: string }
}

import { notFound } from 'next/navigation';
import RELEASES_JSON from '@/releases.json';
import Image from 'next/image';

import FALLBACK_COVER from '@/assets/cover.png'

import { Button } from "@/components/ui/button"
import Cover from '@/components/release-page/cover';
import { iconFromVendor } from '@/lib/vendor-icons';
import { Metadata } from 'next';

async function getReleaseByShortcode(shortcode: string) {
    // search for the shortcode in the releases.json file
    const release = RELEASES_JSON.pages.find((page) => page.short_code === shortcode);
    // ensure the release is active as well ...
    if (!release?.active) { return null; }
    if (!!release.start_date && new Date(release.start_date) > new Date()) { return null; }
    if (!!release.end_date && new Date(release.end_date) < new Date()) { return null; }

    // return the release
    return release;
}

export async function generateMetadata({ params }: PageProps) {
    // search for the shortcode in the releases.json file
    const release = await getReleaseByShortcode(params.shortcode);
    if (!release?.active) { return null; }

    // return the metadata
    return {
        title: release.metadata?.title ?? release.title,
        description: release.metadata?.description ?? release.description,
        twitter: {
            cardType: 'summary_large_image'
        },
        openGraph: {
            site_name: 'eve.fm',
            title: release.metadata?.title ?? release.title,
            description: release.metadata?.description ?? release.description,
            type: 'website',
            url: `https://eve.fm/${release.short_code}`,
            images: [
                {
                    url: release.release?.cover_art_url ?? FALLBACK_COVER.src,
                    width: 240,
                    height: 240,
                    alt: 'Cover Art'
                }
            ]
        },
    } as Metadata;
}

export default async function Page({ params }: PageProps) {
    // search for the shortcode in the releases.json file
    const release = await getReleaseByShortcode(params.shortcode);
    if (!release?.active) { notFound(); }

    const links = release.links.map((link, index) => {
        const vendorImage = iconFromVendor(link.vendor);
        return (
            <LinkCell vendorIconUrl={vendorImage} url={link.url} release={release} buttonText={link.button_text} key={index} />
        )
    });

    // begin page
    return (
        <div>
            {/* underlying image background */}
            <div className='w-full h-full fixed -z-10 blur-xl scale-110'>
                <Image src={release.release?.cover_art_url ?? FALLBACK_COVER.src} alt="Backdrop Image" fill priority style={{ userSelect: "none", pointerEvents: "none", objectFit: "cover" }} />
            </div>
            {/* main content */}
            <main className='flex min-h-screen flex-col items-center h-screen py-24'>
                {/* release cover */}
                <Cover src={release.release?.cover_art_url ?? FALLBACK_COVER.src} release={release} />
                {/* release info */}
                <div className={`my-6 ${!release.appearance.dark_text ? 'text-white' : ''} text-center`}>
                    <h1 className='font-bold text-lg'>
                        {release.title}
                    </h1>
                    <p>
                        {release.description}
                    </p>
                </div>
                {/* links */}
                <div className='flex flex-col gap-4 w-[320]'>
                    {links}
                </div>
                {/* legal */}
                {/* <div className='mt-4'>
                    <p className={`text-xs ${!release.appearance.dark_text && 'text-white'}`}>
                        This page may contain affiliate links.
                    </p>
                </div> */}
            </main>
        </div>
    )
}

type LinkCellProps = {
    vendorIconUrl: string,
    url: string,
    buttonText?: string,
    release: { appearance: { dark_containers: boolean, dark_text: boolean } }
}

function LinkCell({ vendorIconUrl, url, buttonText, release }: LinkCellProps) {
    return (
        <>
            <a href={url} target='_blank' className='rounded-full'>
                <div className={`flex flex-row align-middle items-center justify-between rounded-full p-3 ${release.appearance.dark_containers ? 'bg-gray-900' : 'bg-white'} shadow-lg hover:${release.appearance.dark_containers ? 'bg-gray-800' : 'bg-gray-200'} transition-all`}>
                    <Image src={vendorIconUrl} alt="Vendor Wordmark" priority width={112} height={112} className='ml-2' />
                    <Button variant='default'>
                        {buttonText ?? 'Listen'}
                    </Button>
                </div>
            </a>
        </>
    )

}