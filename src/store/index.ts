import { createStore } from "vuex";

import type { Person } from "@/types";

export default createStore({
  state: () => {
    return {
      starWarPersons: [] as Array<Person>,
      favourites: [] as Array<Person>,
    };
  },
  getters: {
    getStarWarPersons(state) {
      return state.starWarPersons;
    },
    getFavourites(state) {
      return state.favourites;
    },
  },
  mutations: {
    setStarWarPersons(state, payload: Array<Person>) {
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
  },
  actions: {
    setStarWarPersons({ commit }, persons: Array<Person>) {
      console.log("setStarWarPersons", persons);
      commit("setStarWarPersons", persons);
    },
    addPersonToFavourites({ commit }, person: Person) {
      commit("addPersonToFavourites", person);
    },
    deletePersonFromFavourites({ commit }, person: Person) {
      commit("deletePersonFromFavourites", person);
    },
  },
  modules: {},
});
