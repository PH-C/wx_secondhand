<template>
    <div>
      <div class="header">
        <i class="iconfont iconzuojiantou back" @click="back"/>
        地址管理
      </div>

      <div  class="sizeBox">
        <div class="sizeBoxHeader">
          <div class="sizeBoxPriceBox">
            <p>我的地址</p>
          </div>
          <div>
            <span class="close" @click="editAddress">
              修改
            </span>
            <span class="close" @click="delAddress">
              删除
            </span>
          </div>
         
        
        </div>
        <div class="allAddress ">
          <div
              class="addressItem"
              v-for="(item, index) in address"
              v-bind:key="item.id" 
              :class="{'selected':showIndex==index}"
              @click="selectAddress(index)">
                <p>收货人: {{item.realName}} <span style="float: right;margin-right: .2rem">{{item.mobile}}</span></p>
                <div class="address">{{item.address}}}</div>
          </div>
        
          <p  class="buyBtn">
            <button @click="addAddress">添加地址</button>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "addressMan",
  data() {
  	return {
      address: [],
      order: {},
      selAddress:{},
      showAddress: false,
  		showIndex: 0
  	}
	},
  created: function () {
  	this.getData()
	},
  methods: {
    back: function() {
      this.$router.back(-1)
    },
    getData () {
      const _this = this;
     
      this.$http({
        method: 'GET',
        url: `${_this.$host}/api/users/address`,
        params: {

        }
      }).then(function (res) {
        console.log(res);
        if(res.data.code===0){
					let address = res.data.data.rows
          _this.address = address
          _this.selAddress = address[0]
        }
        
      }).catch(function (error) {
        console.log(error);
      });
    },
   
   	showAddressBox: function(index){
  		this.showAddress = !this.showAddress
  	},
  	closeAddressBox: function() {
  		this.showAddress = false
  	},
  	selectAddress: function(index) {
			console.log("index", index)
  		this.showIndex = index
    },
    selectAddressOK:function(){
      const {address, showIndex} = this
      this.selAddress = address[showIndex]
      this.closeAddressBox()
    },
    addAddress: function(){
      this.$router.push({path: '/addAddress'})
    },
    editAddress: function(){
      this.$router.push({path: '/addAddress',query: {id: this.selAddress.id}})
    },
    delAddress: function(){
      const _this = this
      this.$http({
        method: 'DELETE',
        url: `${_this.$host}/api/address/${_this.selAddress.id}`,
        params: {

        }
      }).then(function (res) {
        console.log(res);
        if(res.data.code===0){
          _this.showToastType("删除成功！", "correct")
          _this.getData()
        }else{
          _this.showToastType(res.data.msg, "error")
        }
        
      }).catch(function (error) {
        console.log(error);
      });
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
  .header{
    box-sizing: border-box;
    line-height: 1rem;
    width: 100%;
    padding: .2rem .4rem;
    font-size: .5rem;
    text-align: left;
    border-bottom: 2px solid #e4e5e9;
  }
  .back{
    font-size: .6rem;
    margin-right: .4rem;
  }
  .userInfo{
    text-align: left;
    padding: .4rem;
    font-size: .4rem;
  }
  .address{
    margin-top: .3rem;
    font-size: .36rem;
    color: #d4d4d4;
  }
  .interview{
    width: 100%;
    height: .2rem;
    background: #f5f5f7;
  }
 
  .goodsRow{
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    width: 100%;
    padding: .4rem;
  }
  .goodsRow img{
    width: 2rem;
    height: 2rem;
    margin-right: .4rem;
  }
  .goodsName{
    font-size: .4rem;
    text-align: left;
    margin: .3rem 0;
  }
  .size{
    margin-right: .3rem;
  }
  .goodsPrice{
    float: right;
  }
  .bottom{
    position: fixed;
    bottom: 0;
    height: 1.6rem;
    line-height: 1rem;
    box-sizing: border-box;
    width: 100%;
    padding: .36rem;
    font-size: .4rem;
    color: #F56C6C;
    text-align: left;
  }
  .button{
    float: right;
    width: 3rem;
    height: 1rem;
    line-height: 1rem;
    background: #04dfe1;
    text-align: center;
    font-size: .4rem;
    border-radius: 4px;
    color: #fff;
  }

  .sizeBox{
  	position: relative;
  	z-index: 4;
  	box-sizing: border-box;
  	width: 100%;
  	text-align: left;
  	font-size: .4rem;
  	background: #fff;
  }
  .sizeBox img{
  	width: 3rem;
  }
  .sizeBoxPriceBox{
  	display: inline-block;
  }
  .sizeBoxHeader{
  	position: relative;
  	box-sizing: border-box;
  	width: 100%;
  	display: flex;
    align-items: center;
    justify-content: space-between;
  	line-height: .7rem;
  	padding: .4rem;
  }
  .close{
  	position: relative;
  	font-size: .5rem;
  }
  .allAddress{
  	box-sizing: border-box;
  	background: #f5f4f9;
  	width: 100%;
  	padding: .4rem;
  	display: flex;
  	flex-direction: row;
  	flex-wrap: wrap;
  }
  .allAddress .addressItem{
  	width: 100%;
  	height: 1.5rem;
  	margin-right: .4rem;
  	margin-bottom: .4rem;
  	background: #fff;
    padding: 0.2rem;
  	border-radius: 4px;
  	border: 0;
  }
  .eachAddress:nth-child(4n){
  	margin-right: 0;
  }
  .blackBg{
  	position: fixed;
  	z-index: 3;
  	bottom: 0;
  	left: 0;
  	width: 100%;
  	height: 100%;
  	background: #000000;
  	opacity: .4;
  }
 
  .selected{
  	border: 1px solid #cecece !important;
  }
  .buyBtn{
  	width: 100%;
  	padding: .2rem .4rem;
  }
  .buyBtn button{
  	width: 100%;
  	height: 1rem;
  	background: #00c2c2;
  	color: #fff;
  	border: none;
  	outline: none;
  	border-radius: 4px;
  }
</style>
