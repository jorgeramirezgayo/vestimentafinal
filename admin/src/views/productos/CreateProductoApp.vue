<template>
  <div>
    <SideBar />
    <div class="main-content">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12">

            <!-- Header -->
            <div class="header mt-md-5">
              <div class="header-body">
                <div class="row align-items-center">
                  <div class="col">

                    <!-- Pretitle -->
                    <h6 class="header-pretitle">
                      Control
                    </h6>

                    <!-- Title -->
                    <h1 class="header-title">
                      Productos
                    </h1>

                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">

                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link to="/productos" class="nav-link">Todos los productos</router-link>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link active">
                          Nuevo producto
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-7">

              <div class="row justify-content-between align-items-center">
                <div class="col">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <div class="avatar">
                        <img class="avatar-img rounded-circle" :src="str_image" alt="...">
                      </div>
                    </div>
                    <div class="col ms-n2">
                      <h4 class="mb-1">
                        <b>Portada</b>
                      </h4>
                      <small class="text-muted">
                        El archivo debe ser una imagen. Los formatos admitidos son jpg, jpeg, png y webp. La imagen debe pesar menos de 1MB.
                      </small>
                    </div>
                  </div> <!-- / .row -->
                </div>
                <div class="col-auto">
                  <label for="file-upload" class="btn btn-sm btn-primary">
                    Subir
                  </label>
                  <input @change="uploadImage($event)" style="display:none" id="file-upload" type="file" />
                </div>
              </div> <!-- / .row -->

              <!-- Divider -->
              <hr class="my-5">

              <div class="row">
                <div class="col-12 col-md-6">
                  <div class="form-group">
                    <label class="form-label">
                      Título del producto
                    </label>
                    <input v-model="producto.titulo" type="text" class="form-control" placeholder="Título del producto">
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="form-group">
                    <label class="form-label">
                      Marca
                    </label>
                    <select v-model="producto.marca" name="" class="form-select">
                      <option value="" disabled selected>Seleccionar</option>
                      <option v-for="item in marcas" :value="item.titulo">{{ item.titulo }}</option>
                    </select>
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="form-group">
                    <label class="form-label">
                      Categoría
                    </label>
                    <select @change="getSubcategorias($event)" v-model="producto.categoria" name="" class="form-select">
                      <option value="" disabled selected>Seleccionar</option>
                      <option v-for="item in categorias" :value="item.categoria.titulo">{{ item.categoria.titulo }}</option>
                    </select>
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="form-group">
                    <label class="form-label">
                      Subcategoría
                    </label>
                    <select v-model="producto.subcategoria" name="" class="form-select">
                      <option value="" disabled selected>Seleccionar</option>
                      <option v-for="item in subcategorias" :value="item.titulo">{{ item.titulo }}</option>
                    </select>
                  </div>
                </div>

                <div class="col-12 col-md-12">
                  <div class="form-group">
                    <label class="form-label">
                      Descripción
                    </label>
                    <textarea v-model="producto.descripcion" class="form-control" id="" rows="3"
                      placeholder="Descripción"></textarea>
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="form-group">
                    <label class="mb-1">
                      Producto publicado
                    </label>
                    <small class="form-text text-muted">
                      Si el producto es publicado, estará disponible en la tienda.
                    </small>
                    <div class="row">
                      <div class="col-auto">
                        <div class="form-check form-switch">
                          <input v-model="producto.estado" class="form-check-input" type="checkbox" id="switchOne" />
                          <label class="form-check-label" for="switchOne"></label>
                        </div>
                      </div>
                    </div> <!-- / .row -->
                  </div>

                </div>
              </div> <!-- / .row -->

              <!-- Button -->
              <button @click="validar()" class="btn btn-primary">
                Crear producto
              </button>

            </div>
          </div>
        </div> <!-- / .row -->
      </div>
    </div>
  </div>
</template>

<script>

import SideBar from '@/components/SideBar.vue';

import axios from 'axios';

export default {
  name: 'CreateProductoApp',
  data() {
    return {
      str_image: '/assets/img/default.png',
      producto: {
        marca: '',
        categoria: '',
        subcategoria: '',
        estado: false,
        portada: undefined
      },
      marcas: [],
      categorias: [],
      subcategorias: [],
      portada: undefined
    }
  },
  methods: {
    init_marcas() {
      axios.get(this.$url + '/listar_marcas_admin/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token,
        }
      }).then((result) => {
        this.marcas = result.data;
      });
    },
    init_categorias() {
      axios.get(this.$url + '/listar_categorias_admin/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token,
        }
      }).then((result) => {
        this.categorias = result.data;
      });
    },
    getSubcategorias(event){
      for (let item of this.categorias) {
        if (item.categoria.titulo == event.target.value) {
          this.subcategorias = item.subcategorias;
        }
      }
    },
    uploadImage($event) {
      let image;

      if ($event.target.files.length >= 1) {
        image = $event.target.files[0];
      }

      if (image.size <= 1000000) {
        if (image.type == "image/jpg" || image.type == "image/jpeg" || image.type == "image/png" || image.type == "image/webp") {
          this.str_image = URL.createObjectURL(image);
          this.portada = image;
          this.producto.portada = this.portada;
        } else {
          this.$notify({
            title: "ERROR",
            text: "El archivo debe ser una imagen. Los formatos admitidos son jpg, jpeg, png y webp.",
            type: "error"
          });
          this.portada = undefined;
        }
      } else {
        this.$notify({
          title: "ERROR",
          text: "La imagen debe pesar menos de 1MB.",
          type: "error"
        });
        this.portada = undefined;
      }
    },
    validar() {
      if (!this.producto.titulo) {
        this.$notify({
          title: "ERROR",
          text: "Introduzca el título del producto.",
          type: "error"
        });
      } else if (!this.producto.marca) {
        this.$notify({
          title: "ERROR",
          text: "Introduzca la marca del producto.",
          type: "error"
        });
      } else if (!this.producto.categoria) {
        this.$notify({
          title: "ERROR",
          text: "Introduzca la categoría del producto.",
          type: "error"
        });
      } else if (!this.producto.descripcion) {
        this.$notify({
          title: "ERROR",
          text: "Introduzca la descripcion del producto.",
          type: "error"
        });
      } else if (this.producto.portada == undefined) {
        this.$notify({
          title: "ERROR",
          text: "Introduzca la portada del producto.",
          type: "error"
        });
      } else {
        this.registro();
      }
    },
    registro() {
      let fm = new FormData();
      fm.append('titulo', this.producto.titulo);
      fm.append('marca', this.producto.marca);
      fm.append('categoria', this.producto.categoria);
      fm.append('subcategoria', this.producto.subcategoria);
      fm.append('descripcion', this.producto.descripcion);
      fm.append('estado', this.producto.estado);
      fm.append('portada', this.producto.portada);

      axios.post(this.$url + '/registro_producto_admin', fm, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        if (result.data.message) {
          this.$notify({
            title: "ERROR",
            text: result.data.message,
            type: "error"
          });
        } else {
          this.$notify({
            title: "ÉXITO",
            text: "Se registró el producto.",
            type: "success"
          });

          this.$router.push({ name: 'productos-index' });
        }
      })
    }
  },
  beforeMount() {
    this.init_marcas();
    this.init_categorias();
  },
  components: {
    SideBar
  }
}
</script>
