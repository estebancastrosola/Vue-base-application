<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="6">
        <form @submit.prevent="submit">
          <v-row>
            <v-col>
              <v-text-field
                outlined
                id="email"
                name="email"
                type="email"
                v-model="email"
                :label="$t('login.EMAIL')"
                autocomplete="off"
                :data-vv-as="$t('login.EMAIL')"
                :error="errors.has('email')"
                :error-messages="errors.collect('email')"
                v-validate.disable="'required|email'"
              ></v-text-field>
              <v-text-field
                outlined
                id="password"
                name="password"
                type="password"
                v-model="password"
                :label="$t('login.PASSWORD')"
                autocomplete="off"
                :data-vv-as="$t('login.PASSWORD')"
                :error="errors.has('password')"
                :error-messages="errors.collect('password')"
                v-validate.disable="'required|min:5'"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <v-btn type="submit">{{ $t('register.REGISTER') }}</v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-center">
              <v-btn :to="{ name: 'login' }" color="black" small text>{{ $t('register.LOGIN') }}</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
      <ErrorMessage />
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import router from '@/router';

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['userRegister']),
    async submit() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        await this.userRegister({
          email: this.email,
          password: this.password,
        });
      }
    },
    created() {
      if (this.$store.state.auth.isTokenSet) {
        router.push({ name: 'home' });
      }
    },
  },
};
</script>
