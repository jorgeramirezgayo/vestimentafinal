const express = require('express');
const publicController = require('../controllers/publicController');

const api = express.Router();

api.get('/obtener_nuevos_productos', publicController.obtener_nuevos_productos);
api.get('/obtener_productos_recomendados', publicController.obtener_productos_recomendados);
api.get('/obtener_productos_shop', publicController.obtener_productos_shop);
api.get('/listar_categorias_public', publicController.listar_categorias_public);
api.get('/obtener_producto_slug_public/:slug', publicController.obtener_producto_slug_public);
api.get('/obtener_producto_categoria_public/:categoria/:id', publicController.obtener_producto_categoria_public);
api.get('/listar_marcas_public', publicController.listar_marcas_public);
api.get('/listar_marcas_y_numproductos_public', publicController.listar_marcas_y_numproductos_public);

module.exports = api;
