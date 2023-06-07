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
                      Productos
                    </h1>

                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">

                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <a class="nav-link active">
                          Todos los productos
                        </a>
                      </li>
                      <li class="nav-item">
                        <router-link to="/productos/create" class="nav-link">Nuevo
                          producto</router-link>
                      </li>
                    </ul>

                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12">

                <!-- Files -->
                <div class="card" data-list="{&quot;valueNames&quot;: [&quot;name&quot;]}">
                  <div class="card-header">
                    <div class="input-group input-group-flush input-group-merge input-group-reverse">

                      <!-- Input -->
                      <input @keyup.enter="init_data()" v-model="filtro" class="form-control list-search" type="search"
                        placeholder="Buscar producto">

                      <!-- Prepend -->
                      <div @click="init_data()" class="input-group-text" style="cursor: pointer">
                        <span class="fe fe-search"></span>
                      </div>

                    </div>

                  </div>
                  <div class="card-body">
                    <template v-if="load_data">
                      <div>
                        <div class="row">
                          <div class="col-12 text-center">
                            <div class="spinner-border mt-5 mb-5" role="status">
                              <span class="visually-hidden">Cargando...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-if="!load_data">
                      <div>
                        <!-- List -->
                        <ul v-if="productos.length >= 1" id="my-table"
                          class="list-group list-group-lg list-group-flush list my-n4">
                          <li class="list-group-item" v-for="item in itemsForList">
                            <div class="row align-items-center">
                              <div class="col-auto">

                                <!-- Avatar -->
                                <router-link :to="{name: 'productos-edit', params: {id: item._id}}" class="avatar avatar-lg">
                                  <img :src="$url + '/obtener_portada_producto/' + item.portada" alt="..."
                                    class="avatar-img rounded">
                                </router-link>

                              </div>
                              <div class="col ms-n2">

                                <!-- Title -->
                                <h4 class="mb-1 name">
                                  <router-link :to="{name: 'productos-edit', params: {id: item._id}}">{{ item.titulo }}</router-link>
                                </h4>

                                <!-- Text -->
                                <p class="card-text small text-muted mb-1">
                                  {{ item.marca }} - {{ item.categoria }} &nbsp;
                                  <span v-if="!item.estado" class="item-score badge bg-danger-soft">Borrador</span>
                                  <span v-if="item.estado" class="item-score badge bg-success-soft">Publicado</span>
                                </p>

                                <!-- Time -->
                                <p class="card-text small text-muted">
                                  Creación <time datetime="24-04-2023">{{
                                    convertDate(item.createdAt) }}</time>
                                </p>

                              </div>
                              <div class="col-auto">
                                <span><b>{{ convertCurrency(item.precio) }}</b></span>

                              </div>
                              <div class="col-auto">

                                <!-- Dropdown -->
                                <div class="dropdown">
                                  <a href="#" class="dropdown-ellipses dropdown-toggle" role="button"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fe fe-more-vertical"></i>
                                  </a>
                                  <div class="dropdown-menu dropdown-menu-end">
                                    <router-link :to="{name: 'productos-edit', params: {id: item._id}}" class="dropdown-item">Editar</router-link>
                                    <router-link :to="{name: 'productos-galeria', params: {id: item._id}}" class="dropdown-item">Galería</router-link>
                                  </div>
                                </div>

                              </div>
                            </div> <!-- / .row -->
                          </li>
                        </ul>
                        <div v-else class="row justify-content-center">
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
                      </div>
                    </template>
                  </div>
                  <div class="card-footer">
                    <b-pagination v-model="currentPage" :total-rows="productos.length" :per-page="perPage"
                      aria-controls="my-table"></b-pagination>
                  </div>
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
import moment from 'moment';
import currency_formatter from 'currency-formatter';

export default {
  name: 'IndexProductoApp',
  data() {
    return {
      productos: [],
      filtro: '',
      load_data: false,
      currentPage: 1,
      perPage: 10,
      get itemsForList() {
        return this.productos.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
      }
    }
  },
  methods: {
    init_data() {
      this.load_data = true;
      axios.get(this.$url + '/listar_productos_admin/' + this.filtro, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token,
        }
      }).then((result) => {
        this.productos = result.data;
        this.load_data = false;
      });
    },

    convertDate(date) {
      return moment(date).format('DD-MM-YYYY');
    },

    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'EUR' });
    }
  },
  beforeMount() {
    this.init_data();
  },
  components: {
    SideBar
  }
}
</script>
