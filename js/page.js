import { getAuthorizationHeader } from './getHeader.js'
import { render_pages_item } from './slider.js'

let data
let event = document.querySelector('.event')

function axios_get(url, type){
    axios.get( url,
    { headers: getAuthorizationHeader() })
    .then((response) => {
        data = response.data
        render_pages_item(data, event, 1, type)
        render_btns(data)

        btns = document.querySelectorAll('.btns button')
        render_detail_item(btns, type)
        btn_color(btns, btns[1])
    })
    .catch((error) => { console.log(error); })
}

// 選單下邊框顏色
let lists = document.querySelectorAll('.select_bar ul li')
lists.forEach(item => {
    item.addEventListener('click', (e) => {
        let target = e.target.textContent
        lists.forEach(item => {
            item.classList.remove('li-selected')
        })
        item.classList.add('li-selected')
        console.log(target);
        render_lists_data(target)
    })
})

// 選單切換功能
function render_lists_data(type){
    switch (type) {
        case '精選活動':
            axios_get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$select=Description%2CName%2CStartTime%2CEndTime%2CPicture&$top=100&$format=JSON','精選活動')
            break
        case '各地景點':
            axios_get('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=100&$format=JSON','各地景點')
            break
        case '探索美食':
            axios_get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=100&$format=JSON','探索美食')     
            break
        case '住宿飯店':
            axios_get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?$top=100&$format=JSON','住宿飯店')
            break
    }
}

// 產生下方分頁按鈕
let btn_area = document.querySelector('.btns')
function render_btns(data) {
    btn_area.innerHTML = ''
    let data_len = data.length / 10
    btn_area.innerHTML += `
    <button class="back_btn" data-type="back">
        <img src="../images/btn_arrow.png" alt="上一頁按鈕" data-type="back">
    </button>
    `
    for (let i = 0; i < data_len; i++) {
        btn_area.innerHTML += `
            <button>${i + 1}</button>
        `
    }
    btn_area.innerHTML += `
    <button class="btn_select">...</button>
    <button class="next_btn" data-type="next">
        <img src="../images/btn_arrow.png" alt="下一頁按鈕" data-type="next">
    </button>
    `
}

// 分頁按鈕功能 : 切換按鈕顏色、以及分頁資料
let btns
let current_page = 1
function render_detail_item(btns, type) {
    btns.forEach(item => {
        item.addEventListener('click', (e) => {

            //上下頁按鈕
            if(e.target.getAttribute('data-type') == 'back') {
                // 第一頁不給按
                if(current_page == 1){
                    return
                }
                current_page -= 1   
                render_pages_item(data, event, current_page, type)
                btn_color(btns, btns[current_page])
                
                return
            }else if(e.target.getAttribute('data-type') == 'next'){
                // 最後一頁不給按
                if(current_page == 10){
                    return
                }
                current_page += 1   
                render_pages_item(data, event, current_page, type)
                btn_color(btns, btns[current_page])
                return
            }

            current_page = parseInt(item.textContent)
            render_pages_item(data, event, current_page, type)
            btn_color(btns, item)

        })
    })
}

// 按鈕顏色
function btn_color(btns, item){
    btns.forEach(item => {
        item.classList.remove('btn_select')
    })
    item.classList.add('btn_select')
}

let url = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$select=Description%2CName%2CStartTime%2CEndTime%2CPicture&$top=100&$format=JSON'
axios_get(url, '精選活動')