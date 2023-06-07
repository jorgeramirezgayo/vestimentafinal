const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = Schema({
  titulo: {type: String, required: true, validate: [
    {
      validator: function (value) {
        const trimmedValue = value.trim();
        return trimmedValue.length <= 60;
      },
      message: 'El título debe tener menos de 60 caracteres.'
    },
    {
      validator: function (value) {
        return !/<|>/.test(value);
      },
      message: 'El título no puede contener los caracteres < y >.'
    }
  ]},
  slug: {type: String, required: true},
  marca: {type: String, required: true, validate: [
    {
      validator: function (value) {
        const trimmedValue = value.trim();
        return trimmedValue.length <= 50;
      },
      message: 'La marca debe tener menos de 50 caracteres.'
    },
    {
      validator: function (value) {
        return !/<|>/.test(value);
      },
      message: 'La marca no puede contener los caracteres < y >.'
    }
  ]},
  categoria: {type: String, required: true, validate: [
    {
      validator: function (value) {
        const trimmedValue = value.trim();
        return trimmedValue.length <= 50;
      },
      message: 'La categoría debe tener menos de 50 caracteres.'
    },
    {
      validator: function (value) {
        return !/<|>/.test(value);
      },
      message: 'La categoría no puede contener los caracteres < y >.'
    }
  ]},
  subcategoria: {type: String, validate: [
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
  precio: {type: Number, default: 0, required: true, validate: {
    validator: function (value) {
      return value >= 0 && value <= 9999;
    },
    message: 'El precio debe estar entre 0 y 9999.'
  }},
  descripcion: {type: String, required: true, validate: [
    {
      validator: function (value) {
        const trimmedValue = value.trim();
        return trimmedValue.length <= 600;
      },
      message: 'La descripción debe tener menos de 600 caracteres.'
    },
    {
      validator: function (value) {
        return !/<|>/.test(value);
      },
      message: 'La descripción no puede contener los caracteres < y >.'
    }
  ]},
  portada: {type: String, required: true, validate: {
    validator: function (value) {
      const trimmedValue = value.trim();
      return trimmedValue.length <= 50;
    },
    message: 'La portada debe tener menos de 50 caracteres.'
  }},
  stock: {type: Number, default: 0, required: true},
  estado: {type: Boolean, required: true},
  updatedAt: {type: Date, required: false},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('producto', ProductoSchema);
