const express = require('express');
const ventaController = require('../controllers/ventaController');
const authenticate = require('../middlewares/authenticate');

const api = express.Router();

api.get('/obtener_ventas_admin', authenticate.decodeToken, ventaController.obtener_ventas_admin);
api.get('/obtener_ventas_por_fecha_admin/:inicio/:fin', authenticate.decodeToken, ventaController.obtener_ventas_por_fecha_admin);
api.get('/obtener_detalles_venta_admin/:id', authenticate.decodeToken, ventaController.obtener_detalles_venta_admin);
api.get('/obtener_total_venta_por_dia_ultimos_14_dias', authenticate.decodeToken, ventaController.obtener_total_venta_por_dia_ultimos_14_dias);

module.exports = api;
