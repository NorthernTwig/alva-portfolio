const graph = require('fbgraph')
const secret = require('../config/secret/facebook_secret')

module.exports = () => {

    let token = graph.setAccessToken(secret.ACCESS_TOKEN)
    let portfolioPage = "alvanordquistfoto/photos?fields=images&limit=500&type=uploaded"
    let imageInfoArray = []
    let counter = 0

    const getImages = () => {
        return new Promise((resolve, reject) => {
            graph.get(portfolioPage, {
                access_token: token
            }, (err, res) => {
                if(err) {
                    return reject(err)
                }

                return resolve(res)
            })
        })
    }

    getImages()
        .then(info => {
            let imageArray = []
            for(imagePack of info.data) {
                imageArray.push(imagePack.images)
            }
            return imageArray
        })
        .then(imageArray => {
            let imageWithBestResolution = []
            for(image of imageArray) {
                imageWithBestResolution.push(image[0].source)
            }
            return imageWithBestResolution
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

}
