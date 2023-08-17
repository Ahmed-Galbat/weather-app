const request = require('request')

const geocode =  (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGV2MWFobWVkIiwiYSI6ImNsanB2YnFwbDAwcGIzcm11OWxjbHg4dXkifQ.hetowgWaV6Ln9zQ5apZ2hg&limit=1`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("unable to connect", undefined)
        }else if (body.features.length == 0){
            callback("unable to find the location, try anther search.", undefined)
        }else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode