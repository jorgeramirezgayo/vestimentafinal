<template>
  <div>
    <div v-if="load_data" style="height: 70vh; margin-top: 4rem;">
      <h1 class="text-center">Cargando</h1>
      <div class="row h-100">
        <div class="col-12 text-center d-flex align-items-center justify-content-center">
          <div class="spinner-border mt-5 mb-5" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!load_data" style="margin-top: 4rem;">
      <div v-if="!acceso">
        <section class="hero">
          <div class="container">
            <!-- Hero Content-->
            <div class="hero-content pb-5 text-center">
              <h1 class="mb-5">No tienes acceso a la venta</h1>
              <div class="row">
                <div class="col-xl-8 offset-xl-2">
                  <p class="lead mb-0">As am hastily invited settled at limited civilly fortune me. Really spring in
                    extent an by. Judge but built party world. Of so am he remember although required. Bachelor unpacked
                    be advanced at. Confined in declared marianne is vicinity. </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div v-if="acceso">
        <!-- Hero Section-->
        <section class="hero">
          <div class="container">
            <!-- Hero Content-->
            <div class="hero-content pb-5 text-center">
              <h1 class="hero-heading" style="font-size: 2rem;">Pedido #{{ venta.serie.toString().padStart(6, '000000') }}</h1>
              <div class="row">
                <div class="col-xl-8 offset-xl-2">
                  <p class="lead text-muted">El pedido #{{ venta.serie.toString().padStart(6, '000000') }} se realizó el <strong>{{ venta.day }}/{{ venta.month }}/{{ venta.year }}</strong> y actualmente se encuentra
                    <strong>en preparación.</strong>
                  </p>
                  <p class="text-muted">Si tiene alguna pregunta, nuestro servicio de atención al cliente está disponible las 24 horas del día, los 7 días de la semana.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="container">
            <div class="row">
              <div>
                <div class="cart">
                  <div class="cart-wrapper">
                    <div class="cart-header text-center">
                      <div class="row">
                        <div class="col-6">Productos</div>
                        <div class="col-2">Precio</div>
                        <div class="col-2">Cantidad</div>
                        <div class="col-2">Total</div>
                      </div>
                    </div>
                    <div class="cart-body">
                      <!-- Product-->
                      <div v-for="item in detalles" class="cart-item">
                      <div class="row d-flex align-items-center text-center">
                        <div class="col-6">
                          <div class="d-flex align-items-center">
                            <router-link :to="{ name: 'show-producto', params: { slug: item.producto.slug } }"
                              class="text-uppercase text-dark">
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
                <div class="row my-5">
                  <div class="col-md-6">
                    <div class="block mb-5">
                      <div class="block-header">
                        <h6 class="text-uppercase mb-0">Detalles de compra</h6>
                      </div>
                      <div class="block-body bg-light pt-1">
                        <p class="text-sm">Los gastos de envío se calculan en función del valor de la compra.</p>
                        <ul class="order-summary mb-0 list-unstyled">
                          <li class="order-summary-item"><span>Subtotal</span><span>{{ convertCurrency(venta.total) }}</span></li>
                          <li class="order-summary-item"><span>Envío</span><span>{{ convertCurrency(venta.envio) }}</span></li>
                          <li class="order-summary-item border-0"><span>Total</span><strong
                              class="order-summary-total">{{ convertCurrency(venta.total + venta.envio) }}</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="block-header">
                      <h6 class="text-uppercase mb-0">Información del cliente</h6>
                    </div>
                    <div class="block-body bg-light pt-1">
                      <p>{{ venta.cliente.nombre }} {{ venta.cliente.apellidos }}<br>{{ venta.cliente.email }}<br>{{ venta.direccion.telefono }}<br>{{ venta.direccion.dni }}</p>
                    </div>
                    <div class="block-header">
                      <h6 class="text-uppercase mb-0">Dirección de entrega</h6>
                    </div>
                    <div class="block-body bg-light pt-1">
                      <p>{{ venta.direccion.nombre }} {{ venta.direccion.apellidos }}<br>{{ venta.direccion.direccion }}<br>{{ venta.direccion.codigo_postal }} {{ venta.direccion.ciudad }}<br><strong>{{ venta.direccion.pais }}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import currency_formatter from 'currency-formatter';

export default {
  name: 'VentaDetalleApp',
  data() {
    return {
      venta: {},
      detalles: [],
      acceso: false,
      load_data: true
    }
  },
  methods: {
    init_venta() {
      this.load_data = true;
      axios.get(this.$url + '/obtener_informacion_venta/' + this.$route.params.id, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.$store.state.token
        }
      }).then(result => {
        if (result.data.message) {
          this.acceso = false;
        } else {
          this.acceso = true;
          this.venta = result.data.venta;
          this.detalles = result.data.detalles;
        }

        this.load_data = false;
      })
    },
    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'EUR' });
    }
  },
  beforeMount() {
    this.init_venta();
  }
}

</script>
