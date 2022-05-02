<template>
  <v-container>
    <v-row class="d-flex flex-column">
      <v-col class="d-flex justify-center">
        <ExibeLista />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ExibeLista from '@/components/Jogadores/ExibeLista.vue';

export default {
  components: {
    ExibeLista
  }
}
</script>