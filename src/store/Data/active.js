import { apiGetActiveList } from "@/api/index.js";
import { ref } from "vue"
export default {
    namespaced: true,
    state: {
      data: ref({})
    },
    mutations: {
      setList(state, data) {  
        state.data = data
      },
  
      // 修改格式
      editTourData(state, data) {
        data.forEach((item) => {
          const { StartTime, EndTime, Description } = item;
          item.EndTime = EndTime.slice(0, 10);
          item.StartTime = StartTime.slice(0, 10);

          if(item.Description && item.Description.length > 30){
            item.Description = Description.slice(0, 30) + "...";
          }
        });
      },
    },
    actions: {
      async getList({ state, commit }) {
        try {
          const res = await apiGetActiveList();
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
  