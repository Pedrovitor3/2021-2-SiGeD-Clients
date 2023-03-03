const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true],
  },
  cpf: {
    type: String,
    require: [true],
    unique: [true],
  },
  email: {
    type: String,
    require: [true],
    unique: [true],
  },
  phone: {
    type: String,
    require: [true],
  },
  secondaryPhone: {
    type: String,
    require: [true],
  },
  office: {
    type: String,
    require: [true],
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lotacao',
    required: false,
  },
  address: {
    type: String,
    require: [true],
  },
  active: {
    type: Boolean,
    require: [false],
    default: true,
  },
  history: [{
    userID: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    label: {
      type: String,
      require: true,
    },
    before: {
      type: String,
      require: true,
      default: '',
    },
    after: {
      type: String,
      require: true,
      default: '',
    },
  }],
  features: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feature' }],
    require: true,
  },
  image: {
    type: String,
    require: false,
  },
  gender: {
    type: String,
    require: true,
    default: 'Masculino',
  },
  birthdate: {
    type: Date,
    require: true,
  },
  healthRestrictions: {
    type: String,
    require: false,
  },
  administrativeRestrictions: {
    type: String,
    require: false,
  },

  createdAt: {
    type: Date,
    require: true,
  },
  updatedAt: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model('Client', clientSchema);
