<template>
  <v-layout>
    <v-app-bar color="#d6249f" v-if="renderizarMenu">
      <v-app-bar-title class="titleMenu">Instagram</v-app-bar-title>

      <v-btn icon>
        <router-link to="/posts/novo">
          <v-icon color="#FFF">mdi-email</v-icon>
        </router-link>
      </v-btn>

      <v-btn>
        <router-link to="/posts">
          <v-icon color="#FFF">mdi-list-box</v-icon>
        </router-link>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script>
export default {
  computed: {
    renderizarMenu() {
      return this.$route.path !== '/' && this.$route.path !== '/cadastro'
    }
  }
}
</script>


