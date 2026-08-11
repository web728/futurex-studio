# Image usage audit

Public project and company photography follows a strict one-file, one-content-placement rule. Desktop and mobile render the same responsive placement, not separate duplicated assets. Logo repetition is the explicit brand-identity exception required for header, mobile navigation, and footer.

| Image | Page | Section | Role | Format | Dimensions | Duplicate |
|---|---|---|---|---|---:|---|
| home-hero-q-green.webp | `/` | Hero | Critical hero | WebP | 1514×1080 | No |
| home-introduction-apl-apollo.webp | `/` | Introduction | Editorial | WebP | 1247×1080 | No |
| featured-aero-edge.webp | `/` | Featured work 01 | Featured | WebP | 1609×1080 | No |
| featured-cladding-projects.webp | `/` | Featured work 02 | Featured | WebP | 1367×1080 | No |
| featured-empire-cables.webp | `/` | Featured work 03 | Featured | WebP | 1654×1080 | No |
| featured-zone-safer-world.webp | `/` | Featured work 04 | Featured | WebP | 1428×1080 | No |
| home-services-kamdhenu.webp | `/` | Services | Editorial | WebP | 1384×1080 | No |
| home-cta-promax.webp | `/` | Final CTA | Closing hero | WebP | 1433×1080 | No |
| portfolio-arb-bearings.webp | `/portfolio` | Project 01 | Thumbnail | WebP | 1920×880 | No |
| portfolio-atulya-medilink.webp | `/portfolio` | Project 02 | Thumbnail | WebP | 1220×1080 | No |
| portfolio-brihans-animal-health.webp | `/portfolio` | Project 03 | Thumbnail | WebP | 1636×1080 | No |
| portfolio-epack-prefab.webp | `/portfolio` | Project 04 | Thumbnail | WebP | 1438×1080 | No |
| portfolio-reynoarch.webp | `/portfolio` | Project 05 | Thumbnail | WebP | 1434×1080 | No |
| portfolio-riyom-industries.webp | `/portfolio` | Project 06 | Thumbnail | WebP | 1620×1080 | No |
| exhibition-project-01.jpg | Project 01 | Hero | Critical hero | JPEG | 2048×1152 | No |
| exhibition-project-02.jpg | Project 02 | Hero | Critical hero | JPEG | 2048×1150 | No |
| exhibition-project-03.jpg | Project 03 | Hero | Critical hero | JPEG | 960×540 | No |
| exhibition-project-04.jpg | Project 04 | Hero | Critical hero | JPEG | 960×540 | No |
| exhibition-project-05.jpg | Project 05 | Hero | Critical hero | JPEG | 960×540 | No |
| exhibition-project-06.jpeg | Project 06 | Hero | Critical hero | JPEG | 1600×1204 | No |
| about-hero-ishwara.webp | `/about` | Hero | Page hero | WebP | 1267×1080 | No |
| services-hero-srons.webp | `/services` | Hero | Page hero | WebP | 1355×1080 | No |
| solutions-hero-arb-bearings.webp | `/exhibition-solutions` | Hero | Page hero | WebP | 1474×1080 | No |
| contact-hero-arb-bearings.webp | `/contact` | Hero | Page hero | WebP | 1440×1080 | No |
| exhibition-project-07.jpeg | Social metadata | Open Graph | Social | JPEG | 1600×1066 | No |
| futurex-studio-logo-white.png | Global dark chrome | Header, mobile menu, footer | Brand mark | PNG | 720×283 | Logo exception |

## Unused assets

- `futurex-studio-logo-black.png` is optimized and retained for a future genuinely light navigation or brand surface. The current header and footer remain dark, so forcing the black variant would create incorrect contrast.
- Existing `exhibition-project-08.webp` through `exhibition-project-12.webp` are no longer publicly assigned.
- Original source photographs and logo masters remain unchanged under `publicnew-assets/`. That directory is not part of Next.js public delivery.

## Optimization

- 18 supplied JPEG photographs: 19,522,730 bytes → 3,267,128 bytes as curated WebP files.
- Photograph payload reduction: **83.3%**.
- White logo: 109,581 bytes → 32,192 bytes after transparent-padding crop and lossless PNG optimization.
- Black logo: 102,669 bytes → 29,711 bytes after transparent-padding crop and lossless PNG optimization.
- Only the homepage hero and route-specific page/project heroes are priority candidates; below-fold imagery remains lazy-loaded by Next.js.

The machine-readable source of truth is `src/data/site-images.ts`.
