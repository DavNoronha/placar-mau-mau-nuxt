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
            <td>{{ item.rodada }}</td>
            <td>{{ item.pontos }}</td>
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