import { useStore } from "vuex";
import type { Person } from "@/types";

import { fetchAllPersons } from "@/api";

const getAllPersons = async (): Promise<void> => {
  const store = useStore();
  const starWarsPersons = await fetchAllPersons();
  store.dispatch("setStarWarPersons", starWarsPersons);
};

const getFavouritesFromLocalStorage = (): void => {
  const store = useStore();
  const favourites = localStorage.getItem("favourites");
  let favouritesArray: Array<Person> = [];
  if (favourites) {
    favouritesArray = JSON.parse(favourites) as Array<Person>;
    store.dispatch("setFavourites", favouritesArray);
  }
};

export { getAllPersons, getFavouritesFromLocalStorage };
