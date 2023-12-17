const API_URL = "https://swapi.dev/api";

import { Person, Film } from "../types/index";

const fetchAllPersons = async <T>(page: number): Promise<T> => {
  const searchParams = new URLSearchParams({ page: page.toString() });
  try {
    const fetchUrl = `${API_URL}/people?${searchParams.toString()}`;
    const response: Response = await fetch(fetchUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch all persons.");
  }
};

const fetchPerson = async (id: string): Promise<Person> => {
  try {
    const response = await fetch(`${API_URL}/people/${id}`);
    const data: Person = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch person.");
  }
};

const searchPerson = async (name: string): Promise<Array<Person>> => {
  const searchParams = new URLSearchParams({ search: name });
  try {
    const response = await fetch(
      `${API_URL}/people/?${searchParams.toString()}`
    );
    const data: { results: Array<Person> } = await response.json();
    return data.results;
  } catch (error) {
    throw new Error("Failed to search person.");
  }
};

const getFilmById = async (url: string): Promise<Film> => {
  try {
    const response = await fetch(url);
    const film = await response.json();
    return film;
  } catch (error) {
    throw new Error("Failed to fetch films.");
  }
};

export { fetchAllPersons, searchPerson, fetchPerson, getFilmById };
