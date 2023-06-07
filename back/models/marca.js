const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarcaSchema = Schema({
  titulo: {type: String, required: true, validate: [
    {
      validator: function (value) {
        const trimmedValue = value.trim();
        return trimmedValue.length <= 50;
      },
      message: 'El título debe tener menos de 50 caracteres.'
    },
    {
      validator: function (value) {
        return !/<|>/.test(value);
      },
      message: 'El título no puede contener los caracteres < y >.'
    }
  ]},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('marca', MarcaSchema);
