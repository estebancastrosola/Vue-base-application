<template>
  <v-app>
    <NavigationDrawer />
    <Toolbar />
    <v-content>
      <loading />
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import NavigationDrawer from './components/core/NavigationDrawer.vue';
import Toolbar from './components/core/Toolbar';
import Footer from './components/core/Footer';
import Loading from '@/components/core/Loading.vue';

export default {
  name: 'App',
  components: {
    NavigationDrawer,
    Footer,
    Toolbar,
    Loading,
  },
  data: () => ({
    //
  }),
};
</script>
