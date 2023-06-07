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
                          Galería de producto
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <template v-if="load_data">
              <div>
                <div class="row">
                  <div class="col-12 text-center">
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-if="!load_data">
              <div>
                <div v-if="data" class="mb-7">
                  <div class="row">
                    <div class="col-12 col-md-12">

                      <!-- Email address -->
                      <div class="form-group">

                        <!-- Label -->
                        <label class="mb-1">
                          Imagen
                        </label>

                        <!-- Input -->
                        <div class="input-group mb-3">
                          <input @change="uploadImage($event)" id="input_file" type="file" class="form-control"
                            placeholder="Selecciona la imagen">
                          <button @click="subir_imagen()" class="btn btn-primary">
                            <i class="fe fe-upload"></i>
                          </button>
                        </div>
                        <!-- Form text -->
                        <small class="form-text text-muted">
                          Suba un máximo de 5 imágenes para la galería del producto.
                        </small>
                      </div>
                    </div>
                  </div> <!-- / .row -->
                  <div v-if="!load_galeria" class="row listAlias">
                    <div v-for="item in galeria" class="col-12 col-md-6 col-xl-4">
                      <div class="card">
                        <a>
                          <img :src="$url + '/obtener_galeria_producto/' + item.imagen" alt="..." class="card-img-top">
                        </a>
                        <div class="card-footer card-footer-boxed">
                          <div class="row">
                            <div @click="eliminar(item._id)" class="col text-center" style="cursor: pointer;">
                              <a class="text-danger">Eliminar imagen</a>
                            </div>
                          </div> <!-- / .row -->
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="load_galeria" class="row">
                    <div class="col-12 text-center">
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Cargando...</span>
                      </div>
                    </div>
                  </div>

                </div>

                <template v-if="!data">
                  <div>
                    <ErrorNotFound />
                  </div>
                </template>
              </div>
            </template>

          </div>
        </div> <!-- / .row -->
      </div>

    </div>
  </div>
</template>

<script>

import SideBar from '@/components/SideBar.vue';
import ErrorNotFound from '@/components/ErrorNotFound.vue';

import axios from 'axios';

export default {
  name: 'GaleriaProductoApp',
  data() {
    return {
      imagen: undefined,
      str_image: '',
      data: false,
      load_data: true,
      load_galeria: true,
      galeria: []
    }
  },
  methods: {
    init_data() {
      this.load_data = true;
      axios.get(this.$url + '/obtener_producto_admin/' + this.$route.params.id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        if (result.data == '') {
          this.data = false;
        } else {
          this.data = true;
        }
        this.load_data = false;
      })
    },
    uploadImage($event) {
      let image;

      if ($event.target.files.length >= 1) {
        image = $event.target.files[0];
      }

      if (image.size <= 1000000) {
        if (image.type == "image/jpg" || image.type == "image/jpeg" || image.type == "image/png" || image.type == "image/webp") {
          this.str_image = URL.createObjectURL(image);
          this.imagen = image;
        } else {
          this.$notify({
            title: "ERROR",
            text: "El archivo debe ser una imagen. Los formatos admitidos son jpg, jpeg, png y webp.",
            type: "error"
          });
          this.imagen = undefined;
          document.getElementById('input_file').value = '';
        }
      } else {
        this.$notify({
          title: "ERROR",
          text: "La imagen debe pesar menos de 1MB.",
          type: "error"
        });
        this.imagen = undefined;
        document.getElementById('input_file').value = '';
      }
    },
    subir_imagen() {
      if (this.imagen == undefined) {
        this.$notify({
          title: "ERROR",
          text: "Seleccione una imagen para subir.",
          type: "error"
        });
      } else {
        let fm = new FormData();
        fm.append('producto', this.$route.params.id);
        fm.append('imagen', this.imagen);

        axios.post(this.$url + '/subir_imagen_producto', fm, {
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
              text: "Se subió la imagen.",
              type: "success"
            });
            this.init_galeria();
          }
        })
      }
    },
    init_galeria() {
      this.load_galeria = true;
      axios.get(this.$url + '/obtener_galeria_producto_admin/' + this.$route.params.id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        this.galeria = result.data;
        this.load_galeria = false;
      })
    },
    eliminar(id) {
      axios.delete(this.$url + '/eliminar_galeria_producto_admin/' + id, {
        headers: {
          'Content-Type': 'application/json',
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
            text: "Se eliminó la imagen.",
            type: "success"
          });
          this.init_galeria();
        }
      })
    }
  },
  beforeMount() {
    this.init_data();
    this.init_galeria();
  },
  components: {
    SideBar,
    ErrorNotFound
  }
}
</script>
