
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/find/index","pages/message/index","pages/mine/index"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#333","selectedColor":"#005bac","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/icon/footer_1.png","selectedIconPath":"static/icon/footer_1_red.png"},{"pagePath":"pages/find/index","text":"发现","iconPath":"static/icon/footer_2.png","selectedIconPath":"static/icon/footer_2_red.png"},{"pagePath":"pages/message/index","text":"消息","iconPath":"static/icon/footer_3.png","selectedIconPath":"static/icon/footer_3_red.png"},{"pagePath":"pages/mine/index","text":"我的","iconPath":"static/icon/footer_4.png","selectedIconPath":"static/icon/footer_4_red.png"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"web21-uni-base","compilerVersion":"2.6.8","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"加减号"}},{"path":"/pages/find/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"发现"}},{"path":"/pages/message/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"消息"}},{"path":"/pages/mine/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,window:void 0}}}});
