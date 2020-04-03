const fs = require('fs');
const path = require('path');

class ImageLoader {
  /**
   * Gets random image to send
   *
   * @returns {string} Image filename to send
   */
  static getRandomImage() {
    // Read all files in images folder
    let images = fs.readdirSync(path.resolve(__dirname, 'images'))
    let jsonObj = ImageLoader.readJson()

    let notSentImages = images.filter((image) => !jsonObj[image])

    // Check if out of images
    if (notSentImages.length === 0) {
      console.error('Out of images')
      process.exit();
    }

    // Return random from all images in folder
    return notSentImages[Math.floor(Math.random() * notSentImages.length)]
  }

  /**
   * Checks if image is already sent or not
   *
   * @param {String} image Image name
   * @returns {Boolean}
   */
  static isDuplicate(image) {
    let jsonObj = ImageLoader.readJson()
    if (jsonObj[image] === true) {
      return true
    }

    return false
  }

  /**
   * Get image URL that is not sent already
   *
   * @returns {String} Image full URL
   */
  static getImageUrl() {
    // Set first image to send
    let image = '89833591_202875974333820_575524883224592384_n.png'
    while (ImageLoader.isDuplicate(image)) {
      image = ImageLoader.getRandomImage()
    }
    ImageLoader.markSent(image)
    return process.env.BASE_DOMAIN + '/' + image
  }

  /**
   * Marks image as sent (writes into sent.json file)
   *
   * @param {string} image Image name
   */
  static markSent(image) {
    let jsonObj = ImageLoader.readJson()
    jsonObj[image] = true
    fs.writeFileSync(path.resolve(__dirname, 'sent.json'), JSON.stringify(jsonObj))
  }

  /**
   * Reads JSON file to object
   *
   * @returns {Object} Json file content
   */
  static readJson() {
    let jsonObj = fs.readFileSync(path.resolve(__dirname, 'sent.json'), 'utf-8');
    return JSON.parse(jsonObj)
  }
}

module.exports = ImageLoader
