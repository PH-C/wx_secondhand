<template>
  <div>
    <div class="header">
      <span @click="cancle">取消</span>
      <span @click="publish" style="float: right;color: #04dfe1;">保存地址</span>
    </div>
    <div class="container">
      <cube-input v-model="realName" placeholder="请输入姓名..."></cube-input>
      <cube-input v-model="mobile" placeholder="请输入手机号..."></cube-input>
      <cube-textarea v-model="address" :maxlength="100" placeholder="请输入详细地址"></cube-textarea>  
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        realName: '',
        address:'',
        mobile:'',
        id:''
      }
    },
    created: function () {
      this.getData()
    },
    methods: {
    
      getData () {
        const _this = this;
        console.log("this.$route", this.$route.query)
        const { id } = this.$route.query
        this.id = id
     
        this.$http({
          method: 'GET',
          url: `${_this.$host}/api/address/${id}`,
          params: {

          }
        }).then(function (res) {
          console.log(res);
          if(res.data.code===0){
            let address = res.data.data
            _this.realName = address.realName
            _this.mobile = address.mobile
            _this.address = address.address
          }
          
        }).catch(function (error) {
          console.log(error);
        });
      },
      cancle: function(){
        this.$router.back(-1)
      },
      publish: function(){

        const _this = this;
        const { id, realName, address, mobile} = _this;
        
        if(realName && address && mobile){
          const data = {
            realName,
            mobile,
            address
          }
          if(id){
            _this.save(data,"PUT", `${_this.$host}/api/address/${id}`)
          }else{
            _this.save(data,"POST", `${_this.$host}/api/address`)
          } 
        }
       
      },

      save: function(data, method, url){
        const _this = this
         this.$http({
            method: method,
            url: url,
            data:data
          }).then(function (res) {
            console.log(res);
            if(res.data.code===0){
              console.log("发布成功！")
              _this.showToastType("保存成功！", "correct")
              _this.realName=""
              _this.mobile=""
              _this.address=""
            } else if(res.data.code===400) {
              console.log("登录失败，请输入正确的账户或者密码")
              _this.showToastType(res.data.msg, "error")
              _this.$router.push({path: '/login'})
            }else{
              _this.showToastType(res.data.msg, "error")
            }
          }).catch(function (error) {
            console.log(error);
          });
      },
      showToastType:function(txt, type) {
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
  .header{
    box-sizing: border-box;
    line-height: 1rem;
    width: 100%;
    padding: .2rem .4rem;
    font-size: .5rem;
    text-align: left;
    border-bottom: 2px solid #e4e5e9;
    color: #e7e6eb;
  }
  .container{
    box-sizing: border-box;
    width: 100%;
    padding: .4rem;
  }
  .listpics{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .upLoad{
    width: 2.1rem;
    height: 2.14rem;
    margin-top: 1rem;
    color: #e7e6eb;
  }
  .upLoad{
    width: 100%;
   
  }
  .cube-upload-file{
    border: 1px solid #e7e6eb;
    padding: 0.05rem;
  }
</style>
