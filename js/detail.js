let main_img = document.querySelector('.slider .main-img img');
let preview_imgs = document.querySelectorAll('.slider .preview-imgs img');

preview_imgs.forEach(item => {
    item.addEventListener('click', () => {
        main_img.setAttribute('src', item.getAttribute("src"));
    });
});

// google地圖


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 25.04, lng: 121.512},
    zoom: 18
  });
}


