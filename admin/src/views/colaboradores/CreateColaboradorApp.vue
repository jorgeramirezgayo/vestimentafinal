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
                      Empleados
                    </h1>

                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">

                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link to="/colaboradores" class="nav-link">Todos los empleados</router-link>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link active">
                          Nuevo empleado
                        </a>

                      </li>

                    </ul>

                  </div>
                </div>
              </div>
            </div>

            <!-- Form -->
            <div class="row">
              <div class="col-12 col-md-6">

                <!-- First name -->
                <div class="form-group">

                  <!-- Label -->
                  <label class="form-label">
                    Nombre
                  </label>

                  <!-- Input -->
                  <input v-model="colaborador.nombre" type="text" class="form-control" placeholder="Jorge">

                </div>

              </div>
              <div class="col-12 col-md-6">

                <!-- Last name -->
                <div class="form-group">

                  <!-- Label -->
                  <label class="form-label">
                    Apellidos
                  </label>

                  <!-- Input -->
                  <input v-model="colaborador.apellidos" type="text" class="form-control" placeholder="Ramírez Gayo">

                </div>

              </div>
              <div class="col-12">

                <!-- Email address -->
                <div class="form-group">

                  <!-- Label -->
                  <label class="mb-1">
                    Correo electrónico
                  </label>

                  <!-- Input -->
                  <input v-model="colaborador.email" type="email" class="form-control" placeholder="jorge@gmail.es">

                </div>

              </div>

              <div class="col-12 col-md-6">

                <!-- Birthday -->
                <div class="form-group">

                  <!-- Label -->
                  <label class="form-label">
                    Cargo
                  </label>

                  <!-- Input -->
                  <select v-model="colaborador.rol" name="" class="form-select" id="">
                    <option value="" disabled selected>Seleccionar</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Inventariado">Inventariado</option>
                  </select>
                </div>

              </div>

            </div> <!-- / .row -->

            <!-- Divider -->

            <hr class="my-5">

            <!-- Button -->
            <button @click="validar()" type="button" class="btn btn-primary">
              Crear colaborador
            </button>
            <br><br>

          </div>
        </div> <!-- / .row -->
      </div>
    </div>
  </div>
</template>
  
<script>

import axios from "axios";

import SideBar from "@/components/SideBar.vue";

export default {
  name: 'CreateColaboradorApp',
  data() {
    return {
      colaborador: {
        rol: '',
      }
    }
  },
  methods: {
    validar() {
      if (!this.colaborador.nombre) {
        this.$notify({
          title: "ERROR",
          text: "Introduzca el nombre.",
          type: "error"
        });
      } else if (!this.colaborador.apellidos) {
        this.$notify({
          title: "ERROR",
          text: "Introduzca los apellidos.",
          type: "error"
        });
      } else if (!this.colaborador.email) {
        this.$notify({
          title: "ERROR",
          text: "Introduzca el email.",
          type: "error"
        });
      } else if (!this.colaborador.rol) {
        this.$notify({
          title: "ERROR",
          text: "Seleccione un cargo.",
          type: "error"
        });
      } else if (this.colaborador.nombre.length > 50 || this.colaborador.apellidos.length > 50 || this.colaborador.email.length > 50) {
        this.$notify({
          title: "ERROR",
          text: "Introduzca menos de 50 caracteres.",
          type: "error"
        });
      } else {
        this.crearColaborador();
      }
    },
    crearColaborador() {
      axios.post(this.$url + '/registro_usuario_admin', this.colaborador, {
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
            text: "Se ha registrado un nuevo colaborador.",
            type: "success"
          });

          this.$router.push({ name: 'colaboradores-index' });
        }
      }).catch(error);
    }
  },
  components: {
    SideBar
  }
}
</script>
  