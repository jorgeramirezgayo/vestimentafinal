const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DireccionSchema = Schema({
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
    type: String, required: false, validate: [
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
    ]
  },
  dni: {
    type: String, required: false, unique: true, validate: [
      {
        validator: function (value) {
          const trimmedValue = value.trim();
          return trimmedValue.length <= 9;
        },
        message: 'El dni debe tener menos de 9 caracteres.'
      },
      {
        validator: function(value) {
          return /^\d{8}[A-Z]$/.test(value);
        },
        message: 'El dni no tiene un formato válido.'
      },
      {
        validator: function (value) {
          return !/<|>/.test(value);
        },
        message: 'El dni no pueden contener los caracteres < y >.'
      }
    ]
  },
  telefono: {
    type: String, required: true, validate: [
      {
        validator: function (value) {
          const trimmedValue = value.trim();
          return trimmedValue.length <= 9;
        },
        message: 'El teléfono debe tener menos de 9 caracteres.'
      },
      {
        validator: function(value) {
          return /^6\d{8}$/.test(value);
        },
        message: 'El teléfono no tiene un formato válido.'
      },
      {
        validator: function (value) {
          return !/<|>/.test(value);
        },
        message: 'El teléfono no pueden contener los caracteres < y >.'
      }
    ]
  },
  pais: {
    type: String, required: true, validate: [
      {
        validator: function (value) {
          const trimmedValue = value.trim();
          return trimmedValue.length <= 50;
        },
        message: 'El país debe tener menos de 50 caracteres.'
      },
      {
        validator: function (value) {
          return !/<|>/.test(value);
        },
        message: 'El país no puede contener los caracteres < y >.'
      }
    ]
  },
  ciudad: {
    type: String, required: true, validate: [
      {
        validator: function (value) {
          const trimmedValue = value.trim();
          return trimmedValue.length <= 50;
        },
        message: 'La ciudad debe tener menos de 50 caracteres.'
      },
      {
        validator: function (value) {
          return !/<|>/.test(value);
        },
        message: 'La ciudad no puede contener los caracteres < y >.'
      }
    ]
  },
  codigo_postal: {
    type: String, required: true, validate: [
      {
        validator: function (value) {
          const trimmedValue = value.trim();
          return trimmedValue.length <= 5;
        },
        message: 'El código postal debe tener menos de 5 caracteres.'
      },
      {
        validator: function(value) {
          return /^\d{5}$/.test(value);
        },
        message: 'El código postal no tiene un formato válido.'
      },
      {
        validator: function (value) {
          return !/<|>/.test(value);
        },
        message: 'El código postal no puede contener los caracteres < y >.'
      }
    ]
  },
  direccion: {
    type: String, required: true, validate: [
      {
        validator: function (value) {
          const trimmedValue = value.trim();
          return trimmedValue.length <= 50;
        },
        message: 'La dirección debe tener menos de 50 caracteres.'
      },
      {
        validator: function (value) {
          return !/<|>/.test(value);
        },
        message: 'La dirección no puede contener los caracteres < y >.'
      }
    ]
  },
  cliente: { type: Schema.ObjectId, ref: 'cliente', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('direccion', DireccionSchema, 'direcciones');
