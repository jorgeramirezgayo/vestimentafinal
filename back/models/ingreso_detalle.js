const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ingreso_detalleSchema = Schema({
  cantidad: {
    type: Number, required: true, validate: [
      {
        validator: function (value) {
          return value > 0 && value <= 9999;
        },
        message: 'La cantidad debe estar entre 1 y 9999.'
      },
      {
        validator: function (value) {
          return !/<|>/.test(value);
        },
        message: 'El dni no pueden contener los caracteres < y >.'
      }
    ]
  },
  precio_unidad: {
    type: Number, required: true, validate: [
      {
        validator: function (value) {
          return value >= 0 && value <= 9999;
        },
        message: 'El precio debe estar entre 0 y 9999.'
      },
      {
        validator: function (value) {
          return !/<|>/.test(value);
        },
        message: 'El dni no pueden contener los caracteres < y >.'
      }
    ]
  },
  ingreso: { type: Schema.ObjectId, ref: 'ingreso', required: true },
  producto: { type: Schema.ObjectId, ref: 'producto', required: true },
  variedad: { type: Schema.ObjectId, ref: 'variedad', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ingreso_detalle', Ingreso_detalleSchema);
