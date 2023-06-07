<template>
  <div>
    <SideBar />
    <div class="main-content">
      <div class="header">
        <div class="container-fluid">

          <!-- Body -->
          <div class="header-body">
            <div class="row align-items-end">
              <div class="col">

                <!-- Pretitle -->
                <h6 class="header-pretitle">
                  Inicio
                </h6>

                <!-- Title -->
                <h1 class="header-title">
                  Vista general
                </h1>

              </div>
            </div> <!-- / .row -->
          </div> <!-- / .header-body -->

        </div>
      </div> <!-- / .header -->

      <!-- CARDS -->
      <div class="container-fluid">
        <h2 class="header-title mb-4">
          ¡Bienvenido, {{ usuario.nombre }}!
        </h2>
        <div class="row">
          <div class="col-12 col-lg-6 col-xl">

            <!-- Value  -->
            <div class="card">
              <div class="card-body">
                <div class="row align-items-center gx-0">
                  <div class="col">

                    <!-- Title -->
                    <h6 class="text-uppercase text-muted mb-2">
                      Ventas
                    </h6>

                    <!-- Heading -->
                    <span class="h2 mb-0">
                      {{ convertCurrency(total) }}
                    </span>

                    <!-- Badge -->
                    <span class="badge bg-success-soft mt-n1">
                      +{{ total / 100 }}%
                    </span>
                  </div>
                  <div class="col-auto">

                    <!-- Icon -->
                    <span class="h2 fe fe-dollar-sign text-muted mb-0"></span>

                  </div>
                </div> <!-- / .row -->
              </div>
            </div>

          </div>
          <div class="col-12 col-lg-6 col-xl">

            <!-- Exit -->
            <div class="card">
              <div class="card-body">
                <div class="row align-items-center gx-0">
                  <div class="col">

                    <!-- Title -->
                    <h6 class="text-uppercase text-muted mb-2">
                      Productos
                    </h6>

                    <!-- Heading -->
                    <span class="h2 mb-0">
                      {{ productos.length }}
                    </span>

                  </div>
                  <div class="col-auto">

                    <!-- Icon -->
                    <span class="h2 fe fe-shopping-cart text-muted mb-0"></span>

                  </div>
                </div> <!-- / .row -->
              </div>
            </div>

          </div>
          <div class="col-12 col-lg-6 col-xl">

            <!-- Hours -->
            <div class="card">
              <div class="card-body">
                <div class="row align-items-center gx-0">
                  <div class="col">

                    <!-- Title -->
                    <h6 class="text-uppercase text-muted mb-2">
                      Marcas
                    </h6>

                    <!-- Heading -->
                    <span class="h2 mb-0">
                      {{ marcas.length }}
                    </span>

                  </div>
                  <div class="col-auto">

                    <!-- Icon -->
                    <span class="h2 fe fe-bookmark text-muted mb-0"></span>

                  </div>
                </div> <!-- / .row -->
              </div>
            </div>

          </div>
          <div class="col-12 col-lg-6 col-xl">

            <!-- Time -->
            <div class="card">
              <div class="card-body">
                <div class="row align-items-center gx-0">
                  <div class="col">

                    <!-- Title -->
                    <h6 class="text-uppercase text-muted mb-2">
                      Categorías
                    </h6>

                    <!-- Heading -->
                    <span class="h2 mb-0">
                      {{ categorias.length }}
                    </span>

                  </div>
                  <div class="col-auto">

                    <!-- Icon -->
                    <span class="h2 fe fe-tag text-muted mb-0"></span>

                  </div>
                </div> <!-- / .row -->
              </div>
            </div>

          </div>
        </div> <!-- / .row -->
        <div class="row">
          <div class="col-12">

            <!-- Sales -->
            <div class="card">
              <div class="card-header">

                <!-- Title -->
                <h4 class="card-header-title">
                  Ventas (últimos 14 días)
                </h4>

              </div>
              <div class="card-body">

                <!-- Chart -->
                <LineChart />

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
import LineChart from '@/components/LineChart.vue';

import axios from 'axios';
import currency_formatter from 'currency-formatter';

export default {
  name: 'InicioApp',
  components: {
    SideBar,
    LineChart
  },
  data() {
    return {
      usuario: {},
      ventaTotal: [],
      total: 0,
      marcas: [],
      productos: [],
      categorias: []
    }
  },
  methods: {
    init_data() {
      axios.get(this.$url + '/obtener_usuario_logeado_admin', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        this.usuario = result.data;
      });
      axios.get(this.$url + '/listar_productos_admin/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token,
        }
      }).then((result) => {
        this.productos = result.data;
      });
      axios.get(this.$url + '/listar_marcas_admin/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token,
        }
      }).then((result) => {
        this.marcas = result.data;
      });
      axios.get(this.$url + '/listar_categorias_admin/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token,
        }
      }).then((result) => {
        this.categorias = result.data;
      });
    },
    obtener_beneficio_total() {
      axios.get(this.$url + '/obtener_total_venta_por_dia_ultimos_14_dias', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        result.data.ventaTotales.map(venta => {
          this.ventaTotal.push(venta.ventaTotal);
        });
        this.total = this.ventaTotal.reduce((total, venta) => total + venta, 0);
      });
    },
    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'EUR' });
    }
  },
  beforeMount() {
    this.init_data();
    this.obtener_beneficio_total();
  }
}
</script>
