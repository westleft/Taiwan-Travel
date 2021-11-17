import { getAuthorizationHeader } from './getHeader.js'
import { render_activity } from './slider.js'
import { render_pages_item } from './slider.js'

let data,
    food_data,
    event_data;

axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$top=20&$format=JSON',
    { headers: getAuthorizationHeader() })
    .then((response) => {
        data = response.data
        render_activity(data, 0, 4, attr_btns, activity_slider)
    })
    .catch((error) => { console.log(error); })

axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=20&$format=JSON',
    { headers: getAuthorizationHeader() })
    .then((response) => {
        food_data = response.data
        render_activity(food_data, 0, 4, rest_btns, resturant_slider)
    })
    .catch((error) => { console.log(error); })

axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$top=4&$format=JSON',
    { headers: getAuthorizationHeader() })
    .then((response) => {
        event_data = response.data
        console.log(event_data);
        
        render_event(event_data)
    })
    .catch((error) => { console.log(error); })



// 首頁 精選活動
let event = document.querySelector('.main-content .event')


function render_event(data){
    event.innerHTML += `<h2 class="event-title">精選活動</h2>`;
    data.forEach((item, index) => {
        let description = item.Description.slice(0, 40)

        // 判斷是否找不到圖
        if (item.Picture.PictureUrl1 == undefined) {
            item.Picture.PictureUrl1 = './images/non-image.jpg';
        }

        event.innerHTML += `
            <div class="event-item">
                <img src="${item.Picture.PictureUrl1}" alt="">
                <div class="detail">
                    <h3>${item.Name}</h3>
                    <p><span>時間</span>2021/11/20-2021/12/30</p>
                    <p><span>地點</span>${item.Location}</p>
                    <p>${description}...</p>
                    
                    <a href="./page/detail/?id=${item.ID}">
                        <button>活動詳情</button>
                    </a>
                </div>
            </div>
            `
    })
}

// 首頁 熱門景點 slider
let activity_slider = document.querySelector('.activity .slider'),
    attr_next_btn = document.querySelector('.attr_next'),
    attr_back_btn = document.querySelector('.attr_back');
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
let resturant_slider = document.querySelector('.resturant .slider'),
    rest_next_btn = document.querySelector('.rest_next'),
    rest_back_btn = document.querySelector('.rest_back');

let rest_btns = [rest_next_btn, rest_back_btn]

rest_next_btn.addEventListener('click', () => {
    i2 += 4; r2 += 4
    render_activity(food_data, i2, r2, rest_btns, resturant_slider)
})
rest_back_btn.addEventListener('click', () => {
    i2 -= 4; r2 -= 4
    render_activity(food_data, i2, r2, rest_btns, resturant_slider)
})