<template>
  <main class="custom-pd">
    <div class="item secondary">
      <v-card-title>
        <v-icon class="mr-2" color="primary" large
          >mdi-account-circle-outline</v-icon
        >
        用户管理
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
        <template v-slot:[`item.status`]="{ item }">
          {{ item.status == "active" ? "允许登录" : "禁止登录" }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            small
            class="orange mr-2"
            @click="changeStatus('unactive', item.id)"
            v-if="item.status == 'active'"
          >
            禁止登录
          </v-btn>
          <v-btn
            small
            class="orange mr-2"
            @click="changeStatus('active', item.id)"
            v-else
          >
            允许登录
          </v-btn>
          <v-btn
            small
            class="primary mr-2"
            @click="$router.push('/user/' + item.phone)"
          >
            查看资料
          </v-btn>
          <v-btn small class="info mr-2" @click="editItem(item, false)">
            修改密码
          </v-btn>
          <v-btn small class="error" @click="editItem(item, true)"
            >删除订单</v-btn
          >
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card v-if="edit">
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
      <v-card v-else>
        <v-card-title>
          <span>输入您的新密码</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="mx-6 mt-6">
          <v-text-field
            v-model="password"
            outlined
            type="password"
            label="Password"
            clearable
          ></v-text-field>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="default" @click="dialog = false"> 取消 </v-btn>
          <v-btn color="primary" @click="changePassword"> 确定 </v-btn>
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
        { text: "姓名", value: "name" },
        { text: "手机号码", value: "phone" },
        { text: "银行卡号", value: "id_bank" },
        { text: "状态", value: "status" },
        { text: "注册日期", value: "created_at" },
        { text: "操作", value: "actions", sortable: false },
      ],
      data: [],
      edit_id: "",
      edit: true,
      password: "",
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
    editItem(item, status) {
      this.edit = status;
      this.edit_id = item.id;
      this.dialog = true;
    },
    deleteItemConfirm() {
      this.CallAPI("delete", "client/" + this.edit_id, {}, (response) => {
        this.$toast.success("成功的");
        this.getData();
        this.dialog = false;
      });
    },
    changePassword() {
      if (!this.password) {
        this.$toast.error("请输入足够的信息");
        return;
      }
      this.CallAPI(
        "put",
        "client/" + this.edit_id,
        {
          password: this.password,
        },
        (response) => {
          this.$toast.success("成功的");
          this.dialog = false;
          this.password = "";
        }
      );
    },
    changeStatus(value, id) {
      this.CallAPI(
        "put",
        "client/" + id,
        {
          status: value,
        },
        (response) => {
          this.$toast.success("成功的");
          this.getData();
        }
      );
    },
    formatDate(date) {
      return date.slice(0, 10);
    },
  },
};
</script>