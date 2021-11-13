import { getAuthorizationHeader } from './getHeader.js'
import { render_pages_item } from './slider.js'

let data

axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$select=Description%2CName%2CStartTime%2CEndTime%2CPicture&$top=100&$format=JSON',
    { headers: getAuthorizationHeader() })
    .then((response) => {
        data = response.data
        render_pages_item(data, event, 1)
        render_btns(data)

        btns = document.querySelectorAll('.btns button')
        render_detail_item(btns)
    })
    .catch((error) => { console.log(error); })

// 選單下邊框顏色
let lists = document.querySelectorAll('.select_bar ul li')
lists.forEach(item => {
    item.addEventListener('click', () => {
        lists.forEach(item => {
            item.classList.remove('li-selected')
        })
        item.classList.add('li-selected')
    })
})

let event = document.querySelector('.event')

// 產生下方分頁按鈕
let btn_area = document.querySelector('.btns')
function render_btns(data) {
    let data_len = data.length / 10
    btn_area.innerHTML += `
    <button class="back_btn" data-type="back">
        <img src="../images/btn_arrow.png" alt="上一頁按鈕">
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
        <img src="../images/btn_arrow.png" alt="下一頁按鈕">
    </button>
    `
}

// 分頁按鈕功能 : 切換按鈕顏色、以及分頁資料
let btns
function render_detail_item(btns) {
    btns.forEach(item => {
        item.addEventListener('click', () => {
            const btn_text = item.textContent
            render_pages_item(data, event, btn_text)

            // 按鈕顏色
            btns.forEach(item => {
                item.classList.remove('btn_select')
            })
            item.classList.add('btn_select')
        })
    })
}