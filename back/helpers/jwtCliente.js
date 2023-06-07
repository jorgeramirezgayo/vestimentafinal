const jwt = require('jwt-simple');
const moment = require('moment');
const secret = "jorge123";

exports.createToken = cliente => {
  let payload = {
    sub: cliente._id,
    nombre: cliente.nombre,
    apellidos: cliente.apellidos,
    email: cliente.email,
    genero: cliente.genero,
    iat: moment().unix(),
    exp: moment().add(1, 'day').unix()
  }

  return jwt.encode(payload, secret);
}
