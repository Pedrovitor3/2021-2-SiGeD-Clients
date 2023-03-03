const moment = require('moment-timezone');
const Client = require('../Models/ClientSchema');
const validation = require('../Utils/validate');
const { scheduleEmail } = require('../Utils/mailer');
const verifyChanges = require('../Utils/verifyChanges');
const { getUser } = require('../Services/Axios/userService');
const { getDemands } = require('../Services/Axios/demandService');

const accessList = async (req, res) => {
  const { active } = req.query;
  if (active === 'false') {
    const clients = await Client.find({ active }).populate('location');
    return res.json(clients);
  }
  if (active === 'null') {
    const clients = await Client.find().populate('location');
    return res.json(clients);
  }

  const clients = await Client.find({ active: true }).populate('location');

  return res.json(clients);
};

const access = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findOne({ _id: id }).populate('location');
    return res.json(client);
  } catch (error) {
    return res.status(400).json({ message: 'Client not found' });
  }
};

const create = async (req, res) => {
  const {
    name, cpf, email, phone, secondaryPhone, address,
    gender, birthdate, healthRestrictions, administrativeRestrictions,
    office, active, location, userID, features, image,
  } = req.body;

  const errorMessage = validation.validate(
    name, cpf, email, phone, secondaryPhone, office,
  );

  if (errorMessage.length) {
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const token = req.headers['x-access-token'];
    const user = await getUser(userID, token);

    const date = moment
      .utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss'))
      .toDate();
    const client = await Client.create({
      name,
      cpf,
      email,
      phone,
      secondaryPhone,
      office,
      location,
      features,
      address,
      active,
      history: {
        userID,
        date,
        label: 'created',
      },
      image,
      gender,
      birthdate,
      healthRestrictions,
      administrativeRestrictions,
      createdAt: date,
      updatedAt: date,
    });
    // const fullCliente = await Client.findOne({email:client.email}).populate('location');
    return res.json(client);
  } catch (error) {
    return res.status(400).json({ message: error.keyValue });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    cpf,
    email,
    phone,
    secondaryPhone,
    office,
    address,
    gender,
    birthdate,
    healthRestrictions,
    administrativeRestrictions,
    location,
    userID,
    features,
    image,
  } = req.body;

  const errorMessage = validation.validate(
    name,
    cpf,
    email,
    phone,
    secondaryPhone,
    office,
  );

  if (errorMessage.length) {
    return res.status(400).json({ message: errorMessage });
  }

  const token = req.headers['x-access-token'];
  const user = await getUser(userID, token);

  const clientHistory = await verifyChanges(req.body, id);
  const client2 = await Client.findById(id);
  await client2.update(
    {
      name,
      cpf,
      email,
      phone,
      secondaryPhone,
      office,
      location,
      features,
      address,
      history: clientHistory,
      image,
      gender,
      birthdate,
      healthRestrictions,
      administrativeRestrictions,
      updatedAt: moment
        .utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss'))
        .toDate(),
    },
    { new: true },
  );
  return res.json(client2);
};

const toggleStatus = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const { id } = req.params;

    const clientFound = await Client.findOne({ _id: id });

    const demands = await getDemands(token);

    for (let i = 0; i < demands.length; i++) {
      if (demands[i].clientID === id && demands[i].open === true) {
        startModal();
        return;
      }
    }

    let { active } = clientFound;

    if (!validation.validateActive(active)) {
      return res.status(400).json({ message: 'invalid active value' });
    }

    active = !clientFound.active;

    const updateReturn = await Client.findOneAndUpdate(
      { _id: id },
      { active },
      { new: true },
      (err, client) => {
        if (err) {
          return res.status(400).json(err);
        }
        return res.json(client);
      },
    );
    return updateReturn;
  } catch (err) {
    return res.status(400).json({ message: 'Client not found' });
  }
};

const history = async (req, res) => {
  const { id } = req.params;

  try {
    let error = '';
    const token = req.headers['x-access-token'];
    const clientFound = await Client.findOne({ _id: id });
    const clientHistory = await Promise.all(
      clientFound.history.map(async (elem) => {
        const user = await getUser(elem.userID, token);
        return {
          label: elem.label,
          before: elem.before,
          after: elem.after,
          date: elem.date,
          user: {
            _id: user._id,
            name: user.name,
            sector: user.sector,
            role: user.role,
          },
        };
      }),
    );
    return res.json(clientHistory);
  } catch {
    return res.status(400).json({ message: 'Client not found' });
  }
};

const newestFourClientsGet = async (req, res) => {
  const clients = await Client.find().limit(4).sort({ createdAt: -1 });

  return res.status(200).json(clients);
};

const sendEmailToClient = async (req, res) => {
  const { id } = req.params;
  const { dateString, subject, text } = req.body;

  try {
    const client = await Client.findOne({ _id: id });

    scheduleEmail({
      from: process.env.email,
      to: client.email,
      subject,
      text,
    }, dateString);

    return res.json({ message: 'Email scheduled.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  accessList,
  access,
  create,
  update,
  toggleStatus,
  history,
  newestFourClientsGet,
  sendEmailToClient,
};
