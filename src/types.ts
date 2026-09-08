export type CategoryId = 'all' | 'clothing' | 'beauty' | 'gifts' | 'personalized';

export interface ProductVariant {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  size?: string;
  stock: number;
  image?: string;
}

export type CustomizationType = 'embroidery' | 'engraving' | 'both' | 'none';

export interface CustomizationPosition {
  id: string;
  label: string;
  previewCoords: { x: number; y: number; rotate?: number }; // percentage coords on product image (0-100)
}

export interface CustomizationFont {
  id: string;
  name: string;
  fontFamily: string;
  styleClass: string;
  sample: string;
}

export interface CustomizationColor {
  id: string;
  name: string;
  hex: string;
  type: 'thread' | 'metallic';
  border?: string;
}

export interface CustomizationIcon {
  id: string;
  name: string;
  symbol: string;
}

export interface CustomizationConfig {
  supportedTypes: CustomizationType[];
  embroideryFee: number;
  engravingFee: number;
  giftBoxFee: number;
  maxChars: number;
  positions: CustomizationPosition[];
  fonts: CustomizationFont[];
  colors: CustomizationColor[];
  icons: CustomizationIcon[];
}

export interface UserCustomization {
  type: 'embroidery' | 'engraving';
  text: string;
  fontId: string;
  colorId: string;
  positionId: string;
  iconId?: string;
  includeGiftBox?: boolean;
  giftMessage?: string;
  additionalFee: number;
  previewSnapshotUrl?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
  customizationDetails?: string;
  reviewImage?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryId;
  collection: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'Best Seller' | 'Mới' | 'Độc Quyền' | 'Limited';
  isPersonalized: boolean;
  featured?: boolean;
  images: string[];
  description: string;
  highlights: string[];
  materials: string;
  careInstructions: string;
  customizationInfo: string;
  variants: ProductVariant[];
  sizes: string[];
  colors: { name: string; hex: string; bgClass?: string }[];
  customizationConfig?: CustomizationConfig;
  defaultPosition?: string;
}

export interface CartItem {
  cartItemId: string; // Unique id per item + variant + custom config
  productId: string;
  product: Product;
  selectedVariant: ProductVariant;
  selectedSize?: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
  customization?: UserCustomization;
  unitPrice: number;
  totalPrice: number;
}

export interface Voucher {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  value: number; // e.g. 15 for 15% or 100000 for 100k
  minOrder: number;
}

export type PaymentMethod = 'cod' | 'vietqr' | 'bank_card' | 'momo';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  note?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'processing' | 'crafting' | 'shipping' | 'delivered';
  statusText: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: {
    id: string;
    name: string;
    cost: number;
    estimatedDays: string;
  };
  paymentMethod: PaymentMethod;
  subtotal: number;
  customizationTotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  voucherCode?: string;
  timeline: {
    title: string;
    time: string;
    completed: boolean;
    description: string;
  }[];
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  season: string;
  image: string;
  description: string;
  taggedProductIds: string[];
}

export interface SocialPost {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  productName: string;
  productId: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  tier: 'Bespoke Club' | 'Silver' | 'Gold' | 'Platinum VIP';
  points: number;
  addresses: ShippingAddress[];
  savedCustomizations: {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    customization: UserCustomization;
    savedAt: string;
  }[];
}
