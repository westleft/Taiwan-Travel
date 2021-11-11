import { getAuthorizationHeader } from './getHeader.js'

let data

axios.get(
    'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$top=30&$format=JSON',
    {
        headers: getAuthorizationHeader()
    }
)
    .then(function (response) {
        data = response.data
        render_activity(0, 4, attr_btns, activity_slider)
        render_activity(0, 4, attr_btns, resturant_slider)
    })
    .catch(function (error) {
        console.log(error);
    });


// 首頁 熱門景點 slider
let activity_slider = document.querySelector('.activity .slider');
let attr_next_btn = document.querySelector('.attr_next');
let attr_back_btn = document.querySelector('.attr_back');
let i = 0, 
    r = 4;
    
let attr_btns = [attr_next_btn, attr_back_btn]

attr_next_btn.addEventListener('click', () => {
    i += 4; r += 4
    render_activity(i, r, attr_btns, activity_slider)
})
attr_back_btn.addEventListener('click', () => {
    i -= 4; r -= 4
    render_activity(i, r, attr_btns, activity_slider)
})

// 首頁 推薦美食 slider
let resturant_slider = document.querySelector('.resturant .slider')
let rest_next_btn = document.querySelector('.rest_next')
let rest_back_btn = document.querySelector('.rest_back')

let rest_btns = [rest_next_btn, rest_back_btn]

rest_next_btn.addEventListener('click', () => {
    i += 4; r += 4
    render_activity(i, r, rest_btns, resturant_slider)
})
rest_back_btn.addEventListener('click', () => {
    i -= 4; r -= 4
    render_activity(i, r, rest_btns, resturant_slider)
})

// 首頁 slider 用
function render_activity(i, r, btns, slider) {
    slider.innerHTML = ''

    if (i == 0) {
        btns[1].style.display = 'none'
    } else {
        btns[1].style.display = 'flex'
    }

    for (i; i < r; i++) {
        let activity_img_src = data[i].Picture.PictureUrl1,
            activity_name = data[i].Name,
            activity_city = data[i].City;

        // 判斷是否找不到圖
        if (activity_img_src == undefined) {
            activity_img_src = './example_images/Rectangle 10.png';
        };

        slider.innerHTML += `
            <a href="" class="slider-item">
                <img src="${activity_img_src}" alt="">
                <h3>${activity_name}</h3>
                <p>${activity_city}</p>
            </a>`

        
    };
}