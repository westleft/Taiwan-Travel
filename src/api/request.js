import { getAuthorizationHeader } from "./getHeader.js"
import axios from "axios"

const tourismList = axios.create({
    baseURL: "https://ptx.transportdata.tw/MOTC/v2/Tourism/",
    headers: getAuthorizationHeader() 
})

// 主要種類
export const apiGetActiveList = () => tourismList.get("Activity?%24top=200&%24format=JSON")
export const apiGetRestaurantList = () => tourismList.get("Restaurant?%24top=200&%24format=JSON")
export const apiGetHotelList = () => tourismList.get("Hotel?%24top=150&%24format=JSON")
export const apiGetScenicSpotList = () => tourismList.get("ScenicSpot?%24top=150&%24format=JSON")

// 主題 (ex. 原住民活動、節慶活動)


// 搜尋
export const apiGetSearch = (city) => tourismList.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24filter=contains(Address%2C'${city}')&%24format=JSON`)

