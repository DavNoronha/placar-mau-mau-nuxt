<template>
  <v-col class="d-flex flex-column justify-center align-center">
    <div class="nome">
      <h1>{{ jogador.nome }}</h1>
      <ModalRemove :jogador="jogador" @remover="update"/>
    </div>
    <p>Total: <strong>{{ jogador.pts }}</strong></p>
    <input
      type="number"
      placeholder=""
      class="addPts"
      v-model.number="ptsFeitos"
      @keypress.enter="somaPts"
    >
    <v-btn
      rounded
      class="mt-3 success black--text"
      @click="somaPts"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-col>
</template>

<script>
import ModalRemove from '@/components/Modal/ModalRemove.vue';

export default {
  props: ['jogador', 'index'],
  components: {
    ModalRemove
  },
  data() {
    return {
      ptsFeitos: null,
      rodadas: this.jogador.tabela.length - 1
    }
  },
  methods: {
    update() {
      this.$emit('update');
    },
    somaPts() {
      this.rodadas++;

      if(this.ptsFeitos === null) {
        this.ptsFeitos = 0;
      }

      this.jogador.pts = this.jogador.pts + this.ptsFeitos;
      this.jogador.tabela.unshift({rodada: this.rodadas, pontos: this.ptsFeitos});
      this.$store.dispatch('addPts', this.jogador);
      this.ptsFeitos = null;
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