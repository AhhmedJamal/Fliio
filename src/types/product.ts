interface LocalizedString {
  ar: string;
  de: string;
  en: string;
}

interface ColorOption {
  color: string; // ممكن تحط اسم اللون أو قيمة hex
}

interface Feature {
  ar: string;
  de: string;
  en: string;
}



export interface ProductType {
  id: string;
  sku: string;
  name: LocalizedString;
  brand: string;
  price: number;         // سعر كعدد (مثلاً 12999)
  stock: number;         // كمية في المخزون
  colors: ColorOption[];
  images: string[];      // روابط الصور
  rating: number;        // تقييم (مثلاً 4.5)
  category: string;
  currency: string;      // رمز العملة (مثلاً "LE")
  features: Feature[];
  createdAt: string;     // ISO date string (أو Date لو حبّيت)
  thumbnail: string;     // رابط الصورة المصغرة
  description: LocalizedString;
  reviewsCount: number;
}
