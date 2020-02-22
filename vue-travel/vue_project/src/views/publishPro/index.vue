<template>
  <div>
    <div class="header">
      <span @click="cancle">取消</span>
      <span @click="publish" style="float: right;color: #04dfe1;">发布</span>
    </div>
    <div class="container">
      <cube-input v-model="name" placeholder="请输入商品名称..."></cube-input>
      <cube-input v-model="price" placeholder="请输入售价..."></cube-input>
      <cube-input v-model="articleNumber" placeholder="请输入货号..."></cube-input>
       <cube-input v-model="sku" placeholder="请输入库存..."></cube-input>
      <p class="protype">请选择商品类型</p>
      <cube-select
        v-model="type"
        :title="t_title"
        :options="options"
        :placeholder="placeholder"
        :auto-pop="autoPop"
        :disabled="disabled"
        @change="change">
      </cube-select>
      <cube-checkbox v-model="isRecommend">
        <p class="protype">是否推荐<span class="type-explanation">(推荐后会在商品购买页面顶部轮播图显示)</span></p>
      </cube-checkbox>
      <cube-textarea v-model="describe" :maxlength="1500" placeholder="说点什么吧..."></cube-textarea>
      <cube-upload
        ref="upload"
        v-model="files"
        :action="action"
        :max="9"
        :simultaneousUploads="9"
        @files-added="addedHandler"
        @file-error="errHandler"
        class="upLoad">
        <div class="clear-fix listpics">
          <cube-upload-file 
            v-for="(file, i) in files"
            :file="file"
            :key="i"
            >
          </cube-upload-file>
         
          <div
            v-if="files.length<9"
          >
            <cube-upload-btn
              :multiple="true"
            >
            </cube-upload-btn>
          </div>

          <div 
            v-else
          >
            最多上传9张图片
          </div>

          
        </div>
      </cube-upload>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        name: '',
        articleNumber:'',
        describe:'',
        price:'',
        sku:'',
        isRecommend:false,
        action: `${this.$host}/api/upload`,
        files: [],
        options: ["门票", "旅行团"],
        type: "门票",
        t_title: '请选择商品类型',
        placeholder: '请选择商品类型',
        autoPop: false,
        disabled: false
      }
    },
    methods: {
      addedHandler() {
        console.log('this.files', this.files)
        // const file = this.files[0]
        // file && this.$refs.upload.removeFile(file)
      },
      errHandler(file) {
        // const msg = file.response.message
        this.$createToast({
          type: 'warn',
          txt: 'Upload fail',
          time: 1000
        }).show()
      },
      change(value, index, text) {
        console.log('change', value, index, text)
      },
      cancle: function(){
        this.$router.push({path: '/find',query: {id: '发现'}})
      },
      publish: function(){

        const _this = this;
        const { name, type, isRecommend, articleNumber, price,files,sku, describe} = _this;
        let pic = [];
        files.forEach(element => {
          pic.push(element.response.data.url)
        });
        if(name && files.length && describe && articleNumber && price){
          this.$http({
            method: 'POST',
            url: `${_this.$host}/api/product`,
            data: {
              name:name,
              type,
              price,
              sku,
              articleNumber,
              isRecommend,
              size:'成人票,儿童票,学生票',
              pic:pic.join(","),
              describe:describe
            }
          }).then(function (res) {
            console.log(res);
            if(res.data.code===0){
              console.log("发布成功！")
              _this.showToastType("发布成功！", "correct")
              _this.name=""
              _this.content=""
              _this.isRecommend = false
              _this.articleNumber = ""
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
        }
       
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
  .protype{
    font-size: 0.5rem;
    text-align: left;
    padding: 0.16rem;
    color:#cecece;
  }
  .type-explanation{
    font-size: 0.36rem;
    text-align: left;
    color:#b33d3d;
  }
</style>
