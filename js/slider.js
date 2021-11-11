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

export function render_activity(activity_slider ,i, r) {
    activity_slider.innerHTML = ''

    if (i == 0) {
        attr_back_btn.style.display = 'none'
    } else {
        attr_back_btn.style.display = 'flex'
    }

    for (i; i < r; i++) {
        let activity_img_src = data[i].Picture.PictureUrl1,
            activity_name = data[i].Name,
            activity_city = data[i].City;

        // 判斷是否找不到圖
        if (activity_img_src == undefined) {
            activity_img_src = './example_images/Rectangle 10.png';
        };

        activity_slider.innerHTML += `
            <a href="" class="slider-item">
                <img src="${activity_img_src}" alt="">
                <h3>${activity_name}</h3>
                <p>${activity_city}</p>
            </a>
        `
    };
}