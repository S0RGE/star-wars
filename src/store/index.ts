import { createStore } from "vuex";
import type { Person, ApiResult, FetchResult } from "@/types";

import { fetchAllPersons } from "@/api";

interface StarWarPersons {
  [key: number]: Person;
}

export default createStore({
  state: () => {
    return {
      starWarPersons: {} as StarWarPersons,
      favourites: [] as Array<Person>,
      personsCount: 0 as number,
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
    addStarWarPersons(state, payload) {
      if (!state.starWarPersons[payload.page]) {
        state.starWarPersons[payload.page] = payload.persons;
      }
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
    setMaxPersons(state, payload: number) {
      state.personsCount = payload;
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
    // TODO: set max page caching
    async getStarWarPersons(
      { commit },
      page: number
    ): Promise<FetchResult | void> {
      try {
        const response: ApiResult<Person> = await fetchAllPersons(page);
        const persons = response.results as Array<Person>;
        commit("addStarWarPersons", { page, persons });
        commit("setMaxPersons", response.count);
        return {
          status: "success",
          message: "Success",
        };
      } catch (error) {
        return {
          status: "error",
          message: (error as Error).message,
        };
      }
    },
  },
  modules: {},
});
