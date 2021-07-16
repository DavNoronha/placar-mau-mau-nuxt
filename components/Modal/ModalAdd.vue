<template>
  <v-col class="d-flex justify-center align-center">
    <v-btn
      large
      @click="openModal"
      class="primary"
    >
      Adicionar Jogador
    </v-btn>
    <v-dialog max-width="400" v-model="showModal">
      <v-card light class="d-flex flex-column align-center pa-5">
        <v-card-title><h2>Quem vai jogar?</h2></v-card-title>
        <v-text-field
          autofocus
          id="nome"
          label="Nome"
          color="#888"
          v-model="nome"
          @keypress.enter="addJogador"
        ></v-text-field>
        <p v-if="showAlert" class="red--text">Insira um nome porra!</p>
        <v-btn
          large
          color="success"
          class="black--text"
          @click="addJogador"
        >
          Adicionar
        </v-btn>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      nome: '',
      showAlert: false,
      showModal: false
    }
  },
  methods: {
    openModal() {
      this.showAlert = false;
      this.nome = '';
      this.showModal = true;
    },
    addJogador() {
      const newJogador = {
        nome:this.nome,
        pts:0,
        tabela: [
          {rodada: -1, pontos: 0}
        ]
      };
      if(this.nome !== '') {
        this.$store.dispatch('addJogador', newJogador);
        this.showModal = false;
      } else {
        this.showAlert = true;
      }
    }
  },
  watch: {
    nome() {
      if(this.nome !== '') {
        this.showAlert = false;
      }
    }
  }
}
</script>