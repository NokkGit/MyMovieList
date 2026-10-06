export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  watched: boolean;
  rating?: number; // 1-5 gwiazdek
}