(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ccbf6"],{"4ef5":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("main",{staticClass:"custom-pd"},[e("div",{staticClass:"item secondary"},[e("v-card-title",[e("v-icon",{staticClass:"mr-2",attrs:{color:"primary",large:""}},[t._v("mdi-cog-outline")]),t._v(" 系统设置 "),e("v-spacer"),e("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}})],1),e("v-data-table",{attrs:{headers:t.headers,items:t.data,search:t.search},scopedSlots:t._u([{key:"item.created_at",fn:function(a){var e=a.item;return[t._v(" "+t._s(t.formatDate(e.created_at))+" ")]}},{key:"item.actions",fn:function(a){var i=a.item;return[e("v-btn",{staticClass:"info mr-2",attrs:{small:""},on:{click:function(a){return t.editItem(i,1)}}},[t._v(" 更新 ")])]}}],null,!0)})],1),e("v-dialog",{attrs:{"max-width":"400px"},model:{value:t.dialog,callback:function(a){t.dialog=a},expression:"dialog"}},[1==t.type_edit?e("v-card",[e("v-card-title",[e("span",[t._v("更新内容")]),e("v-spacer"),e("v-btn",{attrs:{icon:""},on:{click:function(a){t.dialog=!1}}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-divider"),e("div",{staticClass:"mx-6 mt-6"},[e("v-text-field",{attrs:{outlined:"",clearable:""},model:{value:t.value,callback:function(a){t.value=a},expression:"value"}})],1),e("v-divider"),e("v-card-actions",[e("v-spacer"),e("v-btn",{staticClass:"default",on:{click:function(a){t.dialog=!1}}},[t._v(" 取消 ")]),e("v-btn",{attrs:{color:"primary"},on:{click:function(a){return t.updateValue()}}},[t._v(" 确定 ")]),e("v-spacer")],1)],1):t._e()],1)],1)},l=[],n={data:function(){return{search:"",dialog:!1,headers:[{text:"ID",value:"id"},{text:"姓名",value:"name"},{text:"价值",value:"value"},{text:"操作",value:"actions",sortable:!1}],data:[],edit_id:"",type_edit:1,value:""}},mounted:function(){this.getData()},methods:{getData:function(){var t=this;this.CallAPI("get","setup",{},(function(a){t.data=a.data}))},editItem:function(t,a){this.type_edit=a,this.value=t.value,this.edit_id=t.id,this.dialog=!0},updateValue:function(){var t=this;this.value&&this.CallAPI("put","setup/"+this.edit_id,{value:this.value},(function(a){t.$toast.success("成功的"),t.dialog=!1,t.getData()}))}}},s=n,c=e("2877"),d=e("6544"),r=e.n(d),o=e("8336"),u=e("b0af"),v=e("99d9"),f=e("8fea"),m=e("169a"),p=e("ce7e"),h=e("132d"),_=e("2fa4"),b=e("8654"),g=Object(c["a"])(s,i,l,!1,null,null,null);a["default"]=g.exports;r()(g,{VBtn:o["a"],VCard:u["a"],VCardActions:v["a"],VCardTitle:v["b"],VDataTable:f["a"],VDialog:m["a"],VDivider:p["a"],VIcon:h["a"],VSpacer:_["a"],VTextField:b["a"]})}}]);