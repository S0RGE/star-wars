import { useStore } from "vuex";
import type { Person } from "@/types";

const useGetFavouritesFromLocalStorage = (): void => {
  const store = useStore();
  const favourites = localStorage.getItem("favourites");
  let favouritesArray: Array<Person> = [];
  if (favourites) {
    favouritesArray = JSON.parse(favourites) as Array<Person>;
    store.dispatch("setFavourites", favouritesArray);
  }
};

export { useGetFavouritesFromLocalStorage };
