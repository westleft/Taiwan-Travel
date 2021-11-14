let main_img = document.querySelector('.slider .main-img img');
let preview_imgs = document.querySelectorAll('.slider .preview-imgs img');

preview_imgs.forEach(item => {
    item.addEventListener('click', () => {
        main_img.setAttribute('src', item.getAttribute("src"));
    });
});