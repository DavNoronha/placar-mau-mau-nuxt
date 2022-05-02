<template>
  <v-card v-if="exibeCard" width="600" color="rgb(233, 225, 3)" class="pa-1">
    <v-card
      dark
      class="d-flex flex-column pa-3 ma-2"
      v-for="jogador in jogadores"
      :key="jogador.id"
    >
      <v-row class="d-flex">
        <CardJogador :jogador="jogador" />
        
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
      // jogadores: []
    }
  },
  computed: {
    jogadores() {
      return this.$store.getters['listaJogadores']
    },
    exibeCard() {
      return (this.jogadores.length === 0) ? false : true
    },
  },
  created() {
    this.exibeLista();
  },
  methods: {
    async exibeLista() {
      await this.$store.dispatch('listaJogadores');
    }
  }
}
</script>