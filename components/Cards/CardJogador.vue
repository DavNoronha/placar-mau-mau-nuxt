<template>
  <v-col class="d-flex flex-column justify-center align-center">
    <div class="nome">
      <h1>{{ jogador.name }}</h1>
      <ModalRemove :jogador="jogador" @remover="apagaJogador($event)"/>
    </div>

    <p>Total: <strong>{{ jogador.points }}</strong></p>

    <input
      type="number"
      placeholder=""
      class="addPts"
      v-model.number="ptsFeitos"
      @keypress.enter="somaPts()"
    >

    <v-btn
      rounded
      class="mt-3 success black--text"
      @click="somaPts()"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-col>
</template>

<script>
import ModalRemove from '@/components/Modal/ModalRemove.vue';

export default {
  props: {
    jogador: {
      type: Object,
      default: () =>  {return {}}
    }
  },
  components: {
    ModalRemove
  },
  data() {
    return {
      ptsFeitos: null,
    }
  },
  computed: {
    rodadas() {
      return this.jogador.rounds.length
    }
  },
  methods: {
    somaPts() {
      console.log(this.jogador)
      this.rodadas++;

      // tornando os pontos feitos em '0' para quando der enter sem preencher o ganhador
      if(this.ptsFeitos === null) this.ptsFeitos = 0;

      this.$store.dispatch(
        'addPts', 
        {
          jogador: this.jogador,
          ptsRodada: {round: this.rodadas, points: this.ptsFeitos}
        }
      );

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