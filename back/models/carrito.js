const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarritoSchema = Schema({
  producto: {type: Schema.ObjectId, ref: 'producto', required: true},
  variedad: {type: Schema.ObjectId, ref: 'variedad', required: true},
  cantidad: {type: Number, required: true},
  cliente: {type: Schema.ObjectId, ref: 'cliente', required: true},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('carrito', CarritoSchema, 'carrito');
