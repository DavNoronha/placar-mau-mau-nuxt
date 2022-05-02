<template>
  <v-row>
    <v-col class="d-flex justify-center align-center">
      <v-btn
        large
        @click="openModal"
        class="primary"
      >
        Adicionar Jogador
      </v-btn>

      <v-dialog max-width="400" v-model="abrirModal">
        <v-card light class="d-flex flex-column align-center pa-5">
          <v-card-title><h2>Quem vai jogar?</h2></v-card-title>

          <v-text-field
            autofocus
            id="nome"
            label="Nome"
            color="#888"
            v-model="nome"
            @keypress.enter="addJogador()"
          />

          <p v-if="mostraAlerta" class="red--text">Insira um nome!</p>

          <v-btn
            large
            color="success"
            class="black--text"
            @click="addJogador()"
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
      mostraAlerta: false,
      abrirModal: false
    }
  },
  methods: {
    openModal() {
      this.mostraAlerta = false;
      this.nome = '';
      this.abrirModal = true;
    },
    addJogador() {
      const newJogador = {
        name:this.nome,
        points:0,
        rounds: [
          {round: -1, points: 0}
        ]
      };

      if(this.nome !== '') {
        this.$store.dispatch('addJogador', newJogador);
        this.abrirModal = false;
        return 
      }
      
      this.mostraAlerta = true;
    }
  },
  watch: {
    nome() {
      if(this.nome !== '') {
        this.mostraAlerta = false;
      }
    }
  }
}
</script>