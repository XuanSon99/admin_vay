(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e9b9c"],{"8f80":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("main",[e("div",{staticClass:"item secondary"},[e("v-card-title",[e("v-icon",{staticClass:"mr-2",attrs:{color:"primary",large:""}},[t._v("mdi-layers-outline")]),t._v(" 借款列表 "),e("v-spacer"),e("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}})],1),e("v-data-table",{attrs:{headers:t.headers,items:t.data,search:t.search},scopedSlots:t._u([{key:"item.created_at",fn:function(a){var e=a.item;return[t._v(" "+t._s(t.formatDate(e.created_at))+" ")]}},{key:"item.amount",fn:function(a){var e=a.item;return[t._v(" "+t._s(t.formatMoney(e.amount))+" ")]}},{key:"item.status",fn:function(a){var i=a.item;return[t.stateDetail(i.status)?e("p",{style:{color:""+t.stateDetail(i.status).color}},[t._v(" "+t._s(t.stateDetail(i.status).status)+" ")]):t._e()]}},{key:"item.actions",fn:function(a){var i=a.item;return[1!=i.status?e("v-btn",{staticClass:"primary mb-2",attrs:{small:""},on:{click:function(a){return t.editItem(i,4)}}},[t._v(" 贷款确认书 ")]):t._e(),1!=i.status?e("br"):t._e(),e("v-btn",{staticClass:"orange mb-2",attrs:{small:""},on:{click:function(a){return t.editItem(i,1)}}},[t._v(" 固定贷款额度 ")]),e("br"),e("v-btn",{staticClass:"error mb-2",attrs:{small:""},on:{click:function(a){return t.editItem(i,2)}}},[t._v(" 删除贷款订单 ")]),e("br"),e("v-btn",{staticClass:"info mb-2",attrs:{small:""},on:{click:function(a){return t.editItem(i,3)}}},[t._v(" 编辑状态 ")]),e("br"),e("v-btn",{staticClass:"default",attrs:{small:""},on:{click:function(a){return t.$router.push("/user/"+i.phone)}}},[t._v(" 用户资料 ")])]}}],null,!0)})],1),e("v-dialog",{attrs:{"max-width":"400px"},model:{value:t.dialog,callback:function(a){t.dialog=a},expression:"dialog"}},[1==t.type_edit?e("v-card",[e("v-card-title",[e("span",[t._v("固定贷款额度")]),e("v-spacer"),e("v-btn",{attrs:{icon:""},on:{click:function(a){t.dialog=!1}}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-divider"),e("div",{staticClass:"mx-6 mt-6"},[e("v-text-field",{attrs:{outlined:"",type:"number",label:"Amount",clearable:""},model:{value:t.amount,callback:function(a){t.amount=a},expression:"amount"}})],1),e("v-divider"),e("v-card-actions",[e("v-spacer"),e("v-btn",{staticClass:"default",on:{click:function(a){t.dialog=!1}}},[t._v(" 取消 ")]),e("v-btn",{attrs:{color:"primary"},on:{click:t.changeAmount}},[t._v(" 确定 ")]),e("v-spacer")],1)],1):t._e(),2==t.type_edit?e("v-card",[e("v-card-title",[e("span",[t._v("你确定你要删除？")]),e("v-spacer"),e("v-btn",{attrs:{icon:""},on:{click:function(a){t.dialog=!1}}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-divider"),e("v-card-actions",[e("v-spacer"),e("v-btn",{staticClass:"default",on:{click:function(a){t.dialog=!1}}},[t._v(" 取消 ")]),e("v-btn",{attrs:{color:"primary"},on:{click:t.deleteItemConfirm}},[t._v(" 确定 ")]),e("v-spacer")],1)],1):t._e(),3==t.type_edit?e("v-card",[e("v-card-title",[e("span",[t._v("状态改变")]),e("v-spacer"),e("v-btn",{attrs:{icon:""},on:{click:function(a){t.dialog=!1}}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-divider"),e("div",{staticClass:"px-6 pt-6"},[e("v-select",{attrs:{items:t.state_list,label:"地位",outlined:"","item-text":"status","return-object":""},model:{value:t.state,callback:function(a){t.state=a},expression:"state"}}),e("v-text-field",{attrs:{value:t.state.color,label:"颜色",outlined:"",readonly:""}}),e("v-text-field",{attrs:{value:t.state.description,label:"描述",outlined:"",readonly:""}}),e("v-text-field",{attrs:{value:t.state.message,label:"信息",outlined:"",readonly:""}})],1),e("v-divider"),e("v-card-actions",[e("v-spacer"),e("v-btn",{staticClass:"default",on:{click:function(a){t.dialog=!1}}},[t._v(" 取消 ")]),e("v-btn",{attrs:{color:"primary"},on:{click:t.updateStatus}},[t._v(" 确定 ")]),e("v-spacer")],1)],1):t._e(),4==t.type_edit?e("v-card",[e("v-card-title",[e("span",[t._v("贷款确认书?")]),e("v-spacer"),e("v-btn",{attrs:{icon:""},on:{click:function(a){t.dialog=!1}}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-divider"),e("v-card-actions",[e("v-spacer"),e("v-btn",{staticClass:"default",on:{click:function(a){t.dialog=!1}}},[t._v(" 取消 ")]),e("v-btn",{attrs:{color:"primary"},on:{click:t.confirmLoan}},[t._v(" 确定 ")]),e("v-spacer")],1)],1):t._e()],1)],1)},n=[],s=(e("4de4"),e("fb6a"),e("ac1f"),e("5319"),e("d3b7"),e("25f0"),{data:function(){return{search:"",dialog:!1,headers:[{text:"ID",value:"id"},{text:"号码",value:"phone"},{text:"金额",value:"amount"},{text:"期限",value:"duration"},{text:"申请时间",value:"start_date"},{text:"状态",value:"status"},{text:"操作",value:"actions",sortable:!1}],data:[],edit_id:"",type_edit:1,amount:"",state_list:"",state:"",phone:""}},mounted:function(){var t=this;this.getData(),this.CallAPI("get","state",{},(function(a){t.state_list=a.data}))},methods:{stateDetail:function(t){var a=this.state_list.filter((function(a){return a.id==t}));return a[0]},getData:function(){var t=this;this.CallAPI("get","contract",{},(function(a){t.data=a.data}))},editItem:function(t,a){this.type_edit=a,this.amount=t.amount,this.phone=t.phone,this.edit_id=t.id,this.dialog=!0},deleteItemConfirm:function(){var t=this;this.CallAPI("delete","client/"+this.edit_id,{},(function(a){t.$toast.success("成功的"),t.getData(),t.dialog=!1}))},changeAmount:function(){var t=this;this.amount?this.CallAPI("put","contract/"+this.edit_id,{amount:this.amount},(function(a){t.$toast.success("成功的"),t.getData(),t.dialog=!1})):this.$toast.error("请输入信息")},confirmLoan:function(){var t=this;this.CallAPI("post","loan-confirm",{phone:this.phone},(function(a){t.$toast.success("成功的"),t.getData(),t.dialog=!1}))},updateStatus:function(){var t=this;this.CallAPI("put","contract/"+this.edit_id,{status:this.state.id},(function(a){t.$toast.success("成功的"),t.getData(),t.dialog=!1}))},formatDate:function(t){return t.slice(0,10)},formatMoney:function(t){return t?String(t).toString().replace(/\B(?=(\d{3})+(?!\d))/g,"."):0}}}),c=s,o=e("2877"),l=e("6544"),r=e.n(l),d=e("8336"),u=e("b0af"),v=e("99d9"),m=e("8fea"),f=e("169a"),p=e("ce7e"),_=e("132d"),h=e("b974"),b=e("2fa4"),g=e("8654"),k=Object(o["a"])(c,i,n,!1,null,null,null);a["default"]=k.exports;r()(k,{VBtn:d["a"],VCard:u["a"],VCardActions:v["a"],VCardTitle:v["c"],VDataTable:m["a"],VDialog:f["a"],VDivider:p["a"],VIcon:_["a"],VSelect:h["a"],VSpacer:b["a"],VTextField:g["a"]})}}]);