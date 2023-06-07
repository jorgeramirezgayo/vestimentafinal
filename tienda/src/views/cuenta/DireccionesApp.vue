<template>
  <div>
    <section style="margin-top: 4rem;">
      <div class="container">
        <div class="row mb-5">
          <div>
            <div class="block">
              <!-- Invoice Address-->
              <div class="block-header">
                <h6 class="text-uppercase mb-0">Nueva dirección</h6>
              </div>
              <div class="block-body">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label class="form-label" for="nombre_invoice">Nombre</label>
                    <input v-model="direccion.nombre" class="form-control" type="text" name="nombre_invoice"
                      placeholder="Jorge" id="nombre_invoice">
                  </div>
                  <div class="form-group col-md-6">
                    <label class="form-label" for="apellidos_invoice">Apellidos</label>
                    <input v-model="direccion.apellidos" class="form-control" type="text" name="apellidos_invoice"
                      placeholder="Ramírez Gayo" id="apellidos_invoice">
                  </div>
                  <div class="form-group col-md-6">
                    <label class="form-label" for="dni_invoice">DNI</label>
                    <input v-model="direccion.dni" class="form-control" type="text" name="dni_invoice"
                      placeholder="01234567A" id="dni_invoice">
                  </div>
                  <div class="form-group col-md-6">
                    <label class="form-label" for="phonenumber_invoice">Teléfono</label>
                    <input v-model="direccion.telefono" class="form-control" type="text" name="phonenumber_invoice"
                      placeholder="698765432" id="phonenumber_invoice">
                  </div>
                  <div class="form-group col-md-6">
                    <label class="form-label" for="country_invoice">País</label>
                    <select v-model="direccion.pais" name="country_invoice" id="country_invoice" class="form-control">
                      <option value="" disabled selected>Seleccionar</option>
                      <option v-for="item in $paises" :value="item">{{ item }}</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label class="form-label" for="city_invoice">Ciudad</label>
                    <input v-model="direccion.ciudad" class="form-control" type="text" name="city_invoice"
                      placeholder="Madrid" id="city_invoice">
                  </div>
                  <div class="form-group col-md-6">
                    <label class="form-label" for="zip_invoice">Código postal</label>
                    <input v-model="direccion.codigo_postal" class="form-control" type="text" name="zip_invoice"
                      placeholder="28044" id="zip_invoice">
                  </div>
                  <div class="form-group col-md-6">
                    <label class="form-label" for="street_invoice">Dirección</label>
                    <input v-model="direccion.direccion" class="form-control" type="text" name="street_invoice"
                      placeholder="C/Mayor n3 2A" id="street_invoice">
                  </div>
                </div>
                <!-- /Invoice Address-->
              </div>
            </div>
            <div class="mb-4 mt-3 text-center">
              <button @click="crear_direccion()" class="btn btn-dark" type="button">Guardar cambios</button>
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
  name: 'DireccionesApp',
  data() {
    return {
      direccion: {
        pais: '',
      }
    }
  },
  methods: {
    crear_direccion() {
      if (!this.direccion.nombre) {
        console.log(this.direccion.nombre);
        this.$notify({
          title: "ERROR",
          text: 'Ingrese el nombre, por favor.',
          type: "error"
        });
      } else if (!this.direccion.apellidos) {
        this.$notify({
          title: "ERROR",
          text: 'Ingrese los apellidos, por favor.',
          type: "error"
        });
      } else if (!this.direccion.dni) {
        this.$notify({
          title: "ERROR",
          text: 'Ingrese el DNI, por favor.',
          type: "error"
        });
      } else if (!this.direccion.telefono) {
        this.$notify({
          title: "ERROR",
          text: 'Ingrese el teléfono, por favor.',
          type: "error"
        });
      } else if (!this.direccion.pais) {
        this.$notify({
          title: "ERROR",
          text: 'Ingrese el país, por favor.',
          type: "error"
        });
      } else if (!this.direccion.ciudad) {
        this.$notify({
          title: "ERROR",
          text: 'Ingrese la ciudad, por favor.',
          type: "error"
        });
      } else if (!this.direccion.codigo_postal) {
        this.$notify({
          title: "ERROR",
          text: 'Ingrese el código postal, por favor.',
          type: "error"
        });
      } else if (!this.direccion.direccion) {
        this.$notify({
          title: "ERROR",
          text: 'Ingrese la dirección, por favor.',
          type: "error"
        });
      } else {
        axios.post(this.$url + '/crear_direccion_cliente', this.direccion, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.token
          }
        }).then(result => {
          if (result.data.message) {
            this.$notify({
              title: "ERROR",
              text: result.data.message,
              type: "error"
            });
          } else {
            this.$notify({
              title: "EXITO",
              text: 'Se registró la dirección correctamente.',
              type: "success"
            });
          }
        });
      }
    },
    obtener_direccion() {
      axios.get(this.$url + '/obtener_direccion_cliente', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        if (result.data) {
          this.direccion = result.data;
        }
      });
    },
  },
  beforeMount() {
    this.obtener_direccion();
  }
}
</script>

