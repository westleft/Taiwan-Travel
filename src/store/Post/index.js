import axios from "axios";
import { ref, computed } from "vue";
export default {
  namespaced: true,
  state: {
    data: ref({}),
    type: "",
    paramsId: "",
    isload: ref(true),
  }, 
  mutations: {
    checkType(state, id) {
      state.paramsId = id;
      if (id.includes("C1")) {
        state.type = "ScenicSpot";
      } else if (id.includes("C2")) {
        state.type = "Activity";
      } else if (id.includes("C3")) {
        state.type = "Restaurant";
      } else {
        state.type = "Hotel";
      }
    },
    async getData(state) {
      await axios
        .get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/${state.type}?%24filter=${state.type}ID%20eq%20'${state.paramsId}'&%24format=JSON`
        )
        .then((res) => {
          console.log(res.data[0]);
          const editData = res.data.map((item) => {
            return {
              name: item.ScenicSpotName
                ? item.ScenicSpotName
                : item.ActivityName
                ? item.ActivityName
                : item.RestaurantName
                ? item.RestaurantName
                : item.HotelName,
              description: item.Description,
              address: item.Address,
              picture: item.Picture !== {} ? item.Picture.PictureUrl1 : "0",
              openTime: item.OpenTime ? item.OpenTime : "暫無資料",
              class: [
                item.Class ? item.Class : "",
                item.Class1 ? item.Class1 : '',
                item.Class2 ? item.Class2 : '',
                item.Class3 ? item.Class3 : '',
              ],
              picture : item.Picture,
              websiteUrl: item.WebsiteUrl,
              position: item.Position,
              ticketInfo : item.TicketInfo ? item.TicketInfo : "暫無資料",
              travelInfo : item.TravelInfo ? item.TravelInfo : "無提供交通資訊"
            };
          });
          state.data = editData[0];
          state.isload = false;
        });
    },
  },
  actions: {
    checkType({ state, commit }, id) {
      commit("checkType", id);
      commit("getData");
    },
  },
  getters: {
    getData(state) {
      console.log(3);
      return state.data;
    },
    isload(state) {
      return state.isload;
    },
  },
};
