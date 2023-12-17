type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
  next: string | null;
};

type Result<T> = {
  results: T[];
  next: string | null;
  previous: string | null;
};

export type { Person, Result };
