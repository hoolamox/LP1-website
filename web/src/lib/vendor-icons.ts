import SPOTIFY_WORDMARK from '@/assets/vendor-icons/spotify-wordmark.png';
import APPLE_PRESAVE_WORDMARK from '@/assets/vendor-icons/apple-presave-wordmark.svg';
import WEBSITE_WORDMARK from '@/assets/vendor-icons/website-wordmark.png';

export function iconFromVendor(vendorName: string) {
    let src = '';
    switch (vendorName) {
        case 'website':
            src = WEBSITE_WORDMARK.src;
            break
        case 'spotify':
            src = SPOTIFY_WORDMARK.src;
            break;
        case 'apple':
            src = APPLE_PRESAVE_WORDMARK.src;
            break;
    }

    return src;
}