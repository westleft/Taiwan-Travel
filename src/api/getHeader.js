import jsSHA from "jssha";

export function getAuthorizationHeader() {
    let AppID = '42b22f6beb5e4145b6950a6de2cfa9ae';
    let AppKey = '9NjxheGMlL7TyIb7hvIkzdVtD1s';
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return { 'Authorization': Authorization, 'X-Date': GMTString };
}