const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngresoSchema = Schema({
  proveedor: {
    type: String, required: true, validate: [
      {
        validator: function (value) {
          const trimmedValue = value.trim();
          return trimmedValue.length <= 50;
        },
        message: 'El proveedor debe tener menos de 50 caracteres.'
      },
      {
        validator: function (value) {
          return !/<|>/.test(value);
        },
        message: 'El proveedor no puede contener los caracteres < y >.'
      }
    ]
  }, //F
  ncomprobante: {
    type: String, required: true, validate: [
      {
        validator: function (value) {
          const trimmedValue = value.trim();
          return trimmedValue.length <= 50;
        },
        message: 'El número de comprobante debe tener menos de 50 caracteres.'
      },
      {
        validator: function (value) {
          return !/<|>/.test(value);
        },
        message: 'El número de comprobante no puede contener los caracteres < y >.'
      }
    ]
  }, //F
  documento: {
    type: String, required: true, validate: {
      validator: function (value) {
        const trimmedValue = value.trim();
        return trimmedValue.length <= 50;
      },
      message: 'El documento debe tener menos de 50 caracteres.'
    }
  }, //F
  pago_total: {
    type: String, required: true, validate: [
      {
        validator: function (value) {
          return value >= 0 && value <= 999999;
        },
        message: 'El precio debe estar entre 0 y 999999.'
      },
      {
        validator: function (value) {
          return !/<|>/.test(value);
        },
        message: 'El pago total no puede contener los caracteres < y >.'
      }
    ]
  }, //F

  serie: { type: Number, required: true }, //NF
  usuario: { type: Schema.ObjectId, ref: 'usuario', required: true }, //NF

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ingreso', IngresoSchema);
