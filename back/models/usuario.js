const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
  nombre: {
    type: String, required: true, validate: [
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
    ]
  },
  apellidos: {
    type: String, required: true, validate: [
      {
        validator: function (value) {
          const trimmedValue = value.trim();
          return trimmedValue.length <= 50;
        },
        message: 'Los apellidos debe tener menos de 50 caracteres.'
      },
      {
        validator: function (value) {
          return !/<|>/.test(value);
        },
        message: 'Los apellidos no pueden contener los caracteres < y >.'
      }
    ]
  },
  email: {
    type: String, required: true, unique: true, validate: [
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
    ]
  },
  rol: { type: String, required: true },
  password: { type: String, required: true },
  estado: { type: Boolean, default: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('usuario', UsuarioSchema);
