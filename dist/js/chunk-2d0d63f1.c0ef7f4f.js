(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d63f1"],{7277:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("main",{staticClass:"dashboard"},[s("div",{staticClass:"mowgrid"},[s("v-card",{staticClass:"user"},[s("h4",{staticClass:"text-center my-3"},[t._v("今日注册用户数量")]),s("v-divider"),s("div",{staticClass:"py-5 px-5"},[s("h1",{staticClass:"text-center"},[t._v(t._s(t.data.new_user))]),s("div",{staticClass:"space mt-3"},[s("span",[t._v("总注册用户数量")]),s("p",[t._v(t._s(t.data.total_user))])])])],1),s("v-card",{staticClass:"contract"},[s("h4",{staticClass:"text-center my-3"},[t._v("今日借款申请订单数量")]),s("v-divider"),s("div",{staticClass:"py-5 px-5"},[s("h1",{staticClass:"text-center"},[t._v(t._s(t.data.new_contract))]),s("div",{staticClass:"space mt-3"},[s("span",[t._v("总借款申请订单数量")]),s("p",[t._v(t._s(t.data.total_contract))])])])],1),s("v-card",{staticClass:"amount"},[s("h4",{staticClass:"text-center my-3"},[t._v("今日借款金额（约）")]),s("v-divider"),s("div",{staticClass:"py-5 px-5"},[s("h1",{staticClass:"text-center"},[t._v(t._s(t.data.new_amount))]),s("div",{staticClass:"space mt-3"},[s("span",[t._v("总借款金额（约）")]),s("p",[t._v(t._s(t.formatMoney(t.data.total_amount))+" VND")])])])],1)],1)])},c=[],i=(s("ac1f"),s("5319"),s("d3b7"),s("25f0"),{data:function(){return{data:""}},mounted:function(){this.getData()},methods:{getData:function(){var t=this;this.CallAPI("get","overview",{},(function(a){t.data=a.data}))},formatMoney:function(t){return t?String(t).toString().replace(/\B(?=(\d{3})+(?!\d))/g,"."):0}}}),n=i,d=s("2877"),r=s("6544"),v=s.n(r),l=s("b0af"),o=s("ce7e"),_=Object(d["a"])(n,e,c,!1,null,null,null);a["default"]=_.exports;v()(_,{VCard:l["a"],VDivider:o["a"]})}}]);