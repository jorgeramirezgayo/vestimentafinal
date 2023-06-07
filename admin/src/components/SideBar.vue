<template>
  <nav class="navbar navbar-vertical fixed-start navbar-expand-md navbar-light" id="sidebar">
    <div class="container-fluid">

      <!-- Toggler -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse"
        aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Brand -->
      <router-link to="/inicio" class="titulo">FINAL
        <div style="width: 7px; height: 7px; background-color: black; display: inline-block;"></div>
      </router-link>

      <!-- User (xs) -->
      <div class="navbar-user d-md-none" style="width: 28px;"></div>

      <!-- Collapse -->
      <div class="collapse navbar-collapse" id="sidebarCollapse">

        <!-- Navigation -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/inicio" active-class="active" class="nav-link">
              <i class="fe fe-home"></i> Inicio
            </router-link>
          </li>
        </ul>

        <hr class="navbar-divider my-3">
        <h6 class="navbar-heading">
          Control
        </h6>

        <ul class="navbar-nav mb-md-4">
          <li class="nav-item">
            <router-link to="/colaboradores" active-class="active" class="nav-link">
              <i class="fe fe-user"></i> Empleados
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/productos" active-class="active" class="nav-link">
              <i class="fe fe-shopping-cart"></i> Productos
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/marcas" active-class="active" class="nav-link">
              <i class="fe fe-bookmark"></i> Marcas
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/categorias" active-class="active" class="nav-link">
              <i class="fe fe-tag"></i> Categorías
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ingresos" active-class="active" class="nav-link">
              <i class="fe fe-folder"></i> Ingreso
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ventas" active-class="active" class="nav-link">
              <i class="fe fe-shopping-bag"></i> Ventas
            </router-link>
          </li>
        </ul>

        <hr class="navbar-divider my-3">

        <ul class="navbar-nav mb-md-4">
          <li class="nav-item">
            <a @click="logout()" class="nav-link" style="cursor: pointer;">
              <i class="fe fe-log-out"></i> Cerrar sesión
            </a>
          </li>
        </ul>
      </div> <!-- / .navbar-collapse -->
    </div>
  </nav>
</template>

<style scoped>
.titulo {
    width: 100%;
    display: inline-block;
    margin-top: 1rem;
    margin-bottom: 2rem;
    font-family: 'Proxima Nova' !important;
    font-weight: 400;
    color: black !important;
    letter-spacing: 3px;
    font-size: 3rem;
    line-height: 3rem;
    cursor: pointer;
}
</style>
<script>
export default {
  name: 'SideBar',
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'login' });
    }
  }
}
</script>
  