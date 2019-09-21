export default [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '@/components/Home.vue'),
  },
];
