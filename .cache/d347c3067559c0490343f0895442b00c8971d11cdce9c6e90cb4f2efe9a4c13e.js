{"source":"webpackJsonp([12],{CnUO:function(t,e,o){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var n=o(\"VU/8\")({name:\"IouSortComponent\",data:function(){return{isIndex:0,sortList:[\"放款时间降序\",\"还款期从近到远\",\"还款期从远到近\",\"期限从短到长 \",\"期限从长到短\"]}},components:{},methods:{selectSort:function(t){this.isIndex=t,this.$emit(\"SORT_EVENT\",t)},closeModal:function(){this.$emit(\"CLOSE_EVENT\")}}},{render:function(){var o=this,t=o.$createElement,n=o._self._c||t;return n(\"section\",{staticClass:\"iou-sort\",on:{click:o.closeModal}},[n(\"div\",{staticClass:\"sort-content\"},o._l(o.sortList,function(t,e){return n(\"div\",{key:e,staticClass:\"content-item padding-horizontal-30 bg-white border-bottom-1\",on:{click:function(t){t.stopPropagation(),o.selectSort(e)}}},[n(\"span\",{staticClass:\"font-27 color-black\"},[o._v(o._s(t))]),o._v(\" \"),o.isIndex===e?n(\"i\",{staticClass:\"iconfont icon-yes color-blue\"}):o._e()])}))])},staticRenderFns:[]},!1,function(t){o(\"ofi7\")},\"data-v-c1612474\",null).exports,i=o(\"NeIm\"),s=o(\"JXx5\"),a=o(\"tv/H\"),c=o(\"V7vM\"),r=o(\"1F1J\"),h=o(\"yaUXr\"),l=o(\"wJMfA\"),u=o(\"RoAgn\"),p=o(\"D7rtX\"),d=o(\"WQKAc\"),f={name:\"IouCenterComponent\",data:function(){return{searchSwitch:!1,sortShow:!1,iouList:[],type:1,pageIndex:1,order:0,nav:{content:[\"谁欠我钱\",\"我欠谁钱\",\"待确认\",\"已还清\",\"已失效\"],active:\"active\"},title:{contentText:\"借条中心\",rightText:\"排序\"}}},components:{TitleComponent:p.a,ReceiptComponent:u.a,NavComponent:h.a,WithoutComponent:d.a,PullRefreshComponent:l.a,SortComponent:n},created:function(){this.init()},methods:{init:function(){var e=this;i.a.send({url:\"LoanCenterList\",data:{token:c.a.token,phone:c.a.phone,type:this.type,key:\"\",order:this.order,pageIndex:this.pageIndex,pageSize:10}}).success(function(t){console.log(t),e.formatData(t)}).fail(function(t){})},formatData:function(t){var o=this;this.iouList=[],t.Rows.forEach(function(t){var e={name:t.TargetName,type:r.a[t.Type],portrait:\"http://iph.href.lu/120x150\",rate:t.YearRate,start:t.LoanDate,end:t.RepaymentDate,money:t.Amount,status:a.a[t.State],targetPhone:t.TargetPhone,accId:t.AccId,mode:t.Mode,icon:\"xiaoxi1\"};o.iouList.push(e)})},toggleType:function(t){this.type!==t+1&&(this.type=++t,this.pageIndex=1,this.init())},chat:function(t){s.a.push(\"chat\")},showDetail:function(t){c.a.id=t,s.a.push(\"iou-detail\")},loadMore:function(){this.init()},sortIouList:function(t){this.order!==t&&(this.order=t,this.pageIndex=1,this.init()),this.sortShow=!1},openSort:function(){this.sortShow=!0},closeModal:function(){this.sortShow=!1},search:function(){this.searchSwitch=!0},cancelSearch:function(){this.searchSwitch=!1}}},v=o(\"VU/8\")(f,{render:function(){var o=this,t=o.$createElement,n=o._self._c||t;return n(\"section\",{staticClass:\"iou-center padding-top-126\"},[n(\"TitleComponent\",{attrs:{title:o.title},on:{OTHER_EVENT:o.openSort}}),o._v(\" \"),n(\"div\",{staticClass:\"center-search padding-horizontal-30 font-27\"},[o.searchSwitch?o._e():n(\"div\",{staticClass:\"search-content\",on:{click:o.search}},[n(\"i\",{staticClass:\"iconfont icon-cong font-36 color-black\"}),o._v(\" \"),n(\"span\",[o._v(\"搜索姓名\")])]),o._v(\" \"),o.searchSwitch?n(\"div\",{staticClass:\"search-switch\"},[o._m(0),o._v(\" \"),n(\"div\",{staticClass:\"search-cancel font-27 color-blue\",on:{click:o.cancelSearch}},[n(\"span\",[o._v(\"取消\")])])]):o._e()]),o._v(\" \"),n(\"NavComponent\",{staticClass:\"center-nav font-30 bg-white\",attrs:{nav:o.nav},on:{SELECTED_EVENT:o.toggleType}}),o._v(\" \"),n(\"div\",{staticClass:\"center-tab\"},[o.iouList.length?n(\"PullRefreshComponent\",{attrs:{direction:\"top\"},on:{LOAD_MORE_EVENT:o.loadMore}},o._l(o.iouList,function(e,t){return n(\"ReceiptComponent\",{key:t,attrs:{receipt:e},on:{HEADER_EVENT:function(t){o.chat(e)},DETAIL_EVENT:function(t){o.showDetail(e.accId)}}})})):o._e(),o._v(\" \"),o.iouList.length?o._e():n(\"WithoutComponent\")],1),o._v(\" \"),n(\"SortComponent\",{directives:[{name:\"show\",rawName:\"v-show\",value:o.sortShow,expression:\"sortShow\"}],on:{SORT_EVENT:o.sortIouList,CLOSE_EVENT:o.closeModal}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e(\"div\",{staticClass:\"switch-content\"},[e(\"i\",{staticClass:\"iconfont icon-cong font-36 color-black\"}),this._v(\" \"),e(\"input\",{attrs:{type:\"text\",autofocus:\"\",placeholder:\"搜索姓名\"}})])}]},!1,function(t){o(\"MuR4\")},\"data-v-7c8bb3a4\",null);e.default=v.exports},MuR4:function(t,e){},ofi7:function(t,e){}});"}