const mongoose = require('mongoose');
const Cliente = require('../models/cliente');
const Direccion = require('../models/direccion');
const Producto = require('../models/producto');
const Variedad = require('../models/variedad');
const Venta = require('../models/venta');
const Venta_detalle = require('../models/venta_detalle');
const Carrito = require('../models/carrito');
const bcrypt = require('bcrypt-nodejs');
const jwtCliente = require('../helpers/jwtCliente');
const orderConfirmationMail = require('../mails/orderConfirmation');

const registro_cliente_ecommerce = async (req, res) => {
  try {
    let data = req.body;

    let registro = await Cliente.find({ email: data.email });
  
    if (registro.length >= 1) {
      res.status(200).send({ message: 'El correo electrónico ya existe.' });
    } else {
      bcrypt.hash(data.password, null, null, async (err, hash) => {
        if (err) {
          res.status(200).send({ message: 'Problema durante la encriptación.' });
        } else {
          data.password = hash;
          let cliente = await Cliente.create(data);
          res.status(200).send(cliente);
        }
      })
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map(err => err.message);
      res.status(400).send({ message: messages.join(', ') });
    } else {
      console.log(error);
      res.status(500).send({ message: 'Error en el servidor.' });
    }
  }
}

const login_cliente = async (req, res) => {
  try {
    let data = req.body;

    let clientes = await Cliente.find({email: data.email});
  
    if (clientes.length > 0) {
      if (clientes[0].estado) {
        bcrypt.compare(data.password, clientes[0].password, async (err, check) => {
          if (check) {
            res.status(200).send({token: jwtCliente.createToken(clientes[0]), cliente: clientes[0]});
          } else {
            res.status(200).send({data: undefined, message: 'La contraseña es incorrecta.'});
          }
        })
      } else {
      res.status(200).send({data: undefined, message: 'Su cuenta está desactivada.'});
      }
    } else {
      res.status(200).send({data: undefined, message: 'El correo electrónico no existe.'});
    }
  } catch (error) {
    console.log(error);
  }
}

const crear_direccion_cliente = async (req, res) => {
  try {
    if (req.user) {
      let data = req.body;
      data.cliente = req.user.sub;
  
      let registro = await Direccion.findOne({cliente: req.user.sub});
  
      if (registro == null) {
        let direccion = await Direccion.create(data);
        res.status(200).send(direccion);
      } else {
        try {
          let direccion = await Direccion.findByIdAndUpdate({_id: registro._id}, {
            nombre: data.nombre,
            apellidos: data.apellidos,
            dni: data.dni,
            telefono: data.telefono,
            pais: data.pais,
            ciudad: data.ciudad,
            codigo_postal: data.codigo_postal,
            direccion: data.direccion
          });
          res.status(200).send(direccion);
        } catch (error) {
          if (error instanceof mongoose.Error.ValidationError) {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(200).send({ data: undefined, message: messages.join(', ') });
          } else {
            console.log(error);
            res.status(200).send({ data: undefined, message: 'No se pudo actualizar la dirección.' });
          }
        }
      }
    } else {
      res.status(500).send({data: undefined, message: 'ErrorToken.'});
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_direccion_cliente = async (req, res) => {
  try {
    if (req.user) {
      let direccion = await Direccion.findOne({cliente: req.user.sub});
      res.status(200).send(direccion);
    } else {
      res.status(500).send({data: undefined, message: 'ErrorToken.'});
    }
  } catch (error) {
    console.log(error);
  }
}

const validar_id_venta_cliente = async function(req,res){
  try {
    if(req.user){
      let token = req.params['token'];
      let ventas = await Venta.find({transaccion: token});
      res.status(200).send(ventas);
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
  } catch (error) {
    console.log(error);
  }
}

const crear_venta_cliente = async (req, res) => {
  try {
    if (req.user) {
      let data = req.body;
  
      data.year = new Date().getFullYear();
      data.month = new Date().getMonth()+1;
      data.day = new Date().getDate();
  
      let ventas = await Venta.find().sort({createdAt: -1});
  
      if (ventas.length > 0) {
        data.serie = ventas[0].serie + 1;
      } else {
        data.serie = 1 ;
      }
  
      let venta = await Venta.create(data);
  
      for (let item of data.venta_detalles) {
        item.year = new Date().getFullYear();
        item.month = new Date().getMonth()+1;
        item.day = new Date().getDate();
        item.venta = venta._id;
        
        await Variedad.updateOne(
          { _id: item.variedad },
          { $inc: { stock: -item.cantidad } }
        );
  
        await Producto.updateOne(
          { _id: item.producto },
          { $inc: { stock: -item.cantidad } }
        );
  
        await Venta_detalle.create(item);
      }
  
      await Carrito.deleteMany({cliente: data.cliente});
  
      let venta_mail = await Venta.findOne({transaccion: data.transaccion}).populate('cliente').populate('direccion');
      let venta_detalles_mail = await Venta_detalle.find({venta: venta_mail._id}).populate('producto').populate('variedad');
      orderConfirmationMail.enviarCorreo(venta_mail, venta_detalles_mail);
  
      res.status(200).send(venta);
    } else {
      res.status(500).send({data: undefined, message: 'ErrorToken.'});
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_informacion_venta = async function(req,res){
  try {
    if(req.user){
      let id = req.params['id'];
      let venta = await Venta.findById({_id: id}).populate('cliente').populate('direccion');
      let detalles = await Venta_detalle.find({venta: id}).populate('producto').populate('variedad');
      if (req.user.sub == venta.cliente.id) {
        res.status(200).send({venta, detalles});
      } else {
        res.status(200).send({data:undefined,message: 'No tienes acceso a este pedido.'});
      }
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_ventas_cliente = async function(req,res){
  try {
    if(req.user){
      let ventas = await Venta.find({cliente: req.user.sub}).populate('cliente').populate('direccion');
      res.status(200).send(ventas);
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  registro_cliente_ecommerce,
  login_cliente,
  crear_direccion_cliente,
  obtener_direccion_cliente,
  crear_venta_cliente,
  validar_id_venta_cliente,
  obtener_informacion_venta,
  obtener_ventas_cliente
}
