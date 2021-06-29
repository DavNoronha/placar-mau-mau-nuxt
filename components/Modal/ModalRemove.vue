<template>
  <div>
    <v-btn
      class="ml-2 red--text"
      icon
      rounded
      small
      @click="openModal"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-dialog width="400" v-model="showModal">
      <v-card color="rgb(233, 225, 3)" height="200" class="py-3 d-flex flex-column">
        <v-card-title class="black--text"><h2>Deseja remover {{ jogador.nome }}?</h2></v-card-title>
        <v-spacer></v-spacer>
        <v-card-actions class="d-flex justify-end">
          <v-btn light large @click="openModal">Cancelar</v-btn>
          <v-btn color="red" large @click="excluir(jogador.id)">Deletar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['jogador'],
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    async excluir(id) {
      await this.$store.dispatch('excluir', id);
      this.showModal = false;
      this.$emit('remover');
    },
    openModal() {
      this.showModal = !this.showModal;
    }
  }
}
</script>