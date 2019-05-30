import Vue from 'vue'
import App from './App'
import router from './router'

import VueRouter from 'vue-router'
import '../static/css/main.css'
import axios from 'axios'
// UI
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import Toast from 'muse-ui-toast';
import 'muse-ui-message/dist/muse-ui-message.css';
import Message from 'muse-ui-message';
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import Loading from 'muse-ui-loading';

// 更改主题颜色
MuseUI.theme.add('myTheme', {
  primary: MuseUI.Colors.blue,
  secondary: MuseUI.Colors.pinkA200,
  success: MuseUI.Colors.green,
  warning: MuseUI.Colors.yellow600,
  info: MuseUI.Colors.blue,
  error: MuseUI.Colors.red,
}).use('myTheme');


Vue.use(MuseUI);
Vue.use(Toast, {
  position: 'bottom',               // 弹出的位置
  time: 2220,                       // 显示的时长
  closeIcon: 'close',               // 关闭的图标
  close: true,                      // 是否显示关闭按钮
  successIcon: 'check_circle',      // 成功信息图标
  infoIcon: 'info',                 // 信息信息图标
  warningIcon: 'priority_high',     // 提醒信息图标
  errorIcon: 'warning'              // 错误信息图标
});
Vue.use(Message);
Vue.use(Loading);

/* vue配置 */
Vue.config.debug = process.env.NODE_ENV !== 'production'
Vue.config.productionTip = false

/* 附加插件 */
Vue.use(VueRouter)


/* axios配置 */
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
Vue.prototype.$axios = axios

/* 时间转化 */
Vue.prototype.$timeF = require('moment');
Vue.prototype.$timeF.locale('zh-cn');

var baseUrl = "http://localhost:8088/"
//var baseUrl = "http://audition.soukys.com/"
/*
 * 封装ajax
 * data : ajax传入后台data数据
 * address : ajax接口地址
 * fn : 成功返回方法  带参数  obj,data  obj : this data : response
 * */
Vue.prototype.$postHttp =  function(address,data,fn){
	this.$axios.post(baseUrl+address,data).then(response => {
  			fn(response.data);
    },response => {
    	this.loading = false;
			this.$notify({
		      title: '网络错误',
		      message: '网络错误',
		      offset: 100,
		      duration:1500,
		      type:'error'
	    });
	})
}

Vue.prototype.$postHttpForMb =  function(address,data,fn){
	this.$axios.post(baseUrl+address,data).then(response => {
  			fn(response.data);
    },response => {
    	this.$message({message: '网络错误',type: 'error',center: true});
	})
}

/*
 * 封装提示
 * title : 标题
 * message : 提示内容
 * type : 提示类型  success warning error
 * */
Vue.prototype.$notify_jr = function(title,message,type) {
	this.$notify({
      title: title,
      message: message,
      offset: 100,
      duration:1500,
      type:type
    });
}

Vue.prototype.$notify_success = function(message) {
	this.$notify({
      title: '操作成功',
      message: message,
      offset: 100,
      duration:1500,
      type:'success'
    });
}

Vue.prototype.$notify_error = function(message) {
	this.$notify({
      title: '操作失败',
      message: message,
      offset: 100,
      duration:1500,
      type:'error'
    });
}

Vue.prototype.$notify_warning = function(message) {
	this.$notify({
      title: '提示',
      message: message,
      offset: 100,
      duration:1500,
      type:'warning'
    });
}

/*
 * 封装未登录提示
 * */
Vue.prototype.$notify_login = function(){
	this.$notify({
      title: '提示',
      message:'请先登录',
      offset: 100,
      duration:1500,
      type:'warning'
    });
}
/**
 * confim
 * message:提示信息
 * title:提示标题
 * confimEvent:确定事件回调
 * */
Vue.prototype.$confim_jy = function(message,title,confimEvent){
	this.$confirm(message, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          	confimEvent();
        }).catch(() => {
             //用户取消不做操作
        });
}

Vue.prototype.$getBaseUrl = function(){
	return baseUrl;
}


/*
 * 封装sessionStorage
 * key : 键 string
 * value : 值 object
 * */
Vue.prototype.$setData = function(key,value){
	window.sessionStorage.setItem(key,value);
}
Vue.prototype.$getData = function(key){
	return window.sessionStorage.getItem(key);
}

Vue.prototype.$unbind = function(data){
	return JSON.parse(JSON.stringify(data));
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App}
})
