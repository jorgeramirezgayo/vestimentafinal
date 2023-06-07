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
                        <router-link to="/colaboradores/create" class="nav-link active">Editar empleado</router-link>
                      </li>

                    </ul>

                  </div>
                </div>
              </div>
            </div>

            <template v-if="data">
              <div>
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
                  Guardar cambios
                </button>
              </div>
            </template>
            <template v-if="!data">
              <div>
                <ErrorNotFound />
              </div>
            </template>
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
import ErrorNotFound from "@/components/ErrorNotFound.vue";

export default {
  name: 'EditColaboradorApp',
  data() {
    return {
      colaborador: {
        rol: '',
      },
      id: this.$route.params.id,
      data: false
    }
  },
  methods: {
    init_data() {
      axios.get(this.$url + '/obtener_usuario_admin/' + this.id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        if (result.data == "") {
          this.data = false;
        } else {
          this.data = true;
          this.colaborador = result.data;
        }
      }).catch(error)
    },
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
        this.actualizarColaborador();
      }
    },
    actualizarColaborador() {
      axios.put(this.$url + '/actualizar_usuario_admin/' + this.id, this.colaborador, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$token
        }
      }).then(result => {
        this.$notify({
          title: "ÉXITO",
          text: "Se ha actualizado un colaborador.",
          type: "success"
        });

        this.$router.push({ name: 'colaboradores-index' });
      }).catch(error);
    }
  },
  components: {
    SideBar,
    ErrorNotFound
  },
  beforeMount() {
    this.init_data();
  }
}
</script>
    