{"source":"webpackJsonp([66],{\"/O4q\":function(e,t){},\"4SHC\":function(e,t,o){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var s=o(\"gtFV\"),a=o(\"poUI\"),n=o(\"NeIm\"),r=o(\"JXx5\"),i=o(\"vPt9U\"),d=o(\"D7rtX\"),u={name:\"ForgetPasswordComponent\",data:function(){return{placeholder:\"\",phoneNumber:\"\",passwordNumber:\"\",AgainPasswordNumber:\"\",codeText:\"\",getCodeText:\"获取验证码\",switchShow:!0,codeDisabled:!1,button:{default:[{type:\"primary\",text:\"提交\"}]},title:{contentText:\"忘记密码\"}}},components:{ButtonComponent:i.a,TitleComponent:d.a},methods:{backPage:function(e){r.a.push(e)},clearpasswordNumber:function(){this.passwordNumber=\"\"},clearAgainPasswordNumber:function(){this.AgainPasswordNumber=\"\"},getCode:function(){s.a.phone(this.phoneNumber)&&(this.waitOneMinute(),n.a.send({url:\"SendSMS\",data:{phone:this.phoneNumber,type:2}}).success(function(e){console.log(e)}).fail(function(e){}))},waitOneMinute:function(){var e=this;this.codeDisabled=!0,this.getCodeText=\"60秒后重发\";var t=60,o=setInterval(function(){0<--t?e.getCodeText=t+\"秒后重发\":(e.getCodeText=\"发送验证码\",clearInterval(o),e.codeDisabled=!1)},1e3)},findPasswordSubmit:function(){s.a.phone(this.phoneNumber)&&s.a.code(this.codeText)&&s.a.password(this.passwordNumber)&&(this.passwordNumber===this.AgainPasswordNumber?n.a.send({url:\"FindPassword\",data:{phone:this.phoneNumber,password:this.passwordNumber,verificationCode:this.codeText}}).success(function(e){r.a.push(\"empower\")}).fail(function(e){}):a.a.show(\"密码不一致\"))}}},c=o(\"VU/8\")(u,{render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o(\"section\",{staticClass:\"forget-password\"},[o(\"TitleComponent\",{attrs:{title:t.title},on:{BACK_EVENT:function(e){t.backPage(\"empower\")}}}),t._v(\" \"),o(\"div\",{staticClass:\"password-form\"},[o(\"div\",{staticClass:\"form-item form-phone\"},[o(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.phoneNumber,expression:\"phoneNumber\"}],attrs:{type:\"text\",maxlength:\"11\",placeholder:\"输入手机号\"},domProps:{value:t.phoneNumber},on:{input:function(e){e.target.composing||(t.phoneNumber=e.target.value)}}})]),t._v(\" \"),o(\"div\",{staticClass:\"form-item form-code\"},[o(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.codeText,expression:\"codeText\"}],attrs:{type:\"text\",maxlength:\"6\",placeholder:\"请输入验证码\"},domProps:{value:t.codeText},on:{input:function(e){e.target.composing||(t.codeText=e.target.value)}}}),t._v(\" \"),o(\"button\",{staticClass:\"button font-27 color-blue bg-white\",attrs:{disabled:t.codeDisabled},on:{click:t.getCode}},[o(\"div\",[t._v(t._s(t.getCodeText))])])]),t._v(\" \"),o(\"div\",{staticClass:\"form-item form-password\"},[o(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.passwordNumber,expression:\"passwordNumber\"}],attrs:{type:\"password\",placeholder:\"请输入新的登录密码\"},domProps:{value:t.passwordNumber},on:{input:function(e){e.target.composing||(t.passwordNumber=e.target.value)}}}),t._v(\" \"),t.passwordNumber?o(\"i\",{staticClass:\"iconfont icon-cong\",on:{click:t.clearpasswordNumber}}):t._e()]),t._v(\" \"),o(\"div\",{staticClass:\"form-item form-password\"},[o(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.AgainPasswordNumber,expression:\"AgainPasswordNumber\"}],attrs:{type:\"password\",placeholder:\"请再次输入新的登录密码\"},domProps:{value:t.AgainPasswordNumber},on:{input:function(e){e.target.composing||(t.AgainPasswordNumber=e.target.value)}}}),t._v(\" \"),t.AgainPasswordNumber?o(\"i\",{staticClass:\"iconfont icon-cong\",on:{click:t.clearAgainPasswordNumber}}):t._e()])]),t._v(\" \"),o(\"div\",{staticClass:\"password-button\"},[o(\"ButtonComponent\",{attrs:{button:t.button},on:{SUBMIT_EVENT:t.findPasswordSubmit}})],1)],1)},staticRenderFns:[]},!1,function(e){o(\"/O4q\")},\"data-v-0abe7586\",null);t.default=c.exports}});"}