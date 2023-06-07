const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubcategoriaSchema = Schema({
  titulo: {type: String, required: true, validate: [
    {
      validator: function (value) {
        const trimmedValue = value.trim();
        return trimmedValue.length <= 50;
      },
      message: 'La subcategoría debe tener menos de 50 caracteres.'
    },
    {
      validator: function (value) {
        return !/<|>/.test(value);
      },
      message: 'La subcategoría no puede contener los caracteres < y >.'
    }
  ]},
  categoria: {type: Schema.ObjectId, ref: 'categoria', required: true},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('subcategoria', SubcategoriaSchema);
