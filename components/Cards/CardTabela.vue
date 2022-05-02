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
            v-for="(item, key) in jogador.rounds"
            :key="key"
          >
            <td 
              v-if="item.round !== -1"
              style="width: 50%"
            >
              {{ item.round }}
            </td>

            <td
              v-if="item.round !== -1"
              class="d-flex align-center justify-center" 
            >
              <v-text-field
                class="d-flex align-center mt-5 input"
                height="10"
                rounded
                dense
                v-bind:value="+item.points"
                @change="atualizaPontos(+$event, key)"
              />

              <!-- Funcionalidade de excluir rodada ainda com problemas -->
              <!-- <ModalExcluirRodada
                :jogador="jogador"
                :idxRodada="item.round"
              /> -->
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import ModalExcluirRodada from '@/components/Modal/ModalExcluirRodada.vue';

export default {
  props: {
    jogador: {
      type: Object,
      default: () =>  {return {}}
    }
  },
  components: {
    ModalExcluirRodada
  },
  methods: {
    //metodo para editar pontos na tabela, precisa ser refatorado na store
    async atualizaPontos(novosPts, idxPts) {
      this.$store.dispatch(
        'atualizaPontos',
        {
          jogador: this.jogador, 
          idxPontos: idxPts, 
          novosPts: novosPts === '' ? 0 : novosPts
        }
      )
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