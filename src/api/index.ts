const API_URL = "https://swapi.dev/api";

import { Person } from "../types/index";

const fetchAllPersons = async <T>(url?: string): Promise<T> => {
  try {
    const fetchUrl = url || `${API_URL}/people`;
    const response: Response = await fetch(fetchUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all persons:", error);
    throw new Error("Failed to fetch all persons.");
  }
};

const fetchPerson = async (id: string): Promise<Person> => {
  try {
    const response = await fetch(`${API_URL}/people/${id}`);
    const data: Person = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all persons:", error);
    throw error;
  }
};

const searchPerson = async (name: string): Promise<Array<Person>> => {
  try {
    const response = await fetch(`${API_URL}/people/?search=${name}`);
    const data: { results: Array<Person> } = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching search persons:", error);
    throw error;
  }
};

export { fetchAllPersons, searchPerson, fetchPerson };
