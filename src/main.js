import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');

(function (doc, win) {
	var dpr = window.devicePixelRatio;
	var docEl = doc.documentElement;
	var metaEl = document.querySelector('meta[name="viewport"]');
	if(!metaEl){
		metaEl = document.createElement('meta');
		metaEl.name = "viewport";
		doc.documentElement.firstElementChild.appendChild(metaEl);
	}
	var scale = 1 / dpr;
	var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';  
	var recalc = function () {    
		var clientWidth = window.innerWidth * scale;
		docEl.style.fontSize = 100 * (clientWidth * dpr / 750) + 'px';
	};    
	if (!doc.addEventListener) return;    
	win.addEventListener(resizeEvt, recalc, false);    
	doc.addEventListener('DOMContentLoaded', recalc, false);    
})(document, window);