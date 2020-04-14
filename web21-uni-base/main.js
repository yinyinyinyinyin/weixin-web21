import Vue from 'vue'
import App from './App'

//引入fonticon的css文件
import './font/iconfont.css';

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
