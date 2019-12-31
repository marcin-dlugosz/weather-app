const rpn = require('request-promise-native')
const geocode = (address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibG9uZ21hcmNpbiIsImEiOiJjazNlaXhyazgwa2Y0M2lvN3ZxcHVtbXJhIn0.LCcp-Wv4UTigscev84Byvg`
    return rpn(url).then((response) => {
        return JSON.parse(response)
    })


}





module.exports = geocode