const express = require('express');
const productoController = require('../controllers/productoController');
const authenticate = require('../middlewares/authenticate');
const multipart = require('connect-multiparty');

let path = multipart({uploadDir: './uploads/productos'});
let path_ingreso = multipart({uploadDir: './uploads/facturas'});
let path_galeria = multipart({uploadDir: './uploads/galeria'});
let path_categoria = multipart({uploadDir: './uploads/categorias'});
const api = express.Router();

// Producto
api.post('/registro_producto_admin', [authenticate.decodeToken, path], productoController.registro_producto_admin);
api.get('/listar_productos_admin/:filtro?', authenticate.decodeToken, productoController.listar_productos_admin);
api.get('/obtener_portada_producto/:img', productoController.obtener_portada_producto);
api.get('/obtener_producto_admin/:id', authenticate.decodeToken, productoController.obtener_producto_admin);
api.put('/actualizar_producto_admin/:id', [authenticate.decodeToken, path], productoController.actualizar_producto_admin);

// Variedad
api.post('/registro_variedad_producto', authenticate.decodeToken, productoController.registro_variedad_producto);
api.get('/obtener_variedades_producto/:id', authenticate.decodeToken, productoController.obtener_variedades_producto);
api.delete('/eliminar_variedad_producto/:id', authenticate.decodeToken, productoController.eliminar_variedad_producto);

api.get('/listar_productos_activos_admin', authenticate.decodeToken, productoController.listar_productos_activos_admin);

// Ingreso
api.post('/registro_ingreso_admin', [authenticate.decodeToken, path_ingreso], productoController.registro_ingreso_admin);
api.get('/obtener_ingresos_admin', authenticate.decodeToken, productoController.obtener_ingresos_admin);
api.get('/obtener_ingresos_por_fecha_admin/:inicio/:fin', authenticate.decodeToken, productoController.obtener_ingresos_por_fecha_admin);
api.get('/obtener_comprobante_ingreso_admin/:documento', productoController.obtener_comprobante_ingreso_admin);
api.get('/obtener_detalles_ingreso_admin/:id', authenticate.decodeToken, productoController.obtener_detalles_ingreso_admin);

// Galeria
api.get('/obtener_galeria_producto/:img', productoController.obtener_galeria_producto);
api.get('/obtener_galeria_producto_admin/:id', authenticate.decodeToken, productoController.obtener_galeria_producto_admin);
api.post('/subir_imagen_producto', [authenticate.decodeToken, path_galeria], productoController.subir_imagen_producto);
api.delete('/eliminar_galeria_producto_admin/:id', authenticate.decodeToken, productoController.eliminar_galeria_producto_admin);

// Categoría
api.post('/crear_categoria_admin', [authenticate.decodeToken, path_categoria], productoController.crear_categoria_admin);
api.get('/listar_categorias_admin', authenticate.decodeToken, productoController.listar_categorias_admin);
api.get('/obtener_portada_categoria/:img', productoController.obtener_portada_categoria);
api.post('/actualizar_portada_categoria_admin', [authenticate.decodeToken, path_categoria], productoController.actualizar_portada_categoria_admin);
api.post('/actualizar_titulo_categoria_admin', authenticate.decodeToken, productoController.actualizar_titulo_categoria_admin);
api.post('/crear_subcategoria_admin', authenticate.decodeToken, productoController.crear_subcategoria_admin);
api.delete('/eliminar_subcategoria_admin/:id', authenticate.decodeToken, productoController.eliminar_subcategoria_admin);
api.put('/cambiar_estado_categoria_admin/:id', authenticate.decodeToken, productoController.cambiar_estado_categoria_admin);

// Marca
api.post('/registro_marca_admin', authenticate.decodeToken, productoController.registro_marca_admin);
api.get('/listar_marcas_admin/:filtro?', authenticate.decodeToken, productoController.listar_marcas_admin);
api.get('/obtener_marca_admin/:id', authenticate.decodeToken, productoController.obtener_marca_admin);
api.put('/actualizar_marca_admin/:id', authenticate.decodeToken, productoController.actualizar_marca_admin);

module.exports = api;
