<template>
  <v-app>
    <v-app-bar
      fixed
      app
      class="d-flex justify-center"
    >
      <v-container class="d-flex align-center justify-space-between">
        <v-avatar 
          class="mx-16 white" 
          rounded="50%" 
          width="30"
          style="cursor: pointer"
          @click="voltarInicio()"
        >
          <img style="width: 100%;" src="@/assets/images/pp.png" />
        </v-avatar>

        <v-spacer></v-spacer>

        <h1 
          style="cursor: pointer"
          @click="voltarInicio()" 
        >
          Mau-mau CTP
        </h1>

        <v-spacer></v-spacer>

        <v-col class="pl-16">
          <ModalAdd v-if="!isIndex"/>
        </v-col>
      </v-container>
    </v-app-bar>

    <v-main class="d-flex justify-center align-center">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="true"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import ModalAdd from '@/components/Modal/ModalAdd.vue';

export default {
  components: {
    ModalAdd
  },
  computed: {
    isIndex() {
      return this.$route.name == 'index'
    }
  },
  methods: {
    voltarInicio() {
      this.$router.push('/')
    }
  }
}
</script>
