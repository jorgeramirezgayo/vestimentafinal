<template>
  <div id="app">
    <!-- <SideBar/> -->
    <notifications position="bottom right"/>
    <router-view/>
  </div>
</template>

<script>

import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    SideBar
  }
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}

@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova Bold'), local('Proxima-Nova-Bold'),
      url('/public/assets/fonts/Fontspring-DEMO-proximanovaexcn-bold.woff2') format('woff2');
  font-weight: 400;
}

a{
  color: #6e84a3 !important;
}
</style>
