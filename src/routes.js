const express = require('express');
const { verifyJWT } = require('./Utils/functionsJWS');
const ClientController = require('./Controllers/ClientController');
const FeatureController = require('./Controllers/FeatureController');
const LotacaoController = require('./Controllers/LotacaoController');

const routes = express.Router();

routes.post('/clients/create', verifyJWT, ClientController.create);
routes.get(
  '/clients/newest-four',
  verifyJWT,
  ClientController.newestFourClientsGet,
);
routes.get('/clients/:id', verifyJWT, ClientController.access);
routes.put('/clients/update/:id', verifyJWT, ClientController.update);
routes.put(
  '/clients/toggleStatus/:id',
  verifyJWT,
  ClientController.toggleStatus,
);
routes.get('/clients', verifyJWT, ClientController.accessList);
routes.get('/clients/history/:id', verifyJWT, ClientController.history);
routes.post(
  '/clients/send-email/:id',
  verifyJWT,
  ClientController.sendEmailToClient,
);
routes.get('/features/', verifyJWT, FeatureController.getFeaturesList);
routes.post('/featuresbyid/', verifyJWT, FeatureController.getFeaturesByID);
routes.post('/feature/create', verifyJWT, FeatureController.createFeature);
routes.delete(
  '/feature/delete/:id',
  verifyJWT,
  FeatureController.deleteFeature,
);
routes.put('/feature/update/:id', verifyJWT, FeatureController.updateFeature);
routes.post('/lotacao/create', verifyJWT, LotacaoController.create);
routes.get('/lotacao', verifyJWT, LotacaoController.allLotacao);
routes.put('/lotacao/update/:id', verifyJWT, LotacaoController.update);
routes.delete(
  '/lotacao/delete/:id',
  verifyJWT,
  LotacaoController.deleteLotacao,
);
module.exports = routes;
