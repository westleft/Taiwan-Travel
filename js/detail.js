import { getAuthorizationHeader } from './getHeader.js'
import { get_url } from './getHeader.js'
import { render_activity } from './slider.js'

let data

// 取得網址參數
let site_parameter = get_url(),
  id = site_parameter[0];

// 接API並判斷哪個data
function axios_get(url) {
  axios.get(url,
    { headers: getAuthorizationHeader() })
    .then((response) => {
      data = response.data
      render_text_content(data, id)

      render_activity(data, i, r, btns, slider)
    })
    .catch((error) => { console.log(error); })
}

function render_detail_data(id) {
  if (id.includes('C1')) {
    axios_get('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON')
  }
  else if (id.includes('C2')) {
    axios_get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$top=30&$format=JSON')
  }
  else if (id.includes('C3')) {
    axios_get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=30&$format=JSON')
  }
  else if (id.includes('C4')) {
    axios_get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?$top=30&$format=JSON')
  }
}

render_detail_data(id)

// 上方小slider
function slider_fn() {
  let main_img = document.querySelector('.slider .main-img img');
  let preview_imgs = document.querySelectorAll('.slider .preview-imgs img');
  preview_imgs.forEach(item => {
    item.addEventListener('click', () => {
      main_img.setAttribute('src', item.getAttribute("src"));
    });
  });
}

// 產生圖片
let detail_slider = document.querySelector('section .wrap .slider')
function render_detail_slider(item) {
  // 判斷是否有圖
  if (item.Picture.PictureUrl1 == undefined) {
    item.Picture.PictureUrl1 = '../../images/non-image.jpg';
  }
  if (item.Picture.PictureUrl2 == undefined) {
    item.Picture.PictureUrl2 = '../../images/non-image.jpg';
  }
  if (item.Picture.PictureUrl3 == undefined) {
    item.Picture.PictureUrl3 = '../../images/non-image.jpg';
  }

  detail_slider.innerHTML = `
    <div class="main-img">
        <img src="${item.Picture.PictureUrl1}" alt="">
    </div>
    <div class="preview-imgs">
        <img src="${item.Picture.PictureUrl1}" alt="">
        <img src="${item.Picture.PictureUrl2}" alt="">
        <img src="${item.Picture.PictureUrl3}" alt="">
    </div>
  `
  slider_fn()
}


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
let slider = document.querySelector('.recommend-slider .slider')
let btn_next = document.querySelector('.btn_next'),
    btn_back = document.querySelector('.btn_back');
let btns = [btn_next, btn_back]

let i = 0, r = 3

btn_next.addEventListener('click', () => {
  i += 3; r += 3
  render_activity(data, i, r, btns, slider)
  console.log(i);
})

btn_back.addEventListener('click', () => {
  i -= 3; r -= 3
  render_activity(data, i, r, btns, slider)
  console.log(i);
})


// 文字內容
let text_content = document.querySelector('section .content')
function render_text_content(data, id) {
  data.forEach(item => {
    if (item.ID == id) {
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

      render_detail_slider(item)
    }
  })
}