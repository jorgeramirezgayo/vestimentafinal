const express = require('express');
const clienteController = require('../controllers/clienteController');
const authenticateCliente = require('../middlewares/authenticateCliente');

const api = express.Router();

api.post('/registro_cliente_ecommerce', clienteController.registro_cliente_ecommerce);
api.post('/login_cliente', clienteController.login_cliente);
api.post('/crear_direccion_cliente', authenticateCliente.decodeToken, clienteController.crear_direccion_cliente);
api.get('/obtener_direccion_cliente', authenticateCliente.decodeToken, clienteController.obtener_direccion_cliente);
api.post('/crear_venta_cliente', authenticateCliente.decodeToken, clienteController.crear_venta_cliente);
api.get('/validar_id_venta_cliente/:token', authenticateCliente.decodeToken, clienteController.validar_id_venta_cliente);
api.get('/obtener_informacion_venta/:id', authenticateCliente.decodeToken, clienteController.obtener_informacion_venta);
api.get('/obtener_ventas_cliente', authenticateCliente.decodeToken, clienteController.obtener_ventas_cliente);

module.exports = api;
