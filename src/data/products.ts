import vitaminCSerum from "@/assets/shop/vitamin-c-serum.jpg";
import hydratingMoisturizer from "@/assets/shop/hydrating-moisturizer.jpg";
import roseFaceMist from "@/assets/shop/rose-face-mist.jpg";
import gentleCleanser from "@/assets/shop/gentle-cleanser.jpg";
import retinolNightCream from "@/assets/shop/retinol-night-cream.jpg";
import hyaluronicSerum from "@/assets/shop/hyaluronic-serum.jpg";
import eyeCream from "@/assets/shop/eye-cream.jpg";
import exfoliatingScrub from "@/assets/shop/exfoliating-scrub.jpg";
import spfSunscreen from "@/assets/shop/spf-sunscreen.jpg";
import clayMask from "@/assets/shop/clay-mask.jpg";
import lipTreatment from "@/assets/shop/lip-treatment.jpg";
import niacinamideSerum from "@/assets/shop/niacinamide-serum.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  ingredients: string;
  howToUse: string;
}

export const products: Product[] = [
  {
    id: "vitamin-c-serum",
    name: "GlowShift Vitamin C Serum",
    price: 88,
    image: vitaminCSerum,
    category: "Serums",
    rating: 4.8,
    reviewCount: 124,
    description: "A powerful brightening serum infused with 20% Vitamin C and ferulic acid. Targets dark spots, uneven tone, and dullness to reveal radiant, youthful skin.",
    ingredients: "Ascorbic Acid (Vitamin C), Ferulic Acid, Vitamin E, Hyaluronic Acid, Aloe Vera Extract",
    howToUse: "Apply 3-4 drops to clean, dry skin every morning before moisturizer. Follow with SPF.",
  },
  {
    id: "hydrating-moisturizer",
    name: "VelvetCloud Face Cream",
    price: 68,
    image: hydratingMoisturizer,
    category: "Moisturizers",
    rating: 4.7,
    reviewCount: 98,
    description: "An ultra-hydrating face cream with a velvety texture that locks in moisture for up to 72 hours. Perfect for dry to normal skin types.",
    ingredients: "Shea Butter, Squalane, Ceramides, Jojoba Oil, Peptide Complex",
    howToUse: "Apply a small amount to face and neck morning and evening after serum.",
  },
  {
    id: "rose-face-mist",
    name: "RoseDew Face Mist",
    price: 58,
    image: roseFaceMist,
    category: "Toners",
    rating: 4.6,
    reviewCount: 87,
    description: "A refreshing rose water mist that hydrates, tones, and sets makeup. Infused with real rose petals and hyaluronic acid for an instant glow boost.",
    ingredients: "Rosa Damascena Water, Hyaluronic Acid, Glycerin, Aloe Vera, Witch Hazel",
    howToUse: "Spritz 2-3 times onto face after cleansing or throughout the day for a refresh.",
  },
  {
    id: "gentle-cleanser",
    name: "SilkWave Gentle Cleanser",
    price: 48,
    image: gentleCleanser,
    category: "Cleansers",
    rating: 4.5,
    reviewCount: 156,
    description: "A silky, sulfate-free foaming cleanser that removes impurities without stripping the skin's natural barrier. Suitable for all skin types including sensitive skin.",
    ingredients: "Coconut-Derived Surfactants, Chamomile Extract, Green Tea, Panthenol, Allantoin",
    howToUse: "Massage onto damp skin in circular motions, then rinse with lukewarm water.",
  },
  {
    id: "retinol-night-cream",
    name: "MidnightGlow Retinol Cream",
    price: 95,
    image: retinolNightCream,
    category: "Moisturizers",
    rating: 4.9,
    reviewCount: 203,
    description: "An advanced retinol night cream that works while you sleep to reduce fine lines, wrinkles, and improve skin texture. Encapsulated retinol for gentle yet effective results.",
    ingredients: "Encapsulated Retinol, Bakuchiol, Niacinamide, Peptides, Shea Butter",
    howToUse: "Apply a pea-sized amount to face and neck every evening. Start 2-3 times per week.",
  },
  {
    id: "hyaluronic-serum",
    name: "AquaBurst Hyaluronic Serum",
    price: 72,
    image: hyaluronicSerum,
    category: "Serums",
    rating: 4.7,
    reviewCount: 145,
    description: "A multi-weight hyaluronic acid serum that delivers intense hydration at every layer of the skin. Plumps, smooths, and reduces the appearance of fine lines.",
    ingredients: "Multi-Molecular Hyaluronic Acid, B5, Sodium PCA, Marine Collagen, Aloe Vera",
    howToUse: "Apply 2-3 drops to damp skin, then layer moisturizer on top.",
  },
  {
    id: "eye-cream",
    name: "BrightEyes Revital Cream",
    price: 78,
    image: eyeCream,
    category: "Eye Care",
    rating: 4.6,
    reviewCount: 67,
    description: "A luxurious eye cream that targets dark circles, puffiness, and crow's feet. Infused with caffeine and peptides for a well-rested, youthful look.",
    ingredients: "Caffeine, Retinyl Palmitate, Peptide Complex, Vitamin K, Arnica Extract",
    howToUse: "Gently pat a small amount around the eye area morning and evening using ring finger.",
  },
  {
    id: "exfoliating-scrub",
    name: "SugarGlow Exfoliating Scrub",
    price: 42,
    image: exfoliatingScrub,
    category: "Exfoliators",
    rating: 4.4,
    reviewCount: 92,
    description: "A gentle yet effective sugar scrub that buffs away dead skin cells to reveal smoother, brighter skin. Contains nourishing oils to prevent over-drying.",
    ingredients: "Sugar Crystals, Jojoba Beads, Sweet Almond Oil, Vitamin E, Honey Extract",
    howToUse: "Use 2-3 times per week on damp skin. Massage in circular motions, then rinse.",
  },
  {
    id: "spf-sunscreen",
    name: "ShieldGlow SPF 50 Lotion",
    price: 55,
    image: spfSunscreen,
    category: "Sun Care",
    rating: 4.8,
    reviewCount: 178,
    description: "A lightweight, non-greasy SPF 50 sunscreen that provides broad-spectrum protection while leaving a natural, dewy finish. No white cast formula.",
    ingredients: "Zinc Oxide, Titanium Dioxide, Niacinamide, Vitamin E, Green Tea Extract",
    howToUse: "Apply generously 15 minutes before sun exposure. Reapply every 2 hours.",
  },
  {
    id: "clay-mask",
    name: "DeepPure Charcoal Clay Mask",
    price: 45,
    image: clayMask,
    category: "Masks",
    rating: 4.5,
    reviewCount: 113,
    description: "A deep-cleansing charcoal clay mask that draws out impurities, unclogs pores, and absorbs excess oil. Leaves skin feeling clean, smooth, and refined.",
    ingredients: "Activated Charcoal, Kaolin Clay, Bentonite Clay, Tea Tree Oil, Witch Hazel",
    howToUse: "Apply an even layer to clean skin. Leave for 10-15 minutes, then rinse.",
  },
  {
    id: "lip-treatment",
    name: "RoseKiss Lip Treatment",
    price: 32,
    image: lipTreatment,
    category: "Lip Care",
    rating: 4.3,
    reviewCount: 54,
    description: "A nourishing lip treatment that hydrates, plumps, and adds a subtle rosy tint. Enriched with rosehip oil and peptides for soft, kissable lips.",
    ingredients: "Rosehip Oil, Shea Butter, Vitamin E, Peptides, Beeswax, Rose Extract",
    howToUse: "Apply to lips throughout the day as needed. Can be worn alone or under lipstick.",
  },
  {
    id: "niacinamide-serum",
    name: "PoreRefine Niacinamide Serum",
    price: 62,
    image: niacinamideSerum,
    category: "Serums",
    rating: 4.7,
    reviewCount: 131,
    description: "A pore-refining serum with 10% niacinamide and zinc to minimize pores, control oil, and even out skin tone. Lightweight and fast-absorbing.",
    ingredients: "Niacinamide 10%, Zinc PCA, Hyaluronic Acid, Centella Asiatica, Panthenol",
    howToUse: "Apply 2-3 drops to clean skin morning and evening before moisturizer.",
  },
];

export const categories = [...new Set(products.map((p) => p.category))];
