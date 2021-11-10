let slider_item = document.querySelectorAll('.activity .slider-item')
let data

axios.get(
    'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$top=10&$format=JSON',
    {
        headers: getAuthorizationHeader()
    }
)
    .then(function (response) {
        data = response.data
        console.log(data);
        console.log(data[0].Name);
        render_activity()
    })
    .catch(function (error) {
        console.log(error);
    });


function getAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
    let AppID = '42b22f6beb5e4145b6950a6de2cfa9ae';
    let AppKey = '9NjxheGMlL7TyIb7hvIkzdVtD1s';
    //  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return { 'Authorization': Authorization, 'X-Date': GMTString };
}


function render_activity(){
    slider_item.forEach((item, index) => {
        // item.innerHTML = `
        // <img src="${data[index + 5].Picture.PictureUrl1}" alt="">
        // <h3>${data[index + 5].Name}</h3>
        // <p>${data[index + 5].City}</p>
        // `
    });
}

