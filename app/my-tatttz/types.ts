// Types for my-predictions page components

export interface StoredImage {
  id: string;
  url: string;
  prompt: string;
  provider: string;
  modelId: string;
  createdAt: string;
  liked: boolean;
}

export interface ImageCardProps {
  image: StoredImage;
  onToggleLike: (id: string) => void;
}

export interface ImageCarouselProps {
  images: StoredImage[];
  onToggleLike: (id: string) => void;
}

export interface EmptyStateProps {
  type: "generated" | "liked";
}

export interface AccordionItemData {
  id: string;
  url: string;
  title: string;
  description: string;
}
