<template>
  <v-card v-if="exibeCard" width="600" light class="px-1 py-1">
    <v-card
      dark
      class="d-flex flex-column pa-3 ma-2"
      v-for="jogador in jogadores"
      :key="jogador.id"
    >
      <v-row class="d-flex">
        <CardJogador
          :index="jogador.id"
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
      jogadores: []
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
      await this.$store.dispatch('getJogadores');
      this.jogadores = this.$store.getters['listaJogadores'];
    }
  }
}
</script>