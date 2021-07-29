<template>
  <v-card width="50%" light class="ma-4 pa-4">
    <v-simple-table fixed-header height="200" dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Rodadas
            </th>
            <th class="text-left">
              Pontos
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, key) in jogador.tabela"
            :key="key"
          >
            <td v-if="item.rodada !== -1">{{ item.rodada }}</td>
            <td class="d-flex align-center justify-space-between" v-if="item.rodada !== -1">
              <v-text-field
                class="d-flex align-center mt-5 input"
                height="10"
                rounded
                dense
                v-model.number="item.pontos"
                @change="atualiza($event, key)"
              ></v-text-field>
              <ModalRemove @remover="apagaRodada(key)"/>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
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
  methods: {
    //metodo para editar pontos na tabela, precisa ser refatorado na store
    async atualiza(novoPts, idx) {
      const response = await fetch(`https://mau-mau-a91e9-default-rtdb.firebaseio.com/jogadores/${this.jogador.id}/tabela/${idx}/pontos.json`, {
        method: 'PUT',
        body: JSON.stringify(novoPts === '' ? 0 : novoPts)
      })

      const responseData = await response.json()

      this.jogador.tabela[idx].pontos = responseData
      this.$store.dispatch('addPts', this.jogador);
    },
    apagaRodada(idx) {
      this.$store.dispatch('excluirRodada', {jogador: this.jogador, index: idx})
    }
  }
}
</script>

<style scoped>
.input {
  border: none;
  box-shadow: none;
}
</style>