const nodemailer = require('nodemailer');
const venta = require('../models/venta');

const enviarCorreo = (venta_mail, venta_detalles_mail) => {
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: "vestimentafinaltfg@outlook.es",
      pass: "VestimentaFinal2023"
    }
  })

  let filas = '';

  venta_detalles_mail.map(detalle => {
    filas += `
    <tr>
      <td>${detalle.producto.marca}</td>
      <td>${detalle.producto.titulo}</td>
      <td>${detalle.producto.precio} €</td>
      <td>${detalle.cantidad}</td>
      <td>${detalle.variedad.variedad}</td>
      <td>${detalle.producto.precio * detalle.cantidad} €</td>
    </tr>
    `;
  })

  const options = {
    from: `"Vestimenta Final" <vestimentafinaltfg@outlook.es>`,
    to: `${venta_mail.cliente.email}`,
    subject: `Confirmación de Pedido #${venta_mail.serie.toString().padStart(6, '000000')}`,
    html: `
    <h1>Confirmación de Pedido #${venta_mail.serie.toString().padStart(6, '000000')}</h1>
    <p>Hola ${venta_mail.direccion.nombre} ${venta_mail.direccion.apellidos},</p>
    <p>Gracias por realizar tu pedido con nosotros. A continuación, te proporcionamos los detalles de tu pedido:</p>
    
    <table>
      <thead>
        <tr>
          <th>Marca</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Talla</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${filas}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5">Envio:</td>
          <td>${venta_mail.envio} €</td>
        </tr>
        <tr>
          <td colspan="5">Total:</td>
          <td>${venta_mail.total + venta_mail.envio} €</td>
        </tr>
      </tfoot>
    </table>

    <p>Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos.</p>
    <p>Atentamente,</p>
    <p>Vestimenta Final</p>
  `
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log("Sent: " + info.response);
  })
};

module.exports = {
  enviarCorreo
}
