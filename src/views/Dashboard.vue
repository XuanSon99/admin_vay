<template>
  <main class="dashboard">
    <div class="mowgrid">
      <v-card class="user">
        <h4 class="text-center my-3">今日注册用户数量</h4>
        <v-divider></v-divider>
        <div class="py-5 px-5">
          <h1 class="text-center">{{ data.new_user }}</h1>
          <div class="space mt-3">
            <span>总注册用户数量</span>
            <p>{{ data.total_user }}</p>
          </div>
        </div>
      </v-card>
      <v-card class="contract">
        <h4 class="text-center my-3">今日借款申请订单数量</h4>
        <v-divider></v-divider>
        <div class="py-5 px-5">
          <h1 class="text-center">{{ data.new_contract }}</h1>
          <div class="space mt-3">
            <span>总借款申请订单数量</span>
            <p>{{ data.total_contract }}</p>
          </div>
        </div>
      </v-card>
      <v-card class="amount">
        <h4 class="text-center my-3">今日借款金额（约）</h4>
        <v-divider></v-divider>
        <div class="py-5 px-5">
          <h1 class="text-center">{{ data.new_amount }}</h1>
          <div class="space mt-3">
            <span>总借款金额（约）</span>
            <p>{{ formatMoney(data.total_amount) }} VND</p>
          </div>
        </div>
      </v-card>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      data: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.CallAPI("get", "overview", {}, (res) => {
        this.data = res.data;
      });
    },
    formatMoney(value) {
      if (!value) return 0;
      return String(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>