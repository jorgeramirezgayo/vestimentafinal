const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GaleriaSchema = Schema({
  imagen: {type: String, required: true, validate: {
    validator: function (value) {
      const trimmedValue = value.trim();
      return trimmedValue.length <= 50;
    },
    message: 'La imagen debe tener menos de 50 caracteres.'
  }},
  producto: {type: Schema.ObjectId, ref: 'producto', required: true},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('galeria', GaleriaSchema, 'galeria');
