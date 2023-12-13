const API_URL = "https://swapi.dev/api";

import { Person } from "../types/index";

const fetchAllPersons = async (): Promise<Array<Person>> => {
  try {
    const response: Response = await fetch(`${API_URL}/people/`);
    const data: { results: Array<Person> } = await response.json();
    return data.results;
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
    console.error("Error fetching all persons:", error);
    throw error;
  }
};

export { fetchAllPersons, searchPerson };
