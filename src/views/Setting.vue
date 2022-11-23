<template>
  <main class="custom-pd">
    <div class="item secondary">
      <v-card-title>
        <v-icon class="mr-2" color="primary" large>mdi-cog-outline</v-icon>
        系统设置
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
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="info mr-2" @click="editItem(item, 1)">
            Sửa
          </v-btn>
          <!-- <v-btn small class="error" @click="editItem(item, 2)">Xóa</v-btn> -->
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card v-if="type_edit == 1">
        <v-card-title>
          <span>更新内容</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="mx-6 mt-6">
          <v-text-field v-model="value" outlined clearable></v-text-field>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="default" @click="dialog = false"> 取消 </v-btn>
          <v-btn color="primary" @click="updateValue()"> 确定 </v-btn>
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
        { text: "价值", value: "value" },
        { text: "操作", value: "actions", sortable: false },
      ],
      data: [],
      edit_id: "",
      type_edit: 1,
      value: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.CallAPI("get", "setup", {}, (res) => {
        this.data = res.data;
      });
    },
    editItem(item, type_edit) {
      this.type_edit = type_edit;
      this.value = item.value;
      this.edit_id = item.id;
      this.dialog = true;
    },
    updateValue() {
      if (!this.value) {
        return;
      }
      this.CallAPI(
        "put",
        "setup/" + this.edit_id,
        {
          value: this.value,
        },
        (response) => {
          this.$toast.success("成功的");
          this.dialog = false;
          this.getData();
        }
      );
    },
  },
};
</script>