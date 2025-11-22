interface LocalizedString {
  ar?: string;
  en?: string;
  de?: string;
  [lang: string]: string | undefined;
}

interface ColorOption {
  color: string;
}

interface Feature {
  ar?: string;
  en?: string;
  de?: string;
}

interface Accessory {
  id: string;
  name: LocalizedString;
  image?: string;
  price?: number;
}

interface Category {
  ar: string;
  en: string;
  de: string;
}

export interface ProductType {
  id: string;
  sku?: string;
  name: LocalizedString;
  brand: string;
  price: number;
  currency?: string;
  stock?: number;
  images?: string[];
  thumbnail?: string;
  colors?: ColorOption[];
  rating: number;
  reviewsCount?: number;
  category: Category;
  features?: Feature[];
  accessories?: Accessory[];
  description: LocalizedString;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
