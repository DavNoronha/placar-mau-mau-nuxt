<template>
  <v-row>
    <v-col class="d-flex justify-center align-center">
      <v-btn
        large
        @click="openModal"
        color="#0288D1"
      >
        Adicionar Jogador
      </v-btn>
      <v-dialog max-width="400" v-model="showModal">
        <v-card class="d-flex flex-column align-center pa-5">
          <v-card-title><h2>Quem vai jogar?</h2></v-card-title>
          <v-text-field
            autofocus
            id="nome"
            label="Nome"
            color="#ccc"
            v-model="nome"
            @keypress="addJogador"
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
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      nome: '',
      showAlert: false,

      //modal
      showModal: false
    }
  },
  methods: {
    openModal() {
      this.nome = '';
      this.showModal = true;
    },
    addJogador() {
      //adiciona jogador na store
      if(this.nome !== '') {
        this.$store.dispatch('addJogador', {nome:this.nome, pts:0});
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