export interface IBeer {
  id: number,
  name: string,
  description: string;
  "image_url": string;
  tagline?: string;
  abv?: number;
  "food_pairing"?: string[];
}
