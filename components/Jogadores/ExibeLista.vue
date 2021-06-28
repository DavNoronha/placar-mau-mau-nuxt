<template>
  <v-card v-if="exibeCard" width="600" light class="px-1 py-1">
    <v-card
      dark
      class="d-flex flex-column pa-3 ma-2"
      v-for="(jogador, index) in jogadores"
      :key="jogador.id"
    >
      <v-row class="d-flex">
        <CardJogador
          :totalPts="pts"
          :index="index"
          :jogador="jogador"
          @update="exibeLista"
        />
        <CardTabela :jogador="jogador" />
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import CardJogador from '@/components/Cards/CardJogador.vue';
import CardTabela from '@/components/Cards/CardTabela.vue';

export default {
  components: {
    CardJogador,
    CardTabela,
  },
  data() {
    return {
      jogadores: [],
      pts: null
    }
  },
  created() {
    this.exibeLista();
  },
  computed: {
    exibeCard() {
      return (this.jogadores.length === 0) ? false : true
    },
  },
  methods: {
    async exibeLista() {
      await this.$store.dispatch('jogadores/getJogadores');
      this.jogadores = this.$store.getters['jogadores/listaJogadores'];
    },
    somaPts(i) {
      this.jogadores[i].tabela.push({rodada: this.jogadores[i].tabela.length, pontos: this.pts});
      this.jogadores[i].pts = this.jogadores[i].pts + this.pts;
      this.pts = null;
    }
  }
}
</script>