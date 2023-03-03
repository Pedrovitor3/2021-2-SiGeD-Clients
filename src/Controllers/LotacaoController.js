const moment = require('moment-timezone');
const Lotacao = require('../Models/LotacaoSchema');

const create = async (req, res) => {
  const {
    name, description,
  } = req.body;

  try {
    const date = moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate();
    const lotacao = await Lotacao.create({
      name,
      description,
      createdAt: date,
      updatedAt: date,
    });
    return res.json(lotacao);
  } catch (error) {
    return res.status(400).json({ message: error.keyValue });
  }
};

const allLotacao = async (req, res) => {
  const allLotacaoreq = await Lotacao.find();
  return res.json(allLotacaoreq);
};

const update = async (req, res) => {
  const { id } = req.params;
  const {
    name, description,
  } = req.body;

  try {
    const lotacao = await Lotacao.findOneAndUpdate({ _id: id }, {
      name,
      description,
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    },
    { new: true });
    return res.json(lotacao);
  } catch (error) {
    return res.status(400).json({ duplicated: error.keyValue });
  }
};

const deleteLotacao = async (req, res) => {
  const { id } = req.params;
  try {
    await Lotacao.deleteOne({ _id: id });
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
};

module.exports = {
  create, allLotacao, update, deleteLotacao,
};
