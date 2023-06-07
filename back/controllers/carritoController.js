const Carrito = require('../models/carrito');
const Variedad = require('../models/variedad');

const crear_producto_carrito = async (req, res) => {
  try {
    if (req.user) {
      let data = req.body;
  
      let existingCartItem = await Carrito.findOne({
        cliente: req.user.sub,
        variedad: data.variedad
      });
  
      if (existingCartItem) {
        // El producto ya existe en el carrito, actualizar la cantidad
        existingCartItem.cantidad += data.cantidad;
        await existingCartItem.save();
        res.status(200).send(existingCartItem);
      } else {
        // El producto no existe en el carrito, crear un nuevo elemento
        let variedad = await Variedad.findById({ _id: data.variedad }).populate('producto');
  
        if (data.cantidad <= variedad.stock) {
          if (variedad.producto.precio >= 1) {
            let carrito = await Carrito.create(data);
            res.status(200).send(carrito);
          } else {
            res.status(200).send({ data: undefined, message: 'El producto tiene precio en 0.' });
          }
        } else {
          res.status(200).send({ data: undefined, message: 'Se superó el stock disponible.' });
        }
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
};

const obtener_carrito_cliente = async (req, res) => {
  try {
    if (req.user) {
      let carrito = await Carrito.find({cliente: req.user.sub}).populate('producto').populate('variedad').sort({createdAt: -1});
      res.status(200).send(carrito);
    } else {
      res.status(500).send({data: undefined, message: 'ErrorToken'});
    }
  } catch (error) {
    console.log(error);
  }
}

const eliminar_producto_carrito = async (req, res) => {
  try {
    if (req.user) {
      let id = req.params['id'];
      let registro = await Carrito.findByIdAndRemove({ _id: id});
      res.status(200).send(registro);
    } else {
      res.status(500).send({data: undefined, message: 'ErrorToken'});
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  crear_producto_carrito,
  obtener_carrito_cliente,
  eliminar_producto_carrito
}
