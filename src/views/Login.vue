<template>
  <main class="login">
    <v-card class="px-7 py-7">
      <h1 class="text-center mb-5">登录</h1>
      <v-form v-model="valid">
        <v-text-field
          v-model="username"
          outlined
          label="账号"
          clearable
          :rules="rules"
        ></v-text-field>
        <v-text-field
          v-model="password"
          outlined
          type="password"
          label="密码"
          clearable
          :rules="rules"
        ></v-text-field>
        <v-btn color="primary" x-large block @click="login" :disabled="!valid">
          登录
        </v-btn>
      </v-form>
    </v-card>
  </main>
</template>

<script>
export default {
  data() {
    return {
      rules: [(v) => !!v || "不能留空"],
      valid: false,
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.CallAPI(
        "post",
        "admin/login",
        { username: this.username, password: this.password },
        (res) => {
          localStorage.setItem("access_token", res.data.access_token);
          this.$router.push("/");
        },
        (err) => {
          this.$toast.error("非法的");
        }
      );
    },
  },
};
</script>

<style>
</style>