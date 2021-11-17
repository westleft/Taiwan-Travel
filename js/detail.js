import { getAuthorizationHeader } from './getHeader.js'
import { get_url } from './getHeader.js'


let site_parameter = get_url()
console.log(site_parameter);

let data

// 接API並判斷哪個data
function render_detail_data(id){
  if(id[0].includes('C1')){
    axios_get('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON')
  }
  else if(id[0].includes('C2')){
    axios_get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$top=30&$format=JSON')    
  }
  else if(id[0].includes('C3')){
    axios_get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=30&$format=JSON')
  }
  else if(id[0].includes('C4')){
    axios_get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?$top=30&$format=JSON')
  }
}

function axios_get(url){
  axios.get( url,
    { headers: getAuthorizationHeader() })
    .then((response) => {
      data = response.data
      render_text_content(data, site_parameter)
    })
    .catch((error) => { console.log(error); })
}
render_detail_data(site_parameter)

// 上方小slider
let main_img = document.querySelector('.slider .main-img img');
let preview_imgs = document.querySelectorAll('.slider .preview-imgs img');
preview_imgs.forEach(item => {
  item.addEventListener('click', () => {
    main_img.setAttribute('src', item.getAttribute("src"));
  });
});

// google地圖
// let map;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: 25.04, lng: 121.512 },
//     zoom: 18
//   });
// }
// initMap()

// 內頁用 下方slider按鈕
let slider = document.querySelector('.slider')
let btn_next = document.querySelector('.btn_next'),
    btn_back = document.querySelector('.btn_back');
let btns = [btn_back, btn_next]

let i = 0, r = 4

btn_next.addEventListener('click', () => {
  i += 4 ; r += 4
  render_activity(data, i, r, btns, slider)
})
btn_back.addEventListener('click', () => {
  i -= 4 ; r -= 4
  render_activity(data, i, r, btns, slider)
})

// 文字內容
let text_content = document.querySelector('section .content')
function render_text_content(data, site_parameter){
  data.forEach(item => {
    console.log(item);
    
    if(item.ID == site_parameter){
      text_content.innerHTML = `
        <h1>${item.Name}</h1>
        <p class="tag"><span>#${item.Class1}</span><span>#自然景點</span></p>
        <p><span>關於</span><br>
            ${item.Description}
        </p>
        <p>
            <span>開放時間</span><br>
            08:00-17:00
        </p>
        <p>
            <span>票價資訊</span><br>
            免門票
        </p>
        <p>
            <span>地址</span><br>
            ${item.Location}
        </p>
        <a href="">官方網站</a>
      `
    }
  })
}