<template>
  <div>
    <section style="margin: 4rem 0;">
      <div class="container">
        <div class="hero-content text-center">
          <h1 class="hero-heading" style="font-size: 2rem;">Mis pedidos</h1>
        </div>
        <div class="row">
          <div>
            <table class="table table-borderless table-hover table-responsive-md">
              <thead class="bg-light text-center">
                <tr>
                  <th class="py-4 text-uppercase text-sm">Pedido</th>
                  <th class="py-4 text-uppercase text-sm">Fecha</th>
                  <th class="py-4 text-uppercase text-sm">Total</th>
                  <th class="py-4 text-uppercase text-sm"></th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="item in itemsForList">
                  <th class="py-4 align-middle"># {{ item.serie.toString().padStart(6, '000000') }}</th>
                  <td class="py-4 align-middle">{{ item.day }}/{{ item.month }}/{{ item.year }}</td>
                  <td class="py-4 align-middle">{{ convertCurrency(item.total) }}</td>
                  <td class="py-4 align-middle"><router-link :to="{ name: 'venta', params: { id: item._id } }"
                      class="btn btn-outline-dark btn-sm">Ver detalles</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <b-pagination v-model="currentPage" :total-rows="ventas.length" :per-page="perPage"
                aria-controls="my-table"></b-pagination>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import axios from 'axios';
import currency_formatter from 'currency-formatter';

export default {
  name: 'VentaIndexApp',
  data() {
    return {
      ventas: [],

      currentPage: 1,
      perPage: 10,
      get itemsForList() {
        return this.ventas.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
      },
    }
  },
  methods: {
    init_ventas() {
      axios.get(this.$url + '/obtener_ventas_cliente', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.$store.state.token
        }
      }).then(result => {
        this.ventas = result.data
      })
    },
    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'EUR' });
    }
  },
  beforeMount() {
    this.init_ventas();
  }
}
</script>
