import { useStore } from "vuex";

import { fetchAllPersons } from "@/api";

const getAllPersons = async (): Promise<void> => {
  const store = useStore();
  const starWarsPersons = await fetchAllPersons();
  store.dispatch("setStarWarPersons", starWarsPersons);
};

export { getAllPersons };
