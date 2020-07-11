const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=3dff392bb8c982faaaabd32057cfb7dd&query='+ latitude + ',' + longitude;

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback("Unable to connect to weather service!", undefined);
        }else if (body.error) {
            callback(body.error.info, undefined);
        } else{
            const current = body.current;
            callback(undefined, {
                temperature: current.temperature,
                feelslike: current.feelslike,
                forecast: `It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees`
            })
        }
    })
}

module.exports = forecast