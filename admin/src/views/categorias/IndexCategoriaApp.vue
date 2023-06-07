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
                      Categorías
                    </h1>

                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">

                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <a class="nav-link active">Todas las categorías</a>
                      </li>
                    </ul>

                  </div>
                </div>
              </div>
            </div>

            <div class="row justify-content-between align-items-center">
              <div class="col">
                <div class="row align-items-center">
                  <div class="col-auto">

                    <!-- Avatar -->
                    <div class="avatar">
                      <img class="avatar-img rounded-circle" :src="str_image" alt="...">
                    </div>

                  </div>
                  <div class="col ms-n2">

                    <!-- Heading -->
                    <h4 class="mb-1">
                      <b>Portada</b>
                    </h4>

                    <!-- Text -->
                    <small class="text-muted">
                      Los formatos admitidos son jpg, jpeg, png y webp. La imagen debe pesar menos de 1MB.
                    </small>

                  </div>
                </div> <!-- / .row -->
              </div>
              <div class="col-auto">

                <!-- Button -->

                <label for="file-upload" class="btn btn-sm btn-primary">
                  Subir
                </label>
                <input @change="uploadImage($event)" style="display:none" id="file-upload" type="file" />

              </div>
            </div> <!-- / .row -->
            <div class="row mb-3">
              <div class="col-12 mt-3">
                <div class="input-group mb-3">
                  <input v-model="nueva_categoria.titulo" type="text" class="form-control" placeholder="Nueva categoría">
                  <button @click="crear_categoria()" class="btn btn-primary">Crear categoría</button>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <div v-if="load_data" class="d-flex justify-content-center align-items-center">
                  <div class="spinner-border mt-5 mb-5" role="status">
                    <span class="visually-hidden">Cargando...</span>
                  </div>
                </div>
                <ul v-if="!load_data" class="list-group list-group-flush list my-n3">
                  <li v-for="item in categorias" class="list-group-item" style="padding-bottom: 0px;">
                    <div class="row align-items-center">

                      <div class="col-auto">
                        <div class="image-container">
                          <a class="avatar">
                            <input @change="validar_actualizar_portada($event, item.categoria)" style="display:none"
                              :id="'file-update-' + item.categoria._id" type="file" />
                            <img :src="$url + '/obtener_portada_categoria/' + item.categoria.portada" alt="..."
                              class="avatar-img rounded-circle" style="cursor: pointer;">
                            <div @click="selectFile(item.categoria._id)" class="overlay">
                              <i class="fe fe-upload text-white"></i>
                            </div>

                          </a>
                        </div>
                      </div>

                      <div class="col ms-n2">
                        <h4 class="mb-1 name">
                          <p><span @blur="actualizar_titulo(item.categoria)" :id="'titulo-' + item.categoria._id"
                              class="px-2" autocorrect="off">{{ item.categoria.titulo }}</span> ({{ item.nproductos }}
                            productos) <i @click="editar_titulo(item.categoria._id)" class="fe fe-edit-2"></i></p>
                        </h4>
                        <p v-if="item.categoria.estado" class="small mb-0">
                          <span class="text-success">●</span> Publicado
                        </p>
                        <p v-if="!item.categoria.estado" class="small mb-0">
                          <span class="text-danger">●</span> Oculto
                        </p>
                      </div>

                      <div class="col-auto">
                        <label class="mb-1">
                          Categoría publicada
                        </label>
                        <div class="form-check form-switch d-flex justify-content-end">
                          <input @click="cambiar_estado(item.categoria._id, item.categoria.estado)"
                            v-model="item.categoria.estado" class="form-check-input" type="checkbox" id="switchOne" />
                          <label class="form-check-label" for="switchOne"></label>
                        </div>
                      </div>
                    </div>
                    <!-- / .row -->
                    <div class="row mb-3">
                      <div class="col-12 collapsible mt-3">
                        <div class="d-flex justify-content-between align-items-start">
                          <div>
                            <p style="width: fit-content; cursor:pointer">Mostrar subcategorias <i
                                class="fe fe-chevron-down"></i></p>
                          </div>
                          <!-- Sin implementar
                          <div>
                            <a @click="eliminar_subcategoria(subitem._id)" class="btn btn-sm btn-danger text-white">
                              Eliminar
                            </a>
                          </div> -->
                        </div>
                        <div class="content">
                          <div :id="'content-' + item.categoria._id" class="input-group mt-3 content-group mt-3">
                            <input v-model="subcategorias[item.categoria._id]" type="text" class="form-control"
                              placeholder="Nueva subcategoría">
                            <button @click="crear_subcategoria(item, item.categoria._id)" class="btn btn-primary">Crear
                              subcategoría</button>
                          </div>
                          <ul class="list-group mt-3">
                            <li v-for="subitem in item.subcategorias"
                              class="list-group-item d-flex justify-content-between align-items-center"
                              style="font-size: .8rem;padding: 0.5rem 1.5rem;">
                              {{ subitem.titulo }}
                              <a @click="eliminar_subcategoria(subitem._id)" class="btn btn-sm btn-danger text-white">
                                Eliminar
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> <!-- / .row -->
      </div>
    </div>
  </div>
</template>

<style>
.image-container {
  position: relative;
  display: inline-block;
  width: fit-content;
  height: fit-content;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ;
  border-radius: 50%;
}

.image-container:hover .overlay {
  opacity: 1;
}

.collapsible {
  width: 100%;
}

.collapsible>p {
  cursor: pointer;
  margin-bottom: 0;
}

.content {
  display: none;
  overflow: hidden;
}

.fe-edit-2 {
  cursor: pointer;
}
</style>

<script>

import SideBar from '@/components/SideBar.vue';

import axios from 'axios';

export default {
  name: 'IndexCategoriaApp',
  data() {
    return {
      str_image: '/assets/img/default.png',
      portada: undefined,
      nueva_categoria: {
        titulo: '',
        portada: undefined
      },
      subcategorias: {},
      nueva_subcategoria: '',
      id_categoria: '',
      categorias: [],
      load_data: false
    }
  },
  methods: {
    init_data() {
      this.load_data = true;
      axios.get(this.$url + '/listar_categorias_admin/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token,
        }
      }).then((result) => {
        this.categorias = result.data;
        console.log(this.categorias);
        this.load_data = false;
      });
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
          this.nueva_categoria.portada = this.portada;
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
    crear_categoria() {
      if (!this.nueva_categoria.titulo) {
        this.$notify({
          title: "ERROR",
          text: "Ingrese el nombre de la categoría.",
          type: "error"
        });
      } else if (!this.nueva_categoria.portada) {
        this.$notify({
          title: "ERROR",
          text: "Ingrese la portada de la categoría.",
          type: "error"
        });
      } else {
        let fm = new FormData();
        fm.append('titulo', this.nueva_categoria.titulo);
        fm.append('portada', this.nueva_categoria.portada);

        axios.post(this.$url + '/crear_categoria_admin', fm, {
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
              text: "Se registró la categoría.",
              type: "success"
            });

            this.nueva_categoria = {};
            this.init_data();
            this.portada = undefined;
          }
        })
      }
    },
    crear_subcategoria(item, id_categoria) {
      this.nueva_subcategoria = this.subcategorias[item.categoria._id];
      this.id_categoria = id_categoria;
      if (this.nueva_subcategoria) {
        axios.post(this.$url + '/crear_subcategoria_admin/',
          {
            titulo: this.nueva_subcategoria, categoria: this.id_categoria
          }
          , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': this.$store.state.token,
            }
          }).then((result) => {
            if (result.data.message) {
              this.$notify({
                title: "ERROR",
                text: result.data.message,
                type: "error"
              });
            } else {
              this.nueva_subcategoria = '';
              this.init_data();
              this.$notify({
                title: "ÉXITO",
                text: "Se registró la subcategoría.",
                type: "success"
              });
              this.subcategorias[item.categoria._id] = '';
            }
          });
      } else {
        this.$notify({
          title: "ERROR",
          text: "Ingrese el nombre de la subcategoría.",
          type: "error"
        });
      }
    },
    eliminar_subcategoria(id) {
      axios.delete(this.$url + '/eliminar_subcategoria_admin/' + id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token,
        }
      }).then((result) => {
        this.init_data();
        this.$notify({
          title: "ÉXITO",
          text: "Se registró la subcategoría.",
          type: "success"
        });
      });
    },
    cambiar_estado(id, estado) {
      axios.put(this.$url + '/cambiar_estado_categoria_admin/' + id, { estado: estado }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token,
        }
      }).then((result) => {
        if (result.data.message) {
          this.$notify({
            title: "ERROR",
            text: result.data.message,
            type: "error"
          });
        } else {
          this.init_data();
          this.$notify({
            title: "ÉXITO",
            text: "Se cambió el estado de la categoría.",
            type: "success"
          });
        }
      });
    },
    selectFile(id) {
      document.getElementById('file-update-' + id).click();
    },
    validar_actualizar_portada($event, categoria) {
      if ($event.target.files.length == 1) {
        let image = $event.target.files[0];

        if (image.size <= 1000000) {
          if (image.type == "image/jpg" || image.type == "image/jpeg" || image.type == "image/png" || image.type == "image/webp") {
            // Si está todo bien
            let fm = new FormData();
            fm.append('id', categoria._id);
            fm.append('portada', image);

            axios.post(this.$url + '/actualizar_portada_categoria_admin', fm, {
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
                  text: "Se actualizó la portada correctamente.",
                  type: "success"
                });

                this.init_data();
              }
            })
          } else {
            this.$notify({
              title: "ERROR",
              text: "El archivo debe ser una imagen. Los formatos admitidos son jpg, jpeg, png y webp.",
              type: "error"
            });
          }
        } else {
          this.$notify({
            title: "ERROR",
            text: "La imagen debe pesar menos de 1MB.",
            type: "error"
          });
        }
      }
    },
    editar_titulo(id) {
      let titulo = document.querySelector('#titulo-' + id);
      titulo.contentEditable = true;
      titulo.focus();

      var range = document.createRange();
      var sel = window.getSelection();
      range.selectNodeContents(titulo);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);

    },
    actualizar_titulo(categoria) {
      let titulo = document.querySelector('#titulo-' + categoria._id);
      titulo.contentEditable = false;

      if (titulo.innerText != categoria.titulo && titulo.innerText != '') {
        axios.post(this.$url + '/actualizar_titulo_categoria_admin/',
          {
            id: categoria._id, titulo: titulo.innerText
          }
          , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': this.$store.state.token,
            }
          }).then((result) => {
            if (result.data.message) {
              this.$notify({
                title: "ERROR",
                text: result.data.message,
                type: "error"
              });
            } else {
              this.init_data();
              this.desplegarSubcategorias();
              this.$notify({
                title: "ÉXITO",
                text: "Se actualizó el título correctamente.",
                type: "success"
              });
            }
          });
      } else {
        this.$notify({
          title: "ERROR",
          text: "Ingrese el nombre del título.",
          type: "error"
        });
        titulo.innerText = categoria.titulo;
      }
    },
    desplegarSubcategorias() {
      let collapsibles = document.getElementsByClassName("collapsible");
      setTimeout(() => {
        for (let i = 0; i < collapsibles.length; i++) {
          let p = collapsibles[i].querySelector("p");
          p.addEventListener("click", function (event) {
            event.stopPropagation(); // Detiene la propagación del evento

            let content = this.parentNode.parentNode.parentNode.querySelector(".content");
            this.parentNode.classList.toggle("active");
            if (content.style.display === "block") {
              content.style.display = "none";
            } else {
              content.style.display = "block";
            }
          });
        }
      }, 500)
    }
  },
  beforeMount() {
    this.init_data();
  },
  mounted() {
    this.desplegarSubcategorias();
  },
  components: {
    SideBar
  }
}
</script>

<style>
.hide-input {
  display: none;
}
</style>
