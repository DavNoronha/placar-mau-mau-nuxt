<template>
  <v-card width="50%" light class="ma-4 pa-4">
    <v-simple-table fixed-header height="200">
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
            v-for="(item, key, index) in jogador.tabela"
            :key="index"
          >
            <td v-if="item.rodada !== 'Rodadas'">{{ item.rodada }}</td>
            <td v-if="item.pontos !== 'Pontos'">{{ item.pontos }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  props: ['jogador'],
}
</script>