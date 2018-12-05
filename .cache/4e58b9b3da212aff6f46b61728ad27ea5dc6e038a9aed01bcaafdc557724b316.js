{"source":"webpackJsonp([19],{DOFa:function(t,a,s){\"use strict\";Object.defineProperty(a,\"__esModule\",{value:!0});var i=s(\"VU/8\")({name:\"MoreComponent\",data:function(){return{}},components:{},methods:{addBlackList:function(){this.$emit(\"ADD_BLACK_LIST\")},deleteFriend:function(){this.$emit(\"DELETE_FRIEND_EVENT\")},shareCard:function(){this.$emit(\"SHARE_CARD_EVENT\")},complaint:function(){this.$emit(\"COMPLAINT_EVENT\")}}},{render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s(\"section\",{staticClass:\"more bg-white\"},[s(\"div\",{staticClass:\"more-item padding-horizontal-30 border-bottom-1 color-deep-grey\",on:{click:t.addBlackList}},[s(\"i\",{staticClass:\"iconfont icon-heimingdan font-54\"}),t._v(\" \"),s(\"span\",{staticClass:\"font-30\"},[t._v(\"加入黑名单\")])]),t._v(\" \"),s(\"div\",{staticClass:\"more-item padding-horizontal-30 border-bottom-1 color-deep-grey\",on:{click:t.deleteFriend}},[s(\"i\",{staticClass:\"iconfont icon-shanchuhaoyou font-54\"}),t._v(\" \"),s(\"span\",{staticClass:\"font-30\"},[t._v(\"删除好友\")])]),t._v(\" \"),s(\"div\",{staticClass:\"more-item padding-horizontal-30 border-bottom-1 color-deep-grey\",on:{click:t.shareCard}},[s(\"i\",{staticClass:\"iconfont icon-fenlei font-54\"}),t._v(\" \"),s(\"span\",{staticClass:\"font-30\"},[t._v(\"分享名片\")])]),t._v(\" \"),s(\"div\",{staticClass:\"more-item padding-horizontal-30 color-deep-grey\",on:{click:t.complaint}},[s(\"i\",{staticClass:\"iconfont icon-jinggaozhuyi font-54\"}),t._v(\" \"),s(\"span\",{staticClass:\"font-30\"},[t._v(\"投诉他\")])])])},staticRenderFns:[]},!1,function(t){s(\"l8o6\")},\"data-v-10077231\",null).exports,n=s(\"O5qx\"),o=s(\"poUI\"),e=s(\"NeIm\"),c=s(\"JXx5\"),l=s(\"V7vM\"),r={name:\"PersonalInfoComponent\",data:function(){return{name:l.a.name,account:l.a.phone,personalDetail:{},personalInfo:{},transferInfo:null,tabSwitchShow:!1,modalShow:!1,isMine:!1}},components:{ModalComponent:s(\"NgAuo\").a,MoreComponent:i},created:function(){this.init()},methods:{init:function(){l.a.userInfo&&(this.personalInfo=l.a.userInfo,l.a.userInfo.account!==l.a.phone?(this.isMine=!0,this.getTargetDetail()):this.getMineDetail())},getMineDetail:function(){var a=this;e.a.send({url:\"PersonalDetail\",data:{token:l.a.token,phone:l.a.phone}}).success(function(t){a.formatData(t),a.personalDetail=t.MemberInfo,a.transferInfo=t.TransactionInfo}).fail(function(t){})},getTargetDetail:function(){var a=this;e.a.send({url:\"TargetDetail\",data:{token:l.a.token,phone:l.a.phone,target:this.personalInfo.account}}).success(function(t){a.formatData(t),a.personalDetail=t.MemberInfo,a.transferInfo=t.TransactionInfo}).fail(function(t){})},getPersonalInfo:function(){l.a.userInfo&&(this.personalInfo=l.a.userInfo,this.personalInfo.account!==l.a.chat.id&&(this.isMine=!0))},formatData:function(t){var a=t.MemberInfo;a.OverdueCount?t.MemberInfo.OverdueCount=a.OverdueCount+\"笔逾期\":t.MemberInfo.OverdueCount=\"无逾期\",a.BorrowCount?t.MemberInfo.BorrowCount=a.BorrowCount+\"笔\":t.MemberInfo.BorrowCount=\"当前无借款\",t.MemberInfo.RegTime=a.RegTime.substr(0,10);for(var s=\"\",i=[a.IsIdentityPass,a.IsContactPass,a.IsPhonePass,a.IsZhiMaPass,a.IsBankCardPass],n=[\"请认证身份信息\",\"请认证联系人\",\"请认证手机号\",\"请认证银行卡\",\"请认证芝麻信用\"],o=0;o<i.length;o++){if(!i[o]){s=n[o];break}s=\"已通过认证\"}t.MemberInfo.creditCenter=s},gotoBorrow:function(s){e.a.send({url:\"IsLoanToTarget\",data:{token:l.a.token,type:s,phone:l.a.phone,targetPhone:l.a.userInfo.account}}).success(function(t){var a=[];a.push({imAccid:\"\",Name:l.a.userInfo.nick,Phone:l.a.userInfo.account}),l.a.publishObject=a,l.a.borrowType=s,c.a.push(\"iou-template\")}).fail(function(t){o.a.show(t.message)})},addBlackList:function(){var a=this;n.a.balckToggle(this.personalInfo.account,!0).success(function(t){a.modalShow=!1})},deleteFriend:function(){var a=this;n.a.deleteFriend(this.personalInfo.account).success(function(t){a.modalShow=!1})},complaint:function(){l.a.complianPhone=this.personalInfo.account,c.a.push(\"complain\"),this.modalShow=!1},shareCard:function(){n.a.target={id:l.a.userInfo.account,portrait:l.a.userInfo.avatar},c.a.push(\"select-friend\"),this.modalShow=!1},back:function(){c.a.back()},more:function(){this.modalShow=!0},tabSwitchHome:function(){this.tabSwitchShow=!1},tabSwitchDeal:function(){this.tabSwitchShow=!0},closeModal:function(){this.modalShow=!1},gotoPage:function(t){c.a.push(t)},gotoChat:function(t){n.a.target={id:l.a.userInfo.account,portrait:l.a.userInfo.avatar},c.a.push(t)}}},v=s(\"VU/8\")(r,{render:function(){var a=this,t=a.$createElement,s=a._self._c||t;return s(\"section\",{staticClass:\"personal-info\"},[s(\"div\",{staticClass:\"info-header\"},[s(\"div\",{staticClass:\"header font-30\"},[s(\"i\",{staticClass:\"iconfont font-33 icon-arrow-left back\",on:{click:a.back}}),a._v(\" \"),s(\"span\",[a._v(\"个人资料\")]),a._v(\" \"),a.isMine?s(\"i\",{staticClass:\"iconfont font-33 icon-shenglvehao more\",on:{click:a.more}}):a._e()])]),a._v(\" \"),s(\"div\",{staticClass:\"info-user\"},[s(\"div\",{staticClass:\"user-portrait\"},[s(\"img\",{attrs:{src:a.personalInfo.avatar}})]),a._v(\" \"),s(\"div\",{staticClass:\"user-detail\"},[s(\"p\",{staticClass:\"detail-id\"},[s(\"span\",[a._v(\"借条ID：\")]),s(\"span\",[a._v(a._s(a.personalInfo.account))])]),a._v(\" \"),s(\"p\",{staticClass:\"detail-name\"},[s(\"span\",[a._v(a._s(a.personalInfo.nick))]),s(\"span\",[a._v(a._s(a.personalDetail.Rank))])]),a._v(\" \"),s(\"div\",{staticClass:\"detail-attestation\"},[s(\"div\",{staticClass:\"attestation-item\"},[a._v(a._s(a.personalDetail.RankName))])])])]),a._v(\" \"),s(\"div\",{staticClass:\"info-tab\"},[s(\"div\",{staticClass:\"tab-nav\"},[s(\"div\",{staticClass:\"nav-item\",class:{\"nav-active\":!a.tabSwitchShow},on:{click:a.tabSwitchHome}},[a._v(\"主页\")]),a._v(\" \"),s(\"div\",{staticClass:\"nav-item\",class:{\"nav-active\":a.tabSwitchShow},on:{click:a.tabSwitchDeal}},[a._v(\"交易\")])]),a._v(\" \"),s(\"div\",{staticClass:\"tab-content\"},[a.tabSwitchShow?a._e():s(\"div\",{staticClass:\"content-home\"},[s(\"ul\",{staticClass:\"home-list padding-horizontal-21 bg-white\"},[s(\"li\",{staticClass:\"list-item\"},[s(\"div\",{staticClass:\"item-value\"},[s(\"span\",[a._v(\"进行中的借款\")]),a._v(\" \"),s(\"span\",[a._v(a._s(a.personalDetail.BorrowCount))])]),a._v(\" \"),s(\"i\",{staticClass:\"iconfont icon-cong\"})]),a._v(\" \"),s(\"li\",{staticClass:\"list-item\"},[s(\"div\",{staticClass:\"item-value\"},[s(\"span\",[a._v(\"手机号\")]),a._v(\" \"),s(\"span\",[a._v(a._s(a.account))])])]),a._v(\" \"),s(\"li\",{staticClass:\"list-item\"},[s(\"div\",{staticClass:\"item-value\"},[s(\"span\",[a._v(\"注册于\")]),a._v(\" \"),s(\"span\",[a._v(a._s(a.personalDetail.RegTime))])])]),a._v(\" \"),s(\"li\",{staticClass:\"list-item\"},[s(\"div\",{staticClass:\"item-value\"},[s(\"span\",[a._v(\"信用记录\")]),a._v(\" \"),s(\"span\",[a._v(a._s(a.personalDetail.OverdueCount))])])]),a._v(\" \"),s(\"li\",{staticClass:\"list-item\",on:{click:function(t){a.gotoPage(\"credit\")}}},[s(\"div\",{staticClass:\"item-value\"},[s(\"span\",[a._v(\"认证中心\")]),a._v(\" \"),s(\"span\",[a._v(a._s(a.personalDetail.creditCenter))])]),a._v(\" \"),s(\"i\",{staticClass:\"iconfont icon-cong\"})])]),a._v(\" \"),a.isMine?s(\"div\",{staticClass:\"home-chat padding-horizontal-30\"},[s(\"div\",{staticClass:\"chat-send\"},[s(\"button\",{staticClass:\"send-btn bg-blue\",on:{click:function(t){a.gotoChat(\"chat\")}}},[s(\"div\",{staticClass:\"font-30 color-white\"},[a._v(\"发起聊天\")])])]),a._v(\" \"),s(\"div\",{staticClass:\"chat-lend\"},[s(\"button\",{staticClass:\"lend-btn bg-white\",on:{click:function(t){a.gotoBorrow(1)}}},[s(\"div\",{staticClass:\"font-30 color-black\"},[a._v(\"向TA借款\")])])])]):a._e()]),a._v(\" \"),a.tabSwitchShow?s(\"div\",{staticClass:\"content-deal\"},[s(\"div\",{staticClass:\"deal-total\"},[s(\"div\",{staticClass:\"title\"},[a._v(\"全部借贷情况\")]),a._v(\" \"),s(\"ul\",{staticClass:\"list\"},[a._m(0),a._v(\" \"),s(\"li\",{staticClass:\"list-item\"},[s(\"p\",{staticClass:\"item-title\"},[a._v(\"累计笔数\")]),a._v(\" \"),s(\"div\",{staticClass:\"itme-right\"},[s(\"p\",[a._v(a._s(a.transferInfo.BorrowCount_All))]),a._v(\" \"),s(\"p\",[a._v(a._s(a.transferInfo.LoanCount_All))])])]),a._v(\" \"),s(\"li\",{staticClass:\"list-item\"},[s(\"p\",{staticClass:\"item-title\"},[a._v(\"当前金额\")]),a._v(\" \"),s(\"div\",{staticClass:\"itme-right\"},[s(\"p\",[a._v(a._s(a.transferInfo.BorrowAmount_All))]),a._v(\" \"),s(\"p\",[a._v(a._s(a.transferInfo.LoanAmount_All))])])]),a._v(\" \"),s(\"li\",{staticClass:\"list-item\"},[s(\"p\",{staticClass:\"item-title\"},[a._v(\"未偿还金额\")]),a._v(\" \"),s(\"div\",{staticClass:\"itme-right\"},[s(\"p\",[a._v(a._s(a.transferInfo.UnpaidBorrowAmount_All))]),a._v(\" \"),s(\"p\",[a._v(a._s(a.transferInfo.UnpaidloanAmount_All))])])])])]),a._v(\" \"),s(\"div\",{staticClass:\"deal-progress\"},[s(\"div\",{staticClass:\"title\"},[a._v(\"进行中的借款\")]),a._v(\" \"),s(\"ul\",{staticClass:\"list\"},[a._m(1),a._v(\" \"),s(\"li\",{staticClass:\"list-item\"},[s(\"p\",{staticClass:\"item-title\"},[a._v(\"累计笔数\")]),a._v(\" \"),s(\"div\",{staticClass:\"itme-right\"},[s(\"p\",[a._v(a._s(a.transferInfo.BorrowCount_Conduct))]),a._v(\" \"),s(\"p\",[a._v(a._s(a.transferInfo.LoanCount_Conduct))])])]),a._v(\" \"),s(\"li\",{staticClass:\"list-item\"},[s(\"p\",{staticClass:\"item-title\"},[a._v(\"当前金额\")]),a._v(\" \"),s(\"div\",{staticClass:\"itme-right\"},[s(\"p\",[a._v(a._s(a.transferInfo.BorrowAmount_Conduct))]),a._v(\" \"),s(\"p\",[a._v(a._s(a.transferInfo.LoanAmount_Conduct))])])]),a._v(\" \"),s(\"li\",{staticClass:\"list-item\"},[s(\"p\",{staticClass:\"item-title\"},[a._v(\"未偿还金额\")]),a._v(\" \"),s(\"div\",{staticClass:\"itme-right\"},[s(\"p\",[a._v(a._s(a.transferInfo.UnpaidBorrowAmount_Conduct))]),a._v(\" \"),s(\"p\",[a._v(a._s(a.transferInfo.UnpaidLoanAmount_Conduct))])])])])])]):a._e()])]),a._v(\" \"),s(\"ModalComponent\",{directives:[{name:\"show\",rawName:\"v-show\",value:a.modalShow,expression:\"modalShow\"}],on:{CLOSE_EVENT:a.closeModal}},[s(\"MoreComponent\",{on:{ADD_BLACK_LIST:a.addBlackList,DELETE_FRIEND_EVENT:a.deleteFriend,COMPLAINT_EVENT:a.complaint,SHARE_CARD_EVENT:a.shareCard}})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a(\"li\",{staticClass:\"list-item\"},[a(\"p\",{staticClass:\"item-title\"},[this._v(\"类型\")]),this._v(\" \"),a(\"div\",{staticClass:\"itme-right\"},[a(\"p\",[this._v(\"借入\")]),this._v(\" \"),a(\"p\",[this._v(\"借出\")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a(\"li\",{staticClass:\"list-item\"},[a(\"p\",{staticClass:\"item-title\"},[this._v(\"类型\")]),this._v(\" \"),a(\"div\",{staticClass:\"itme-right\"},[a(\"p\",[this._v(\"借入 \"),a(\"i\",{staticClass:\"iconfont icon-cong\"})]),this._v(\" \"),a(\"p\",[this._v(\"借出\")])])])}]},!1,function(t){s(\"klUd\")},\"data-v-1e3f05ad\",null);a.default=v.exports},klUd:function(t,a){},l8o6:function(t,a){}});"}