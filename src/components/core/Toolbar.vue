<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Application</v-toolbar-title>
    <div class="flex-grow-1"></div>
    <v-text-field
      :append-icon-cb="() => {}"
      :placeholder="$t('toolbarItems.SEARCH')"
      single-line
      color="black"
      append-icon="mdi-magnify"
      hide-details
    ></v-text-field>
    <v-btn v-if="!isTokenSet" class="ma-2" tile outlined to="/login">
      <v-icon left>mdi-account-circle</v-icon>
      {{$t('toolbarItems.LOGIN')}}
    </v-btn>
    <v-btn v-if="isTokenSet" class="ma-2" tile outlined @click="userLogout">
      <v-icon left>mdi-exit-to-app</v-icon>
      {{$t('toolbarItems.LOGOUT')}}
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Toolbar',
  computed: {
    ...mapGetters(['isTokenSet']),
    drawer: {
      get() {
        return this.$store.state.navigationDrawer.showNavigationDrawer;
      },
      set(value) {
        this.$store.dispatch('changeShowNavicationDrawer', value);
      },
    },
  },
  methods: {
    userLogout() {
      this.$store.dispatch('userLogout');
    },
  },
};
</script>
