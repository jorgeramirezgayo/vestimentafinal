<template>
  <div>
    <section class="hero" style="margin-top: 4rem;">
      <div class="container">
        <!-- Hero Content-->
        <div v-if="estado == 'Pendiente'" class="hero-content pb-5 text-center">
          <h1 class="mb-5">{{ mensaje }}</h1>
          <div class="row">
            <div class="col-12 text-center">
              <div class="spinner-border mt-5 mb-5" role="status">
                <span class="visually-hidden">Cargando...</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Hero Content-->
        <div v-else-if="estado == 'Error'" class="hero-content text-center" style="min-height: 40vh; padding-bottom: 6rem;">
          <h1 class="mb-5">{{ mensaje }}</h1>
        </div>
        <!-- Hero Content-->
        <div v-else-if="estado == 'Exito'" class="hero-content text-center" style="min-height: 40vh; padding-bottom: 6rem;">
          <h1 class="mb-5">{{ mensaje }}</h1>
          <p class="lead mb-0">En unos segundos le redirigiremos al detalle de su compra.</p>
        </div>
        <!-- Hero Content-->
        <div v-else-if="estado == 'Fallo'" class="hero-content text-center" style="min-height: 40vh; padding-bottom: 6rem;">
          <h1 class="mb-5">{{ mensaje }}</h1>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'VerificacionView',
  data() {
    return {
      token: '',
      estado: 'Pendiente',
      mensaje: 'Validando el pago',

      venta: {},
      venta_detalles: [],
      total: 0,
      direccion: '',
      carrito: []
    }
  },
  methods: {
    init_carrito() {
      axios.get(this.$url + '/obtener_carrito_cliente', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then((result) => {
        this.total = 0;
        this.venta.cliente = JSON.parse(this.$store.state.user)._id;
        this.carrito = result.data

        for (var item of this.carrito) {
          let subtotal = item.producto.precio * item.cantidad;
          this.total = this.total + subtotal;
          this.venta_detalles.push({
            subtotal: subtotal,
            precio_unidad: item.producto.precio,
            cantidad: item.cantidad,
            cliente: this.venta.cliente,
            producto: item.producto._id,
            variedad: item.variedad._id
          });
        }
        this.venta.venta_detalles = this.venta_detalles;
        this.venta.total = this.total;
        this.venta.transaccion = this.token;

        if (this.total >= 100) {
            this.venta.envio = 0;
          } else if (this.total == 0) {
            this.venta.envio = 0;
          } else if (this.total > 0 && this.total < 100) {
            this.venta.envio = this.$envio;
          }
        // this.venta.direccion en obtener direccion
      });
    },
    obtener_direccion() {
      axios.get(this.$url + '/obtener_direccion_cliente', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        this.venta.direccion = result.data;
      });
    },
    validarVenta() {
      axios.get(this.$url + '/validar_id_venta_cliente/' + this.token, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then((result) => {
        if (result.data.length >= 1) {
          this.estado = 'Error';
          this.mensaje = 'El pago ya fue asignado a otra venta';
        } else if (result.data.length == 0) {
          this.createOrder();
        }
      });
    },
    createOrder() {
      axios.get(this.$url + '/capture_order/' + this.token, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(result => {
        if (result.data.message == 'Pago aceptado') {
          this.estado = 'Exito';
          this.mensaje = 'Gracias por su compra';
          this.crearVenta();
        } else {
          this.estado = 'Fallo';
          this.mensaje = 'Hubo un problema con el pago';
        }
      }).catch(error => {
        console.log(error);
      });
    },
    crearVenta() {
      axios.post(this.$url + '/crear_venta_cliente', this.venta, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        this.$socket.emit('send_cart', true);
        setTimeout(() => {
          this.$router.push({name: 'venta', params: {id: result.data._id}});
        }, 4000);
      })
    }
  },
  beforeMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.token = urlParams.get('token');
    this.validarVenta();

    this.obtener_direccion();
    this.init_carrito();
  }
}
</script>
