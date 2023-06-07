<template>
  <header class="header" style="border-bottom: 1px solid #f2f2f2;">
    <!-- Top Bar-->
    <div class="top-bar">
      <div class="container-fluid">
        <div class="row d-flex align-items-center" style="background-color: black;">
          <div class="carousel-header-container">
            <div class="carousel-header">
              <div class="carousel-header-item active">
                <div class="text-center">
                  <p class="header-banner">Nuevo:
                    <router-link :to="{ name: 'shop', query: { marca: 'Loewe' } }"
                      style="color: #fff; text-decoration: none; cursor: pointer;">Loewe</router-link>
                  </p>
                </div>
              </div>
              <div class="carousel-header-item">
                <div class="text-center">
                  <p class="header-banner">Nuevo:
                    <router-link :to="{ name: 'shop', query: { marca: 'Double Ralph Lauren' } }"
                      style="color: #fff; text-decoration: none; cursor: pointer;">Double Ralph Lauren</router-link>
                  </p>
                </div>
              </div>
              <div class="carousel-header-item">
                <div class="text-center">
                  <p class="header-banner">Nuevo:
                    <router-link :to="{ name: 'shop', query: { marca: 'Calvin Klein' } }"
                      style="color: #fff; text-decoration: none; cursor: pointer;">Calvin Klein</router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Top Bar End-->
    <!-- Navbar-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-fixed-white" style="padding: 0.7rem;">
      <div class="container-fluid header-extended">
        <!-- Navbar Header  -->
        <router-link to="/" class="titulo" style="display: inline-block;">FINAL<div
            style="width: 4px; height: 4px; background-color: black; display: inline-block;"></div></router-link>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
          aria-label="Toggle navigation">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14">
            <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
              <g fill="#1A1A1A" transform="translate(-32 -45)">
                <g transform="translate(0 28)">
                  <g transform="translate(32 14)">
                    <g>
                      <path d="M20 16v1H0v-1h20zm0-6.5v1H0v-1h20zM20 3v1H0V3h20z"></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </button>
        <!-- Navbar Collapse -->
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'shop' }" class="nav-link">Tienda</router-link>
            </li>
            <!-- Megamenu-->
            <li class="nav-item dropdown position-static"><a class="nav-link dropdown-toggle " href="#"
                data-bs-toggle="dropdown">Categorias</a>
              <div class="dropdown-menu dropdown-menu-animated megamenu py-lg-0">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="row p-3 pe-lg-0 ps-lg-5 pt-lg-5">
                      <div class="col-12">
                        <!-- Megamenu list-->
                        <h6>
                          <router-link :to="{ name: 'shop' }" class="megamenu-list-link text-bold">Ver todas las
                            categorías</router-link>
                        </h6>
                        <ul class="megamenu-list list-unstyled">
                          <li v-for="categoria in categorias" class="megamenu-list-item col-4"
                            style="display: inline-block;">
                            <router-link :to="{ name: 'shop', query: { categoria: categoria.categoria.titulo } }"
                              class="megamenu-list-link text-bold">{{ categoria.categoria.titulo }}</router-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 d-none d-lg-block position-relative">
                    <img class="bg-image"
                      :src="`${require('../../public/assets/media/0516_m_summer_essentials_lp_c06_img.webp')}`"
                      alt="Ralph Lauren">
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown position-static"><a class="nav-link dropdown-toggle " href="#"
                data-bs-toggle="dropdown">Marcas</a>
              <div class="dropdown-menu dropdown-menu-animated megamenu py-lg-0">
                <div class="row">
                  <div class="col-lg-9">
                    <div class="row p-3 pe-lg-0 ps-lg-5 pt-lg-5">
                      <div class="col-12">
                        <!-- Megamenu list-->
                        <h6>
                          <router-link :to="{ name: 'shop' }" class="megamenu-list-link text-bold">Ver todas las
                            marcas</router-link>
                        </h6>
                        <ul class="megamenu-list list-unstyled">
                          <li v-for="marca in marcas" class="megamenu-list-item col-4" style="display: inline-block;">
                            <router-link :to="{ name: 'shop', query: { marca: marca.titulo } }"
                              class="megamenu-list-link text-bold">{{ marca.titulo }}</router-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 d-none d-lg-block position-relative">
                    <img class="bg-image"
                      :src="`${require('../../public/assets/media/0516_m_summer_essentials_lp_c06_img.webp')}`"
                      alt="Ralph Lauren">
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="d-flex align-items-center justify-content-between justify-content-lg-end mt-4 mt-lg-1 mb-2 my-lg-0">
            <!-- User Not Logged - link to login page-->
            <div class="nav-item">
              <router-link to="/login" v-if="!$store.state.token" class="navbar-icon-link">
                <svg xmlns="http://www.w3.org/2000/svg" color="black" width="16" height="" viewBox="0 0 16 18"
                  class="sc-iFjrBz hycBQW">
                  <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                    <g fill="currentColor" transform="translate(-197 -47)">
                      <g transform="translate(0 28)">
                        <g transform="translate(196 19)">
                          <g>
                            <g transform="translate(1)">
                              <path
                                d="M14.5 17l-13 .004v-1c0-1.945 0-3.264 2.003-3.795 1.005-.266 3.348-.203 4.497-.203s3.522-.08 4.503.203c2.066.595 1.997 1.85 1.997 3.795V17zM8 11.01c-1.191 0-3.973-.106-5.04.305-2.49.96-2.396 2.92-2.46 4.688V18h15v-1.996c-.064-1.768.03-3.728-2.46-4.688-1.067-.41-3.849-.305-5.04-.305z">
                              </path>
                              <path fill-rule="nonzero"
                                d="M8 0a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 1a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <span class="text-sm ms-2 ms-lg-0 text-uppercase text-sm fw-bold d-none d-sm-inline d-lg-none">Log
                  in</span>
              </router-link>
              <a v-if="$store.state.token" class="navbar-icon-link dropdown">
                <svg xmlns="http://www.w3.org/2000/svg" color="black" width="16" height="16" viewBox="0 0 16 18"
                  class="dropdown-toggle" data-bs-target="#" data-bs-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
                  <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                    <g fill="currentColor" transform="translate(-197 -47)">
                      <g transform="translate(0 28)">
                        <g transform="translate(196 19)">
                          <g>
                            <g transform="translate(1)">
                              <path
                                d="M14.5 17l-13 .004v-1c0-1.945 0-3.264 2.003-3.795 1.005-.266 3.348-.203 4.497-.203s3.522-.08 4.503.203c2.066.595 1.997 1.85 1.997 3.795V17zM8 11.01c-1.191 0-3.973-.106-5.04.305-2.49.96-2.396 2.92-2.46 4.688V18h15v-1.996c-.064-1.768.03-3.728-2.46-4.688-1.067-.41-3.849-.305-5.04-.305z">
                              </path>
                              <path fill-rule="nonzero"
                                d="M8 0a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 1a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <div class="dropdown-menu dropdown-menu-animated" aria-labelledby="categoryDropdownMenuLink"
                  style="left: -145px !important;">
                  <router-link to="/cuenta/venta" class="dropdown-item">Pedidos</router-link>
                  <router-link to="/cuenta/direcciones" class="dropdown-item">Direcciones</router-link>
                  <a class="dropdown-item" @click="logout()">Cerrar sesión </a>
                </div>
              </a>
            </div>
            <!-- Cart Dropdown-->
            <div class="nav-item dropdown">
              <div>
                <a class="navbar-icon-link" id="cartdetails" data-bs-target="#" data-bs-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                      <g fill="#1A1A1A" fill-rule="nonzero">
                        <g>
                          <path
                            d="M17 4v14H1V4h16zm-1 1H2v12h14V5zM9 0a5.002 5.002 0 014.9 4h-1.026a4.002 4.002 0 00-7.748 0H4.1A5.002 5.002 0 019 0z">
                          </path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <div v-if="carrito.length > 0" class="navbar-icon-link-badge">{{ carrito.length }}</div>
                </a>
                <div @click="preventDropdownClose($event)"
                  class="dropdown-menu dropdown-menu-animated dropdown-menu-end p-4"
                  style="border-top: 1px solid rgb(242, 242, 242); margin-top: 1.15rem;" aria-labelledby="cartdetails">
                  <div class="navbar-cart-product-wrapper">
                    <!-- cart item-->
                    <div v-if="carrito.length == 0" class="col-12 py-1 px-3">
                      <p>Aún no tienes productos en la cesta.</p>
                    </div>
                    <div v-for="item in carrito" class="navbar-cart-product">
                      <div class="d-flex align-items-center">
                        <router-link :to="{ name: 'show-producto', params: { slug: item.producto.slug } }">
                          <img class="img-fluid navbar-cart-product-image"
                            :src="$url + '/obtener_portada_producto/' + item.producto.portada" alt="..." />
                        </router-link>
                        <div class="w-100">
                          <a @click="eliminar(item._id)" class="navbar-cart-product-close" href="#">
                            <img src="/assets/icons/close.png" style="width: 15px;" />
                          </a>
                          <div class="ps-3">
                            <router-link class="navbar-cart-product-link"
                              :to="{ name: 'show-producto', params: { slug: item.producto.slug } }">{{
                                item.producto.titulo
                              }}</router-link>
                            <small class="d-block text-muted">{{ item.variedad.variedad }}</small>
                            <small class="d-block text-muted">Cantidad: {{ item.cantidad }} </small>
                            <strong class="d-block text-sm">{{ convertCurrency(item.producto.precio * item.cantidad)
                            }}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- total price-->
                  <div class="navbar-cart-total"><span class="text-uppercase text-muted">Total</span><strong
                      class="text-uppercase">{{ convertCurrency(total) }}</strong></div>
                  <!-- buttons-->
                  <div class="d-flex justify-content-between">
                    <router-link to="/cart" class="btn btn-link text-dark me-3">Cesta
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                          <g fill="#1A1A1A" fill-rule="nonzero">
                            <g>
                              <path
                                d="M17 4v14H1V4h16zm-1 1H2v12h14V5zM9 0a5.002 5.002 0 014.9 4h-1.026a4.002 4.002 0 00-7.748 0H4.1A5.002 5.002 0 019 0z">
                              </path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </router-link>
                    <router-link v-if="carrito.length != 0" to="/checkout"
                      class="btn btn-outline-dark">Pagar</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
    <!-- /Navbar -->
    <!-- /Fullscreen search area-->
  </header>
</template>

<script>

import axios from 'axios';
import currency_formatter from 'currency-formatter';

export default {
  name: 'Header',
  data() {
    return {
      marcas: [],
      categorias: [],
      user: JSON.parse(this.$store.state.user),
      carrito: [],
      total: 0
    }
  },
  methods: {
    init_marcas() {
      axios.get(this.$url + '/listar_marcas_public', {
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
      });
    },
    init_carrito() {
      if (this.$store.state.token != null) {
        axios.get(this.$url + '/obtener_carrito_cliente', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.token
          }
        }).then(result => {
          this.carrito = result.data;
          this.total = 0;
          for (let item of this.carrito) {
            this.total = this.total + (item.producto.precio * item.cantidad);
          }
        });
      }
    },
    init_carousel() {
      let carousel = document.querySelector('.carousel-header');
      let carouselItems = Array.from(document.querySelectorAll('.carousel-header-item'));

      let currentIndex = 0;

      function showNextItem() {
        carouselItems.forEach(item => item.classList.remove('carousel-header-item-active'));

        if (currentIndex === carouselItems.length - 1) {
          currentIndex = 0; // Reinicia el índice al llegar al último elemento
        } else {
          currentIndex++;
        }

        carouselItems[currentIndex].classList.add('carousel-header-item-active');

        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      setInterval(showNextItem, 6000);
    },
    eliminar(id) {
      axios.delete(this.$url + '/eliminar_producto_carrito/' + id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        this.init_carrito();
        this.$socket.emit('send_cart', true);
      });
    },
    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'EUR' });
    },
    preventDropdownClose(event) {
      event.stopPropagation();
    },
    logout() {
      this.$store.dispatch('logout');
      if (this.$route.path !== '/') this.$router.push({ name: 'home' });
      this.carrito = [];
      this.carrito.length = 0;
      this.total = 0;
    }
  },
  beforeMount() {
    this.init_marcas();
    this.init_categorias();
    this.init_carrito();
  },
  mounted() {
    this.init_carousel();
  },
  created() {
    this.sockets.subscribe('listen_cart', data => {
      this.init_carrito();
      this.user = JSON.parse(this.$store.state.user);
    });
  }
}
</script>

<style scoped>
.carousel-header-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: transform 0.5s;
}

.carousel-header {
  display: flex;
}

.carousel-header-item {
  flex: 0 0 100%;
}

.carousel-header-item-active {
  opacity: 1;
}

.header-banner {
  line-height: 18px;
  font-size: 0.6rem;
  padding: 0.5rem 1rem;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  letter-spacing: 0.0714286rem;
  margin-bottom: 0px;
}

.header-extended {
  gap: 1rem;
}

@media (min-width: 992px) {
  .header-extended {
    gap: unset;
  }
}

.navbar-fixed-light.fixed-top .navbar-nav .nav-link {
  color: white;
}

.titulo {
  font-family: 'Proxima Nova' !important;
  color: black !important;
  letter-spacing: 3px;
  font-size: 2.1rem;
  line-height: 1.5rem;
  cursor: pointer;
}

.titulo:hover {
  color: black;
  text-decoration: none;
}

.navbar-dark .navbar-nav .nav-link {
  color: #1a1a1a !important;
}

.navbar-dark .navbar-nav .nav-link:hover:not(:focus) {
  color: #ccc !important;
}

.navbar-dark .dropdown-toggle::after,
.navbar-hover-dark:hover .dropdown-toggle::after,
.navbar-fixed-dark.fixed-top .dropdown-toggle::after {
  content: none;
}

.navbar-icon-link-badge {
  color: white;
  background-color: #343a40;
}
</style>
