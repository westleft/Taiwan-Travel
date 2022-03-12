import { createStore } from "vuex"
import { reactive,ref } from "vue"

import { apiGetActiveList, apiGetRestaurantList, apiGetHotelList, apiGetScenicSpotList } from "@/api/index.js";

export default createStore({
  namespaced: true,
  state: {
    data: ref({
      active: {},
      resturant: {},
      scenicSpot: {},
      hotel: {}
    }),
    isload: ref(false)
  },
  mutations: {
    async callAllApi(state) {
      await apiGetActiveList().then(res => {
        const data = res.data.map(item => {
          return {
            id: item.ActivityID,
            name: item.ActivityName,
            description: item.Description.slice(0, 40) + '...',
            city: item.City,
            picture: item.Picture !== {} ? item.Picture.PictureUrl1 : "0",
            startTime: item.StartTime.slice(0, 10),
            endTime: item.EndTime.slice(0, 10)
          }
        })
        state.data.active = data
      })
      await apiGetRestaurantList().then(res => {
        const data = res.data.map(item => {
          return {
            id: item.RestaurantID,
            name: item.RestaurantName,
            description: item.Description.slice(0, 40),
            city: item.City,
            picture: item.Picture !== {} ? item.Picture.PictureUrl1 : "0",
            startTime: item.StartTime ? "" : "",
            endTime: item.EndTime ? "" : ""
          }
        })
        state.data.resturant = data
      })
      await apiGetHotelList().then(res => {
        const data = res.data.map(item => {
          return {
            id: item.HotelID,
            name: item.HotelName,
            description: item.Description ? item.Description.slice(0, 20) : "",
            city: item.City,
            picture: item.Picture !== {} ? item.Picture.PictureUrl1 : "0",
            startTime: item.StartTime ? "" : "",
            endTime: item.EndTime ? "" : ""
          }
        })
        state.data.hotel = data
      })
      await apiGetScenicSpotList().then(res => {
        const data = res.data.map(item => {
          return {
            id: item.ScenicSpotID,
            name: item.ScenicSpotName,
            description: item.Description ? item.Description.slice(0, 20) : "",
            city: item.City,
            picture: item.Picture !== {} ? item.Picture.PictureUrl1 : "0",
            startTime: item.StartTime ? "" : "",
            endTime: item.EndTime ? "" : ""
          }
        })
        state.data.scenicSpot = data
      })
      state.isload = true
    }
  },
  actions: {
    callAllApi({ state, commit }) {
      commit("callAllApi")
    }
  },
  getters: {
    async getActiveList(state) {
      return await state.data.active
    },
    getRestaurantList(state) {
      return state.data.resturant
    },
    getGetHotelList(state) {
      return state.data.hotel
    },
    getScenicSpotList(state) {
      return state.data.scenicSpot
    }
  },
  modules: {

  },
});
