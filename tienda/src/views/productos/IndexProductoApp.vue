<template>
  <div>
    <section class="hero">
      <div class="col-12" style="border-bottom: 1px solid rgb(242, 242, 242);">
        <!-- Hero Content-->
        <div class="hero-content text-center my-4">
          <h4 class="hero-heading">Productos</h4>
        </div>
      </div>
    </section>
    <div class="container my-4">
      <div class="row">
        <!-- Grid -->
        <div class="products-grid col-xl-9 col-lg-8 order-lg-2">
          <header class="product-grid-header">
            <div class="me-3 mb-3">
              Mostrando
              <strong>
                <span v-if="productos.length === 0">0-0</span>
                <span v-else>
                  {{ (currentPage - 1) * perPage + 1 }}-
                  <template v-if="(currentPage * perPage) <= productos.length">
                    {{ currentPage * perPage }}
                  </template>
                  <template v-else>
                    {{ productos.length }}
                  </template>
                </span>
              </strong>
              de <strong>{{ productos.length }}</strong> productos
            </div>
            <div class="me-3 mb-3">
              <span class="me-2">Por página</span>
              <a @click="setPerPage(12)" class="product-grid-header-show" v-bind:class="{ 'active': perPage == 12 }"
                style="cursor: pointer;">12</a>
              <a @click="setPerPage(24)" class="product-grid-header-show" v-bind:class="{ 'active': perPage == 24 }"
                style="cursor: pointer;">24</a>
            </div>
            <div class="mb-3 d-flex align-items-center"><span class="d-inline-block me-2">Ordenar por</span>
              <select @change="setSortBy()" v-model="sort_by" class="form-select w-auto border-0">
                <option value="Defecto" selected>Por defecto</option>
                <option value="Precio-Mm">Precio: Mayor a menor</option>
                <option value="Precio-mM">Precio: Menor a mayor</option>
              </select>
            </div>
          </header>
          <div id="my-table" class="row">
            <!-- product-->
            <div v-for="item in itemsForList" class="col-xl-4 col-6">
              <div class="product">
                <router-link :to="{ name: 'show-producto', params: { slug: item.slug } }"
                  class="product-hover-overlay-link">
                  <div class="product-image" style="border: none;">
                    <div class="image-wrapper">
                      <img class="img-fluid first-image" :src="$url + '/obtener_portada_producto/' + item.portada"
                        alt="product" />
                      <img class="img-fluid second-image" :src="$url + '/obtener_galeria_producto/' + item.galeria"
                        alt="product" />
                    </div>
                  </div>
                </router-link>
                <div class="py-2">
                  <h3 class="h6 text-uppercase mb-1"
                    style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                    <router-link :to="{ name: 'show-producto', params: { slug: item.slug } }" class="text-dark">{{
                      item.titulo
                    }}</router-link>
                  </h3>
                  <p class="text-muted text-sm mb-1">{{ item.marca }}</p>
                  <span class="text-muted">{{ convertCurrency(item.precio) }}</span>
                </div>
              </div>
            </div>
            <!-- /product-->
          </div>
          <!-- Pagination-->
          <b-pagination v-model="currentPage" :total-rows="productos.length" :per-page="perPage" aria-controls="my-table">
          </b-pagination>
        </div>
        <!-- / Grid End-->
        <!-- Sidebar-->
        <div class="sidebar col-xl-3 col-lg-4 order-lg-1">
          <div class="sidebar-block px-3 px-lg-0 me-lg-4">
            <a class="d-lg-none block-toggler d-flex justify-content-between" data-bs-toggle="collapse"
              href="#categoriesMenu" aria-expanded="false" aria-controls="categoriesMenu">Categorías de producto
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-arrow-down-short text-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
              </svg>
            </a>
            <div class="expand-lg collapse" id="categoriesMenu">
              <div class="nav nav-pills flex-column mt-4 mt-lg-0" role="menu">
                <template v-for="(item, index) in categorias">
                  <div>
                    <template v-if="item.categoria._id == categoria_activa">
                      <div class="sidebar-menu-item mb-2 active" data-bs-toggle="collapse"
                        :data-bs-target="'#subcategories_' + index" aria-expanded="true"
                        :aria-controls="'subcategories_' + index" role="menuitem">
                        <a class="nav-link active">
                          <div class="row">
                            <div class="col">
                              <span>{{ item.categoria.titulo }}</span>
                            </div>
                            <div class="col" style="text-align: right;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-arrow-down-short" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                  d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="collapse show" :id="'subcategories_' + index">
                        <div class="nav nav-pills flex-column ms-3">
                          <a @click="redirectCategoria(item.categoria.titulo)" class="nav-link mb-2"
                            style="cursor: pointer;">Ver todos</a>
                          <a @click="redirectSubcategoria(subitem.titulo, item.categoria._id)"
                            v-for="subitem in item.subcategorias"
                            v-bind:class="{ 'bg_subcat_activa': subitem.titulo == subcategoria_activa }"
                            class="nav-link mb-2" style="cursor: pointer;">{{
                              subitem.titulo }}</a>
                        </div>
                      </div>
                    </template>
                    <template v-if="item.categoria._id != categoria_activa">
                      <div class="sidebar-menu-item mb-2" data-bs-toggle="collapse"
                        :data-bs-target="'#subcategories_' + index" aria-expanded="false"
                        :aria-controls="'subcategories_' + index" role="menuitem">
                        <a class="nav-link">
                          <div class="row flex-nowrap">
                            <div class="col-10">
                              <span>{{ item.categoria.titulo }}</span>
                            </div>
                            <div class="col-2" style="text-align: right;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-arrow-down-short" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                  d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="collapse" :id="'subcategories_' + index">
                        <div class="nav nav-pills flex-column ms-3">
                          <a @click="redirectCategoria(item.categoria.titulo)" class="nav-link mb-2"
                            style="cursor: pointer;">Ver todos</a>
                          <a @click="redirectSubcategoria(subitem.titulo, item.categoria._id)"
                            v-for="subitem in item.subcategorias" class="nav-link mb-2" style="cursor: pointer;">{{
                              subitem.titulo }}</a>
                        </div>
                      </div>
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="sidebar-block px-3 px-lg-0 me-lg-4">
            <a class="d-lg-none block-toggler d-flex justify-content-between" data-bs-toggle="collapse"
              href="#priceFilterMenu" aria-expanded="false" aria-controls="priceFilterMenu">Filtrar por precio
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-arrow-down-short text-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
              </svg>
            </a>
            <div class="expand-lg collapse" id="priceFilterMenu">
              <h6 class="sidebar-heading d-none d-lg-block">Precio</h6>
              <div class="mt-4 mt-lg-0" id="slider-snap" ref="slider"></div>
              <div class="nouislider-values">
                <div class="min">Desde <span id="slider-snap-value-lower">{{ convertCurrency(minRange) }}</span></div>
                <div class="max">Hasta <span id="slider-snap-value-upper">{{ convertCurrency(maxRange) }}</span></div>
                <input class="slider-snap-input" type="hidden" name="pricefrom" id="slider-snap-input-lower" value="40">
                <input class="slider-snap-input" type="hidden" name="priceto" id="slider-snap-input-upper" value="110">
              </div>
            </div>
          </div>
          <div class="sidebar-block px-3 px-lg-0 me-lg-4">
            <a class="d-lg-none block-toggler d-flex justify-content-between" data-bs-toggle="collapse"
              href="#brandFilterMenu" aria-controls="brandFilterMenu">Filtrar por marca
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-arrow-down-short text-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
              </svg>
            </a>
            <!-- Brand filter menu - this menu has .show class, so is expanded by default-->
            <div class="expand-lg collapse" id="brandFilterMenu">
              <h6 class="sidebar-heading d-none d-lg-block">Marcas</h6>
              <form class="mt-4 mt-lg-0" action="#">
                <div class="mb-1">
                  <div v-for="(marca, index) in marcas" class="form-check">
                    <input @change="selectedBrand($event)" :value="marca.marca" class="form-check-input"
                      :id="'brand' + index" type="checkbox" name="clothes-brand">
                    <label class="form-check-label" :for="'brand' + index">{{ marca.marca }}<small> ({{ marca.cantidad
                    }})</small></label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="sidebar-block px-3 px-lg-0 me-lg-4">
            <a class="d-lg-none block-toggler d-flex justify-content-between" data-bs-toggle="collapse"
              href="#sizeFilterMenu" aria-expanded="false" aria-controls="sizeFilterMenu">Filtrar por talla
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-arrow-down-short text-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
              </svg>
            </a>
            <!-- Size filter menu-->
            <div class="expand-lg collapse" id="sizeFilterMenu">
              <h6 class="sidebar-heading d-none d-lg-block">Talla</h6>
              <form class="mt-4 mt-lg-0" action="#">
                <div class="mb-1">
                  <div class="form-check">
                    <input @change="selectedSize($event)" class="form-check-input" id="size0" type="checkbox"
                      value="X-Small" name="size">
                    <label class="form-check-label" for="size0">X-Small</label>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="form-check">
                    <input @change="selectedSize($event)" class="form-check-input" id="size1" type="checkbox"
                      value="Small" name="size">
                    <label class="form-check-label" for="size1">Small</label>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="form-check">
                    <input @change="selectedSize($event)" class="form-check-input" id="size2" type="checkbox"
                      value="Medium" name="size">
                    <label class="form-check-label" for="size2">Medium</label>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="form-check">
                    <input @change="selectedSize($event)" class="form-check-input" id="size3" type="checkbox"
                      value="Large" name="size">
                    <label class="form-check-label" for="size3">Large</label>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="form-check">
                    <input @change="selectedSize($event)" class="form-check-input" id="size4" type="checkbox"
                      value="X-Large" name="size">
                    <label class="form-check-label" for="size4">X-Large</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- /Sidebar end-->
      </div>
    </div>
    <FooterBanner />
  </div>
</template>

<script>

import FooterBanner from '@/components/FooterBanner.vue';

import axios from 'axios';
import noUiSlider from '../../../public/assets/js/nouislider.min.js';
import currency_formatter from 'currency-formatter';

export default {
  data() {
    return {
      slider: {
        startMin: 0,
        startMax: 100,
        min: 0,
        max: 200,
        step: 1
      },
      minRange: null,
      maxRange: null,

      productos: [],
      productos_const: [],
      marcas: [],
      categorias: [],
      categoria_activa: '',
      subcategoria_activa: '',

      marcasSeleccionadas: [],
      tallasSeleccionadas: [],

      currentPage: 1,
      perPage: 12,
      get itemsForList() {
        return this.productos.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
      },

      sort_by: 'Defecto'
    }
  },
  components: {
    FooterBanner
  },
  methods: {
    init_marcas() {
      axios.get(this.$url + '/listar_marcas_y_numproductos_public', {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(result => {
        this.marcas = result.data;
      });
    },
    init_categorias() {
      axios.get(this.$url + '/listar_categorias_public', {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(result => {
        this.categorias = result.data;
        if (this.$route.query.subcategoria) {
          this.categoria_activa = this.categorias.filter(item => item.subcategorias.some(subcat => subcat.titulo == this.$route.query.subcategoria))[0].categoria._id;
          this.subcategoria_activa = this.$route.query.subcategoria;
        }
      })
    },
    redirectCategoria(item) {
      const currentRoute = this.$router.currentRoute;
      const desiredRoute = {
        name: 'shop',
        query: { categoria: item }
      };

      if (
        currentRoute.name !== desiredRoute.name ||
        JSON.stringify(currentRoute.query) !== JSON.stringify(desiredRoute.query)
      ) {
        this.$router.push(desiredRoute);
        this.initProductosCategoria();
        this.aplicarFiltros();
      }
    },
    redirectSubcategoria(item, categoria) {
      this.categoria_activa = categoria;
      this.subcategoria_activa = item;
      const currentRoute = this.$router.currentRoute;
      const desiredRoute = {
        name: 'shop',
        query: { subcategoria: item }
      };

      if (
        currentRoute.name !== desiredRoute.name ||
        JSON.stringify(currentRoute.query) !== JSON.stringify(desiredRoute.query)
      ) {
        this.$router.push(desiredRoute, () => {
          this.initProductosSubcategoria();
          this.aplicarFiltros();
        });
      }
    },
    initProductosMarca() {
      this.productos = this.productos_const.filter(item => item.marca == this.$route.query.marca);
    },
    initProductosCategoria() {
      this.productos = this.productos_const.filter(item => item.categoria == this.$route.query.categoria);
    },
    initProductosSubcategoria() {
      this.productos = this.productos_const.filter(item => item.subcategoria == this.$route.query.subcategoria);
    },
    setPerPage(item) {
      this.perPage = item;
    },
    setSortBy() {
      if (this.sort_by == 'Defecto') {
        this.productos.sort((a, b) => new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime() ? 1 : -1);
      } else if (this.sort_by == 'Precio-Mm') {
        this.productos.sort((a, b) => a.precio < b.precio ? 1 : -1);
      } else if (this.sort_by == 'Precio-mM') {
        this.productos.sort((a, b) => a.precio > b.precio ? 1 : -1);
      }
    },
    selectedSize(event) {
      let talla = event.target.value;

      if (event.target.checked) {
        this.tallasSeleccionadas.push(talla);
      } else {
        const index = this.tallasSeleccionadas.indexOf(talla);
        if (index !== -1) {
          this.tallasSeleccionadas.splice(index, 1);
        }
      }

      this.aplicarFiltros();
    },
    selectedBrand(event) {
      let marca = event.target.value;

      if (event.target.checked) {
        this.marcasSeleccionadas.push(marca);
      } else {
        const index = this.marcasSeleccionadas.indexOf(marca);
        if (index !== -1) {
          this.marcasSeleccionadas.splice(index, 1);
        }
      }

      this.aplicarFiltros();
    },
    aplicarFiltros() {
      if (this.$route.query.categoria) {
        this.productos = this.productos_const
          .filter(item => item.categoria === this.$route.query.categoria)
          .filter(item => {
            if (this.marcasSeleccionadas.length === 0 && this.tallasSeleccionadas.length === 0) {
              return item.precio >= this.minRange && item.precio <= this.maxRange;
            }

            let cumpleMarca = true;
            if (this.marcasSeleccionadas.length > 0) {
              cumpleMarca = this.marcasSeleccionadas.includes(item.marca);
            }

            let cumpleTalla = true;
            if (this.tallasSeleccionadas.length > 0) {
              cumpleTalla = item.variedades.some(variedad => this.tallasSeleccionadas.includes(variedad));
            }

            return cumpleMarca && cumpleTalla && item.precio >= this.minRange && item.precio <= this.maxRange;
          });
      } else if (this.$route.query.subcategoria) {
        this.productos = this.productos_const
          .filter(item => item.subcategoria === this.$route.query.subcategoria)
          .filter(item => {
            if (this.marcasSeleccionadas.length === 0 && this.tallasSeleccionadas.length === 0) {
              return item.precio >= this.minRange && item.precio <= this.maxRange;
            }

            let cumpleMarca = true;
            if (this.marcasSeleccionadas.length > 0) {
              cumpleMarca = this.marcasSeleccionadas.includes(item.marca);
            }

            let cumpleTalla = true;
            if (this.tallasSeleccionadas.length > 0) {
              cumpleTalla = item.variedades.some(variedad => this.tallasSeleccionadas.includes(variedad));
            }

            return cumpleMarca && cumpleTalla && item.precio >= this.minRange && item.precio <= this.maxRange;
          });
      } else {
        this.productos = this.productos_const.filter(item => {
          if (this.marcasSeleccionadas.length === 0 && this.tallasSeleccionadas.length === 0) {
            return item.precio >= this.minRange && item.precio <= this.maxRange;
          }

          let cumpleMarca = true;
          if (this.marcasSeleccionadas.length > 0) {
            cumpleMarca = this.marcasSeleccionadas.includes(item.marca);
          }

          let cumpleTalla = true;
          if (this.tallasSeleccionadas.length > 0) {
            cumpleTalla = item.variedades.some(variedad => this.tallasSeleccionadas.includes(variedad));
          }

          return cumpleMarca && cumpleTalla && item.precio >= this.minRange && item.precio <= this.maxRange;
        });
      }
    },
    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'EUR' });
    }
  },
  beforeMount() {
    axios.get(this.$url + '/obtener_productos_shop', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(result => {
      this.productos = result.data;
      this.productos_const = this.productos;

      this.slider.max = Math.max(...this.productos.map(producto => producto.precio));
      this.slider.startMax = this.slider.max;
      this.maxRange = this.slider.max;

      noUiSlider.create(this.$refs.slider, {
        start: [this.slider.startMin, this.slider.startMax],
        step: this.slider.step,
        range: {
          'min': this.slider.min,
          'max': this.slider.max
        },
        connect: [false, true, false]
      });

      this.$refs.slider.noUiSlider.on('update', (values, handle) => {
        this[handle ? 'maxRange' : 'minRange'] = parseInt(values[handle]);
      });


      setTimeout(() => {
        if (this.$route.query.categoria) {
          this.initProductosCategoria();
        }

        if (this.$route.query.subcategoria) {
          this.initProductosSubcategoria();
        }

        if (this.$route.query.marca) {
          4545
          this.initProductosMarca();
        }
      }, 10);

      this.init_marcas();
      this.init_categorias();
    });
  },
  watch: {
    $route(to, from) {
      const categoriaChanged = this.$route.query.categoria !== from.query.categoria;
      const subcategoriaChanged = this.$route.query.subcategoria !== from.query.subcategoria;
      const marcaChanged = this.$route.query.marca !== from.query.marca;

      if (categoriaChanged || subcategoriaChanged || marcaChanged) {
        if (this.$route.query.categoria && categoriaChanged) {
          this.initProductosCategoria();
        } else if (this.$route.query.subcategoria && subcategoriaChanged) {
          this.initProductosSubcategoria();
        } else if (this.$route.query.marca && marcaChanged) {
          this.initProductosMarca();
        } else {
          this.productos = this.productos_const;
        }
      }
    },
    minRange: function (value) {
      this.aplicarFiltros();
    },
    maxRange: function (value) {
      this.aplicarFiltros();
    }
  }
}

</script>

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

#slider-snap {
  cursor: pointer;
}

.sidebar-menu-item[data-bs-toggle="collapse"]::before {
  display: none !important;
}

.bg_subcat_activa {
  background: #ccc !important;
}

.pagination {
  margin-bottom: 4rem;
}

.block-toggler[data-bs-toggle="collapse"]::before {
  content: none;
}
</style>
