const jwt = require('jwt-simple');
const moment = require('moment');
const secret = "jorge";

exports.createToken = usuario => {
  let payload = {
    sub: usuario._id,
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    email: usuario.email,
    rol: usuario.rol,
    iat: moment().unix(),
    exp: moment().add(1, 'day').unix()
  }

  return jwt.encode(payload, secret);
}
