const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VariedadSchema = Schema({
  variedad: {type: String, required: true, validate: [
    {
      validator: function (value) {
        const trimmedValue = value.trim();
        return trimmedValue.length <= 50;
      },
      message: 'La variedad debe tener menos de 50 caracteres.'
    },
    {
      validator: function (value) {
        return !/<|>/.test(value);
      },
      message: 'La variedad no puede contener los caracteres < y >.'
    }
  ]},
  sku: {type: String, required: true},
  stock: {type: Number, default: 0, required: true},
  producto: {type: Schema.ObjectId, ref: 'producto', required: true},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('variedad', VariedadSchema, 'variedades');
