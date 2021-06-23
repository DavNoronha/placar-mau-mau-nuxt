<template>
  <v-row class="d-flex flex-column">
    <v-col>
      <ExibeLista />
    </v-col>
  </v-row>
</template>

<script>
import ExibeLista from '@/components/Jogadores/ExibeLista.vue';

export default {
  components: {
    ExibeLista
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>