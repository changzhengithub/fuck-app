{"source":"webpackJsonp([55],{\"41r+\":function(t,e){},bQiv:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var i=a(\"NeIm\"),n=a(\"V7vM\"),s=a(\"SEgk\"),l=a(\"3wc0d\"),o=a(\"D7rtX\"),r={name:\"TransferDetailComponent\",data:function(){return{amount:\"\",state:\"\",detailList:[{type:\"default\",key:\"类型\",value:\"\"},{type:\"default\",key:\"时间\",value:\"\"},{type:\"default\",key:\"说明\",value:\"\"},{type:\"default\",key:\"余额\",value:\"\"},{type:\"default\",key:\"其他\",value:\"\"}],title:{contentText:\"收支明细详情\"}}},components:{DetailListComponent:l.a,TitleComponent:o.a},created:function(){this.init()},methods:{init:function(){var e=this;console.log(n.a.oid),i.a.send({url:\"TransferDetail\",data:{token:n.a.token,phone:n.a.phone,id:n.a.oid}}).success(function(t){e.formatData(t)}).fail(function(t){})},formatData:function(t){this.detailList[0].value=t.tranTypeName,this.detailList[1].value=s.a.format(\"YYYY/MM/DD HH/hh/mm WW\",t.transferTime),this.detailList[2].value=t.remark,this.detailList[3].value=t.balance,this.detailList[4].value=t.transferName,this.amount=t.amount,this.state=t.resp_desc}}},d=a(\"VU/8\")(r,{render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"section\",{staticClass:\"transfer-detail padding-top-126\"},[a(\"TitleComponent\",{attrs:{title:t.title}}),t._v(\" \"),a(\"div\",{staticClass:\"detail-card bg-white\"},[a(\"div\",{staticClass:\"color-green font-72\"},[t._v(t._s(t.amount))]),t._v(\" \"),a(\"div\",{staticClass:\"color-light-grey font-30\"},[t._v(t._s(t.state))])]),t._v(\" \"),a(\"DetailListComponent\",{staticClass:\"detail-list font-30 margin-top-21 padding-horizontal-30 bg-white\",attrs:{detailList:t.detailList}})],1)},staticRenderFns:[]},!1,function(t){a(\"41r+\")},\"data-v-3f462b5c\",null);e.default=d.exports}});"}