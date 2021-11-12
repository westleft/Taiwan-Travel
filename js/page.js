import { getAuthorizationHeader } from './getHeader.js'
import { render_activity } from './slider.js'

axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$top=100&$format=JSON',
    { headers: getAuthorizationHeader() })
    .then((response) => {
        data = response.data
        render_activity(data, 0, 4, attr_btns, activity_slider)
    })
    .catch((error) => {console.log(error);})