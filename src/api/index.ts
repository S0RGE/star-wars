const API_URL = "https://swapi.dev/api";

import { Person } from "../types/index";

const getAllPersons = async (): Promise<Array<Person>> => {
  const response: Response = await fetch(`${API_URL}/people/`);
  const data: { results: Array<Person> } = await response.json();
  return data.results;
};

const searchPerson = async (name: string): Promise<Array<Person>> => {
  const response = await fetch(`${API_URL}/people/?search=${name}`);
  const data: { results: Array<Person> } = await response.json();
  return data.results;
};

export { getAllPersons, searchPerson };
