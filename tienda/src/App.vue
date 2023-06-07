<template>
  <div id="app">
    <notifications position="bottom right"/>
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Header,
    Footer
  }
}

</script>

<style>

html {
  scroll-behavior: auto !important;
}

@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova Bold'), local('Proxima-Nova-Bold'),
      url('/public/assets/fonts/Fontspring-DEMO-proximanovaexcn-bold.woff2') format('woff2');
  font-weight: 400;
}

</style>
