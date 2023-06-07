const mongoose = require('mongoose');
const Producto = require('../models/producto');
const Variedad = require('../models/variedad');
const Ingreso = require('../models/ingreso');
const Ingreso_detalle = require('../models/ingreso_detalle');
const Galeria = require('../models/galeria');
const Categoria = require('../models/categoria');
const Subcategoria = require('../models/subcategoria');
const Marca = require('../models/marca');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');

const registro_producto_admin = async (req, res) => {
  try {
    if (req.user) {
      let data = req.body;

      let productos = await Producto.find({ titulo: data.titulo });

      if (productos.length >= 1) {
        res.status(200).send({ data: undefined, message: 'El título del producto ya existe.' });
      } else {
        let img_path = req.files.portada.path;
        let str_img = img_path.split('\\');
        let str_portada = str_img[2];

        data.portada = str_portada;
        data.slug = slugify(data.titulo).toLowerCase();

        try {
          let producto = await Producto.create(data);
          res.status(200).send({ data: producto });
        } catch (error) {
          if (error instanceof mongoose.Error.ValidationError) {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(200).send({ data: undefined, message: messages.join(', ') });
          } else {
            console.log(error);
            res.status(200).send({ data: undefined, message: 'No se pudo crear el producto.' });
          }
        }
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const listar_productos_admin = async (req, res) => {
  try {
    if (req.user) {
      let filtro = req.params['filtro'];
      let productos = await Producto.find({
        $or: [
          { titulo: new RegExp(filtro, 'i') },
          { categoria: new RegExp(filtro, 'i') }
        ]
      }).sort({ createdAt: -1 });

      res.status(200).send(productos);
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_portada_producto = async (req, res) => {
  try {
    let img = req.params['img'];

    fs.stat('./uploads/productos/' + img, error => {
      if (error) {
        let path_img = './uploads/default.png';
        res.status(200).sendFile(path.resolve(path_img));
      } else {
        let path_img = './uploads/productos/' + img;
        res.status(200).sendFile(path.resolve(path_img));
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const obtener_producto_admin = async (req, res) => {
  try {
    if (req.user) {
      let id = req.params['id'];

      try {
        let producto = await Producto.findById({ _id: id });

        res.status(200).send(producto);
      } catch (error) {
        res.status(200).send(undefined);
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const actualizar_producto_admin = async (req, res) => {
  try {
    if (req.user) {
      let data = req.body;
      let id = req.params['id'];

      let productos = await Producto.find({ titulo: data.titulo });

      if (productos.length >= 1) {
        if (productos[0]._id == id) {
          if (req.files) {
            let img_path = req.files.portada.path;
            let str_img = img_path.split('\\');
            let str_portada = str_img[2];

            data.portada = str_portada;
            data.slug = slugify(data.titulo).toLowerCase();

            try {
              let producto = await Producto.findByIdAndUpdate({ _id: id }, {
                titulo: data.titulo,
                marca: data.marca,
                categoria: data.categoria,
                subcategoria: data.subcategoria,
                descripcion: data.descripcion,
                estado: data.estado,
                portada: data.portada
              });
              res.status(200).send({ data: producto });
            } catch (error) {
              if (error instanceof mongoose.Error.ValidationError) {
                const messages = Object.values(error.errors).map(err => err.message);
                res.status(200).send({ data: undefined, message: messages.join(', ') });
              } else {
                console.log(error);
                res.status(200).send({ data: undefined, message: 'No se pudo actualizar el producto.' });
              }
            }
          } else {
            data.slug = slugify(data.titulo).toLowerCase();

            try {
              let producto = await Producto.findByIdAndUpdate({ _id: id }, {
                titulo: data.titulo,
                marca: data.marca,
                categoria: data.categoria,
                subcategoria: data.subcategoria,
                descripcion: data.descripcion,
                estado: data.estado,
                portada: data.portada
              });
              res.status(200).send({ data: producto });
            } catch (error) {
              if (error instanceof mongoose.Error.ValidationError) {
                const messages = Object.values(error.errors).map(err => err.message);
                res.status(200).send({ data: undefined, message: messages.join(', ') });
              } else {
                console.log(error);
                res.status(200).send({ data: undefined, message: 'No se pudo actualizar el producto.' });
              }
            }
          }
        } else {
          res.status(200).send({ data: undefined, message: 'No se pudo actualizar el producto.' });
        }
      } else {
        if (req.files) {
          let img_path = req.files.portada.path;
          let str_img = img_path.split('\\');
          let str_portada = str_img[2];

          data.portada = str_portada;
          data.slug = slugify(data.titulo).toLowerCase();

          try {
            let producto = await Producto.findByIdAndUpdate({ _id: id }, {
              titulo: data.titulo,
              marca: data.marca,
              categoria: data.categoria,
              subcategoria: data.subcategoria,
              descripcion: data.descripcion,
              estado: data.estado,
              portada: data.portada
            });
            res.status(200).send({ data: producto });
          } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
              const messages = Object.values(error.errors).map(err => err.message);
              res.status(200).send({ data: undefined, message: messages.join(', ') });
            } else {
              console.log(error);
              res.status(200).send({ data: undefined, message: 'No se pudo actualizar el producto.' });
            }
          }
        } else {
          data.slug = slugify(data.titulo).toLowerCase();

          try {
            let producto = await Producto.findByIdAndUpdate({ _id: id }, {
              titulo: data.titulo,
              marca: data.marca,
              categoria: data.categoria,
              subcategoria: data.subcategoria,
              descripcion: data.descripcion,
              estado: data.estado,
              portada: data.portada
            });
            res.status(200).send({ data: producto });
          } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
              const messages = Object.values(error.errors).map(err => err.message);
              res.status(200).send({ data: undefined, message: messages.join(', ') });
            } else {
              console.log(error);
              res.status(200).send({ data: undefined, message: 'No se pudo actualizar el producto.' });
            }
          }
        }
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const registro_variedad_producto = async (req, res) => {
  try {
    if (req.user) {
      let data = req.body;

      try {
        let variedad = await Variedad.create(data);

        res.status(200).send({ data: variedad });
      } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
          const messages = Object.values(error.errors).map(err => err.message);
          res.status(200).send({ data: undefined, message: messages.join(', ') });
        } else {
          console.log(error);
          res.status(200).send({ data: undefined, message: 'No se pudo crear el producto.' });
        }
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_variedades_producto = async (req, res) => {
  try {
    if (req.user) {
      let id = req.params['id'];

      let variedades = await Variedad.find({ producto: id }).sort({ stock: -1 });
      res.status(200).send(variedades);
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const eliminar_variedad_producto = async (req, res) => {
  try {
    if (req.user) {
      let id = req.params['id'];

      let reg = await Variedad.findById({ _id: id });

      if (reg.stock == 0) {
        let variedad = await Variedad.findByIdAndRemove({ _id: id });
        res.status(200).send(variedad);
      } else {
        res.status(200).send({ data: undefined, message: 'No se puede eliminar esta variedad.' });
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const listar_productos_activos_admin = async (req, res) => {
  try {
    if (req.user) {
      let productos = await Producto.find({ estado: true }).sort({ createdAt: -1 });

      res.status(200).send(productos);
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const registro_ingreso_admin = async (req, res) => {
  try {
    if (req.user) {
      let data = req.body; // ingreso

      try {
        let reg_ingresos = await Ingreso.find().sort({ createdAt: -1 });

        if (reg_ingresos.length == 0) {
          data.serie = 1;
        } else {
          data.serie = reg_ingresos[0].serie + 1;
        }

        let detalles = JSON.parse(data.detalles); // detalles ingreso

        let doc_path = req.files.documento.path;
        let str_doc = doc_path.split('\\');
        let str_documento = str_doc[2];
        data.documento = str_documento;
        data.usuario = req.user.sub;

        let ingreso = await Ingreso.create(data);

        for (let detalle of detalles) {
          detalle.ingreso = ingreso._id;
          await Ingreso_detalle.create(detalle);

          // Actualizar cantidades
          let variedad = await Variedad.findById({ _id: detalle.variedad });
          await Variedad.findByIdAndUpdate({ _id: detalle.variedad }, {
            stock: parseInt(variedad.stock) + parseInt(detalle.cantidad)
          });

          let producto = await Producto.findById({ _id: detalle.producto });
          await Producto.findByIdAndUpdate({ _id: detalle.producto }, {
            stock: parseInt(producto.stock) + parseInt(detalle.cantidad)
          });

          // Margen de ganancia
          if (producto.stock >= 1) {
            let subtotal_residual = producto.precio * producto.stock;
            let ganancia = Math.ceil((detalle.precio_unidad * data.ganancia) / 100);
            let subtotal_ingreso = (parseFloat(detalle.precio_unidad) + parseFloat(ganancia)) * detalle.cantidad;

            let cantidades = parseInt(producto.stock) + parseInt(detalle.cantidad);
            let subtotales = parseFloat(subtotal_residual) + parseFloat(subtotal_ingreso);

            let precio_equilibrio = Math.ceil(subtotales / cantidades);

            await Producto.findByIdAndUpdate({ _id: detalle.producto }, {
              precio: precio_equilibrio
            });
          } else {
            let ganancia = Math.ceil((detalle.precio_unidad * data.ganancia) / 100);

            await Producto.findByIdAndUpdate({ _id: detalle.producto }, {
              precio: parseFloat(detalle.precio_unidad) + parseFloat(ganancia)
            });
          }
        }

        res.status(200).send(ingreso);
      } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
          const messages = Object.values(error.errors).map(err => err.message);
          res.status(200).send({ data: undefined, message: messages.join(', ') });
        } else {
          console.log(error);
          res.status(200).send({ message: 'No se pudo registrar el ingreso.' });
        }
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const subir_imagen_producto = async (req, res) => {
  try {
    if (req.user) {
      let data = req.body;

      let img_path = req.files.imagen.path;
      let str_img = img_path.split('\\');
      let str_imagen = str_img[2];

      data.imagen = str_imagen;

      try {
        let imagen = await Galeria.create(data);
        res.status(200).send(imagen);
      } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
          const messages = Object.values(error.errors).map(err => err.message);
          res.status(200).send({ data: undefined, message: messages.join(', ') });
        } else {
          console.log(error);
          res.status(200).send({ data: undefined, message: 'No se pudo subir la imagen.' });
        }
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_galeria_producto = async (req, res) => {
  try {
    let img = req.params['img'];

    fs.stat('./uploads/galeria/' + img, error => {
      if (error) {
        let path_img = './uploads/default.png';
        res.status(200).sendFile(path.resolve(path_img));
      } else {
        let path_img = './uploads/galeria/' + img;
        res.status(200).sendFile(path.resolve(path_img));
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const obtener_galeria_producto_admin = async (req, res) => {
  try {
    if (req.user) {
      let id = req.params['id'];

      let galeria = await Galeria.find({ producto: id });
      res.status(200).send(galeria);
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const eliminar_galeria_producto_admin = async (req, res) => {
  try {
    if (req.user) {
      let id = req.params['id'];

      try {
        let registro = await Galeria.findById({ _id: id });
        let path_img = './uploads/galeria/' + registro.imagen;
        fs.unlinkSync(path_img);

        let galeria = await Galeria.findByIdAndRemove({ _id: id });
        res.status(200).send(galeria);
      } catch (error) {
        res.status(200).send({ data: undefined, message: 'No se pudo eliminar la imagen.' });
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const crear_categoria_admin = async (req, res) => {
  try {
    if (req.user) {
      let data = req.body;

      try {
        let registro = await Categoria.find({ titulo: data.titulo });

        if (registro.length == 0) {
          let img_path = req.files.portada.path;
          let str_img = img_path.split('\\');
          let str_portada = str_img[2];

          data.portada = str_portada;
          data.slug = slugify(data.titulo).toLowerCase();

          try {
            let categoria = await Categoria.create(data);
            res.status(200).send(categoria);
          } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
              const messages = Object.values(error.errors).map(err => err.message);
              res.status(200).send({ data: undefined, message: messages.join(', ') });
            } else {
              console.log(error);
              res.status(200).send({ data: undefined, message: 'No se pudo crear la categoría.' });
            }
          }
        } else {
          res.status(200).send({ data: undefined, message: 'La categoría ya existe.' });
        }
      } catch (error) {
        res.status(200).send({ data: undefined, message: 'Ocurrió un error durante el proceso.' });
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const listar_categorias_admin = async (req, res) => {
  try {
    if (req.user) {
      let registros = await Categoria.find().sort({ titulo: 1 });
      let categorias = [];

      for (let item of registros) {
        let subcategorias = await Subcategoria.find({ categoria: item._id });
        let productos = await Producto.find({ categoria: item.titulo });

        categorias.push({
          categoria: item,
          subcategorias,
          nproductos: productos.length
        })
      }

      res.status(200).send(categorias);
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_portada_categoria = async (req, res) => {
  try {
    let img = req.params['img'];

    fs.stat('./uploads/categorias/' + img, error => {
      if (error) {
        let path_img = './uploads/default.png';
        res.status(200).sendFile(path.resolve(path_img));
      } else {
        let path_img = './uploads/categorias/' + img;
        res.status(200).sendFile(path.resolve(path_img));
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const actualizar_portada_categoria_admin = async (req, res) => {
  try {
    if (req.user) {
      let data = req.body;

      try {
        if (req.files) {
          let img_path = req.files.portada.path;
          let str_img = img_path.split('\\');
          let str_portada = str_img[2];
          data.portada = str_portada;

          try {
            let registro = await Categoria.findByIdAndUpdate({ _id: data.id }, { portada: data.portada });
            res.status(200).send(registro);
          } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
              const messages = Object.values(error.errors).map(err => err.message);
              res.status(200).send({ data: undefined, message: messages.join(', ') });
            } else {
              console.log(error);
              res.status(200).send({ data: undefined, message: 'No se pudo actualizar la portada.' });
            }
          }
        }
      } catch (error) {
        console.log(error);
        res.status(200).send({ data: undefined, message: 'No se pudo actualizar la portada.' });
      }
    } else {
      return res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
};

const actualizar_titulo_categoria_admin = async (req, res) => {
  try {
    if (req.user) {
      let data = req.body;

      try {
        let registro = await Categoria.findByIdAndUpdate(data.id, {
          titulo: data.titulo
        });

        res.status(200).send(registro);
      } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
          const messages = Object.values(error.errors).map(err => err.message);
          res.status(200).send({ data: undefined, message: messages.join(', ') });
        } else {
          console.log(error);
          res.status(200).send({ data: undefined, message: 'No se pudo actualizar el título.' });
        }
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const crear_subcategoria_admin = async (req, res) => {
  try {
    if (req.user) {
      let data = req.body;

      try {
        let registro = await Subcategoria.find({ titulo: data.titulo });

        if (registro.length == 0) {
          try {
            let subcategoria = await Subcategoria.create(data);
            res.status(200).send(subcategoria);
          } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
              const messages = Object.values(error.errors).map(err => err.message);
              res.status(200).send({ data: undefined, message: messages.join(', ') });
            } else {
              console.log(error);
              res.status(200).send({ data: undefined, message: 'No se pudo crear la subcategoría.' });
            }
          }
        } else {
          res.status(200).send({ data: undefined, message: 'La subcategoría ya existe.' });
        }
      } catch (error) {
        res.status(200).send({ data: undefined, message: 'Ocurrió un error durante el proceso.' });
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const eliminar_subcategoria_admin = async (req, res) => {
  try {
    if (req.user) {
      let id = req.params['id'];

      let registro = await Subcategoria.findByIdAndRemove({ _id: id });
      res.status(200).send(registro);
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const cambiar_estado_categoria_admin = async (req, res) => {
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

      let categoria = await Categoria.findByIdAndUpdate({ _id: id }, { estado: nuevo_estado });
      res.status(200).send(categoria);
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_ingresos_admin = async (req, res) => {
  try {
    if (req.user) {

      try {
        let ingresos = await Ingreso.find().sort({ createdAt: -1 });
        res.status(200).send(ingresos);
      } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
          const messages = Object.values(error.errors).map(err => err.message);
          res.status(200).send({ data: undefined, message: messages.join(', ') });
        } else {
          console.log(error);
          res.status(200).send({ data: undefined, message: 'No se pudo crear el ingreso.' });
        }
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_ingresos_por_fecha_admin = async (req, res) => {
  try {
    if (req.user) {
      let inicio = req.params['inicio'];
      let fin = req.params['fin'];

      let ingresos = await Ingreso.find({
        createdAt: {
          $gte: new Date(inicio + 'T00:00:00'),
          $lte: new Date(fin + 'T23:59:59')
        }
      }).sort({ createdAt: -1 });

      res.status(200).send(ingresos);
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_comprobante_ingreso_admin = async (req, res) => {
  try {
    let documento = req.params['documento'];

    fs.stat('./uploads/facturas/' + documento, error => {
      if (error) {
        let path_doc = './uploads/default.png';
        res.status(200).sendFile(path.resolve(path_doc));
      } else {
        let path_doc = './uploads/facturas/' + documento;
        res.status(200).sendFile(path.resolve(path_doc));
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const obtener_detalles_ingreso_admin = async (req, res) => {
  try {
    if (req.user) {
      let id = req.params['id'];

      let ingreso = await Ingreso.findById({ _id: id });
      let detalles = await Ingreso_detalle.find({ ingreso: id }).populate('producto').populate('variedad');
      res.status(200).send({ ingreso, detalles });
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const registro_marca_admin = async (req, res) => {
  try {
    if (req.user) {
      let data = req.body;

      let marcas = await Marca.find({ titulo: data.titulo });

      if (marcas.length >= 1) {
        res.status(200).send({ data: undefined, message: 'El nombre de la marca ya existe.' });
      } else {
        try {
          let marca = await Marca.create(data);
          res.status(200).send({ data: marca });
        } catch (error) {
          if (error instanceof mongoose.Error.ValidationError) {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(200).send({ data: undefined, message: messages.join(', ') });
          } else {
            console.log(error);
            res.status(200).send({ data: undefined, message: 'No se pudo crear la marca.' });
          }
        }
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const listar_marcas_admin = async (req, res) => {
  try {
    if (req.user) {
      let filtro = req.params['filtro'];
      let marcas = await Marca.find({
        $or: [
          { titulo: new RegExp(filtro, 'i') }
        ]
      }).sort({ titulo: 1});

      res.status(200).send(marcas);
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const obtener_marca_admin = async (req, res) => {
  try {
    if (req.user) {
      let id = req.params['id'];

      try {
        let marca = await Marca.findById({ _id: id });

        res.status(200).send(marca);
      } catch (error) {
        res.status(200).send(undefined);
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

const actualizar_marca_admin = async (req, res) => {
  try {
    if (req.user) {
      let data = req.body;
      let id = req.params['id'];

      try {
        let marca = await Marca.findByIdAndUpdate({ _id: id }, {
          titulo: data.titulo,
        });
        res.status(200).send({ data: marca });
      } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
          const messages = Object.values(error.errors).map(err => err.message);
          res.status(200).send({ data: undefined, message: messages.join(', ') });
        } else {
          console.log(error);
          res.status(200).send({ data: undefined, message: 'No se pudo actualizar la marca.' });
        }
      }
    } else {
      res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  registro_producto_admin,
  listar_productos_admin,
  obtener_portada_producto,
  obtener_producto_admin,
  actualizar_producto_admin,
  registro_variedad_producto,
  obtener_variedades_producto,
  eliminar_variedad_producto,
  listar_productos_activos_admin,
  registro_ingreso_admin,
  subir_imagen_producto,
  obtener_galeria_producto,
  obtener_galeria_producto_admin,
  eliminar_galeria_producto_admin,
  crear_categoria_admin,
  listar_categorias_admin,
  obtener_portada_categoria,
  actualizar_portada_categoria_admin,
  actualizar_titulo_categoria_admin,
  crear_subcategoria_admin,
  eliminar_subcategoria_admin,
  cambiar_estado_categoria_admin,
  obtener_ingresos_admin,
  obtener_ingresos_por_fecha_admin,
  obtener_comprobante_ingreso_admin,
  obtener_detalles_ingreso_admin,
  registro_marca_admin,
  listar_marcas_admin,
  obtener_marca_admin,
  actualizar_marca_admin
}
