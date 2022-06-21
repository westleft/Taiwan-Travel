import { getAuthorizationHeader } from "./getHeader";
import axios from "axios";

const tourismList = axios.create({
  baseURL: "https://ptx.transportdata.tw/MOTC/v2/Tourism/",
  headers: getAuthorizationHeader(),
});

// 主要種類
export const apiGetActiveList = () =>
  tourismList.get("Activity?%24top=200&%24format=JSON");
export const apiGetRestaurantList = () =>
  tourismList.get("Restaurant?%24top=200&%24format=JSON");
export const apiGetHotelList = () =>
  tourismList.get("Hotel?%24top=200&%24format=JSON");
export const apiGetScenicSpotList = () =>
  tourismList.get("ScenicSpot?%24top=150&%24format=JSON");

// 搜尋
export const apiGetSearch = (city: string) =>
  tourismList.get(
    `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24filter=contains(Address%2C'${city}')&%24format=JSON`
  );

interface data {
  Active: object;
  ScenicSpot: object;
  Restaurant: object;
  Hotel: object;
}

export class ApiUnit {
  private baseAxios;

  constructor() {
    this.baseAxios = this.creatAxios();
  }

  private creatAxios() {
    return axios.create({
      baseURL: "https://ptx.transportdata.tw/MOTC/v2/Tourism/",
      headers: getAuthorizationHeader(),
    });
  }

  async send(type: string) {
    let resultData: object = {};
    try {
      const res = await this.baseAxios.get(`${type}?%24top=200&%24format=JSON`);
      resultData = res.data;
      return resultData;
    } catch (err) {
      console.log(err);
    }
  }

  async search(city: string) {
    try {
      const res: any = await this.baseAxios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24filter=contains(Address%2C'${city}')&%24format=JSON`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}