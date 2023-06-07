const express = require('express');
const paymentController = require('../controllers/paymentController');

const api = express.Router();

api.post('/create_order', paymentController.createOrder);
api.get('/capture_order/:token', paymentController.captureOrder);
api.get('/cancel_order', paymentController.cancelPayment);

module.exports = api;
