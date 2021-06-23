<template>
  <v-app>
    <v-app-bar
      fixed
      app
      class="d-flex justify-center"
    >
      <v-container class="d-flex justify-space-between">
        <v-avatar class="mx-16 white" rounded="50%" width="30"></v-avatar>
        <v-spacer></v-spacer>
        <h1>Mau-mau CTP</h1>
      </v-container>
      <v-spacer></v-spacer>
      <v-col class="pl-16">
        <ModalAdd />
      </v-col>
    </v-app-bar>

    <v-main class="d-flex justify-center align-center">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
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
    ModalAdd,
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
