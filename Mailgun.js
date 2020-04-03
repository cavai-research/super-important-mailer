const axios = require('axios');

const API_BASE_URL = 'https://api.eu.mailgun.net/v3';

const Mailgun = {
  /**
   * Sends out email
   *
   * @param {Object} obj      Config object
   * @param {String} subject  Email subject
   * @param {String} text     Email body as text
   * @param {String} html     Email body as html
   *
   * @returns {Promise}
   */
  send({
    subject, text, html,
  }) {
    if (!process.env.MAILGUN_API_KEY) {
      if (process.env.NODE_ENV !== 'test') {
        console.warn('No MAILGUN_API_KEY set, emails will not be sent!');
        // Log out for development / debug purpose
        // eslint-disable-next-line
        console.log(arguments);
      }
      return Promise.resolve();
    }
    return axios.post(`${API_BASE_URL}/${process.env.MAILGUN_DOMAIN}/messages`,
      {},
      {
        params: {
          from: process.env.MAIL_FROM,
          to: process.env.MAIL_TO,
          subject,
          text,
          html,
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: 'api',
          password: process.env.MAILGUN_API_KEY,
        },
      });
  },
};

module.exports = Mailgun;
