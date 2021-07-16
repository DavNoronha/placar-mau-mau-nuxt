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

      // tornando os pontos feitos em '0' para quando der enter sem preencher o ganhador
      if(this.ptsFeitos === null) {
        this.ptsFeitos = 0;
      }

      // fazendo tabela invertida e salvando pts da rodada
      this.jogador.tabela.unshift({rodada: this.rodadas, pontos: this.ptsFeitos});
      this.$store.dispatch('addPts', this.jogador);
      this.ptsFeitos = null;

      // fazendo soma baseado na tabela de pontos.. provisório, tenho que colocar isso na store
      // let totalPts = []
      // const reducer = (a, b) => a + b;
      // for(const key in this.jogador.tabela) {
      //   totalPts.push(this.jogador.tabela[key].pontos);
      // }
      // this.jogador.pts = totalPts.reduce(reducer);
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