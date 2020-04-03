const fs = require('fs').promises;
const path = require('path');
const ImageLoader = require('./ImageLoader');
const Mailgun = require('./Mailgun');

class Mailer {
  /**
   * Sends out emails based on template
   */
  static async sendMail() {
    const imageLink = ImageLoader.getImageUrl();

    let html = await fs.readFile(path.resolve(__dirname, `template.html`), 'utf-8');
    html = html.replace(`{{ imageLink }}`, imageLink);

    return Mailgun.send({
      subject: 'Super important action required!',
      html
    })
  }
}

(async () => {
  await Mailer.sendMail()
    .catch(error => {
      console.log(error);
    })
    .then(() => {
      console.log('Successfully sent');
    })
})()
