export interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  isVideo?: boolean;
  videoUrl?: string;
  caption?: string;
}

export interface WishItem {
  id: number;
  take: number;
  scene: string;
  quote: string;
  body: string;
  highlight: string;
}
