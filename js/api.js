import { getAuthorizationHeader } from './getHeader.js'
import { render_activity } from './slider.js'

let data,
    food_data;

axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$top=20&$format=JSON',
    { headers: getAuthorizationHeader() })
    .then(function (response) {
        data = response.data
        render_activity(data, 0, 4, attr_btns, activity_slider)
    })
    .catch(function (error) {
        console.log(error);
    })

axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=20&$format=JSON',
    { headers: getAuthorizationHeader() })
    .then(function (response) {
        food_data = response.data
        render_activity(food_data, 0, 4, rest_btns, resturant_slider)
    })
    .catch(function (error) {
        console.log(error);
    })

// 首頁 熱門景點 slider
let activity_slider = document.querySelector('.activity .slider');
let attr_next_btn = document.querySelector('.attr_next');
let attr_back_btn = document.querySelector('.attr_back');
let i = 0, 
    r = 4,
    i2 = 0,
    r2 = 4;

    
let attr_btns = [attr_next_btn, attr_back_btn]

attr_next_btn.addEventListener('click', () => {
    i += 4; r += 4
    render_activity(data, i, r, attr_btns, activity_slider)
})
attr_back_btn.addEventListener('click', () => {
    i -= 4; r -= 4
    render_activity(data, i, r, attr_btns, activity_slider)
})

// 首頁 推薦美食 slider
let resturant_slider = document.querySelector('.resturant .slider')
let rest_next_btn = document.querySelector('.rest_next')
let rest_back_btn = document.querySelector('.rest_back')

let rest_btns = [rest_next_btn, rest_back_btn]

rest_next_btn.addEventListener('click', () => {
    i2 += 4; r2 += 4
    render_activity(food_data, i2, r2, rest_btns, resturant_slider)
})
rest_back_btn.addEventListener('click', () => {
    i2 -= 4; r2 -= 4
    render_activity(food_data, i2, r2, rest_btns, resturant_slider)
})