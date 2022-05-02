<template>
  <div>
    <v-btn
      class="ml-2 red--text"
      icon
      rounded
      small
      @click="openModal()"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-dialog width="400" v-model="abrirModal">
      <v-card color="rgb(233, 225, 3)" height="200" class="py-3 d-flex flex-column">
        <v-card-title class="black--text">
          <h2>Deseja remover a {{idxRodada}}° rodada de {{ jogador.name }}?</h2>
        </v-card-title>

        <v-spacer></v-spacer>

        <v-card-actions class="d-flex justify-center">
          <v-btn 
            light 
            large 
            @click="openModal()"
          >
            Cancelar
          </v-btn>

          <v-btn 
            color="red" 
            large 
            @click="excluirRodada(jogador._id)"
          >
            Deletar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    jogador: {
      type: Object,
      default: () => ({})
    },
    idxRodada: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      abrirModal: false
    }
  },
  methods: {
    async excluirRodada(id) {
      this.abrirModal = false;
      this.$store.dispatch('excluirRodada', {jogador: this.jogador, idxRodada: this.idxRodada})
    },
    openModal() {
      this.abrirModal = !this.abrirModal;
    }
  }
}
</script>