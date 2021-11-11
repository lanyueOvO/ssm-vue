import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js'
import axios from 'axios'
import './assets/font/pwd.svg'
import './assets/css/global.css' 
import qs from 'qs'


// axios.interceptors.request.use(config=>{
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
// axios.defaults.withCredentials = true
Vue.config.productionTip = false;
Vue.prototype.$http=axios;
Vue.use(ElementUI);
Vue.prototype.$qs = qs;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = 'http://127.0.0.1:84'

Date.prototype.Format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, // 月份
		"d+": this.getDate(), // 日
		"h+": this.getHours(), // 小时
		"m+": this.getMinutes(), // 分
		"s+": this.getSeconds(), // 秒
		"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
		"S": this.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
new Vue({
  el:'#app',
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
