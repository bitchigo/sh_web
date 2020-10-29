<template>
  <div id="bg">
    <div id="login_box" class="login_box">
      <h1>用户登录</h1>
      <br>
      <Input v-model="form.number" prefix="ios-contact" placeholder="请输入用户名" size="large" style="width: 280px" class="form"/>
      <br>
      <Input v-model="form.password" prefix="md-key" placeholder="请输入密码" size="large" style="width: 280px" class="form" type="password"/>
      <br>
      <Button type="success" long style="width:280px" class="form" @click="login()" id="login_btn">登录</Button>
      <br>
      <Button type="warning" long style="width:280px" class="form" @click="reset()" id="reset_btn">重置</Button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
   data() {
    return {
      form:{
        number:"",
        password:"",
      },
    };
  },
  methods:{
    login(){
      let _this=this
      axios({
        method:'post',
        baseURL:'api/login',
        data:this.form
      }).then(function(rep){
        if(rep.data.status=='200'){
          _this.$Notice.success({
                    title: '通知',
                    desc: rep.data.msg,
                    duration:2.5
                });  
          localStorage.setItem("token", rep.data.token);
          _this.$router.push({
          path: `/home/`+rep.data.role,
          })
        }else if(rep.data.status=='403'){
          _this.$Notice.error({
                    title: '通知',
                    desc: rep.data.msg,
                    duration:2.5
                });          
        } 
      })
    },
    reset(){
      this.form.number="";
      this.form.password="";
    }
  },
};
</script>

<style  scoped>
#login_btn{
  position:absolute;
  bottom: 40px;
  transform: translate(-50%,-50%);
}
#reset_btn{
  position:absolute;
  bottom: 0;
  transform: translate(-50%,-50%);
}
#bg{
  background-image: radial-gradient(
    circle farthest-corner at 12.3% 19.3%,
    rgba(85, 88, 218, 1) 0%,
    rgba(95, 209, 249, 1) 100.2%
  );
  height: 100%;
}
#login_box{
  width: 300px;
  height: 400px;
  position: absolute;
  background-color:aliceblue;
  border-radius: 10px;
  text-align: center;
  left: 25%;
  top: 50%;
  transform: translate(-50%,-50%);
}

.form{
  margin-bottom: 10px;
}
@keyframes shake { 
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(+2px, 0, 0); }
            30%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(+4px, 0, 0); }
            50% { transform: translate3d(-4px, 0, 0); }
        }
</style>
