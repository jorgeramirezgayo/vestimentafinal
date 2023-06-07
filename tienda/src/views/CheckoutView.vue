<template>
  <div>
    <!-- Checkout-->
    <section style="margin-top: 4rem;">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">

            <div class="block mb-5">
              <div class="block-header">
                <h6 class="text-uppercase mb-0">Dirección de entrega</h6>
              </div>
              <div class="block-body">
                <div class="row">
                  <div v-if="!direccion" class="col-md-6 d-flex align-items-center">
                    <input type="radio" name="shippping" id="option0" checked>
                    <label class="ms-3" for="option0">
                      <router-link to="/cuenta/direcciones" class="text-muted text-sm">Establecer dirección</router-link>
                    </label>
                  </div>
                  <div v-if="direccion" class="mb-4 col-md-6 d-flex align-items-center">
                    <input type="radio" name="shippping" id="option0" checked>
                    <label class="ms-3" for="option0">
                      <strong class="d-block text-uppercase mb-2">{{ direccion.direccion }}</strong>
                      <span class="text-muted text-sm">{{ direccion.ciudad }}, {{ direccion.pais }}</span><br>
                      <span class="text-muted text-sm">{{ direccion.nombre }} {{ direccion.apellidos }}, {{
                        direccion.telefono }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-5">
              <div class="cart">
                <div class="cart-wrapper">
                  <div class="cart-header text-center">
                    <div class="row">
                      <div class="col-6">
                        <span class="text-left">Producto</span>
                      </div>
                      <div class="col-2">Precio</div>
                      <div class="col-2">Cantidad</div>
                      <div class="col-2">Total</div>
                    </div>
                  </div>
                  <div v-if="load_data || carrito.length == 0" class="cart-body">
                    <div class="row text-center">
                      <div class="col-12 my-4">
                        <span>El carrito está vacío.</span>
                      </div>
                    </div>
                  </div>
                  <div v-if="!load_data"  class="cart-body">
                    <!-- Product-->
                    <div v-for="item in carrito" class="cart-item">
                      <div class="row d-flex align-items-center text-center">
                        <div class="col-6">
                          <div class="d-flex align-items-center">
                            <router-link :to="{ name: 'show-producto', params: { slug: item.producto.slug } }">
                              <img class="cart-item-img"
                                :src="$url + '/obtener_portada_producto/' + item.producto.portada" alt="...">
                              </router-link>
                            <div class="cart-title text-start">
                              <router-link :to="{ name: 'show-producto', params: { slug: item.producto.slug } }"
                              class="text-uppercase text-dark">
                                <strong>{{ item.producto.titulo }}</strong>
                              </router-link><br>
                              <span class="text-muted text-sm">{{ item.producto.marca }}</span><br>
                              <span class="text-muted text-sm">{{ item.variedad.variedad }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-2">{{ convertCurrency(item.producto.precio) }}</div>
                        <div class="col-2">{{ item.cantidad }}</div>
                        <div class="col-2 text-center">{{ convertCurrency(item.producto.precio * item.cantidad) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-5 d-flex justify-content-between flex-column flex-lg-row">
              <router-link to="/shop" class="btn btn-link text-muted">Regresar a la
                tienda</router-link>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="block mb-5">
              <div class="block-header">
                <h6 class="text-uppercase mb-0">Detalles de compra</h6>
              </div>
              <div class="block-body bg-light pt-1">
                <p class="text-sm">Los gastos de envío se calculan en función del valor de la compra.</p>
                <ul class="order-summary mb-0 list-unstyled">
                  <li class="order-summary-item"><span>Subtotal </span><span>{{ convertCurrency(total) }}</span></li>
                  <li v-if="envio == 0 && total < 100" class="order-summary-item"><span>Envío</span><span class="text-uppercase">{{ convertCurrency(envio) }}</span></li>
                  <li v-else-if="total >= 100" class="order-summary-item"><span>Envío</span><span class="text-uppercase"><strong>Gratis</strong></span></li>
                  <li v-else-if="envio > 0" class="order-summary-item"><span>Envío</span><span>{{ convertCurrency(envio) }}</span></li>
                  <li class="order-summary-item border-0"><span>Total</span><strong class="order-summary-total">{{
                    convertCurrency(total + envio) }}</strong></li>
                </ul>
              </div>
            </div>
            <div class="block mb-5">
              <div class="block-header">
                <h6 class="text-uppercase mb-0">Método de pago</h6>
              </div>
              <div class="block-body bg-light pt-1 mb-3">
                <div class="col-md-12 mb-2">
                  <div class="row">
                    <div class="col-12">
                      <p class="text-muted" style="font-size: 13px">(Después de hacer clic en "PayPal" será redirigido a
                        PayPal de forma segura para completar su compra).</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <p class="text-sm" style="margin-bottom: 0.4rem;">Deberes e impuestos no están incluidos en paquetes con
                    envio internacional. /Tus datos personales serán utilizados para procesar tu pedido y respaldar tu
                    experiencia en este sitio web.</p>
                  <a> <b> Términos & Privacidad.</b></a>
                </div>

              </div>
              <div class="block-footer">
                <div class="paypal-container">
                  <div @click="createOrder()" class="paypal-button">
                    <svg class="paypal-logo" width="101px" height="32" viewBox="0 0 101 32"
                      preserveAspectRatio="xMinYMin meet" xmlns="http:&#x2F;&#x2F;www.w3.org&#x2F;2000&#x2F;svg">
                      <path fill="#003087"
                        d="M 12.237 2.8 L 4.437 2.8 C 3.937 2.8 3.437 3.2 3.337 3.7 L 0.237 23.7 C 0.137 24.1 0.437 24.4 0.837 24.4 L 4.537 24.4 C 5.037 24.4 5.537 24 5.637 23.5 L 6.437 18.1 C 6.537 17.6 6.937 17.2 7.537 17.2 L 10.037 17.2 C 15.137 17.2 18.137 14.7 18.937 9.8 C 19.237 7.7 18.937 6 17.937 4.8 C 16.837 3.5 14.837 2.8 12.237 2.8 Z M 13.137 10.1 C 12.737 12.9 10.537 12.9 8.537 12.9 L 7.337 12.9 L 8.137 7.7 C 8.137 7.4 8.437 7.2 8.737 7.2 L 9.237 7.2 C 10.637 7.2 11.937 7.2 12.637 8 C 13.137 8.4 13.337 9.1 13.137 10.1 Z">
                      </path>
                      <path fill="#003087"
                        d="M 35.437 10 L 31.737 10 C 31.437 10 31.137 10.2 31.137 10.5 L 30.937 11.5 L 30.637 11.1 C 29.837 9.9 28.037 9.5 26.237 9.5 C 22.137 9.5 18.637 12.6 17.937 17 C 17.537 19.2 18.037 21.3 19.337 22.7 C 20.437 24 22.137 24.6 24.037 24.6 C 27.337 24.6 29.237 22.5 29.237 22.5 L 29.037 23.5 C 28.937 23.9 29.237 24.3 29.637 24.3 L 33.037 24.3 C 33.537 24.3 34.037 23.9 34.137 23.4 L 36.137 10.6 C 36.237 10.4 35.837 10 35.437 10 Z M 30.337 17.2 C 29.937 19.3 28.337 20.8 26.137 20.8 C 25.037 20.8 24.237 20.5 23.637 19.8 C 23.037 19.1 22.837 18.2 23.037 17.2 C 23.337 15.1 25.137 13.6 27.237 13.6 C 28.337 13.6 29.137 14 29.737 14.6 C 30.237 15.3 30.437 16.2 30.337 17.2 Z">
                      </path>
                      <path fill="#003087"
                        d="M 55.337 10 L 51.637 10 C 51.237 10 50.937 10.2 50.737 10.5 L 45.537 18.1 L 43.337 10.8 C 43.237 10.3 42.737 10 42.337 10 L 38.637 10 C 38.237 10 37.837 10.4 38.037 10.9 L 42.137 23 L 38.237 28.4 C 37.937 28.8 38.237 29.4 38.737 29.4 L 42.437 29.4 C 42.837 29.4 43.137 29.2 43.337 28.9 L 55.837 10.9 C 56.137 10.6 55.837 10 55.337 10 Z">
                      </path>
                      <path fill="#009cde"
                        d="M 67.737 2.8 L 59.937 2.8 C 59.437 2.8 58.937 3.2 58.837 3.7 L 55.737 23.6 C 55.637 24 55.937 24.3 56.337 24.3 L 60.337 24.3 C 60.737 24.3 61.037 24 61.037 23.7 L 61.937 18 C 62.037 17.5 62.437 17.1 63.037 17.1 L 65.537 17.1 C 70.637 17.1 73.637 14.6 74.437 9.7 C 74.737 7.6 74.437 5.9 73.437 4.7 C 72.237 3.5 70.337 2.8 67.737 2.8 Z M 68.637 10.1 C 68.237 12.9 66.037 12.9 64.037 12.9 L 62.837 12.9 L 63.637 7.7 C 63.637 7.4 63.937 7.2 64.237 7.2 L 64.737 7.2 C 66.137 7.2 67.437 7.2 68.137 8 C 68.637 8.4 68.737 9.1 68.637 10.1 Z">
                      </path>
                      <path fill="#009cde"
                        d="M 90.937 10 L 87.237 10 C 86.937 10 86.637 10.2 86.637 10.5 L 86.437 11.5 L 86.137 11.1 C 85.337 9.9 83.537 9.5 81.737 9.5 C 77.637 9.5 74.137 12.6 73.437 17 C 73.037 19.2 73.537 21.3 74.837 22.7 C 75.937 24 77.637 24.6 79.537 24.6 C 82.837 24.6 84.737 22.5 84.737 22.5 L 84.537 23.5 C 84.437 23.9 84.737 24.3 85.137 24.3 L 88.537 24.3 C 89.037 24.3 89.537 23.9 89.637 23.4 L 91.637 10.6 C 91.637 10.4 91.337 10 90.937 10 Z M 85.737 17.2 C 85.337 19.3 83.737 20.8 81.537 20.8 C 80.437 20.8 79.637 20.5 79.037 19.8 C 78.437 19.1 78.237 18.2 78.437 17.2 C 78.737 15.1 80.537 13.6 82.637 13.6 C 83.737 13.6 84.537 14 85.137 14.6 C 85.737 15.3 85.937 16.2 85.737 17.2 Z">
                      </path>
                      <path fill="#009cde"
                        d="M 95.337 3.3 L 92.137 23.6 C 92.037 24 92.337 24.3 92.737 24.3 L 95.937 24.3 C 96.437 24.3 96.937 23.9 97.037 23.4 L 100.237 3.5 C 100.337 3.1 100.037 2.8 99.637 2.8 L 96.037 2.8 C 95.637 2.8 95.437 3 95.337 3.3 Z">
                      </path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default {
  name: 'CheckoutView',
  data() {
    return {
      direccion: {},
      venta: {},
      carrito: [],
      total: 0,
      envio: 0,
      load_data: false,
      items: []
    }
  },
  components: {
    FooterBanner
  },
  methods: {
    obtener_direccion() {
      axios.get(this.$url + '/obtener_direccion_cliente', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        this.direccion = result.data;
      });
    },
    init_carrito() {
      this.load_data = true;
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

            this.items.push({
              name: item.producto.titulo,
              quantity: item.cantidad,
              unit_amount: {
                currency_code: "EUR",
                value: item.producto.precio
              }
            });
          }

          if (this.total >= 100) {
            this.envio = 0;
          } else if (this.total > 0 && this.total < 100) {
            this.envio = this.$envio;
          }

          this.items.push({
            name: 'Envio',
            quantity: 1,
            unit_amount: {
              currency_code: "EUR",
              value: this.envio
            }
          });

          this.load_data = false;
        });
      }
    },
    createOrder() {
      if (!this.direccion) {
        this.$notify({
          title: "ERROR",
          text: "Establezca una dirección antes de pagar.",
          type: "error"
        });
      } else {
        axios.post(this.$url + '/create_order',
          this.items, {
          headers: {
            "Content-Type": "application/json"
          }
        }).then(result => {
          window.location.href = result.data.links[1].href;
        }).catch(error => {
          console.log(error);
        });
      }
    },
    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'EUR' });
    }
  },
  beforeMount() {
    this.obtener_direccion();
    this.init_carrito();

    const urlWithoutQueryParam = window.location.pathname;
    window.history.replaceState({}, document.title, urlWithoutQueryParam);
  }
}
</script>

<style>
.paypal-container {
  width: 100%;
  height: 45px;
  min-height: 30px;
  max-height: 55px;
  cursor: pointer;
}

.paypal-button {
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  height: 45px;
  position: relative;
  text-transform: uppercase;
  letter-spacing: .3em;
  line-height: 1.5;
  font-size: .6875rem;
  border-radius: 4px;
  background: #ffc439;
}

.paypal-button:hover {
  background: #f2ba36;
}

.paypal-logo {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  margin: 0px 4vw;
  height: 22px;
}
</style>
