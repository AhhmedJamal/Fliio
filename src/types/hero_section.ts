type MediaType = "image" | "video";

interface SectionTitle {
  en: string;
  ar: string;
  de:string
}

export interface HeroSectionType  {
  id: number;
  title: SectionTitle;
  mediaType: MediaType;
  image?: string;
  video?: string;
  selectProduct: string;
}
