<template>
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
          v-for="(item, key, index) in jogador.rodadas"
          :key="index"
        >
          <td>{{ item.rodada }}</td>
          <td>{{ item.pontos }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: ['jogador'],
}
</script>