<template>
  <div>
    <div class="header">
      <span @click="cancle">取消</span>
      <span @click="publish" style="float: right;color: #04dfe1;">发布</span>
    </div>
    <div class="container">
      <cube-input v-model="title" placeholder="请输入标题..."></cube-input>
      <cube-textarea v-model="content" :maxlength="1500" placeholder="说点什么吧..."></cube-textarea>
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
        title: '',
        content:'',
        action: `${this.$host}/api/upload`,
        files: []
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
      cancle: function(){
        this.$router.push({path: '/find',query: {id: '发现'}})
      },
      publish: function(){

        const _this = this;
        const { title, files, content} = _this;
        let pic = [];
        files.forEach(element => {
          pic.push(element.response.data.url)
        });
        if(title && files.length && content){
          this.$http({
            method: 'POST',
            url: `${_this.$host}/api/topic`,
            data: {
              title:title,
              pic:pic.join(","),
              content:content
            }
          }).then(function (res) {
            console.log(res);
            if(res.data.code===0){
              console.log("发布成功！")
              _this.showToastType("发布成功！", "correct")
              _this.title=""
              _this.content=""
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
</style>
