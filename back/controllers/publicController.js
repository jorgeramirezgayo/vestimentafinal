const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const Subcategoria = require('../models/subcategoria');
const Variedad = require('../models/variedad');
const Galeria = require('../models/galeria');
const Marca = require('../models/marca');

const obtener_nuevos_productos = async (req, res) => {
  try {
    let productos = await Producto.find({ estado: true, stock: { $gt: 0 } }).sort({ createdAt: -1 }).limit(10);

    let productosConSegundaFoto = await Promise.all(
      productos.map(async (producto) => {
        let galeria = await Galeria.find({ producto: producto._id }).skip(1).limit(1);
  
        return {
          producto,
          segundaFoto: galeria[0] || null,
        };
      })
    );
  
    res.status(200).send(productosConSegundaFoto);
  } catch (error) {
    console.log(error);
  }
}

const obtener_productos_recomendados = async (req, res) => {
  try {
    let productos = await Producto.aggregate([
      { $match: { estado: true, stock: { $gt: 0 } } },
      { $sample: { size: 8 } },
    ]);

    let productosConSegundaFoto = await Promise.all(
      productos.map(async (producto) => {
        let galeria = await Galeria.find({ producto: producto._id }).skip(1).limit(1);
  
        return {
          producto,
          segundaFoto: galeria[0] || null,
        };
      })
    );
    
    res.status(200).send(productosConSegundaFoto);
  } catch (error) {
    console.log(error);
  }
}

const obtener_productos_shop = async (req, res) => {
  try {
    let data_productos = await Producto.aggregate([
      {
        $match: { estado: true, stock: { $gt: 0 } }
      },
      {
        $lookup: {
          from: 'variedades',
          localField: '_id',
          foreignField: 'producto',
          as: 'variedades'
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    let productos = await Promise.all(
      data_productos.map(async (item) => {
        let variedades = item.variedades.map((variedad) => variedad.variedad);
        let galeria = await Galeria.findOne({ producto: item._id }).skip(1).limit(1);

        return {
          titulo: item.titulo,
          slug: item.slug,
          marca: item.marca,
          categoria: item.categoria,
          subcategoria: item.subcategoria,
          precio: item.precio,
          descripcion: item.descripcion,
          portada: item.portada,
          variedades: variedades,
          estado: item.estado,
          descuento: item.descuento,
          createdAt: item.createdAt,
          galeria: galeria ? galeria.imagen : null
        };
      })
    );

    res.status(200).send(productos);
  } catch (error) {
    console.log(error);
    res.status(500).send({ data: undefined, message: 'Error' });
  }
};

const listar_categorias_public = async (req, res) => {
  try {
    let registros = await Categoria.find({ estado: true }).sort({ titulo: 1 });
    let categorias = [];
  
    for (let item of registros) {
      let subcategorias = await Subcategoria.find({ categoria: item._id });
      let productos = await Producto.find({ categoria: item.titulo });
  
      categorias.push({
        categoria: item,
        subcategorias,
        nproductos: productos.length
      });
    }
  
    res.status(200).send(categorias);
  } catch (error) {
    console.log(error);
  }
}

const obtener_producto_slug_public = async (req, res) => {
  try {
    let slug = req.params['slug'];
    let producto = await Producto.findOne({ slug: slug });
    let variedades = await Variedad.find({ producto: producto._id });
    let galeria = await Galeria.find({ producto: producto._id });
  
    res.status(200).send({ producto, variedades, galeria });
  } catch (error) {
    console.log(error);
  }
}

const obtener_producto_categoria_public = async (req, res) => {
  try {
    let categoria = req.params['categoria'];
    let id = req.params['id'];
    let productos = await Producto.find({ categoria: categoria, stock: { $gt: 0 }, _id: { $ne: id } }).limit(4);
  
    let productosConSegundaFoto = await Promise.all(
      productos.map(async (producto) => {
        let galeria = await Galeria.find({ producto: producto._id }).skip(1).limit(1);
  
        return {
          producto,
          segundaFoto: galeria[0] || null,
        };
      })
    );
  
    res.status(200).send(productosConSegundaFoto);
  } catch (error) {
    console.log(error);
  }
};

const listar_marcas_public = async (req, res) => {
  try {
    let marcas = await Marca.find().sort({ titulo: 1 });

    res.status(200).send(marcas);
  } catch (error) {
    console.log(error);
  }
}

const listar_marcas_y_numproductos_public = async (req, res) => {
  try {
    let productos = await Producto.aggregate([
      { $match: { stock: { $gt: 0 } } },
      { $group: { _id: "$marca", count: { $sum: 1 } } },
      { $project: { marca: "$_id", cantidad: "$count", _id: 0 } },
      { $sort: { marca: 1 } }
    ])
    
    res.status(200).send(productos);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  obtener_nuevos_productos,
  obtener_productos_recomendados,
  obtener_productos_shop,
  listar_categorias_public,
  obtener_producto_slug_public,
  obtener_producto_categoria_public,
  listar_marcas_public,
  listar_marcas_y_numproductos_public
}
