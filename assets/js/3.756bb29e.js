(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{129:function(t,a,s){},130:function(t,a,s){"use strict";var e=s(129);s.n(e).a},132:function(t,a,s){},133:function(t,a,s){"use strict";var e={},n=(s(130),s(22)),i=Object(n.a)(e,(function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"header"},[a("div",{staticClass:"header-title"},[this._v(this._s(this.$siteTitle))]),this._v(" "),a("div",{staticClass:"nav"},[a("router-link",{attrs:{to:"/"}},[this._v("文章")])],1)])}),[],!1,null,"5f7cbcfe",null);a.a=i.exports},135:function(t,a,s){"use strict";var e=s(132);s.n(e).a},137:function(t,a,s){"use strict";s.r(a);var e={components:{HeaderLayout:s(133).a},filters:{formatDate:t=>new Date(t).toLocaleString()}},n=(s(135),s(22)),i=Object(n.a)(e,(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"post"},[s("header-layout"),t._v(" "),s("div",{staticClass:"post-content"},[s("div",{staticClass:"post-title"},[t._v("\n      "+t._s(t.$page.title)+"\n      "),s("p",{staticClass:"date"},[t.$page.author?s("span",[t._v("作者: "+t._s(t.$page.author))]):t._e(),t._v(" "),s("span",[t._v("发布日期："+t._s(t.$page.createdAt))]),t._v(" "),t.$page.lastUpdated?s("span",[t._v("更新于 "+t._s(t._f("formatDate")(t.$page.lastUpdated)))]):t._e()])]),t._v(" "),s("Content",{staticClass:"content"}),t._v(" "),s("div",{staticClass:"post-anchor"},[s("a-anchor",{attrs:{offsetTop:100}},t._l(t.$page.headers,(function(t,a){return s("a-anchor-link",{key:a,staticClass:"anchor-item",attrs:{href:"#"+t.slug,title:t.title}})})),1)],1)],1)],1)}),[],!1,null,"a345f0ac",null);a.default=i.exports}}]);