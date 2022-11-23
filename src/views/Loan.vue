<template>
  <main>
    <div class="item secondary">
      <v-card-title>
        <v-icon class="mr-2" color="primary" large
          >mdi-layers-outline</v-icon
        >
        借款列表
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
          <v-btn small class="orange mb-2" @click="editItem(item, 1)">
            固定贷款额度
          </v-btn>
          <br />
          <v-btn small class="error mb-2" @click="editItem(item, 2)">
            删除贷款订单
          </v-btn>
          <br />
          <v-btn small class="info mb-2" @click="editItem(item, 3)">
            编辑状态
          </v-btn>
          <br />
          <v-btn
            small
            class="primary"
            @click="$router.push('/user/' + item.phone)"
          >
            用户资料
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card v-if="type_edit == 1">
        <v-card-title>
          <span>固定贷款额度</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="mx-6 mt-6">
          <v-text-field
            v-model="amount"
            outlined
            type="number"
            label="Amount"
            clearable
          ></v-text-field>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="default" @click="dialog = false"> 取消 </v-btn>
          <v-btn color="primary" @click="changeAmount"> 确定 </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card v-if="type_edit == 2">
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
      <v-card v-if="type_edit == 3">
        <v-card-title>
          <span>状态改变</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="px-6 pt-6">
          <v-select
            :items="state_list"
            v-model="state"
            label="Status"
            outlined
            item-text="status"
            return-object
          ></v-select>
          <v-text-field
            :value="state.color"
            label="Color"
            outlined
            readonly
          ></v-text-field>
          <v-text-field
            :value="state.description"
            label="description"
            outlined
            readonly
          ></v-text-field>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="default" @click="dialog = false"> 取消 </v-btn>
          <v-btn color="primary" @click="updateStatus"> 确定 </v-btn>
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
        { text: "号码", value: "phone" },
        { text: "金额", value: "amount" },
        { text: "期限", value: "duration" },
        { text: "申请时间", value: "start_date" },
        { text: "状态", value: "status" },
        { text: "操作", value: "actions", sortable: false },
      ],
      data: [],
      edit_id: "",
      type_edit: 1,
      amount: "",
      state_list: "",
      state: "",
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
      this.CallAPI("get", "contract", {}, (res) => {
        this.data = res.data;
      });
      this.CallAPI("get", "state", {}, (res) => {
        this.state_list = res.data;
      });
    },
    editItem(item, type_edit) {
      this.type_edit = type_edit;
      this.amount = item.amount;
      this.state = this.stateDetail(item.status);
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
    changeAmount() {
      if (!this.amount) {
        this.$toast.error("请输入信息");
        return;
      }
      this.CallAPI(
        "put",
        "contract/" + this.edit_id,
        {
          amount: this.amount,
        },
        (response) => {
          this.$toast.success("成功的");
          this.getData();
          this.dialog = false;
        }
      );
    },
    updateStatus() {
      this.CallAPI(
        "put",
        "contract/" + this.edit_id,
        {
          status: this.state.id,
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