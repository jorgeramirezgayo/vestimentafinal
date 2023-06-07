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
                        <a class="nav-link active">
                          Todos los empleados
                        </a>
                      </li>
                      <li class="nav-item">
                        <router-link to="/colaboradores/create" class="nav-link">Nuevo empleado</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="tab-content">
              <div class="tab-pane fade show active" id="contactsListPane" role="tabpanel"
                aria-labelledby="contactsListTab">

                <!-- Card -->
                <div class="card"
                  data-list='{"valueNames": ["item-name", "item-title", "item-email", "item-phone", "item-score", "item-company"], "page": 10, "pagination": {"paginationClass": "list-pagination"}}'
                  id="contactsList">
                  <div class="card-header">
                    <div class="row align-items-center">
                      <div class="col">

                        <div class="input-group input-group-flush input-group-merge input-group-reverse">
                          <input @keyup.enter="filtrar()" v-model="filtro" class="form-control list-search" type="search"
                            placeholder="Buscar colaborador">
                          <span class="input-group-text">
                            <i class="fe fe-search"></i>
                          </span>
                        </div>

                      </div>

                    </div> <!-- / .row -->
                  </div>
                  <div class="table-responsive">
                    <table class="table table-sm table-hover table-nowrap card-table">
                      <thead>
                        <tr>

                          <th>
                            <a class="list-sort text-muted">Nombre</a>
                          </th>
                          <th>
                            <a class="list-sort text-muted">Rol</a>
                          </th>
                          <th>
                            <a class="list-sort text-muted">Email</a>
                          </th>
                          <th>
                            <a class="list-sort text-muted">Estado</a>
                          </th>
                          <th>
                            <a class="list-sort text-muted">Acciones</a>
                          </th>
                        </tr>
                      </thead>
                      <paginate tag="tbody" ref="colaboradores" name="colaboradores" :list="colaboradores" :per="perPage"
                        class="list fs-base">
                        <tr v-if="!load_data" v-for="item in paginated('colaboradores')">

                          <td>

                            <!-- Avatar -->
                            <i class="fe fe-user"></i><a class="item-name text-reset" style="margin-left: 10px;">{{
                              item.nombre }} {{ item.apellidos }}</a>

                          </td>
                          <td>

                            <!-- Text -->
                            <span class="item-title"> {{ item.rol }}</span>

                          </td>
                          <td>

                            <!-- Email -->
                            <a class="item-email text-reset"> {{ item.email }}</a>

                          </td>
                          <td>

                            <!-- Badge -->
                            <span v-if="!item.estado" class="item-score badge bg-danger-soft">Desactivado</span>
                            <span v-if="item.estado" class="item-score badge bg-success-soft">Activo</span>

                          </td>
                          <td class="text-end">

                            <!-- Dropdown -->
                            <div class="dropdown">
                              <a class="dropdown-ellipses dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fe fe-more-vertical"></i>
                              </a>
                              <div class="dropdown-menu dropdown-menu-end">
                                <router-link :to="{ name: 'colaboradores-edit', params: { id: item._id } }"
                                  class="dropdown-item">Editar</router-link>
                                <a @click="eliminar(item._id, item.estado)" style="cursor: pointer" class="dropdown-item">
                                  <span v-if="item.estado">Desactivar</span>
                                  <span v-if="!item.estado">Activar</span>
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </paginate>
                      <tr v-if="load_data">
                        <td colspan="5" class="text-center">
                          <div class="spinner-border mt-5 mb-5" role="status">
                            <span class="visually-hidden">Cargando...</span>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="card-footer d-flex justify-content-between">

                    <!-- Pagination (prev) -->
                    <ul class="list-pagination-prev pagination pagination-tabs card-pagination">
                      <li class="page-item">
                        <a @click="goPrev()" class="page-link ps-0 pe-4 border-end" href="#">
                          <i class="fe fe-arrow-left me-1"></i> Anterior
                        </a>
                      </li>
                    </ul>

                    <!-- Pagination -->
                    <paginate-links @change="onLangsPageChange" for="colaboradores"
                      :classes="{ 'ul': ['list-pagination', 'pagination', 'pagination-tabs', 'card-pagination'], 'a': ['page'] }"></paginate-links>

                    <!-- Pagination (next) -->
                    <ul class="list-pagination-next pagination pagination-tabs card-pagination">
                      <li class="page-item">
                        <a @click="goNext()" class="page-link ps-4 pe-0 border-start" href="#">
                          Siguiente <i class="fe fe-arrow-right ms-1"></i>
                        </a>
                      </li>
                    </ul>
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

import SideBar from "@/components/SideBar.vue";

import axios from "axios";
import store from '@/store/index';

export default {
  name: 'IndexColaboradorApp',
  data() {
    return {
      colaboradores: [],
      colaboradores_const: [],
      paginate: ['colaboradores'],
      currentPage: 1,
      perPage: 10,
      filtro: '',
      load_data: false
    }
  },
  components: {
    SideBar
  },
  methods: {
    onLangsPageChange(toPage, fromPage) {
      this.currentPage = toPage;
    },
    goPrev() {
      if (this.currentPage > 1) {
        this.$refs.colaboradores.goToPage(this.currentPage--);
      } else {
        this.$refs.colaboradores.goToPage(1);
      }
    },
    goNext() {
      if (this.currentPage <= Math.ceil(this.colaboradores.length / this.perPage)) {
        this.$refs.colaboradores.goToPage(this.currentPage++);
      } else {
        this.$refs.colaboradores.goToPage(Math.ceil(this.colaboradores.length / this.perPage));
      }
    },
    filtrar() {
      let term = new RegExp(this.filtro, 'i');
      // this.colaboradores = this.colaboradores_const.filter(item => term.test(item.nombre) || term.test(item.apellidos) || term.test(item.email));
      this.init_data();
    },
    init_data() {
      this.load_data = true;
      axios.get(this.$url + "/listar_usuario_admin/" + this.filtro, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': store.state.token
        }
      }).then((result) => {
        this.colaboradores = result.data;
        this.colaboradores_const = this.colaboradores;
        this.load_data = false;
      }).catch((error) => {
        console.log(error);
      })
    },
    eliminar(id, estado) {
      axios.put(this.$url + "/cambiar_estado_usuario_admin/" + id, { estado: estado }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$token
        }
      }).then(result => {
        this.init_data();
        this.$notify({
          title: "ÉXITO",
          text: "Se cambió el estado del colaborador.",
          type: "success"
        });
      });
    }
  },
  beforeMount() {
    this.init_data();
  }
}
</script>
  