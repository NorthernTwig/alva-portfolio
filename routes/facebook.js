const graph = require('fbgraph')
const secret = require('../config/secret/facebook_secret')
const imageInformation = require("../models/imageInformation.js");

module.exports = () => {

    let token = graph.setAccessToken(secret.ACCESS_TOKEN)
    let pageName = 'alvanordquistfoto'
    let imageLimit = '500'
    let portfolioPage = pageName + '/photos?fields=images&limit=' + imageLimit +  '&type=uploaded'

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
