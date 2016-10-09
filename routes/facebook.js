const graph = require('fbgraph')
const secret = require('../config/secret/facebook_secret')
const imageInformation = require('../models/imageInformation.js')

module.exports = () => {

    let token = graph.setAccessToken(secret.ACCESS_TOKEN)
    let pageName = 'alvanordquistfoto'
    let imageLimit = '500'
    let portfolioPage = pageName + '/photos?fields=images&limit=' + imageLimit + '&type=uploaded'

    const getImageInformation = () => {
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

    const getImages = (info) => {
        let imageArray = []
        for(imagePack of info.data) {
            imageArray.push(imagePack.images)
        }
        return imageArray
    }

    const getImageSources = (imageArray) => {
        let imagesWithBestResolution = []
        for(image of imageArray) {
            imagesWithBestResolution.push(image[image.length - 1].source)
        }
        return imagesWithBestResolution
    }

    const findImageDatabase = (imagesWithBestResolution) => {
        imageInformation.findOne({})
            .then(imageDatabase => {
                imageDatabase.source = imagesWithBestResolution
                imageDatabase.save()
            })
            .catch(err => console.log(err))
    }

    getImageInformation()
        .then(info => getImages(info))
        .then(imageArray => getImageSources(imageArray))
        .then(imagesWithBestResolution => findImageDatabase(imagesWithBestResolution))
        .catch(err => console.log(err))

}
