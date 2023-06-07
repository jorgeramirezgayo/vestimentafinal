const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriaSchema = Schema({
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
  slug: {type: String, required: true},
  portada: {type: String, required: true, validate: {
    validator: function (value) {
      const trimmedValue = value.trim();
      return trimmedValue.length <= 50;
    },
    message: 'La portada debe tener menos de 50 caracteres.'
  }},
  estado: {type: Boolean, default: true, required: true},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('categoria', CategoriaSchema);
