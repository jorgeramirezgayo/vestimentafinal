const mongoose = require('mongoose');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

const registro_usuario_admin = async (req, res) => {
  try {
    if (req.user) {
      let data = req.body;
      let usuarios = await Usuario.find({email: data.email});
    
      if (usuarios.length > 0) {
        res.status(200).send({data: undefined, message: 'El correo electrónico ya existe.'});
      } else {
        bcrypt.hash(data.password, null, null, async (err, hash) => {
          if (err) {
            res.status(200).send({data: undefined, message: 'No se pudo encriptar la contraseña.'});
          } else {
            data.password = hash;

            try {
              let usuario = await Usuario.create(data);
              res.status(200).send({data: usuario});
            } catch (error) {
              if (error instanceof mongoose.Error.ValidationError) {
                const messages = Object.values(error.errors).map(err => err.message);
                res.status(200).send({ data: undefined, message: messages.join(', ') });
              } else {
                console.log(error);
                res.status(200).send({ data: undefined, message: 'No se pudo crear el usuario.' });
              }
            }
          }
        });
      }
    } else {
      res.status(500).send({data: undefined, message: 'ErrorToken'});
    }
  } catch (error) {
    console.log(error);
  }
}

const login_usuario = async (req, res) => {
  try {
    let data = req.body;

    let usuarios = await Usuario.find({email: data.email});
  
    if (usuarios.length > 0) {
      if (usuarios[0].estado) {
        bcrypt.compare(data.password, usuarios[0].password, async (err, check) => {
          if (check) {
            res.status(200).send({token: jwt.createToken(usuarios[0]), usuario: usuarios[0]});
          } else {
            res.status(200).send({data: undefined, message: 'La contraseña es incorrecta.'});
          }
        })
      } else {
      res.status(200).send({data: undefined, message: 'Su cuenta está desactivada.'});
      }
    } else {
      res.status(200).send({data: undefined, message: 'No se encontró el correo electrónico.'});
    }
  } catch (error) {
    console.log(error);
  }
}

const listar_usuario_admin = async (req, res) => {
  try {
    if (req.user) {
      let filtro = req.params['filtro'];
      let usuarios = await Usuario.find({
        $or: [
          {nombres: new RegExp(filtro, 'i')},
          {apellidos: new RegExp(filtro, 'i')},
          {email: new RegExp(filtro, 'i')},
        ]
      });
  
      res.status(200).send(usuarios);
    } else {
      res.status(500).send({data: undefined, message: 'ErrorToken'});
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_usuario_admin = async (req,res) => {
  try {
    if (req.user) {
      let id = req.params['id'];
  
      try {
        let usuario = await Usuario.findById({_id: id});
  
        res.status(200).send(usuario);
      } catch (error) {
        res.status(200).send(undefined);
      }
    } else {
      res.status(500).send({data: undefined, message: 'ErrorToken'});
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_usuario_logeado_admin = async (req,res) => {
  try {
    if (req.user) {

      let usuario = req.user;
  
      res.status(200).send(usuario);
    } else {
      res.status(500).send({data: undefined, message: 'ErrorToken'});
    }
  } catch (error) {
    console.log(error);
  }
}

const actualizar_usuario_admin = async (req,res) => {
  try {
    if (req.user) {
      let id = req.params['id'];
      let data = req.body;

      try {
        let usuario = await Usuario.findByIdAndUpdate({_id: id}, {
          nombre: data.nombre,
          apellidos: data.apellido,
          rol: data.rol,
          email: data.email
        });
    
        res.status(200).send(usuario);
      } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
          const messages = Object.values(error.errors).map(err => err.message);
          res.status(200).send({ data: undefined, message: messages.join(', ') });
        } else {
          console.log(error);
          res.status(200).send({ data: undefined, message: 'No se pudo actualizar el usuario.' });
        }
      }
    } else {
      res.status(500).send({data: undefined, message: 'ErrorToken'});
    }
  } catch (error) {
    console.log(error);
  }
}

const cambiar_estado_usuario_admin = async (req,res) => {
  try {
    if (req.user) {
      let id = req.params['id'];
      let data = req.body;
  
      let nuevo_estado = false;
  
      if (data.estado) {
        nuevo_estado = false;
      } else {
        nuevo_estado = true;
      }
  
      let usuario = await Usuario.findByIdAndUpdate({_id: id}, {
        estado: nuevo_estado
      });
  
      res.status(200).send(usuario);
    } else {
      res.status(500).send({data: undefined, message: 'ErrorToken'});
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  registro_usuario_admin,
  login_usuario,
  listar_usuario_admin,
  obtener_usuario_admin,
  obtener_usuario_logeado_admin,
  actualizar_usuario_admin,
  cambiar_estado_usuario_admin,
}
