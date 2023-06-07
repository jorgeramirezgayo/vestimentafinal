const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = Schema({
  nombre: {type: String, required: true, validate: [
    {
      validator: function (value) {
        const trimmedValue = value.trim();
        return trimmedValue.length <= 50;
      },
      message: 'El nombre debe tener menos de 50 caracteres.'
    },
    {
      validator: function (value) {
        return !/<|>/.test(value);
      },
      message: 'El nombre no puede contener los caracteres < y >.'
    }
  ]},
  apellidos: {type: String, required: false, validate: [
    {
      validator: function (value) {
        const trimmedValue = value.trim();
        return trimmedValue.length <= 50;
      },
      message: 'Los apellidos deben tener menos de 50 caracteres.'
    },
    {
      validator: function (value) {
        return !/<|>/.test(value);
      },
      message: 'Los apellidos no pueden contener los caracteres < y >.'
    }
  ]},
  email: {type: String, required: true, unique: true, validate: [
    {
      validator: function (value) {
        const trimmedValue = value.trim();
        return trimmedValue.length <= 50;
      },
      message: 'El email debe tener menos de 50 caracteres.'
    },
    {
      validator: function(value) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
      },
      message: 'El email no tiene un formato válido.'
    },
    {
      validator: function (value) {
        return !/<|>/.test(value);
      },
      message: 'El email no puede contener los caracteres < y >.'
    }
  ]},
  password: {type: String, required: true, validate: [
    {
      validator: function (value) {
        const trimmedValue = value.trim();
        return trimmedValue.length <= 80;
      },
      message: 'La contraseña debe tener menos de 80 caracteres.'
    },
    {
      validator: function (value) {
        return !/<|>/.test(value);
      },
      message: 'La contraseña no puede contener los caracteres < y >.'
    }
  ]},
  estado: {type: Boolean, default: true},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('cliente', ClienteSchema);
