import { apiGetRestaurantList } from "@/api/index.js";
import { ref } from "vue"
export default {
    namespaced: true,
    state: {
      data: ref({})
    },
    mutations: {
      setList(state, data) {  
        state.data.value = data
      },
  
      // 修改格式
      editTourData(state, data) {
        data.forEach((item) => {
          const { StartTime, EndTime, Description } = item;
          // item.EndTime = EndTime.slice(0, 10);
          // item.StartTime = StartTime.slice(0, 10);

          if(Description && Description.length > 40){
            item.Description = Description.slice(0, 40) + "...";
          }
        });
      },
    },
    actions: {
      async getList({ state, commit }) {
        try {
          const res = await apiGetRestaurantList();
          commit("setList", res.data);
          commit("editTourData", res.data);
        } catch (error) {
          console.log(error);
        }
      },
    },
    getters: {
      getData(state) {
        return state.data;
      },
    },
  };
  