<template>
  <v-row v-if="exibeCard">
    <v-col class="d-flex justify-start">
      <v-card light class="px-3 py-1">
        <v-card
          dark
          class="d-flex flex-column align-center pa-3 ma-2"
          v-for="(jogador, index) in jogadores"
          :key="index"
        >
          <div class="nome">
            <h1>{{ jogador.nome }}</h1>
            <v-btn
              class="ml-2 red--text"
              icon
              small
              @click="excluir(jogador)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <p>Pts: {{ jogador.pts }}</p>
          <input
            type="number"
            :placeholder="jogador.pts"
            class="addPts"
            v-model="pts"
            @keypress.enter="somaPts"
          >
          <v-btn rounded class="mt-3 success black--text">+</v-btn>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      jogadores: [],
      pts: null
    }
  },
  created() {
    this.exibeLista;
  },
  computed: {
    exibeLista() {
      this.jogadores = this.$store.getters.listaJogadores;
    },
    exibeCard() {
      if(this.jogadores.length === 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    excluir(jogador) {
      this.$store.dispatch('excluir', jogador);
    },
    somaPts() {}
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