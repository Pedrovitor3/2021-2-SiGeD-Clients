const { APIDemands } = require('./baseService');

const getDemands = async (token) => {
  try {
    const demands = await APIDemands.get('/demand', {
      headers: { 'x-access-token': token },
    }).then((response) => response.data);
    return demands;
  } catch (err) {
    return { error: 'Could not connect to api_demands' };
  }
};

// const sendEmailToClient = async (
//   clientId,
//   subject,
//   text,
//   token,
//   dateString = '',
// ) => {
//   const body = { subject, text, dateString };
//   const response = await APIClients.post(
//     `/clients/send-email/${clientId}`,
//     body,
//     {
//       headers: { 'x-access-token': token },
//     },
//   );
//   return response;
// };

module.exports = {
  getDemands,
  // sendEmailToClient,
};
