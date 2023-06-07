const express = require('express');
const carritoController = require('../controllers/carritoController');
const authenticateCliente = require('../middlewares/authenticateCliente');

const api = express.Router();

api.post('/crear_producto_carrito', authenticateCliente.decodeToken, carritoController.crear_producto_carrito);
api.get('/obtener_carrito_cliente', authenticateCliente.decodeToken, carritoController.obtener_carrito_cliente);
api.delete('/eliminar_producto_carrito/:id', authenticateCliente.decodeToken, carritoController.eliminar_producto_carrito);

module.exports = api;
