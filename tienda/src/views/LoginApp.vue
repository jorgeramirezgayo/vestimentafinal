<template>
  <div>
    <!-- Hero Section-->
    <section class="hero" style="border-bottom: 1px solid rgb(242, 242, 242);">
      <div class="container">
        <!-- Hero Content-->
        <div class="hero-content mt-4 text-center">
          <h2 class="hero-heading"
            style="font-size: calc(1.26rem + .12vw); letter-spacing: 0.1em; font-weight: 700; line-height: 1.1; margin-bottom: 2rem;">
            Acceso</h2>
        </div>
      </div>
    </section>
    <!-- customer login-->
    <section>
      <div class="container mt-4">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="block">
              <div class="block-header">
                <h6 class="text-uppercase mb-0">Iniciar sesión</h6>
              </div>
              <div class="block-body">
                <form action="customer-orders.html" method="get">
                  <div class="mb-4">
                    <label class="form-label" for="email1">Correo electrónico</label>
                    <input v-model="email" class="form-control" id="email1" type="text" placeholder="jorge@gmail.es"
                      autocomplete="off">
                  </div>
                  <div class="mb-4">
                    <label class="form-label" for="password1">Contraseña</label>
                    <input v-model="password" class="form-control" id="password1" type="password" placeholder="Contraseña"
                      autocomplete="off">
                  </div>
                  <div class="mb-4 text-center">
                    <button @click="login()" class="btn btn-outline-dark" type="button">Acceder</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="block">
              <div class="block-header">
                <h6 class="text-uppercase mb-0">Nueva cuenta</h6>
              </div>
              <div class="block-body">
                <form action="customer-orders.html" method="get">
                  <div class="mb-4">
                    <label class="form-label" for="name">Nombre completo</label>
                    <input v-model="cliente.nombre" class="form-control" id="name" type="text"
                      placeholder="Jorge Ramírez Gayo">
                  </div>
                  <div class="mb-4">
                    <label class="form-label" for="email">Correo electrónico</label>
                    <input v-model="cliente.email" class="form-control" id="email" type="text"
                      placeholder="jorge@gmail.es">
                  </div>
                  <div class="mb-4">
                    <label class="form-label" for="password">Contraseña</label>
                    <input v-model="cliente.password" class="form-control" id="password" type="password"
                      placeholder="Contraseña">
                  </div>
                  <div class="mb-4 text-center">
                    <button @click="validar_registro()" class="btn btn-outline-dark" type="button">Registrar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'LoginApp',
  data() {
    return {
      cliente: {},

      email: '',
      password: ''
    }
  },
  methods: {
    validar_registro() {
      if (!this.cliente.nombre) {
        this.$notify({
          title: "ERROR",
          text: 'Ingrese su nombre, por favor.',
          type: "error"
        });
      } else if (!this.cliente.email) {
        this.$notify({
          title: "ERROR",
          text: 'Ingrese un correo electrónico, por favor.',
          type: "error"
        });
      } else if (!this.cliente.password) {
        this.$notify({
          title: "ERROR",
          text: 'Ingrese una contraseña, por favor.',
          type: "error"
        });
      } else {
        axios.post(this.$url + '/registro_cliente_ecommerce', this.cliente, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(result => {
          if (result.data.message) {
            this.$notify({
              title: "ERROR",
              text: result.data.message,
              type: "error"
            });
          } else {
            let data = {
              email: this.cliente.email,
              password: this.cliente.password
            }

            axios.post(this.$url + '/login_cliente', data, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(result => {
              if (result.data.message) {
                this.$notify({
                  title: "ERROR",
                  text: result.data.message,
                  type: "error"
                });
              } else {
                this.$store.dispatch('saveToken', result.data.token);
                this.$store.dispatch('saveUser', JSON.stringify(result.data.cliente));
                this.$router.push({ name: 'home' });
                this.$socket.emit('send_cart', true);
              }
            })
          }
        })
      }
    },
    login() {
      if (!this.email) {
        this.$notify({
          title: "ERROR",
          text: 'Ingrese el correo electrónico, por favor.',
          type: "error"
        });
      } else if (!this.password) {
        this.$notify({
          title: "ERROR",
          text: 'Ingrese la contraseña',
          type: "error"
        });
      } else {
        let data = {
          email: this.email,
          password: this.password
        }

        axios.post(this.$url + '/login_cliente', data, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(result => {
          if (result.data.message) {
            this.$notify({
              title: "ERROR",
              text: result.data.message,
              type: "error"
            });
          } else {
            this.$store.dispatch('saveToken', result.data.token);
            this.$store.dispatch('saveUser', JSON.stringify(result.data.cliente));
            this.$router.push({ name: 'home' });
            this.$socket.emit('send_cart', true);
          }
        })
      }
    }
  },
  beforeMount() {
    if (this.$store.state.token) {
      this.$router.push({ name: 'home' });
    }
  }
}
</script>
