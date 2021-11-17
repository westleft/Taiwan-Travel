// 首頁用
export function render_activity(data, i, r, btns, slider) {
    slider.innerHTML = ''

    if (i == 0) {
        btns[1].style.display = 'none'
    } else if (i == 16) {
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
            <a class="slider-item" href="./page/detail/?id=${data[i].ID}">
                <img src="${activity_img_src}" alt="">
                <h3>${activity_name}</h3>
                <p>${activity_city}</p>
            </a>`
    };
}

// 分頁用
export function render_pages_item(data, item, num, type) {
    item.innerHTML = ''
    
    for (let i = num * 10 - 10; i < num * 10; i++) {
        console.log(data);
        if (type == '精選活動') {
            let img_src = data[i].Picture.PictureUrl1,
                name = data[i].Name,
                description = data[i].Description.slice(0, 40),
                startTime = data[i].StartTime.slice(0, 10),
                endTime = data[i].EndTime.slice(0, 10);

            // 判斷是否找不到圖
            if (img_src == undefined) {
                img_src = '../../images/non-image.jpg';
            };

            item.innerHTML += `
                    <div class="event-item">
                        <img src="${img_src}" alt="">
                        <div class="detail">
                            <h3>${name}</h3>
                            <p><span>時間</span>${startTime}-${endTime}</p>
                            <p><span>地點</span>新北市板橋區</p>
                            <p>${description}...</p>
                            <a href="./detail/?id=${data[i].ID}">
                                <button>活動詳情</button>
                            </a>
                        </div>
                    </div>`

        }
        else if (type == '各地景點' || type == '探索美食' || type == '住宿飯店') {
            let img_src = data[i].Picture.PictureUrl1,
                name = data[i].Name,
                description = data[i].Description;
            
            // 判斷是否找不到圖
            if (img_src == undefined) {
                img_src = '../../images/non-image.jpg';
            };
            // 判斷是否有簡介
            if(description) {
                description = description.slice(0, 40)
            }else if(description == undefined){
                description = '暫無詳細資料，等您來親自體驗'
            }

            item.innerHTML += `
                    <div class="event-item">
                        <img src="${img_src}" alt="">
                        <div class="detail">
                            <h3>${name}</h3>
                            <p><span>地點</span>新北市板橋區</p>
                            <p>${description}...</p>
                            <a href="./detail/?id=${data[i].ID}">
                                <button>活動詳情</button>
                            </a>
                        </div>
                    </div>`
        }
    };
};