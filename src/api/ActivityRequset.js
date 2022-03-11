import { getAuthorizationHeader } from "./getHeader.js"
import axios from "axios"

const tourismList = axios.create({
    baseURL: "https://ptx.transportdata.tw/MOTC/v2/Tourism/",
    headers: getAuthorizationHeader() 
})

export const getActiveList = () => tourismList.get("Activity?%24top=200&%24format=JSON")
export const getRestaurantList = () => tourismList.get("Restaurant?%24top=200&%24format=JSON")
export const getHotelList = () => tourismList.get("Hotel?%24top=150&%24format=JSON")
export const getScenicSpotList = () => tourismList.get("ScenicSpot?%24top=150&%24format=JSON")