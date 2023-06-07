<template>
  <div>
    <!-- Shopping Cart Section-->
    <section style="margin-top: 4rem;">
      <div class="container">
        <div class="row mb-5">
          <div class="col-lg-8">
            <div class="cart">
              <div class="cart-wrapper">
                <div class="cart-header text-center">
                  <div class="row">
                    <div class="col-5">Producto</div>
                    <div class="col-2">Precio</div>
                    <div class="col-2">Cantidad</div>
                    <div class="col-2">Subtotal</div>
                    <div class="col-1"></div>
                  </div>
                </div>
                <div v-if="load_data || carrito.length == 0" class="cart-body">
                  <div class="row text-center">
                    <div class="col-12 my-4">
                      <span>El carrito está vacío.</span>
                    </div>
                  </div>
                </div>
                <div v-if="!load_data" class="cart-body">
                  <!-- Product-->
                  <div v-for="item in carrito" class="cart-item">
                    <div class="row d-flex align-items-center text-center">
                      <div class="col-5">
                        <div class="d-flex align-items-center">
                          <router-link :to="{ name: 'show-producto', params: { slug: item.producto.slug } }">
                            <img class="cart-item-img" :src="$url + '/obtener_portada_producto/' + item.producto.portada"
                              alt="...">
                          </router-link>
                          <div class="cart-title text-start">
                            <router-link :to="{ name: 'show-producto', params: { slug: item.producto.slug } }"
                              class="text-uppercase text-dark">
                              <strong>{{ item.producto.titulo }}</strong>
                            </router-link>
                            <br>
                            <span class="text-muted text-sm">{{ item.producto.marca }}</span><br>
                            <span class="text-muted text-sm">{{ item.variedad.variedad }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-2">{{ convertCurrency(item.producto.precio) }}</div>
                      <div class="col-2">{{ item.cantidad }}</div>
                      <div class="col-2 text-center">{{ convertCurrency(item.producto.precio * item.cantidad) }}</div>
                      <div class="col-1 text-center">
                        <a @click="eliminar(item._id)" class="cart-remove">
                          <img src="/assets/icons/close.png" style="width: 15px;" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-5 d-flex justify-content-between flex-column flex-lg-row">
              <router-link to="/shop" class="btn btn-link text-muted">Continuar comprando</router-link>
              <router-link v-if="carrito.length > 0" to="/checkout" class="btn btn-dark">Proceder al pago</router-link>
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
                  <li v-if="envio == 0 && total < 100" class="order-summary-item"><span>Envío</span><span
                      class="text-uppercase">{{ convertCurrency(envio) }}</span></li>
                  <li v-else-if="total >= 100" class="order-summary-item"><span>Envío</span><span
                      class="text-uppercase"><strong>Gratis</strong></span></li>
                  <li v-else-if="envio > 0" class="order-summary-item"><span>Envío</span><span>{{ convertCurrency(envio)
                  }}</span></li>
                  <li class="order-summary-item border-0"><span>Total</span><strong class="order-summary-total">{{
                    convertCurrency(total + envio) }}</strong></li>
                </ul>
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

.cart-remove {
  cursor: pointer;
  opacity: 0.5;
}

.cart-remove:hover {
  opacity: 1;
}

</style>
<script>

import FooterBanner from '@/components/FooterBanner.vue';

import axios from 'axios';
import currency_formatter from 'currency-formatter';

export default {
  name: 'CarritoView',
  data() {
    return {
      carrito: [],
      total: 0,
      load_data: false,
      envio: 0
    }
  },
  components: {
    FooterBanner
  },
  methods: {
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
          }
          
          if (this.total >= 100) {
            this.envio = 0;
          } else if (this.total == 0) {
            this.envio = 0;
          } else if (this.total > 0 && this.total < 100) {
            this.envio = this.$envio;
          }
          
          this.load_data = false;
        });
      }
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
    }
  },
  beforeMount() {
    this.init_carrito();
  }
}

</script>
