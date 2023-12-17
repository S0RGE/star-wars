interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year: string;
  gender?: string;
  url: string;
  next?: string;
  created?: string;
  edited?: string;
  films: string[];
}

interface ApiResult<T> {
  results: T[];
  next: string | null;
  previous: string | null;
  count: number;
}

interface FetchResult {
  status: "success" | "error";
  message: string;
}

interface Film {
  title: string;
  episode_id: number;
}

export type { Person, ApiResult, FetchResult, Film };
