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
                        <a class="nav-link active">
                          Todas las marcas
                        </a>
                      </li>
                      <li class="nav-item">
                        <router-link to="/marcas/create" class="nav-link">Nueva
                          marca</router-link>
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
                        placeholder="Buscar marca">

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
                      <div v-if="marcas.length >= 1">
                        <div class="letras-container" v-for="letra in letras" :key="letra">
                          <h2>{{ letra }}</h2>
                          <ul>
                            <li class="col-12 col-md-6 col-xl-4 li-letra" v-for="marca in marcasFiltradas(letra)" :key="marca">
                              <router-link :to="{ name: 'marcas-edit', params: { id: marca._id } }"
                                  class="dropdown-item">{{ marca.titulo }}</router-link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div v-else class="row justify-content-center">
                          <div class="col-12 col-md-6 col-xl-6 my-5">
                            <div class="text-center">
                              <!-- Heading -->
                              <h1 class="display-4 mb-3">
                                No se encontraron marcas
                              </h1>

                              <!-- Subheading -->
                              <p class="text-muted mb-4">
                                No hay datos que mostrar
                              </p>
                            </div>
                          </div>
                        </div>
                    </template>
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

<style scoped>

.letras-container > h2 {
  font-size: 4.28571rem;
  padding: 0.375rem 1.5rem;
}

.letras-container > ul {
    list-style:none;
}
.letras-container > ul, li {
    margin: 0;
    padding: 0;
}

.letras-container > li {
  display: inline-block;
}

.li-letra {
  display: inline-block;
}

</style>

<script>

import SideBar from '@/components/SideBar.vue';
import axios from 'axios';

export default {
  name: 'IndexMarcaApp',
  data() {
    return {
      marcas: [],
      filtro: '',
      load_data: false,
    }
  },
  computed: {
    letras() {
      // Obtiene todas las letras distintas de la lista de marcas
      return [...new Set(this.marcas.map(marca => marca.titulo[0]))].sort();
    }
  },
  methods: {
    init_data() {
      this.load_data = true;
      axios.get(this.$url + '/listar_marcas_admin/' + this.filtro, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token,
        }
      }).then((result) => {
        this.marcas = result.data;
        this.load_data = false;
      });
    },
    marcasFiltradas(letra) {
      // Filtra las marcas que comienzan con la letra actual
      return this.marcas.filter(marca => marca.titulo[0] === letra);
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
