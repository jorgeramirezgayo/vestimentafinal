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
                        <a class="nav-link active">Nuevo ingreso</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12 col-md-6">

                <!-- Last name -->
                <div class="form-group">

                  <!-- Label -->
                  <label class="form-label">
                    Proveedor
                  </label>
                  <small class="form-text text-muted">
                    Proveedor encargado del ingreso.
                  </small>
                  <!-- Input -->
                  <input v-model="ingreso.proveedor" type="text" class="form-control" placeholder="EndClothing">

                </div>

              </div>

              <div class="col-12 col-md-6">

                <!-- Last name -->
                <div class="form-group">

                  <!-- Label -->
                  <label class="form-label">
                    N° comprobante
                  </label>
                  <small class="form-text text-muted">
                    Número de la factura.
                  </small>
                  <!-- Input -->
                  <input v-model="ingreso.ncomprobante" type="text" class="form-control" placeholder="5DSF-000154">

                </div>

              </div>

              <div class="col-12 col-md-6">

                <!-- Last name -->
                <div class="form-group">

                  <!-- Label -->
                  <label class="form-label">
                    Pago
                  </label>
                  <small class="form-text text-muted">
                    Total pagado al proveedor.
                  </small>
                  <!-- Input -->
                  <input v-model="ingreso.pago_total" type="text" class="form-control" placeholder="500">

                </div>

              </div>

              <div class="col-12 col-md-6">

                <!-- Last name -->
                <div class="form-group">

                  <!-- Label -->
                  <label class="form-label">
                    Comprobante
                  </label>
                  <small class="form-text text-muted">
                    Subir comprobante del ingreso. Los formatos admitidos son jpg, jpeg, png, webp y pdf.
                  </small>
                  <!-- Input -->
                  <input @change="uploadComprobante($event)" type="file" class="form-control">

                </div>

              </div>
            </div>

            <hr class="my-5">

            <div class="row">

              <div class="col-md-12 mb-4">
                <h3><b>Productos del ingreso</b></h3>
              </div>

              <div class="col-12 col-md-6">

                <!-- First name -->
                <div class="form-group">

                  <!-- Label -->
                  <label class="form-label">
                    Producto
                  </label>
                  <small class="form-text text-muted">
                    Selección de un producto.
                  </small>
                  <!-- Input -->
                  <basic-select @select="producto_seleccionado" :options="productos" :selected-option="producto"
                    v-model="producto" placeholder="Selecciona un producto"><i class="fe fe-chevron-down"><p>Holaa</p></i></basic-select>

                </div>

              </div>

              <div class="col-12 col-md-6">

                <!-- First name -->
                <div class="form-group">

                  <!-- Label -->
                  <label class="form-label">
                    Variedad
                  </label>
                  <small class="form-text text-muted">
                    Selección de variedad.
                  </small>
                  <!-- Input -->
                  <select v-model="detalle.variedad" class="form-select mb-3">
                    <option value="" selected disabled>Seleccionar</option>
                    <option :value="item._id" v-for="item in variedades">{{ item.variedad }} - {{ item.stock }} unidades
                    </option>
                  </select>

                </div>

              </div>


              <div class="col-12 col-md-6">

                <!-- Phone -->
                <div class="form-group">

                  <!-- Label -->
                  <label class="form-label">
                    Precio unidad
                  </label>
                  <small class="form-text text-muted">
                    Precio por unidad pagado.
                  </small>
                  <!-- Input -->
                  <input v-model="detalle.precio_unidad" type="text" class="form-control mb-3" placeholder="0.00">

                </div>

              </div>
              <div class="col-12 col-md-6">

                <!-- Birthday -->
                <div class="form-group">

                  <!-- Label -->
                  <label class="form-label">
                    Cantidad total
                  </label>
                  <small class="form-text text-muted">
                    Cantidad total comprada.
                  </small>
                  <!-- Input -->
                  <input v-model="detalle.cantidad = 20" type="number" class="form-control mb-3" placeholder="0">

                </div>

              </div>

              <div class="col-md-12">

                <button @click="agregar_detalle()" class="btn btn-primary" style="margin-bottom: 1.8rem!important;">
                  Agregar
                </button>
              </div>
            </div> <!-- / .row -->

            <!-- Button -->
            <div class="card ">
              <div class="table-responsive mb-0">
                <table class="table table-sm table-nowrap card-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio unidad</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody v-if="detalles.length >= 1" class="fs-base">
                    <tr v-for="(item, index) in detalles">
                      <td>
                        {{ item.titulo_producto }}
                      </td>
                      <td>
                        {{ convertCurrency(item.precio_unidad) }}
                      </td>
                      <td>
                        {{ item.cantidad }}
                      </td>
                      <td>
                        {{ convertCurrency(item.precio_unidad * item.cantidad) }}
                      </td>
                      <td>
                        <button @click="quitarDetalle(index, item.precio_unidad * item.cantidad)"
                          class="btn btn-danger btn-sm">Quitar</button>
                      </td>
                    </tr>

                  </tbody>
                  <tbody v-else="detalles.length < 1" class="fs-base">
                    <tr>
                      <td class="text-center" colspan="5">
                        <span class="text-muted">No hay detalles en el ingreso.</span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="4"></td>
                      <td>{{ convertCurrency(total) }}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <button @click="registro_ingreso()" class="btn btn-primary mb-7">
              Ingresar datos
            </button>
          </div>
        </div> <!-- / .row -->
      </div>
    </div>
  </div>
</template>

<style>

.fe-chevron-down {
  font-size: 1rem;
  color: #95aac9;
  position: absolute;
  top: 11px;
  right: 10px;
}

</style>

<script>

import SideBar from '@/components/SideBar.vue';
import { BasicSelect } from 'vue-search-select';

import axios from 'axios';
import currency_formatter from 'currency-formatter';

export default {
  name: 'CreateIngresoApp',
  data() {
    return {
      ingreso: {
        proveedor: ''
      },
      detalle: {
        variedad: ''
      },
      detalles: [],
      comprobante: undefined,
      producto: {},
      productos: [],
      variedades: [],
      total: 0
    }
  },
  methods: {
    uploadComprobante($event) {
      let image;

      if ($event.target.files.length >= 1) {
        image = $event.target.files[0];
      }

      if (image.size <= 1000000) {
        if (image.type == "image/jpg" || image.type == "image/jpeg" || image.type == "image/png" || image.type == "image/webp" || image.type == "application/pdf") {
          this.comprobante = image;
          this.ingreso.documento = this.comprobante;
        } else {
          this.$notify({
            title: "ERROR",
            text: "El archivo debe ser una imagen. Los formatos admitidos son jpg, jpeg, png, webp y pdf.",
            type: "error"
          });
          this.ingreso.documento = undefined;
          this.comprobante = undefined;
        }
      } else {
        this.$notify({
          title: "ERROR",
          text: "La imagen debe pesar menos de 1MB.",
          type: "error"
        });
        this.ingreso.documento = undefined;
        this.comprobante = undefined;
      }
    },

    init_productos() {
      this.productos = [];

      axios.get(this.$url + '/listar_productos_activos_admin', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        for (let item of result.data) {
          this.productos.push({
            value: item._id,
            text: item.titulo
          })
        }
      })
    },

    producto_seleccionado(item) {
      this.producto = item;
      this.init_variedades(item.value);
      this.detalle.producto = item.value;
      this.detalle.titulo_producto = item.text;
    },

    init_variedades(id) {
      axios.get(this.$url + '/obtener_variedades_producto/' + id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        this.variedades = result.data;
      })
    },

    agregar_detalle() {
      if (!this.detalle.producto) {
        this.$notify({
          title: 'ERROR',
          text: 'Seleccione un producto.',
          type: 'error'
        });
      } else if (!this.detalle.variedad) {
        this.$notify({
          title: 'ERROR',
          text: 'Seleccione una variedad.',
          type: 'error'
        });
      } else if (!this.detalle.precio_unidad) {
        this.$notify({
          title: 'ERROR',
          text: 'Seleccione el precio por unidad.',
          type: 'error'
        });
      } else if (!this.detalle.cantidad) {
        this.$notify({
          title: 'ERROR',
          text: 'Seleccione una cantidad a ingresar.',
          type: 'error'
        });
      } else {
        this.detalles.push(this.detalle);
        let subtotal = this.detalle.precio_unidad * this.detalle.cantidad;
        this.total = this.total + subtotal;
        this.detalle = {
          variedad: ''
        };
        this.producto = {};
      }
    },
    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'EUR' });
    },
    quitarDetalle(idx, subtotal) {
      this.detalles.splice(idx, 1);
      this.total = this.total - subtotal;
    },
    registro_ingreso() {
      if (!this.ingreso.proveedor) {
        this.$notify({
          title: 'ERROR',
          text: 'Seleccione un proveedor.',
          type: 'error'
        });
      } else if (!this.ingreso.ncomprobante) {
        this.$notify({
          title: 'ERROR',
          text: 'Introduzca un número de comprobante.',
          type: 'error'
        });
      } else if (!this.ingreso.pago_total) {
        this.$notify({
          title: 'ERROR',
          text: 'Introduzca un monto total.',
          type: 'error'
        });
      } else if (!this.ingreso.documento) {
        this.$notify({
          title: 'ERROR',
          text: 'Suba el comprobante de ingreso.',
          type: 'error'
        });
      } else {
        let fm = new FormData();
        fm.append('proveedor', this.ingreso.proveedor);
        fm.append('ncomprobante', this.ingreso.ncomprobante);
        fm.append('ganancia', this.$ganancia);
        fm.append('pago_total', this.ingreso.pago_total);
        fm.append('documento', this.ingreso.documento);
        fm.append('detalles', JSON.stringify(this.detalles));

        axios.post(this.$url + '/registro_ingreso_admin', fm, {
          headers: {
            'Content-Type': 'multipart/form-data',
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
              title: "ÉXITO",
              text: "Se registró el ingreso.",
              type: "success"
            });

            this.$router.push({ name: 'ingresos-index' });
          }
        })
      }
    }
  },
  beforeMount() {
    this.init_productos();
  },
  mounted() {
    let dropdown = document.querySelector('.dropdown.icon');
    dropdown.classList.remove('dropdown', 'icon');
    dropdown.classList.add('fe', 'fe-chevron-down');
  },
  components: {
    SideBar,
    BasicSelect
  }
}
</script>
