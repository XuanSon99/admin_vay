<template>
  <main>
    <div class="item secondary">
      <v-card-title>
        <v-icon class="mr-2" color="primary" large
          >mdi-clipboard-text-multiple-outline</v-icon
        >
        还款管理
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :search="search">
        <template v-slot:[`item.created_at`]="{ item }">
          {{ formatDate(item.created_at) }}
        </template>
        <template v-slot:[`item.amount`]="{ item }">
          {{ formatMoney(item.amount) }}
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <p :style="{ color: `#${stateDetail(item.status).color}` }">
            {{ stateDetail(item.status).status }}
          </p>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="info" @click="detailBill(item)">
            付款详情
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>
          <span>付款详情</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">时间</th>
                <th class="text-center">金钱数额</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in pay_list" :key="index">
                <td class="text-center">
                  {{ addMonth(detail.start_date, index) }}
                </td>
                <td class="text-center">{{ formatMoney(item) }} VND</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      dialog: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "客户", value: "phone" },
        { text: "借款总额", value: "amount" },
        { text: "总期数", value: "duration" },
        { text: "生成日期", value: "start_date" },
        { text: "操作", value: "actions", sortable: false },
      ],
      data: [],
      edit_id: "",
      type_edit: 1,
      amount: "",
      state_list: "",
      pay_list: [],
      interest_rate: 0.7,
      detail: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    stateDetail(id) {
      let state = this.state_list.filter((item) => item.id == id);
      return state[0];
    },
    getData() {
      this.CallAPI("get", "bill", {}, (res) => {
        this.data = res.data;
      });
      this.CallAPI("get", "state", {}, (res) => {
        this.state_list = res.data;
      });
    },
    detailBill(item) {
      this.detail = item;
      this.dialog = true;
      this.pay_list = [];
      for (let i = 0; i < item.duration; i++) {
        let principal = item.amount / item.duration;
        let value =
          principal +
          ((item.amount - i * principal) * this.interest_rate) / 100;
        this.pay_list.push(value.toFixed(0));
      }
    },
    formatDate(date) {
      return date.slice(0, 10);
    },
    formatMoney(value) {
      if (!value) return 0;
      return String(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    addMonth(value, index) {
      let day = value.split("/")[0];
      let month = Number(value.split("/")[1]);
      month += index;
      if (month > 12) {
        if (month % 12 == 0) month = 12;
        else month %= 12;
      }
      return day + "/" + this.formatMonth(month);
    },
    formatMonth(n) {
      return n > 9 ? "" + n : "0" + n;
    },
  },
};
</script>