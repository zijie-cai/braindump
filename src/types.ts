export interface Idea {
  id: number;
  content: string;
  tags: string[];
  created_at: string;
  color: string;
  x?: number;
  y?: number;
  rotation?: number;
}

export const PLAYFUL_COLORS = [
  "#FFEB3B", // Classic Post-it Yellow
  "#FF7EB9", // Hot Pink
  "#7AFBFF", // Electric Blue
  "#98FF98", // Mint Green
  "#FFB347", // Pastel Orange
  "#B19CD9", // Pastel Purple
  "#FF6961", // Pastel Red
  "#77DD77", // Pastel Green
  "#AEC6CF", // Pastel Blue
  "#FDFD96", // Pastel Yellow
];
