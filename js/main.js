axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=100&$format=JSON',
    { headers: getAuthorizationHeader() })
    .then((response) => {
        let data = response.data
        console.log(data);
    })
    .catch((error) => {console.log(error);})


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
// 抓取網址參數
function get_url() {
    let url = location.href;
    if (url.includes('?')) {
        let array = url.split('?')[1].split('&');
        let url_parameter_data = [];
        array.forEach((item) => {
            let parameter = item.split('=')[1];
            url_parameter_data.push(parameter);
        })
        console.log(url_parameter_data);
    }
}
