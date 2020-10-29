import Vue from 'vue'
import iView from 'iview'
import locale from 'iview/dist/locale/en-US' // Change locale, check node_modules/iview/dist/locale

Vue.use(iView, {
  locale,
})


export default ({ app }) => {
  if (process.client) {
    var _this=this;
  }
  app.router.beforeEach((to, from,next) => {
    if (process.client) {
      iView.LoadingBar.start();
      if(to.path!='/login'){
        var token=localStorage.getItem("token");
        if(token==null){
          next('/login')
        }   
        
      }
    }
    
    next();
  });
  app.router.afterEach(route => {
    if (process.client) {
      iView.LoadingBar.finish();
    }
  });
 
}
