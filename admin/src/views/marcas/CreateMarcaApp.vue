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
                      Marcas
                    </h1>

                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">

                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link to="/marcas" class="nav-link">Todas las marcas</router-link>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link active">
                          Nueva marca
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-7">

              <div class="row">
                <div class="col-12 col-md-6">
                  <div class="form-group">
                    <label class="form-label">
                      Nombre de la marca
                    </label>
                    <input v-model="marca.titulo" type="text" class="form-control" placeholder="Nombre">
                  </div>
                </div>
              </div> <!-- / .row -->

              <!-- Button -->
              <button @click="crear_marca()" class="btn btn-primary">
                Crear marca
              </button>

            </div>
          </div>
        </div> <!-- / .row -->
      </div>
    </div>
  </div>
</template>

<script>

import SideBar from '@/components/SideBar.vue';

import axios from 'axios';

export default {
  name: 'CreateMarcaApp',
  components: {
    SideBar
  },
  data() {
    return {
      marca: {
        titulo: ''
      }
    }
  },
  methods: {
    crear_marca() {
      if (this.marca.titulo) {
        axios.post(this.$url + '/registro_marca_admin', this.marca, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.token
          }
        }).then(result => {
          if (result.data.data == undefined) {
            this.$notify({
              title: "ERROR",
              text: result.data.message,
              type: "error"
            });
          } else {
            this.$notify({
              title: "ÉXITO",
              text: "Se ha registrado una nueva marca.",
              type: "success"
            });

            this.$router.push({ name: 'marcas-index' });
          }
        }).catch((error) => {
          console.log(error);
        });
      } else {
        this.$notify({
          title: "ERROR",
          text: "Introduzca el nombre de la marca.",
          type: "error"
        });
      }
    }
  }
}
</script>
