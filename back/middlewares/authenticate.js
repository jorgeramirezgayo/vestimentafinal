const jwt = require('jwt-simple');
const secret = "jorge";

exports.decodeToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({message: 'NoHeadersError'});
  }

  let token = req.headers.authorization;
  let segment = token.split('.');
  let payload;

  if (segment.length != 3) {
    return res.status(403).send({message: 'InvalidToken'});
  } else {
    try {
      payload = jwt.decode(token, secret);
    } catch (error) {
      return res.status(403).send({message: 'ErrorToken'});  
    }
  }

  req.user = payload;
  next();
}
