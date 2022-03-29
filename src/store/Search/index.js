import axios from "axios";
import { ref, computed } from "vue";
import { apiGetSearch } from "@/api/request.js";

export default {
  namespaced: true,
  state: {
    isload: true,
    searchData: {}
  },
  mutations: {
    async search(state, keyword) {
      const res = await apiGetSearch(keyword);
      const data = res.data.map((item) => {
        return {
          id: item.ScenicSpotID,
          name: item.ScenicSpotName,
          description: item.Description ? item.Description.slice(0, 20) : "",
          city: item.City ? item.City : "無提供地點",
          picture: item.Picture !== {} ? item.Picture.PictureUrl1 : "0",
          startTime: item.StartTime ? "" : "",
          endTime: item.EndTime ? "" : "",
        };
      });

      state.searchData = data
      state.isload = false
    }
  },
  actions: {
    search({ commit }, keyword) {
      commit("search", keyword)
    }
  },
  getters: {
    getSearchData() {
      console.log(state.searchData)
      return state.searchData
    }
  },
};
