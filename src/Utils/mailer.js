const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
require('dotenv').config();

const {
  host, port, email, pass,
} = process.env;

const transporter = nodemailer.createTransport({
  host,
  port,
  auth: {
    user: email,
    pass,
  },
});

const sendEmail = (mailOption) => {
  transporter.sendMail(mailOption);
};

const scheduleEmail = (mailOption, dateString) => {
  if (!dateString) {
    sendEmail(mailOption);
  } else {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    schedule.scheduleJob(formattedDate, () => sendEmail(mailOption));
  }
};

module.exports = {
  sendEmail,
  scheduleEmail,
};
