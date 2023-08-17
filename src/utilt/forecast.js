const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3e23cc1d72bf273093cb6e3b1624a0e2`
        request({url, json: true},(error,{body})=>{
            if (error) {
                callback("unable to connect", undefined);
            }else if (body.error) {
                callback("Unable to find the location", undefined)
            }else {
                callback(undefined,`It's currently ${parseInt(body.main.temp - 273)} ℃ out ( ${body.weather[0].description} )`)
            }
        
    })
}


module.exports = forecast