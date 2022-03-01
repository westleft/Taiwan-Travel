import Active from "./active"
import Resturant from "./resturant"
import ScenicSpot from "./scenicSpot.js"
import Hotel from "./hotel.js"

export default {
  namespaced: true,
  state: {
    data: {
      active: {},
      hotel: {},
      resturant: {},
      scenicSpot: {}
    },
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    Active,
    Resturant,
    ScenicSpot,
    Hotel
  },
};
