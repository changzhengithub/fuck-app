{"source":"webpackJsonp([7],{\"5NDc\":function(t,e){},JKHG:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var i=a(\"AgQl\"),s={1:[\"借给他\",\"拒绝\"],2:[\"查看账户收支明细\"],3:[\"立刻还款\"],4:[\"立刻还款\",\"续期\"],5:[\"展期\",\"销账\"],6:[\"展期\",\"销账\",\"催收\",\"仲裁\"],7:[\"撤销仲裁\"],8:[\"撤销申请\"],9:[\"等待确认\"],10:[\"展期详情\"],11:[\"寻找其它出借人\"],12:[\"展期\",\"销账\",\"催收\"]},n=a(\"NeIm\"),o=a(\"JXx5\"),r=a(\"V7vM\"),c=a(\"1F1J\"),l=a(\"3wc0d\"),u=a(\"OrvpH\"),d=a(\"NgAuo\"),h=a(\"gbGHk\"),p=a(\"YzZEr\"),v=a(\"D7rtX\"),f={name:\"IouDetailComponent\",data:function(){return{id:null,type:\"\",name:\"\",overdueDay:\"\",state:\"\",repaymentAmount:\"\",urge:!1,arbitrate:!1,btnLeft:\"\",btnRight:\"\",button:[],page:[],amountReturned:0,targetAccount:null,modalShow:!1,detailList:[{type:\"default\",key:\"借出本金：\",value:\"\"},{type:\"default\",key:\"年利率：\",value:\"\"},{type:\"default\",key:\"借款日：\",value:\"\"},{type:\"default\",key:\"到期日：\",value:\"\"},{type:\"default\",key:\"其他费用：\",value:\"0元\"}],payPassword:[],tip:{type:\"center\",content:\"请输入支付密码\"},title:{contentText:\"借条详情\"}}},components:{DetailListComponent:l.a,KeyboardComponent:u.a,ModalComponent:d.a,PayPasswordComponent:h.a,TipComponent:p.a,TitleComponent:v.a},created:function(){this.init()},methods:{init:function(){var e=this;n.a.send({url:\"IouDetail\",data:{token:r.a.token,id:r.a.id,userPhone:r.a.phone}}).success(function(t){console.log(t),e.formatData(t)}).fail(function(t){})},formatData:function(t){switch(this.name=t.LendName,this.type=c.a[t.Type],this.state=t.StateName,this.amountReturned=t.AmountReturned,this.overdueDay=t.OverdueDay?t.OverdueDay+\"天\":\"\",this.repaymentAmount=t.RepaymentAmount,this.targetAccount=t.LendPhone,this.id=t.Id,this.detailList[0].value=t.Amount+\"元\",this.detailList[1].value=t.YearRate+\"%\",this.detailList[2].value=t.LoanDate,this.detailList[3].value=t.ExpireDate,this.button[0]=s[t.ButtonType][0],this.button[1]=s[t.ButtonType][1],this.arbitrate=s[t.ButtonType][2],this.urge=s[t.ButtonType][3],t.ButtonType){case 1:this.leftOperate=this.confirm,this.rightOperate=this.refuse;break;case 2:this.page=[\"transactions\"],this.leftOperate=this.target;break;case 3:this.leftOperate=this.repay;break;case 4:this.leftOperate=this.repay,this.rightOperate=this.renewal;break;case 5:case 6:this.page=[\"exhibiton-period\",\"cancel-account\"],this.leftOperate=this.target,this.rightOperate=this.target;break;case 7:this.leftOperate=this.cancelAbitrate;break;case 8:this.leftOperate=this.cancelApply;break;case 9:this.leftOperate=this.waitConfirm;break;case 10:this.page=[\"exhibition-status\"],this.leftOperate=this.target;break;case 11:this.page=[\"transactions\"],this.leftOperate=this.target;break;case 12:this.page=[\"exhibiton-period\",\"cancel-account\"],this.leftOperate=this.target,this.rightOperate=this.target}},leftOperate:function(){},rightOperate:function(){},confirm:function(){n.a.send({url:\"LoanCollectionCancel\",data:{token:r.a.token,id:r.a.id,state:1}}).success(function(t){}).fail(function(t){})},refuse:function(){n.a.send({url:\"LoanCollectionCancel\",data:{token:r.a.token,id:r.a.id,state:0}}).success(function(t){}).fail(function(t){})},target:function(t){\"cancel-account\"===this.page[t]&&(r.a.gapMoney=this.repaymentAmount,r.a.payedMoney=this.amountReturned),o.a.push(this.page[t])},repay:function(){this.modalShow=!0},renewal:function(){},cancelAbitrate:function(){},cancelApply:function(){n.a.send({url:\"LoanCollectionCancel\",data:{token:r.a.token,id:r.a.id,phone:r.a.phone}}).success(function(t){}).fail(function(t){})},waitConfirm:function(){},close:function(){this.modalShow=!1},input:function(t){this.payPassword.length<6&&this.payPassword.push(t),6===this.payPassword.length&&(this.modalShow=!1,i.a.send({url:\"Repay\",data:{czzh:r.a.phone,rzzh:this.targetAccount,je:this.repaymentAmount,tranType:1,lid:this.id,ppwd:this.payPassword.join(\"\")}}).success(function(t){}).fail(function(t){}),this.payPassword=[])},remove:function(){0<this.payPassword.length&&this.payPassword.pop()}}},m=a(\"VU/8\")(f,{render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"section\",{staticClass:\"iou-detail padding-top-126\"},[a(\"TitleComponent\",{attrs:{title:e.title}}),e._v(\" \"),a(\"div\",{staticClass:\"detail-hint bg-white\"},[a(\"div\",{staticClass:\"hint-user border-bottom-1\"},[e._m(0),e._v(\" \"),a(\"div\",{staticClass:\"user-info font-27 color-black\"},[a(\"p\",{staticClass:\"info-loan \"},[a(\"span\"),a(\"span\",[e._v(e._s(e.type))])]),e._v(\" \"),a(\"p\",{staticClass:\"info-sign\"},[a(\"span\",[e._v(e._s(e.name))]),a(\"i\",{staticClass:\"iconfont icon-xiaoxi1 font-21 color-blue\"})])]),e._v(\" \"),a(\"div\",{staticClass:\"user-tip\"},[a(\"i\",{staticClass:\"iconfont icon-tishi1 font-21\"}),e._v(\" \"),a(\"p\",{staticClass:\"font-24 color-black\"},[e._v(e._s(e.state)+e._s(e.overdueDay))])])]),e._v(\" \"),a(\"div\",{staticClass:\"hint-repayment\"},[a(\"p\",{staticClass:\"font-27 color-black\"},[a(\"span\",[e._v(\"待还款金额\")]),e._v(\" \"),a(\"span\",{staticClass:\"font-39\"},[e._v(e._s(e.repaymentAmount)+\"元\")])])])]),e._v(\" \"),a(\"div\",{staticClass:\"detail-loan bg-white\"},[a(\"div\",{staticClass:\"loan-title padding-horizontal-30 border-bottom-1\"},[a(\"svg\",{staticClass:\"icon\",attrs:{\"aria-hidden\":\"true\"}},[a(\"use\",{attrs:{\"xlink:href\":\"#icon-cong\"}})]),e._v(\" \"),a(\"p\",{staticClass:\"font-27 color-black\"},[e._v(\"借出详情\")])]),e._v(\" \"),a(\"DetailListComponent\",{staticClass:\"loan-list bg-white padding-horizontal-30 font-27\",attrs:{detailList:e.detailList}})],1),e._v(\" \"),a(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:e.urge,expression:\"urge\"}],staticClass:\"detail-dept bg-white\"},[a(\"div\",{staticClass:\"loan-title padding-horizontal-30 border-bottom-1\"},[a(\"div\",{staticClass:\"title-left\"},[a(\"svg\",{staticClass:\"icon\",attrs:{\"aria-hidden\":\"true\"}},[a(\"use\",{attrs:{\"xlink:href\":\"#icon-cong\"}})]),e._v(\" \"),a(\"p\",[e._v(\"借出详情\")])]),e._v(\" \"),e._m(1)]),e._v(\" \"),e._m(2)]),e._v(\" \"),a(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:e.arbitrate,expression:\"arbitrate\"}],staticClass:\"detail-law bg-white\"},[a(\"div\",{staticClass:\"law-title padding-horizontal-30 border-bottom-1\"},[a(\"div\",{staticClass:\"title-left\"},[a(\"svg\",{staticClass:\"icon\",attrs:{\"aria-hidden\":\"true\"}},[a(\"use\",{attrs:{\"xlink:href\":\"#icon-cong\"}})]),e._v(\" \"),a(\"p\",[e._v(\"法律服务\")])]),e._v(\" \"),e._m(3)]),e._v(\" \"),e._m(4)]),e._v(\" \"),a(\"div\",{staticClass:\"detail-button bg-white\"},[a(\"button\",{directives:[{name:\"show\",rawName:\"v-show\",value:e.button[0],expression:\"button[0]\"}],staticClass:\"button font-30 color-blue bg-white\",on:{click:function(t){e.leftOperate(0)}}},[a(\"div\",[e._v(e._s(e.button[0]))])]),e._v(\" \"),a(\"button\",{directives:[{name:\"show\",rawName:\"v-show\",value:e.button[1],expression:\"button[1]\"}],staticClass:\"button font-30 color-white bg-blue\",on:{click:function(t){e.rightOperate(1)}}},[a(\"div\",[e._v(e._s(e.button[1]))])])]),e._v(\" \"),a(\"ModalComponent\",{directives:[{name:\"show\",rawName:\"v-show\",value:e.modalShow,expression:\"modalShow\"}],staticClass:\"detail-modal\",on:{CLOSE_EVENT:e.close}},[a(\"div\",{staticClass:\"modal-content bg-white\"},[a(\"TipComponent\",{staticClass:\"modal-tip color-deep-grey border-bottom-1\",attrs:{tip:e.tip}}),e._v(\" \"),a(\"PayPasswordComponent\",{staticClass:\"modal-pay-password\",attrs:{payPassword:e.payPassword}}),e._v(\" \"),a(\"KeyboardComponent\",{staticClass:\"modal-keyboard\",on:{PRESS_EVENT:e.input,REMOVE_EVENT:e.remove}})],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e(\"div\",{staticClass:\"user-img\"},[e(\"img\",{attrs:{src:\"http://iph.href.lu/120x150\"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e(\"button\",{staticClass:\"button color-white font-27\"},[e(\"div\",[this._v(\"打赏催收\")])])},function(){var t=this.$createElement,e=this._self._c||t;return e(\"div\",{staticClass:\"dept-content padding-horizontal-30\"},[e(\"p\",{staticClass:\"font-24 color-black\"},[this._v(\"合法催收智慧化解债务债券矛盾\")])])},function(){var t=this.$createElement,e=this._self._c||t;return e(\"button\",{staticClass:\"button color-white font-27\"},[e(\"div\",[this._v(\"委托仲裁\")])])},function(){var t=this.$createElement,e=this._self._c||t;return e(\"div\",{staticClass:\"law-content padding-horizontal-30\"},[e(\"p\",{staticClass:\"font-24 color-black\"},[this._v(\"30-40天极速裁决结果，执行回款的第一步，与诉讼具有同等效力\")])])}]},!1,function(t){a(\"RgiX\")},\"data-v-f2d3becc\",null);e.default=m.exports},Orvp:function(t,e,a){\"use strict\";var i=a(\"VU/8\")({name:\"KeyboardComponent\",methods:{press:function(t){this.$emit(\"PRESS_EVENT\",t)},remove:function(){this.$emit(\"REMOVE_EVENT\")}}},{render:function(){var a=this,t=a.$createElement,i=a._self._c||t;return i(\"section\",{staticClass:\"keyboard\"},[a._l(9,function(e,t){return i(\"li\",{key:t,staticClass:\"keyboard-item\",on:{click:function(t){a.press(e)}}},[a._v(a._s(e))])}),a._v(\" \"),i(\"li\",{staticClass:\"keyboard-item\"}),a._v(\" \"),i(\"li\",{staticClass:\"keyboard-item\",on:{click:function(t){a.press(0)}}},[a._v(\"0\")]),a._v(\" \"),i(\"li\",{staticClass:\"keyboard-item\",on:{click:a.remove}},[i(\"i\",{staticClass:\"iconfont icon-huitui\"})])],2)},staticRenderFns:[]},!1,function(t){a(\"5NDc\")},\"data-v-40ab26ca\",null);e.a=i.exports},RgiX:function(t,e){}});"}