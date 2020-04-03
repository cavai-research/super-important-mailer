const fs = require('fs');
const path = require('path');
const ImageLoader = require('./ImageLoader');
const Mailgun = require('./Mailgun');


/**
 * Sends out emails based on template
 */
function sendMail() {
  const imageLink = ImageLoader.getImageUrl();

  let html = fs.readFileSync(path.resolve(__dirname, `template.html`), 'utf-8');
  html = html.replace(`{{ imageLink }}`, imageLink);

  return Mailgun.send({
    subject: 'Super important action required!',
    html
  });
}

/**
 * Get random Date in future
 *
 * @returns {Date}
 */
function getRandomTime() {
  // Configure randomness
  // Config next date range
  const minDays = 7;
  const maxDays = 14;
  // Config time range, fromm morning to evening
  const minHours = 8;
  const maxHours = 17;

  const currentDate = new Date();

  // Get next random day
  const randomDay = Math.floor(Math.random() * (maxDays - minDays + 1) + minDays);
  // Get next random working hour
  const randomHour = Math.floor(Math.random() * (maxHours - minHours + 1) + minHours);

  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + randomDay,
    randomHour
  );
}

/**
 * Queue mail sending
 */
function queue() {
  if (process.env.IMMEDIATE) {
    sendMail();
  }
  setTimeout(() => {
    sendMail();
    queue();
  }, getRandomTime().getTime() - Date.now());
}

queue();

process.on('SIGINT', () => {
  process.exit()
})
