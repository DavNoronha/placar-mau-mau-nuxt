<template>
  <v-container>
    <v-row class="d-flex flex-column">
      <v-col class="d-flex justify-center">
        <Inicial />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Inicial from '@/components/Inicial.vue';

export default {
  components: {
    Inicial
  }
}
</script>