<template>
  <main class="custom-pd">
    <div class="item secondary">
      <v-card-title>
        <v-icon class="mr-2" color="primary" large>mdi-wallet-outline</v-icon>
        钱包管理
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
        <template v-slot:[`item.balance`]="{ item }">
          {{ formatMoney(item.balance) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="info mr-2" @click="editItem(item, 1)">
            帐号充值
          </v-btn>
          <v-btn small class="error" @click="editItem(item, 2)">手动扣款</v-btn>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card v-if="type_edit == 1">
        <v-card-title>
          <span>输入充值金额，并确认</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="mx-6 mt-6">
          <v-text-field
            v-model="amount"
            type="number"
            outlined
            clearable
          ></v-text-field>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="default" @click="dialog = false"> 取消 </v-btn>
          <v-btn color="primary" @click="updateBalance('add')"> 确定 </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title>
          <span>输入扣款金额，并确认</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="mx-6 mt-6">
          <v-text-field
            v-model="amount"
            type="number"
            outlined
            clearable
          ></v-text-field>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="default" @click="dialog = false"> 取消 </v-btn>
          <v-btn color="primary" @click="updateBalance('sub')"> 确定 </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
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
        { text: "Id", value: "id" },
        { text: "姓名", value: "name" },
        { text: "用户名", value: "phone" },
        { text: "钱包余额", value: "balance" },
        { text: "提现密码", value: "code" },
        { text: "操作", value: "actions", sortable: false },
      ],
      data: [],
      edit_id: "",
      type_edit: 1,
      amount: "",
      balance: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.CallAPI("get", "client", {}, (res) => {
        this.data = res.data;
      });
    },
    editItem(item, type_edit) {
      this.type_edit = type_edit;
      this.balance = item.balance ? item.balance : 0;
      this.edit_id = item.id;
      this.dialog = true;
    },
    updateBalance(type) {
      let balance = 0;
      if (type == "add") {
        balance = Number(this.balance) + Number(this.amount);
      } else {
        balance = Number(this.balance) - Number(this.amount);
      }
      this.CallAPI(
        "put",
        "client/" + this.edit_id,
        {
          balance: balance,
        },
        (response) => {
          this.$toast.success("成功的");
          this.dialog = false;
          this.amount = "";
          this.getData();
        }
      );
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
  },
};
</script>