<template>
  <div class="home">
    <section>
      <div class="container-fluid">
        <div class="row">
          <div id="carousel" class="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active" :style="{
                background: `center center url(${require('../../public/assets/media/7511accc-ba2f-430b-8f6e-e1bcec90a756_END_SS23_BANNER_MEN_2400x1350px.avif')}) no-repeat`,
                backgroundSize: 'cover'
              }">
                <p class="carousel-title">Kenzo</p>
                <router-link :to="{ name: 'shop', query: { marca: 'Kenzo' } }"
                  class="col-2 btn btn-outline-light mx-1 mb-1 ver-mas">Ver más </router-link>
              </div>
              <div class="carousel-item" :style="{
                background: `center center url(${require('../../public/assets/media/4e748601-465b-4a09-8509-795b8863b5e8_24-06-22_Casablanca_BrandPage_2400x1350+.avif')}) no-repeat`,
                backgroundSize: 'cover'
              }">
                <p class=" carousel-title">Casablanca</p>
                <router-link :to="{ name: 'shop', query: { marca: 'Casablanca' } }"
                  class="col-2 btn btn-outline-light mx-1 mb-1 ver-mas">Ver más </router-link>
              </div>
              <div class="carousel-item" :style="{
                background: `center center url(${require('../../public/assets/media/LOEWE_SS23_PIXEL_RGB_CROPPED_2250X3000_3.jpg')}) no-repeat`,
                backgroundSize: 'cover'
              }">
                <p class="carousel-title">Loewe</p>
                <router-link :to="{ name: 'shop', query: { marca: 'Loewe' } }"
                  class="col-2 btn btn-outline-light mx-1 mb-1 ver-mas">Ver más </router-link>
              </div>
              <div class="legend">
                <div class="legend-item active"></div>
                <div class="legend-item"></div>
                <div class="legend-item"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-6 pb-5">
      <div class="container">
        <div class="row">
          <div class="mx-auto mb-2">
            <h2 class="text-uppercase text-center nuevos-productos-title mb-4" style="font-size: 1.57143rem;">Nuevos
              productos</h2>
          </div>
        </div>
        <div v-if="load_nuevos_productos" class="row">
          <div class="col-12 text-center">
            <div class="spinner-border mt-5 mb-5" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
        <div v-if="!load_nuevos_productos" class="row">
          <!-- product-->
          <div v-for="(item, index) in nuevos_productos" :id="'nuevo-producto-' + index"
            class="nuevos-productos col-6 col-md-4 col-lg-3">
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
                    item.producto.titulo }}</router-link>
                </h3>
                <p class="text-muted text-sm mb-1">{{ item.producto.marca }}</p>
                <span class="text-muted">{{ convertCurrency(item.producto.precio) }}</span>
              </div>
            </div>
          </div>

          <!-- /product-->
        </div>
      </div>
    </section>
    <section class="py-6 bg-gray-100">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 mx-auto text-center mb-5">
            <h2>Descubrir más</h2>
            <p class="lead text-muted">Explora nuestras diferentes categorías y descubre las últimas tendencias de moda.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 d-flex align-items-md-stretch mb-4 mb-md-0">
            <div class="d-flex align-items-center text-white dark-overlay w-100 text-center py-6 py-md-0" :style="{
              background: `center center url(${require('../../public/assets/media/7486c2b2-50b9-48ac-a70f-61ca3e8c1d3b_25-05-23_RickowensXChampion_1200x1200.avif')}) no-repeat`,
              backgroundSize: 'cover',
              minHeight: '369px'
            }
              ">
              <router-link :to="{ name: 'shop', query: { categoria: 'Sudaderas' } }" class="tile-link"></router-link>
              <div class="card-img-overlay w-100 overlay-content">
                <h2 class="display-2 fw-bold text-uppercase mb-0 categoria-grande"
                  style="text-shadow: 0 0.25em 0.25em rgba(0, 0, 0, 0.25);">Sudaderas</h2>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-0 text-white text-center mb-4 dark-overlay"> <img class="card-img"
                :src="`${require('../../public/assets/media/0774330427_6_1_1.jpg')}`" alt="Pantalones"><router-link
                :to="{ name: 'shop', query: { categoria: 'Pantalones' } }" class="tile-link"></router-link>
              <div class="card-img-overlay d-flex align-items-center">
                <div class="text-center w-100 overlay-content">
                  <h2 class="display-4 fw-bold text-uppercase text-center mb-0 categoria-pequena">Pantalones</h2>
                </div>
              </div>
            </div>
            <div class="card border-0 text-white text-center dark-overlay">
              <img class="card-img" :src="`${require('../../public/assets/media/308-97.webp')}`" alt="Accesorios">
              <router-link :to="{ name: 'shop', query: { categoria: 'Accesorios' } }" class="tile-link"></router-link>
              <div class="card-img-overlay d-flex align-items-center">
                <div class="text-center w-100 overlay-content">
                  <h2 class="display-4 fw-bold text-uppercase text-center mb-0 categoria-pequena">Accesorios</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-6 pb-5">
      <div class="container">
        <div class="row">
          <div class="mx-auto mb-2">
            <h2 class="text-uppercase text-center productos-recomendados-title mb-4" style="font-size: 1.57143rem;">
              Productos recomendados</h2>
          </div>
          <!-- Products Slider-->
          <carousel :perPageCustom="[[0, 1], [576, 2], [992, 3], [1200, 4]]">
            <Slide v-for=" item  in  productos_recomendados ">
              <!-- product-->
              <div class="product-slider-item" v-if="item">
                <div class="product">
                  <router-link :to="{ name: 'show-producto', params: { slug: item.producto.slug } }"
                    class="product-hover-overlay-link">
                    <div class="product-image" style="border: none;">
                      <div class="image-wrapper">
                        <img class="img-fluid first-image"
                          :src="$url + '/obtener_portada_producto/' + item.producto.portada" alt="product" />
                        <img class="img-fluid second-image"
                          :src="$url + '/obtener_galeria_producto/' + item.segundaFoto.imagen" alt="product" />
                      </div>
                    </div>
                  </router-link>
                  <div class="py-2">
                    <h3 class="h6 text-uppercase mb-1">
                      <router-link :to="{ name: 'show-producto', params: { slug: item.producto.slug } }" class="text-dark">{{
                        item.producto.titulo }}</router-link>
                    </h3>
                    <p class="text-muted text-sm mb-1">{{ item.producto.marca }}</p>
                    <span class="text-muted">{{ convertCurrency(item.producto.precio) }}</span>
                  </div>
                </div>
              </div>
            </Slide>
          </Carousel>
        </div>
      </div>
    </section>
    <FooterBanner />
  </div>
</template>

<script>

import FooterBanner from '@/components/FooterBanner.vue';

import axios from 'axios';
import currency_formatter from 'currency-formatter';
import { init_carousel } from '../../public/assets/js/theme.d7b4a888';
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'HomeView',
  data() {
    return {
      nuevos_productos: [],
      load_nuevos_productos: true,

      productos_recomendados: [],
      load_productos_recomendados: true
    }
  },
  methods: {
    init_nuevos_productos() {
      this.load_nuevos_productos = true;
      axios.get(this.$url + '/obtener_nuevos_productos', {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(result => {
        this.nuevos_productos = result.data;
        this.load_nuevos_productos = false;
      })
    },
    init_productos_recomendados() {
      this.load_productos_recomendados = true;
      axios.get(this.$url + '/obtener_productos_recomendados', {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(result => {
        this.productos_recomendados = result.data;
        this.load_productos_recomendados = false;
      })
    },
    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'EUR' });
    },
    startCarousel() {
      let header = document.querySelector('.header');
      let headerHeight = header.offsetHeight;
      document.querySelector('.carousel').style.height = `calc(100vh - ${headerHeight}px)`;

      const carouselItems = document.querySelectorAll('.carousel-item');
      const legendItems = document.querySelectorAll('.legend-item');
      const intervalTime = 5000; // 5 segundos
      let activeIndex = 0;

      function updateLegend() {
        legendItems.forEach((item, index) => {
          if (index === activeIndex) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }

      function goToSlide(index) {
        carouselItems[activeIndex].classList.remove('active');
        legendItems[activeIndex].classList.remove('active');
        activeIndex = index;
        carouselItems[activeIndex].classList.add('active');
        legendItems[activeIndex].classList.add('active');
      }

      setInterval(() => {
        goToSlide((activeIndex + 1) % carouselItems.length);
      }, intervalTime);

      legendItems.forEach((item, index) => {
        item.addEventListener('click', () => {
          goToSlide(index);
        });
      });
    }

  },
  beforeMount() {
    this.init_nuevos_productos();
    this.init_productos_recomendados();
    init_carousel.init();
  },
  mounted() {
    this.startCarousel();
  },
  components: {
    Carousel,
    Slide,
    FooterBanner
  }
}
</script>
<style>
.product-image {
  height: 320px !important;
}

.img-fluid {
  height: 100%;
  object-fit: contain;
  object-position: center center;
}

.product-slider-item {
  margin: 0 20px;
}
</style>
<style scoped>
@media (min-width: 576px) {

  #nuevo-producto-4,
  #nuevo-producto-5,
  #nuevo-producto-6,
  #nuevo-producto-7,
  #nuevo-producto-8,
  #nuevo-producto-9,
  #nuevo-producto-10 {
    display: none;
  }
}

@media (min-width: 768px) {

  #nuevo-producto-4,
  #nuevo-producto-5 {
    display: block;
  }
}

@media (min-width: 992px) {

  #nuevo-producto-6,
  #nuevo-producto-7 {
    display: block;
  }

  .nuevos-productos-title {
    text-align: left !important;
  }

  .productos-recomendados-title {
    text-align: left !important;
  }
}

@media (min-width: 1200px) {

  #nuevo-producto-8,
  #nuevo-producto-9 {
    display: block;
  }

  .nuevos-productos {
    width: 20%;
  }
}


.carousel {
  position: relative;
  height: calc(100vh - 60px);
  overflow: hidden;
  padding: 0;
}

.carousel-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.carousel-item.active {
  opacity: 1;
}

.carousel-title {
  position: absolute;
  top: 75%;
  left: 10%;
  font-size: 2.5rem;
  letter-spacing: 0.157143rem;
  font-weight: 600;
  line-height: 30px;
  text-transform: uppercase;
  color: white;
}

@media (max-width: 480px) {
  .carousel-title {
    top: 60%;
  }

  .ver-mas {
    left: 10%;
  }
}

.ver-mas {
  position: absolute;
  top: 80%;
  right: 10%;
  z-index: 1;
  min-width: fit-content;
}

.legend {
  position: absolute;
  top: 85%;
  left: 10%;
  z-index: 1;
  display: flex;
  justify-content: center;
}

@media (max-width: 480px) {
  .legend {
    top: 70%;
  }
}

.legend-item {
  width: 70px;
  height: 3px;
  background-color: #ccc;
  margin: 0 5px;
  cursor: pointer;
}

.legend-item.active {
  background-color: #fff;
  /* Color de resaltado para el activo */
}

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

.categoria-grande {
  font-size: 2.5rem;
}

@media (min-width: 768px) {
  .categoria-grande {
    font-size: 2.5rem;
  }

  .categoria-pequena {
    font-size: 2.5rem;
  }
}

@media (min-width: 992px) {
  .categoria-grande {
    font-size: 3.5rem;
  }

  .categoria-pequena {
    font-size: 3.5rem;
  }
}

@media (min-width: 1200px) {
  .categoria-grande {
    font-size: 4.5rem;
  }
}
</style>
