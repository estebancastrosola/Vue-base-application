<template>
  <v-navigation-drawer app v-model="drawer">
    <v-list dense>
      <v-list-item
        @click
        v-for="(item, index) in menuItems"
        :key="index"
        :to="{ name: item.link }"
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  data: () => ({}),
  computed: {
    drawer: {
      get() {
        return this.$store.state.navigationDrawer.showNavigationDrawer;
      },
      set(value) {
        this.$store.dispatch('changeShowNavicationDrawer', value);
      },
    },
    menuItems() {
      return [
        {
          title: this.$t('navigationDrawerItems.HOME'),
          link: 'home',
          icon: 'mdi-home',
        },
      ];
    },
  },
};
</script>
