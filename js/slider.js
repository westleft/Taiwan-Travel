// 活動內頁
let main_img = document.querySelector('.slider .main-img img');
let preview_imgs = document.querySelectorAll('.slider .preview-imgs img');

small_imgs.forEach(item => {
    item.addEventListener('click', () => {
        big_img.setAttribute('src', item.getAttribute("src"));
    });
});

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