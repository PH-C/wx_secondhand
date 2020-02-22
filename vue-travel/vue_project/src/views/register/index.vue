<template>
    <div class="mainBox">
      <div class="logoBox"  style="width: 2rem;height:2rem">
      </div>
      <div class="registerRow">
        <span>用户名</span>
        <input type="text" v-model="username"  placeholder="请输入用户名">
      </div>
      <div class="registerRow">
        <span>密码</span>
        <input type="text" v-model="password"  placeholder="请输入密码">
      </div>
      <div class="registerBtn"  @click="onRegister">
        注册
      </div>
      <div class="forgetPwd" @click="goLogin">已有账号，点击登录</div>
    </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {
        username:"",
        password:""
      }
    },
    methods: {
      onRegister: function(){
        const { username, password} = this
        this.Register( username, password )

      },
      Register(username, password){
        const _this = this;
        this.$http({
          method: 'POST',
          url: `${_this.$host}/api/users/register`,
          data: {
            username,
            password
          }
        }).then(function (res) {
          console.log(res);
          if(res.data.code===0){
            console.log("登录成功！")
            _this.showToastType("注册成功！", "correct")
            // _this.$router.push({path: '/login'})
          } else {
            console.log("登录失败，请输入正确的账户或者密码")
             _this.showToastType(res.data.msg, "error")
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      goLogin:function(){
        this.$router.push({path: '/login'})
      },
      showToastType(txt, type) {
        const toast = this.$createToast({
          txt: txt,
          type: type
        })
        toast.show()
      }
    }
  }
</script>

<style scoped>
  .mainBox{
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
  }
  .logoBox{
    text-align: left;
    margin-bottom: 2rem;
  }
  .registerRow{
    box-sizing: border-box;
    width: 100%;
    border-bottom: 2px solid #e4e5e9;
    padding: .3rem;
    font-size: .4rem;
    text-align: left;
    margin-bottom: .4rem;
  }
  .registerRow span{
    display: inline-block;
    width: 1.2rem;
  }
  .registerRow input{
    margin-left: .4rem;
    outline: none;
  }
  .registerBtn{
    margin-top: 1rem;
    width: 100%;
    text-align: center;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: .5rem;
    background: #04dfe1;
    color: #fff;
    border-radius: 4px;
  }
  .forgetPwd{
    margin-top: .4rem;
    font-size: .4rem;
    text-align: right;
  }
</style>
