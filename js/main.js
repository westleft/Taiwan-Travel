axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=3&$format=JSON')
    .then(function (response) {
        console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
    });

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

// get_url()