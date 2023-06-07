<template>
  <div>
    <section class="product-details">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 pt-4">
            <div class="row">
              <div class="d-none d-md-block col-md-2 pe-0">
                <div class="owl-thumbs" data-slider-id="1">
                  <button v-if="galeria[0]" class="owl-thumb-item detail-thumb-item mb-3">
                    <img class="img-fluid" :src="$url + '/obtener_galeria_producto/' + galeria[0].imagen"
                      alt="Modern Jacket 0">
                  </button>
                  <button v-if="galeria[1]" class="owl-thumb-item detail-thumb-item mb-3">
                    <img class="img-fluid" :src="$url + '/obtener_galeria_producto/' + galeria[1].imagen"
                      alt="Modern Jacket 0">
                  </button>
                  <button v-if="galeria[2]" class="owl-thumb-item detail-thumb-item mb-3">
                    <img class="img-fluid" :src="$url + '/obtener_galeria_producto/' + galeria[2].imagen"
                      alt="Modern Jacket 0">
                  </button>
                  <button v-if="galeria[3]" class="owl-thumb-item detail-thumb-item mb-3">
                    <img class="img-fluid" :src="$url + '/obtener_galeria_producto/' + galeria[3].imagen"
                      alt="Modern Jacket 0">
                  </button>
                  <button v-if="galeria[4]" class="owl-thumb-item detail-thumb-item mb-3">
                    <img class="img-fluid" :src="$url + '/obtener_galeria_producto/' + galeria[4].imagen"
                      alt="Modern Jacket 0">
                  </button>
                </div>
              </div>
              <div class="col-12 col-md-10 detail-carousel">
                <div class="owl-carousel detail-slider owl-theme owl-dots-modern" data-slider-id="1">
                  <div v-if="galeria[0]" class="item">
                    <a class="glightbox" :href="$url + '/obtener_galeria_producto/' + galeria[0].imagen"
                      data-gallery="product-gallery">
                      <img class="img-fluid" :src="$url + '/obtener_galeria_producto/' + galeria[0].imagen"
                        alt="Modern Jacket 1">
                    </a>
                  </div>
                  <div v-if="galeria[1]" class="item">
                    <a class="glightbox" :href="$url + '/obtener_galeria_producto/' + galeria[1].imagen"
                      data-gallery="product-gallery">
                      <img class="img-fluid" :src="$url + '/obtener_galeria_producto/' + galeria[1].imagen"
                        alt="Modern Jacket 1">
                    </a>
                  </div>
                  <div v-if="galeria[2]" class="item">
                    <a class="glightbox" :href="$url + '/obtener_galeria_producto/' + galeria[2].imagen"
                      data-gallery="product-gallery">
                      <img class="img-fluid" :src="$url + '/obtener_galeria_producto/' + galeria[2].imagen"
                        alt="Modern Jacket 1">
                    </a>
                  </div>
                  <div v-if="galeria[3]" class="item">
                    <a class="glightbox" :href="$url + '/obtener_galeria_producto/' + galeria[3].imagen"
                      data-gallery="product-gallery">
                      <img class="img-fluid" :src="$url + '/obtener_galeria_producto/' + galeria[3].imagen"
                        alt="Modern Jacket 1">
                    </a>
                  </div>
                  <div v-if="galeria[4]" class="item">
                    <a class="glightbox" :href="$url + '/obtener_galeria_producto/' + galeria[4].imagen"
                      data-gallery="product-gallery">
                      <img class="img-fluid" :src="$url + '/obtener_galeria_producto/' + galeria[4].imagen"
                        alt="Modern Jacket 1">
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 ps-lg-4">
            <ul class="breadcrumb undefined">
              <li class="breadcrumb-item">
                <router-link to="/shop">Tienda</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'shop', query: { marca: producto.marca } }"
                  style="text-decoration: none; cursor: pointer;">{{ producto.marca }}</router-link>
              </li>
            </ul>
            <h4 class="mb-4 text-center text-uppercase">{{ producto.titulo }}</h4>
            <div class="d-flex flex-column flex-sm-row align-items-center justify-content-center mb-4">
              <ul class="list-inline mb-2 mb-sm-0">
                <li class="list-inline-item h4 fw-light mb-0">{{ convertCurrency(producto.precio) }}</li>
              </ul>
            </div>
            <div class="row" style="margin-top: 6rem;">
              <div class="col-12 detail-option mb-5">
                <h6 class="detail-option-heading">{{ producto.variedad }}</h6>
                <div class="d-flex align-items-center justify-content-center">
                  <label @click="getVariedad(item._id)" v-for="item in variedades" :id="'variedad_' + item._id"
                    class="w-100 btn btn-sm btn-outline-secondary detail-option-btn-label d-flex justify-content-center align-items-center"
                    style="height: 40px; max-width: 200px;" :for="'variedad_' + item._id"> {{
                      item.variedad }}
                    <input class="input-invisible" type="radio" name="size" :value="item._id" :id="'variedad_' + item._id"
                      required>
                  </label>
                </div>
              </div>
            </div>
            <ul class="list-inline d-flex justify-content-center align-items-center">
              <li class="list-inline-item">
                <button @click="add_cart()" class="btn btn-dark btn-lg" style="padding: 0.75rem 3rem;"
                  type="button">Añadir a la cesta</button>
              </li>
            </ul>
            <ul class="nav nav-tabs flex-column flex-sm-row pt-4" role="tablist">
              <li class="nav-item"><a class="nav-link detail-nav-link active" data-bs-toggle="tab" href="#description"
                  role="tab">Descripción</a></li>
            </ul>
            <div class="tab-content py-4">
              <div class="tab-pane active px-3" id="description" role="tabpanel">
                <p class="text-muted">{{ producto.descripcion }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="my-5">
      <div class="container">
        <header class="text-center">
          <h6 class="text-uppercase mb-5">También te puede gustar</h6>
        </header>
        <div class="row">
          <!-- product-->
          <div v-for="item in productos_relacionados" class="col-lg-3 col-6">
            <div class="product">
              <router-link :to="{ name: 'show-producto', params: { slug: item.producto.slug } }"
                class="product-hover-overlay-link">
                <div class="product-image" style="border: none;">
                  <div class="image-wrapper">
                    <img class="img-fluid first-image" :src="$url + '/obtener_portada_producto/' + item.producto.portada"
                      alt="product" />
                    <img class="img-fluid second-image"
                      :src="$url + '/obtener_galeria_producto/' + item.segundaFoto.imagen" alt="product" />
                  </div>
                </div>
              </router-link>
              <div class="py-2">
                <h3 class="h6 text-uppercase mb-1">
                  <router-link :to="{ name: 'show-producto', params: { slug: item.producto.slug } }" class="text-dark">{{
                    item.titulo
                  }}</router-link>
                </h3>
                <p class="text-muted text-sm mb-1">{{ item.producto.marca }}</p>
                <span class="text-muted">{{ convertCurrency(item.producto.precio) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <FooterBanner />
  </div>
</template>

<style>
.first-image {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: opacity 0.3s ease;
}

.second-image {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-image:hover .first-image {
  opacity: 0;
}

.product-image:hover .second-image {
  opacity: 1;
}
</style>

<script>

import FooterBanner from '@/components/FooterBanner.vue';

import axios from 'axios';
import currency_formatter from 'currency-formatter';
import { init_carousel } from '../../../public/assets/js/theme.d7b4a888.js';

export default {
  name: 'ShowProductoApp',
  components: {
    FooterBanner
  },
  data() {
    return {
      producto: {},
      galeria: [],
      variedades: [],
      productos_relacionados: [],
      obj_carrito: {
        cantidad: 1
      },
      user_data: '',
      msg_error: ''
    }
  },
  methods: {
    init_data() {
      axios.get(this.$url + '/obtener_producto_slug_public/' + this.$route.params.slug, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(result => {
        this.producto = result.data.producto;
        this.galeria = result.data.galeria;
        this.variedades = result.data.variedades;
        this.init_productos_relacionados(this.producto.categoria);
        this.obj_carrito.producto = this.producto._id;
      });
    },
    init_productos_relacionados(categoria) {
      axios.get(this.$url + '/obtener_producto_categoria_public/' + categoria + '/' + this.producto._id, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(result => {
        this.productos_relacionados = result.data;
      });
    },
    getVariedad(value) {
      this.obj_carrito.variedad = value;
      Array.from(document.getElementsByClassName('detail-option-btn-label')).map(element => element.classList.remove('active'));
      document.getElementById('variedad_' + value).classList.add('active');
    },
    add_cart() {
      if (this.$store.state.user) {
        this.user_data = JSON.parse(this.$store.state.user);
        this.obj_carrito.cliente = this.user_data._id;

        if (!this.obj_carrito.variedad) {
          this.$notify({
            title: "ERROR",
            text: "Seleccione la talla.",
            type: "error"
          });
        } else if (!this.obj_carrito.cantidad) {
          this.$notify({
            title: "ERROR",
            text: "Ingrese la cantidad.",
            type: "error"
          });
        } else if (this.obj_carrito.cantidad <= 0 || this.obj_carrito.cantidad > this.producto.stock) {
          this.$notify({
            title: "ERROR",
            text: "Ingrese una cantidad válida.",
            type: "error"
          });
        } else {
          this.msg_error = '';
          axios.post(this.$url + '/crear_producto_carrito', this.obj_carrito, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': this.$store.state.token
            }
          }).then(result => {
            this.$socket.emit('send_cart', true);
          });
        }
      } else {
        this.$notify({
          title: "ERROR",
          text: "Por favor, inicie sesión para poder agregar al carrito.",
          type: "error"
        });
      }
    },
    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'EUR' });
    }
  },
  beforeMount() {
    init_carousel.init_galeria();
    this.init_data();
    init_carousel.init_zoom();
  },
  watch: {
    '$route.params.slug': {
      immediate: true,
      handler(newSlug) {
        init_carousel.init_galeria();
        this.init_data();
        init_carousel.init_zoom();
      },
    },
  },
}

</script>
