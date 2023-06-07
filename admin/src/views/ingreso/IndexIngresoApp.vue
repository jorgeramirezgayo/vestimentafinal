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
                      Ingresos
                    </h1>

                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">

                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <a class="nav-link active">
                          Todos los ingresos
                        </a>
                      </li>
                      <li class="nav-item">
                        <router-link to="/ingresos/create" class="nav-link">Nuevo ingreso</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-5">
              <div class="col-9 d-flex">
                <input v-model="inicio" type="date" class="form-control" style="margin-right: 1rem" />
                <input v-model="fin" type="date" class="form-control" />
              </div>
              <div class="col">
                <button @click="buscar_ingresos()" class="btn btn-primary" style="width:100%">Buscar</button>
              </div>
            </div>

            <div class="card">
              <div class="table-responsive">
                <table class="table table-sm table-nowrap card-table">
                  <thead>
                    <tr>
                      <th>Proveedor</th>
                      <th>Serie</th>
                      <th>Pago</th>
                      <th>Documento</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody v-if="load_data">
                    <td colspan="5" class="text-center">
                      <div class="spinner-border mt-5 mb-5" role="status">
                        <span class="visually-hidden">Cargando...</span>
                      </div>
                    </td>
                  </tbody>
                  <tbody v-if="!load_data && ingresos.length == 0">
                    <tr>
                      <td colspan="4">
                        <div class="row justify-content-center">
                          <div class="col-12 col-md-6 col-xl-6 my-5">
                            <div class="text-center">
                              <!-- Heading -->
                              <h1 class="display-4 mb-3">
                                No se encontraron productos
                              </h1>

                              <!-- Subheading -->
                              <p class="text-muted mb-4">
                                No hay datos que mostrar
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-if="!load_data && ingresos.length >= 1" class="fs-base">
                    <tr v-for="item in ingresos">
                      <td>
                        <span>{{ item.proveedor }}</span>
                      </td>
                      <td>
                        <span>#{{ item.serie.toString().padStart(6, '000000') }}</span>
                      </td>
                      <td>
                        {{ convertCurrency(item.pago_total) }}
                      </td>
                      <td>
                        <a :href="$url + '/obtener_comprobante_ingreso_admin/' + item.documento" target="_blank">
                          <span class="badge bg-success">Abrir documento</span>
                        </a>
                      </td>
                      <td>
                        <router-link :to="{ name: 'ingresos-detalle', params: { id: item._id } }"
                          class="btn btn-primary btn-sm text-white">Ver detalles</router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
import currency_formatter from 'currency-formatter';

export default {
  name: 'IndexIngresoApp',
  components: {
    SideBar
  },
  data() {
    return {
      inicio: '',
      fin: '',
      ingresos: [],
      load_data: false
    }
  },
  methods: {
    init_data() {
      this.load_data = true;
      axios.get(this.$url + '/obtener_ingresos_admin', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        this.ingresos = result.data;
        this.load_data = false;
      });
    },
    buscar_ingresos() {
      if (!this.inicio) {
        this.$notify({
          title: "ERROR",
          text: "Ingrese la fecha de inicio.",
          type: "error"
        });
      } else if (!this.fin) {
        this.$notify({
          title: "ERROR",
          text: "Ingrese la fecha de fin.",
          type: "error"
        });
      } else {
        axios.get(this.$url + '/obtener_ingresos_por_fecha_admin/' + this.inicio + '/' + this.fin, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.token
          }
        }).then(result => {
          this.ingresos = result.data;
        });
      }
    },
    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'EUR' });
    }
  },
  beforeMount() {
    this.init_data();
  }
}
</script>
