{"source":"webpackJsonp([53],{\"2qg4\":function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var i=n(\"AgQl\"),o=n(\"V7vM\"),s={name:\"ModifyWithdrawPasswordComponent\",data:function(){return{title:{contentText:\"提现密码重置\"}}},components:{TitleComponent:n(\"D7rtX\").a},created:function(){this.init()},methods:{init:function(){i.a.send({url:\"appResetPassWord\",data:{zh:o.a.phone,busi_tp:3}}).success(function(t){document.getElementById(\"iframe\").innerHTML=t,document.forwardForm.submit()}).fail(function(t){})}}},a=n(\"VU/8\")(s,{render:function(){var t=this.$createElement,e=this._self._c||t;return e(\"section\",{staticClass:\"modify-withdraw-password padding-top-126\"},[e(\"TitleComponent\",{attrs:{title:this.title}})],1)},staticRenderFns:[]},!1,function(t){n(\"tm9Y\")},\"data-v-431e642b\",null);e.default=a.exports},tm9Y:function(t,e){}});"}