import { createStore } from "vuex";
import type { Person, ApiResult, FetchResult } from "@/types";

import { fetchAllPersons } from "@/api";

export default createStore({
  state: () => {
    return {
      starWarPersons: [] as Array<Person>,
      favourites: [] as Array<Person>,
      next: null as string | null,
    };
  },
  getters: {
    getStarWarPersons(state) {
      return state.starWarPersons;
    },
    getFavourites(state) {
      return state.favourites;
    },
    isPersonInFavourites(state) {
      return (person: Person) => {
        return state.favourites.some((p) => p.name === person.name);
      };
    },
  },
  mutations: {
    addStarWarPersons(state, payload: Array<Person>) {
      state.starWarPersons = payload;
    },
    addPersonToFavourites(state, payload: Person) {
      localStorage.setItem(
        "favourites",
        JSON.stringify([...state.favourites, payload])
      );
      state.favourites.push(payload);
    },
    deletePersonFromFavourites(state, payload: Person) {
      const favourites = state.favourites.filter(
        (person) => person.name !== payload.name
      );
      localStorage.setItem("favourites", JSON.stringify(favourites));
      state.favourites = favourites;
    },
    setFavourites(state, payload: Array<Person>) {
      state.favourites = payload;
    },
    setNextPage(state, payload: string) {
      state.next = payload;
    },
  },
  actions: {
    addPersonToFavourites({ commit }, person: Person) {
      commit("addPersonToFavourites", person);
    },
    deletePersonFromFavourites({ commit }, person: Person) {
      commit("deletePersonFromFavourites", person);
    },
    setFavourites({ commit }, favourites: Array<Person>) {
      commit("setFavourites", favourites);
    },
    async getStarWarPersons({ commit }, page: number): Promise<FetchResult> {
      try {
        const response: ApiResult<Person> = await fetchAllPersons(page);
        commit("addStarWarPersons", response.results as Array<Person>);
        commit("setNextPage", response.next as string);
        return {
          status: "success",
          count: response.count,
          message: "Success",
        };
      } catch (error) {
        return {
          status: "error",
          count: 0,
          message: (error as Error).message,
        };
      }
    },
  },
  modules: {},
});
