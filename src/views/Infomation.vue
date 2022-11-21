<template>
  <main class="detail-info">
    <div class="item secondary">
      <v-simple-table border>
        <template v-slot:default>
          <tbody>
            <tr>
              <td>手机号码</td>
              <td>{{ data.phone }}</td>
            </tr>
            <tr>
              <td>姓名</td>
              <td>{{ data.name }}</td>
            </tr>
            <tr>
              <td>身份证号</td>
              <td>
                <v-text-field
                  dense
                  v-model="id_card"
                  type="number"
                  outlined
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>身份证照片</td>
              <td>
                <div class="d-flex">
                  <expandable-image
                    :src="image(data.front_photo)"
                    class="mr-2"
                  />
                  <expandable-image
                    :src="image(data.back_photo)"
                    class="mr-2"
                  />
                  <expandable-image
                    :src="image(data.portrait_photo)"
                    class="mr-2"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>本人手写签名</td>
              <td>
                <div class="d-flex">
                  <expandable-image :src="image(data.signature)" class="mr-2" />
                </div>
              </td>
            </tr>
            <tr>
              <td>出生日期</td>
              <td>{{ data.birthday }}</td>
            </tr>
            <tr>
              <td>目前的地址</td>
              <td>{{ data.address }}</td>
            </tr>
            <tr>
              <td>工作</td>
              <td>{{ data.work }}</td>
            </tr>
            <tr>
              <td>贷款用途</td>
              <td>{{ data.purpose }}</td>
            </tr>
            <tr>
              <td>收入</td>
              <td>{{ data.earning }}</td>
            </tr>
            <tr>
              <td>紧急联系人</td>
              <td>
                <p>
                  号码:
                  <v-text-field
                    dense
                    v-model="family_phone"
                    outlined
                    type="number"
                  ></v-text-field>
                </p>
                <p>
                  关系:
                  <v-text-field
                    dense
                    v-model="relationship"
                    outlined
                  ></v-text-field>
                </p>
              </td>
            </tr>
            <tr>
              <td>银行卡信息</td>
              <td>
                <p>
                  银行名称:<v-text-field
                    dense
                    v-model="bank_name"
                    outlined
                  ></v-text-field>
                </p>
                <p>
                  所有者:
                  <v-text-field
                    dense
                    v-model="owner_name"
                    outlined
                  ></v-text-field>
                </p>
                <p>
                  银行卡号:
                  <v-text-field
                    dense
                    v-model="id_bank"
                    type="number"
                    outlined
                  ></v-text-field>
                </p>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-btn color="primary" class="mt-5" @click="update"> 更新 </v-btn>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      data: "",
      id_card: "",
      family_phone: "",
      relationship: "",
      bank_name: "",
      owner_name: "",
      id_bank: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.CallAPI("get", "user-info/" + this.$route.params.id, {}, (res) => {
        this.data = res.data;
        this.id_card = res.data.id_card;
        this.family_phone = res.data.family_phone;
        this.relationship = res.data.relationship;
        this.bank_name = res.data.bank_name;
        this.owner_name = res.data.owner_name;
        this.id_bank = res.data.id_bank;
      });
    },
    update() {
      if (
        !this.id_card ||
        !this.family_phone ||
        !this.relationship ||
        !this.bank_name ||
        !this.owner_name ||
        !this.id_bank
      ) {
        this.$toast.error("不能留空");
        return;
      }
      this.CallAPI(
        "put",
        "verify/" + this.data.id,
        {
          id_card: this.id_card,
          family_phone: this.family_phone,
          relationship: this.relationship,
          bank_name: this.bank_name,
          owner_name: this.owner_name,
          id_bank: this.id_bank,
        },
        (res) => {
          this.$toast.success("成功的");
        }
      );
    },
  },
};
</script>