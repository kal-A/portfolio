export interface ChannelAsset {
  src: string;
  /** Real pixel dimensions of the file, so the grid renders it at its true aspect ratio (no forced cropping). */
  width: number;
  height: number;
  alt: string;
  caption?: string;
  /** Controls grid span on the channel page for editorial rhythm. Defaults to "normal". */
  size?: "feature" | "wide" | "normal";
}

export interface ChannelGallery {
  slug: string;
  label: string;
  intro: string;
  /** Solid accent used for badges, icons, and the card hover wash. */
  accent: string;
  /** Light-to-accent gradient stops for the category's background tint and hover wash. */
  tintFrom: string;
  tintTo: string;
  assets: ChannelAsset[];
}

// One gallery per real work area from the Greenhouse Juices internship.
// /work/greenhouse/[channel] picks these up automatically via
// generateStaticParams - add a channel here and the route exists.
export const greenhouseChannels: ChannelGallery[] = [
  {
    slug: "amazon-ecommerce",
    label: "Amazon & E-commerce",
    intro:
      "Storefront and A+ content built to Amazon's listing format - hero shots, ingredient breakdowns, and comparison graphics designed to hold up in a thumbnail grid, not just at full zoom.",
    accent: "#6b7a3a",
    tintFrom: "#eef1de",
    tintTo: "#b9c98a",
    assets: [
      {
        src: "/case-studies/greenhouse/amazon-12pack-hero.jpg",
        width: 1600,
        height: 1600,
        alt: "Greenhouse Fiery Ginger 12-pack Amazon hero image",
        caption:
          "The primary hero image for the Fiery Ginger listing. At Amazon's 2000×2000 spec, the case, bottle, and ingredients all had to read clearly at thumbnail size, not just on zoom.",
        size: "feature",
      },
      {
        src: "/case-studies/greenhouse/amazon-us-vs-them.jpg",
        width: 1600,
        height: 1600,
        alt: "Greenhouse Fiery Ginger comparison chart against other wellness shots",
        caption:
          "A comparison graphic setting Fiery Ginger's glass packaging and ingredient load against a generic plastic-bottled shot, built to make the difference legible in a single glance.",
        size: "wide",
      },
      {
        src: "/case-studies/greenhouse/amazon-star-ingredients.jpg",
        width: 1600,
        height: 1600,
        alt: "Greenhouse Fiery Ginger star ingredients A+ content module",
        caption:
          "An A+ content tile breaking ginger, turmeric, and orange down by weight - specific, scannable detail meant to stand out from a wall of similar-looking listings.",
      },
      {
        src: "/case-studies/greenhouse/amazon-sustainability-grid.jpg",
        width: 1600,
        height: 1600,
        alt: "Greenhouse sustainability icon grid A+ content module",
        caption:
          "A sustainability-focused A+ tile pairing the glass bottle with Plastic Neutral, B Corp, and organic badges for shoppers filtering on those terms.",
      },
      {
        src: "/case-studies/greenhouse/amazon-for-immunity-lifestyle.jpg",
        width: 1600,
        height: 1600,
        alt: "Greenhouse Fiery Ginger lifestyle immunity lockup",
        caption:
          "A lifestyle module for the listing's immunity section, framed as a daily habit rather than a clinical supplement shot.",
      },
      {
        src: "/case-studies/greenhouse/amazon-bubbles-hero.jpg",
        width: 1600,
        height: 1600,
        alt: "Greenhouse Fiery Ginger hero image on orange background",
        caption:
          "An alternate hero composition on a warmer background, keeping the same badge row and benefit callouts as the primary listing image.",
      },
      {
        src: "/case-studies/greenhouse/amazon-shoot-or-dilute.jpg",
        width: 1600,
        height: 1600,
        alt: "Greenhouse Fiery Ginger shoot-or-dilute usage module",
        caption:
          "A usage module showing the shot taken straight or diluted, for anyone unfamiliar with how a wellness shot is meant to be served.",
      },
      {
        src: "/case-studies/greenhouse/amazon-aplus-tile.jpg",
        width: 1600,
        height: 1600,
        alt: "Greenhouse Fiery Ginger square A+ content tile",
        caption:
          "A square-format A+ tile pairing the bottle with the core benefit icon row, sized for the listing's mobile carousel view.",
      },
    ],
  },
  {
    slug: "email-campaigns",
    label: "Email Campaigns",
    intro:
      "Campaign creative built for Klaviyo sends - sitewide promos, product lineups, and lifestyle banners across the shot and smoothie lines.",
    accent: "#2c6e5e",
    tintFrom: "#e5f2ec",
    tintTo: "#8fc4ae",
    assets: [
      {
        src: "/case-studies/greenhouse/email-fiery-ginger-promo.webp",
        width: 1600,
        height: 584,
        alt: "Greenhouse Fiery Ginger 20% off sitewide email banner",
        caption:
          "A sitewide discount banner for the Fiery Ginger line, built for a send where the offer needs to register before a subscriber scrolls past.",
        size: "feature",
      },
      {
        src: "/case-studies/greenhouse/email-protein-shake-promo.webp",
        width: 1600,
        height: 584,
        alt: "Greenhouse protein shake lineup email banner",
        caption:
          "A protein shake banner styled around a gym scene rather than the kitchen-counter framing used for the shot line, to match how the product actually gets used.",
        size: "wide",
      },
      {
        src: "/case-studies/greenhouse/email-wellness-shot-lineup.jpg",
        width: 920,
        height: 481,
        alt: "Greenhouse five wellness shot product lineup banner",
        caption:
          "A five-SKU lineup shot built as a flexible hero, reused across sends that needed to represent the whole shot range rather than one flavor.",
      },
      {
        src: "/case-studies/greenhouse/email-three-weeks-supply.jpg",
        width: 1080,
        height: 1080,
        alt: "Greenhouse wellness shot fridge lifestyle banner",
        caption:
          "A fridge lifestyle shot for a stock-up campaign, framing the shots as something kept on hand rather than a one-off purchase.",
      },
      {
        src: "/case-studies/greenhouse/email-fridge-variant.jpg",
        width: 1080,
        height: 1080,
        alt: "Greenhouse wellness shot fridge lifestyle banner, wider variant",
        caption:
          "A second fridge composition for the same stock-up campaign, widened to include the protein shake and lemonade lines alongside the core shots.",
      },
      {
        src: "/case-studies/greenhouse/email-immunity-pack-lineup.jpg",
        width: 1500,
        height: 1145,
        alt: "Greenhouse immunity bundle four-up product shot",
        caption:
          "A clean four-up product shot for the immunity bundle, kept on a plain background so it could drop into different email layouts without visual conflict.",
      },
      {
        src: "/case-studies/greenhouse/email-smoothies-hero.jpg",
        width: 1600,
        height: 900,
        alt: "Greenhouse Super Smoothies hero banner",
        caption:
          "A Super Smoothies hero banner pairing the Easy Greens and Marvelous Mango cartons for a smoothie-focused send.",
      },
    ],
  },
  {
    slug: "retail-marketing",
    label: "Retail & Marketing Collateral",
    intro:
      "Trade sell sheets, brochures, shelf danglers, and product renders built for retail buyers and in-store placement.",
    accent: "#2f9e6e",
    tintFrom: "#e3f7ec",
    tintTo: "#6fc79a",
    assets: [
      {
        src: "/case-studies/greenhouse/retail-super-smoothies-hero.jpg",
        width: 1600,
        height: 1161,
        alt: "Greenhouse Super Smoothies bottle and carton lineup hero product shot",
        caption:
          "A hero product shot for the Super Smoothies line, pairing the single-serve bottle and 900mL carton formats for retail and trade materials.",
        size: "feature",
      },
      {
        src: "/case-studies/greenhouse/retail-green-ritual-brochure-2.png",
        width: 1600,
        height: 1236,
        alt: "Greenhouse Green Ritual brochure, page two, ingredient breakdown",
        caption:
          "The brochure's second page, breaking down ingredients and market positioning once the brand story has already landed.",
      },
      {
        src: "/case-studies/greenhouse/retail-green-ritual-sell-sheet.png",
        width: 1236,
        height: 1600,
        alt: "Greenhouse Green Ritual retail sell sheet with SKU specs",
        caption:
          "A sell sheet built to what a buyer actually needs to place an order - SKU details, UPCs, and case-pack codes, not just brand messaging.",
      },
      {
        src: "/case-studies/greenhouse/retail-everyday-greens-sell-sheet.png",
        width: 1255,
        height: 1600,
        alt: "Greenhouse Everyday Greens and Green Ritual companion sell sheet",
        caption:
          "A companion sell sheet pairing Green Ritual and Everyday Greens as one routine, for buyers considering the line rather than a single SKU.",
      },
      {
        src: "/case-studies/greenhouse/retail-green-shots-lineup-sell-sheet.png",
        width: 1236,
        height: 1600,
        alt: "Greenhouse full wellness shot line sell sheet",
        caption:
          "A line-wide sell sheet covering the full wellness-shot range, used when a buyer meeting needed to cover more than one flavor at a time.",
      },
      {
        src: "/case-studies/greenhouse/retail-super-smoothies-sell-sheet.jpg",
        width: 791,
        height: 1024,
        alt: "Greenhouse Super Smoothies retail sell sheet",
        caption: "A pricing- and spec-complete sell sheet for the Super Smoothies line, formatted for print with visible crop marks.",
      },
      {
        src: "/case-studies/greenhouse/retail-green-ritual-dangler.png",
        width: 650,
        height: 650,
        alt: "Greenhouse Green Ritual circular shelf dangler",
        caption:
          "A circular shelf dangler meant to catch attention at the shelf edge, where a shopper has a second or two, not a sell sheet's worth of reading time.",
      },
      {
        src: "/case-studies/greenhouse/retail-everyday-dangler.png",
        width: 650,
        height: 650,
        alt: "Greenhouse Everyday Greens circular shelf dangler",
        caption:
          "A matching dangler for the Everyday Greens line, keeping the same circular format and Proudly Canadian badge as its Green Ritual counterpart.",
      },
      {
        src: "/case-studies/greenhouse/retail-ginger-apple-crisp-render.png",
        width: 1080,
        height: 1080,
        alt: "Greenhouse Ginger Apple Crisp juice bottle product render",
        caption:
          "A clean cutout render of the Ginger Apple Crisp bottle on a transparent background, built to drop into any layout without a visible edge.",
      },
      {
        src: "/case-studies/greenhouse/retail-kupfert-kim-cobrand.jpg",
        width: 1258,
        height: 1600,
        alt: "Greenhouse and Kupfert & Kim co-branded retail image",
        caption: "A co-branded image for the Kupfert & Kim retail partnership, pairing their logo with three Greenhouse bottles.",
      },
    ],
  },
  {
    slug: "internal-brand-team",
    label: "Internal Brand & Team Design",
    intro:
      "Internal-facing design work - in-store digital screen concepts and tagline/creative exploration shared with the team before anything shipped externally.",
    accent: "#a9822f",
    tintFrom: "#faf1dc",
    tintTo: "#d9b96a",
    assets: [
      {
        src: "/case-studies/greenhouse/internal-digital-screen-horizontal.jpg",
        width: 1600,
        height: 906,
        alt: "Greenhouse Green Ritual in-store digital screen concept, horizontal",
        caption:
          "An in-store digital screen concept for Green Ritual, horizontal orientation - shared internally before anything reached a retailer's screen network.",
        size: "feature",
      },
      {
        src: "/case-studies/greenhouse/internal-tagline-exploration-3.jpg",
        width: 1600,
        height: 900,
        alt: "Greenhouse x GAS co-branded hero visual concept, flat-lay treatment",
        caption:
          "One of two hero visual treatments explored for a Greenhouse × GAS co-branded campaign - a grounded, ingredient flat-lay composition, shown here before any tagline was added.",
        size: "wide",
      },
      {
        src: "/case-studies/greenhouse/internal-digital-screen-vertical.jpg",
        width: 906,
        height: 1600,
        alt: "Greenhouse Green Ritual in-store digital screen concept, vertical",
        caption: "The same concept adapted to vertical orientation, since in-store screens don't all mount the same way.",
      },
      {
        src: "/case-studies/greenhouse/internal-tagline-exploration-1.jpg",
        width: 1600,
        height: 900,
        alt: "Greenhouse x GAS tagline exploration, nature-themed direction",
        caption:
          "The flat-lay visual paired with a nature-themed tagline direction, tested here against a second option on the floating-ingredients treatment.",
      },
      {
        src: "/case-studies/greenhouse/internal-tagline-exploration-5.jpg",
        width: 1600,
        height: 900,
        alt: "Greenhouse x GAS tagline exploration, ritual-themed direction",
        caption:
          "A later round of the same exercise, pairing \"Everyday Deserves a Ritual\" against \"Rise. Ritual. Repeat.\" on the two established visual treatments.",
      },
      {
        src: "/case-studies/greenhouse/internal-more-is-better-graphic.jpg",
        width: 1080,
        height: 1090,
        alt: "Greenhouse internal promotional graphic",
        caption: "An internal promotional graphic developed for team review ahead of a decision on final creative direction.",
      },
    ],
  },
];

export function getChannelGallery(slug: string) {
  return greenhouseChannels.find((c) => c.slug === slug);
}
