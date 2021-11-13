// 活動內頁
// let main_img = document.querySelector('.slider .main-img img');
// let preview_imgs = document.querySelectorAll('.slider .preview-imgs img');

// small_imgs.forEach(item => {
//     item.addEventListener('click', () => {
//         big_img.setAttribute('src', item.getAttribute("src"));
//     });
// });

/* <div class="slider">
    <div class="main-img">
        <img src="./example_images/Rectangle 10.png" alt="">
    </div>
    <div class="preview-imgs">
        <img src="./example_images/Rectangle 10.png" alt="">
        <img src="./example_images/Rectangle 4.png" alt="">
        <img src="./example_images/Rectangle 6.png" alt="">
    </div>
</div> */

// 首頁用
export function render_activity(data, i, r, btns, slider) {
    slider.innerHTML = ''

    if (i == 0) {
        btns[1].style.display = 'none'
    }else if(i == 16){
        btns[0].style.display = 'none'
    }
    else {
        btns[0].style.display = 'flex'
        btns[1].style.display = 'flex'
    }

    for (i; i < r; i++) {
        let activity_img_src = data[i].Picture.PictureUrl1,
            activity_name = data[i].Name,
            activity_city = data[i].City;

        // 判斷是否找不到圖
        if (activity_img_src == undefined) {
            activity_img_src = './images/non-image.jpg';
        };

        slider.innerHTML += `
            <a href="./page" class="slider-item">
                <img src="${activity_img_src}" alt="">
                <h3>${activity_name}</h3>
                <p>${activity_city}</p>
            </a>`
    };
}

// 分頁用
export function render_pages_item(data, item, num){
    item.innerHTML = ''
    for (let i = num * 10 - 10; i < num * 10; i++) {
        let activity_img_src = data[i].Picture.PictureUrl1,
            activity_name = data[i].Name,
            activity_description = data[i].Description.slice(0,40),
            startTime = data[i].StartTime.slice(0,10),
            endTime = data[i].EndTime.slice(0,10);

        // 判斷是否找不到圖
        if (activity_img_src == undefined) {
            activity_img_src = '../../images/non-image.jpg';
        };

        item.innerHTML += `
            <div class="event-item">
                <img src="${activity_img_src}" alt="">
                <div class="detail">
                    <h3>${activity_name}</h3>
                    <p><span>時間</span>${startTime}-${endTime}</p>
                    <p><span>地點</span>新北市板橋區</p>
                    <p>${activity_description}...</p>
                    <button>活動詳情</button>
                </div>
            </div>`

    };
};

// 內頁用