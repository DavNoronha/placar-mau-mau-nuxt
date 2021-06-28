<template>
  <v-card light class="px-3 py-1">
    <v-card
      dark
      class="d-flex flex-column pa-3 ma-2"
      v-for="(jogador, index) in jogadores"
      :key="jogador.id"
    >
      <v-row class="d-flex">
        <v-col class="d-flex flex-column align-center">
          <div class="nome">
            <h1>{{ jogador.nome }}</h1>
            <v-btn
              class="ml-2 red--text"
              icon
              small
              @click="excluir(jogador.id)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <p>Total: {{ jogador.pts }}</p>
          <input
            type="number"
            placeholder=""
            class="addPts"
            v-model.lazy.number="pts"
            @keypress.enter="somaPts(index)"
          >
          <v-btn
            rounded
            class="mt-3 success black--text"
            @click="somaPts(index)"
          >+</v-btn>
        </v-col>
        <v-card light class="ma-4 pa-4">
          <TabelaRodadas :jogador="jogador" />
        </v-card>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import TabelaRodadas from '@/components/Rodadas/TabelaRodadas.vue';

export default {
  components: {
    TabelaRodadas
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
      if(this.jogadores.length === 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    async exibeLista() {
      await this.$store.dispatch('getJogadores');
      this.jogadores = this.$store.getters.listaJogadores;
    },
    async excluir(id) {
      await this.$store.dispatch('excluir', id);
      this.exibeLista();
    },
    somaPts(i) {
      this.jogadores[i].rodadas.push({rodada: this.jogadores[i].rodadas.length, pontos: this.pts});
      this.jogadores[i].pts = this.jogadores[i].pts + this.pts;
      this.pts = null;
    }
  }
}
</script>

<style scoped>
.nome {
  display: flex;
  justify-content: center;
  align-items: center;
}
.addPts {
  text-align: center;
  color: #FFF;
  border-color: blue;
  box-shadow: 0 0 1px 1px;
  border-radius: 3px;
  outline: 0;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}
</style>