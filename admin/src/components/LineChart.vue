<script>

import { Line } from 'vue-chartjs';

import axios from 'axios';

export default {
  extends: Line,
  data() {
    return {
      fecha: [],
      total: []
    }
  },
  methods: {
    init_data() {
      axios.get(this.$url + '/obtener_total_venta_por_dia_ultimos_14_dias', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then(result => {
        result.data.ventaTotales.map(venta => {
          this.total.push(venta.ventaTotal);
        });
      })
    }
  },
  beforeMount() {
    this.init_data();
  },
  mounted() {
    setTimeout(() => {
      const currentDate = new Date();

      const labels = [];
      for (let i = 13; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - i);
        const month = date.toLocaleString("default", { month: "short" }).charAt(0).toUpperCase() + date.toLocaleString("default", { month: "short" }).slice(1);
        const day = date.getDate();
        const label = `${month} ${day}`;
        labels.push(label);
      }

      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: labels,
            data: this.total,
            borderColor: "rgba(44, 123, 229, 1)",
            backgroundColor: "rgba(75, 192, 192, 0)",
            pointBackgroundColor: "rgba(44, 123, 229, 1)",
            pointBorderColor: "rgba(44, 123, 229, 1)",
            pointBorderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointHitRadius: 10,
            lineTension: 0.4
          }
        ]
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value, index, values) {
                return value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
              }
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            },
            label: function (tooltipItem, data) {
              const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              const formattedValue = value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
              return formattedValue;
            }
          }
        }
      };

      this.renderChart(this.chartData, this.options);

    }, 100);
  }
}
</script>
