const Venta = require('../models/venta');
const Venta_detalle = require('../models/venta_detalle');

const obtener_ventas_admin = async (req, res) => {
  try {
    if (req.user) {
      let ventas = await Venta.find().populate('cliente');
      res.status(200).send(ventas);
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_ventas_por_fecha_admin = async (req, res) => {
  try {
    if (req.user) {
      let inicio = req.params['inicio'];
      let fin = req.params['fin'];
  
      let ventas = await Venta.find({
        createdAt: {
          $gte: new Date(inicio + 'T00:00:00'),
          $lte: new Date(fin + 'T23:59:59')
        }
      }).populate('cliente');
      res.status(200).send(ventas);
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_detalles_venta_admin = async (req, res) => {
  try {
    if (req.user) {
      let id = req.params['id'];
  
      let venta = await Venta.findById({_id: id}).populate('cliente');
      let detalles = await Venta_detalle.find({venta: id}).populate('producto').populate('variedad');
      res.status(200).send({venta, detalles});
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_total_venta_por_dia_ultimos_14_dias = async (req, res) => {
  try {
    if (req.user) {
      const fechaActual = new Date();
      const fechaInicio = new Date(fechaActual);
      fechaInicio.setDate(fechaInicio.getDate() - 14); // Restar 14 días a la fecha actual para obtener la fecha de inicio
  
      const ventas = await Venta.aggregate([
        {
          $match: {
            createdAt: {
              $gte: fechaInicio,
              $lt: fechaActual
            }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
            },
            ventaTotal: { $sum: { $add: ["$total", "$envio"] } }
          }
        },
        {
          $sort: {
            _id: 1
          }
        }
      ]);
  
      let fechaIteracion = new Date(fechaInicio);
      let ventaTotales = [];
  
      for (let i = 0; i <= 14; i++) {
        const fecha = fechaIteracion.toISOString().substring(0, 10);
        const venta = ventas.find((venta) => venta._id === fecha);
  
        ventaTotales.push({
          fecha: fecha,
          ventaTotal: venta ? venta.ventaTotal : 0
        });
  
        fechaIteracion.setDate(fechaIteracion.getDate() + 1);
      }
  
      ventaTotales = ventaTotales.slice(1);
  
      res.status(200).send({ ventaTotales });
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  obtener_ventas_admin,
  obtener_ventas_por_fecha_admin,
  obtener_detalles_venta_admin,
  obtener_total_venta_por_dia_ultimos_14_dias
}
