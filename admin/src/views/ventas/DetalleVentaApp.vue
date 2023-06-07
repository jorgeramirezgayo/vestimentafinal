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
                      Ventas
                    </h1>

                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">

                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link to="/ventas" class="nav-link">
                          Todas las ventas
                        </router-link>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link active">
                          Detalle de venta
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
                              Pedido
                            </h4>

                          </div>
                          <div class="col-auto">

                            <p v-if="venta.serie" class="small text-muted mb-0">
                              # {{ venta.serie.toString().padStart(6, '000000') }}
                            </p>

                          </div>
                        </div> <!-- / .row -->
                      </div>
                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">

                            <!-- Title -->
                            <h4 class="mb-0">
                              Transaccion
                            </h4>

                          </div>
                          <div class="col-auto">

                            <p class="small text-muted mb-0">
                              {{ venta.transaccion }}
                            </p>

                          </div>
                        </div> <!-- / .row -->
                      </div>
                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">

                            <!-- Title -->
                            <h4 class="mb-0">
                              Cliente
                            </h4>

                          </div>
                          <div class="col-auto">

                            <!-- Text -->
                            <p v-if="venta.cliente" class="text-muted mb-0">
                              {{ venta.cliente.nombre }}
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
                              Subtotal
                            </h4>

                          </div>
                          <div class="col-auto">

                            <p class="small text-muted mb-0">
                              {{ convertCurrency(venta.total) }}
                            </p>

                          </div>
                        </div> <!-- / .row -->
                      </div>
                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">

                            <!-- Title -->
                            <h4 class="mb-0">
                              Envio
                            </h4>

                          </div>
                          <div class="col-auto">

                            <p class="small text-muted mb-0">
                              {{ convertCurrency(venta.envio) }}
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
                              {{ convertDate(venta.createdAt) }}
                            </p>

                          </div>
                        </div> <!-- / .row -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="table-responsive">
                <table class="table table-sm table-nowrap card-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio unitario</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody class="fs-base">
                    <tr v-for="item in itemsForList">
                      <td class="products-product">
                        <div class="d-flex align-items-center">

                          <!-- Image -->
                          <div class="avatar">
                            <img :src="$url + '/obtener_portada_producto/' + item.producto.portada"
                              class="avatar-img rounded me-3" alt="...">
                          </div>

                          <div class="ms-3">

                            <!-- Heading -->
                            <h4 class="fw-normal mb-1">{{ item.producto.titulo.substr(0, 25) }}</h4>

                            <!-- Text -->
                            <small class="text-muted">{{ item.variedad.variedad }}</small>

                          </div>

                        </div>
                      </td>
                      <td>
                        <p>{{ convertCurrency(item.precio_unidad) }}</p>
                      </td>
                      <td>
                        <p>{{ item.cantidad }}</p>
                      </td>
                      <td>
                        <span>{{ convertCurrency(item.subtotal) }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="card-footer">
                  <b-pagination v-model="currentPage" :total-rows="detalles.length" :per-page="perPage"
                    aria-controls="my-table"></b-pagination>
                </div>
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
  name: 'DetalleVentaApp',
  components: {
    SideBar
  },
  data() {
    return {
      venta: {},
      detalles: [],
      currentPage: 1,
      perPage: 10,
      get itemsForList() {
        return this.detalles.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
      }
    }
  },
  methods: {
    init_data() {
      axios.get(this.$url + '/obtener_detalles_venta_admin/' + this.$route.params.id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        this.venta = result.data.venta;
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
