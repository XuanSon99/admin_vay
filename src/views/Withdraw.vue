<template>
  <main>
    <div class="item secondary">
      <v-card-title>
        <v-icon class="mr-2" color="primary" large
          >mdi-cart-arrow-down</v-icon
        >
        提现管理
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
          <p :class="item.status + '1'" v-if="item.status == 'pending'">
            未确认
          </p>
          <p :class="item.status + '1'" v-else>
            {{ item.status == "success" ? "已确认" : "已拒绝" }}
          </p>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="error mr-2" @click="editItem(item, 1)">
            订单
          </v-btn>
          <v-btn small class="primary mr-2" @click="editItem(item, 2)">
            确认提现
          </v-btn>
          <v-btn small class="orange" @click="editItem(item, 3)">
            驳回提现
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card v-if="type_edit == 1">
        <v-card-title>
          <span>你确定你要删除？</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="default" @click="dialog = false"> 取消 </v-btn>
          <v-btn color="primary" @click="deleteItemConfirm"> 确定 </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card v-if="type_edit == 2">
        <v-card-title>
          <span>确认提现订单吗?</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="default" @click="dialog = false"> 取消 </v-btn>
          <v-btn color="primary" @click="confirmWithdraw('success')">
            确定
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card v-if="type_edit == 3">
        <v-card-title>
          <span>驳回提现订单吗?</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="default" @click="dialog = false"> 取消 </v-btn>
          <v-btn color="primary" @click="confirmWithdraw('cancel')">
            确定
          </v-btn>
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
        { text: "ID", value: "id" },
        { text: "用户名", value: "phone" },
        { text: "提现金额", value: "amount" },
        { text: "申请提现日期", value: "created_at" },
        { text: "状态", value: "status" },
        { text: "操作", value: "actions", sortable: false },
      ],
      data: [],
      edit_id: "",
      type_edit: 1,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.CallAPI("get", "withdraw", {}, (res) => {
        this.data = res.data;
      });
    },
    editItem(item, type_edit) {
      this.type_edit = type_edit;
      this.edit_id = item.id;
      this.dialog = true;
    },
    deleteItemConfirm() {
      this.CallAPI("delete", "withdraw/" + this.edit_id, {}, (response) => {
        this.$toast.success("成功的");
        this.getData();
        this.dialog = false;
      });
    },
    confirmWithdraw(status) {
      this.CallAPI(
        "put",
        "withdraw/" + this.edit_id,
        {
          status: status,
        },
        (response) => {
          this.$toast.success("成功的");
          this.getData();
          this.dialog = false;
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