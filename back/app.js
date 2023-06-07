const express = require('express');
const mongoose = require('mongoose');
const { config } = require('dotenv');
config();
const bodyparser = require('body-parser');
const port = process.env.PORT || 4201;
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {origin: '*'}
});

io.on('connection', socket => {
  socket.on('send_cart', data => {
    io.emit('listen_cart', data);
  })
});

const cliente_router = require('./routes/cliente');
const usuario_router = require('./routes/usuario');
const producto_router = require('./routes/producto');
const public_router = require('./routes/public');
const carrito_router = require('./routes/carrito');
const payment_router = require('./routes/payment');
const venta_router = require('./routes/venta');

app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

mongoose.connect('mongodb://127.0.0.1:27017/tienda')
  .then(() => {
    httpServer.listen(port, () => {
      console.log(`Servidor corriendo: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*'); 
  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
  res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
  next();
});

app.use('/api', cliente_router);
app.use('/api', usuario_router);
app.use('/api', producto_router);
app.use('/api', public_router);
app.use('/api', carrito_router);
app.use('/api', payment_router);
app.use('/api', venta_router);

module.exports = app;
