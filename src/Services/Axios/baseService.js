const axios = require('axios');

const { USERS_URL, DEMANDS_URL } = process.env;

const APIUsers = axios.create({
  baseURL: `http://${USERS_URL}:3001/`,
});

const APIDemands = axios.create({
  baseURL: `http://${DEMANDS_URL}:3003/`,
});

module.exports = {
  APIUsers,
  APIDemands,
};
