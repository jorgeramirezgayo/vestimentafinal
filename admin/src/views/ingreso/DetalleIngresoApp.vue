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
                        <router-link to="/ingresos" class="nav-link">
                          Todos los ingresos
                        </router-link>
                      </li>
                      <li class="nav-item">
                        <router-link to="/ingresos/create" class="nav-link">Nuevo ingreso</router-link>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link active">
                          Detalle de ingreso
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <!-- List group -->
                    <div class="list-group list-group-flush my-n3">
                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">

                            <!-- Title -->
                            <h4 class="mb-0">
                              Proveedor
                            </h4>

                          </div>
                          <div class="col-auto">

                            <p class="small text-muted mb-0">
                              {{ ingreso.proveedor }}
                            </p>

                          </div>
                        </div> <!-- / .row -->
                      </div>
                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">

                            <!-- Title -->
                            <h4 class="mb-0">
                              Comprobante
                            </h4>

                          </div>
                          <div class="col-auto">

                            <p class="small text-muted mb-0">
                              {{ ingreso.ncomprobante }}
                            </p>

                          </div>
                        </div> <!-- / .row -->
                      </div>
                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">

                            <!-- Title -->
                            <h4 class="mb-0">
                              Serie
                            </h4>

                          </div>
                          <div class="col-auto">

                            <!-- Text -->
                            <p v-if="ingreso.serie" class="text-muted mb-0">
                              # {{ ingreso.serie.toString().padStart(6, '000000') }}
                            </p>

                          </div>
                        </div> <!-- / .row -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="card">
                  <div class="card-body">

                    <!-- List group -->
                    <div class="list-group list-group-flush my-n3">
                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">

                            <!-- Title -->
                            <h4 class="mb-0">
                              Pago
                            </h4>

                          </div>
                          <div class="col-auto">

                            <p class="small text-muted mb-0">
                              {{ convertCurrency(ingreso.pago_total) }}
                            </p>

                          </div>
                        </div> <!-- / .row -->
                      </div>
                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">

                            <!-- Title -->
                            <h4 class="mb-0">
                              Fecha
                            </h4>

                          </div>
                          <div class="col-auto">

                            <!-- Text -->
                            <p class="text-muted mb-0">
                              {{ convertDate(ingreso.createdAt) }}
                            </p>

                          </div>
                        </div> <!-- / .row -->
                      </div>
                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">

                            <!-- Title -->
                            <h4 class="mb-0">
                              Documento
                            </h4>

                          </div>
                          <div class="col-auto">

                            <a :href="$url + '/obtener_comprobante_ingreso_admin/' + ingreso.documento" target="_blank" class="small text-muted mb-0">
                              <span class="badge bg-success">Abrir documento</span>
                            </a>

                          </div>
                        </div> <!-- / .row -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">

                <!-- Title -->
                <h4 class="card-header-title mb-0">
                  <b>Productos</b>
                </h4>

              </div>
              <div class="table-responsive">
                <table class="table table-sm table-nowrap card-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Variedad</th>
                      <th>Precio unitario</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody class="fs-base">
                    <tr v-for="item in detalles">
                      <td>
                        <span>{{ item.producto.titulo }}</span>
                      </td>
                      <td>
                        <span>{{ item.variedad.variedad }}</span>
                      </td>
                      <td>
                        <span>{{ convertCurrency(item.precio_unidad) }}</span>
                      </td>
                      <td>
                        <span>{{ item.cantidad }}</span>
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
import moment from 'moment';

export default {
  name: 'DetalleIngresoApp',
  components: {
    SideBar
  },
  data() {
    return {
      ingreso: {},
      detalles: []
    }
  },
  methods: {
    init_data() {
      axios.get(this.$url + '/obtener_detalles_ingreso_admin/' + this.$route.params.id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        this.ingreso = result.data.ingreso;
        this.detalles = result.data.detalles;
      });
    },
    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'EUR' });
    },
    convertDate(item) {
      return moment(item).format('DD/MM/YYYY');
    }
  },
  beforeMount() {
    this.init_data();
  }
}
</script>
