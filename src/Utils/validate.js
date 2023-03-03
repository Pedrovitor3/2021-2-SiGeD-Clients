const validateName = (name) => {
  const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{2,}$/;
  return regex.test(name);
};

function validaCPF(cpf) {
  let Soma = 0;
  let Resto;

  const cpfToValidate = cpf.toString();

  if (cpfToValidate.length !== 11) return false;

  if ([
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ].indexOf(cpfToValidate) !== -1) return false;

  for (i = 1; i <= 9; i++) Soma += parseInt(cpfToValidate.substring(i - 1, i)) * (11 - i);

  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;

  if (Resto != parseInt(cpfToValidate.substring(9, 10))) return false;

  Soma = 0;

  for (i = 1; i <= 10; i++) Soma += parseInt(cpfToValidate.substring(i - 1, i)) * (12 - i);

  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;

  if (Resto != parseInt(cpfToValidate.substring(10, 11))) return false;

  return true;
}

const validateCpf = (cpf) => {
  const result = validaCPF(cpf);
  return result;
};

const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const validatePhone = (phone) => {
  const regex = /^[0-9]{10,11}$/;
  return regex.test(phone);
};

const validateFeatures = (name, description, color) => {
  const errors = [];

  if (!name) {
    errors.push('invalid name');
  } if (!description) {
    errors.push('invalid description');
  } if (!color) {
    errors.push('invalid color');
  }

  return errors;
};

const validate = (name, cpf, email, phone, secondaryPhone) => {
  const err = [];

  if (!validateName(name)) {
    err.push('invalid name');
  } if (!validateCpf(cpf)) {
    err.push('invalid cpf');
  } if (!validateEmail(email)) {
    err.push('invalid email');
  } if (!validatePhone(phone)) {
    err.push('invalid phone');
  } if (!validatePhone(secondaryPhone)) {
    err.push('invalid secondary phone');
  }

  return err;
};

const validateActive = (active) => {
  const regex = /^(true|false)$/;
  return regex.test(active);
};

module.exports = { validate, validateActive, validateFeatures };
