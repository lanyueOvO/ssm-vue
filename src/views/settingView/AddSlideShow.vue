<template>
  <div class="app">
    <el-page-header
      @back="goBack"
      content="添加轮播商品"
      id="pageHead"
    ></el-page-header>
    <el-card shadow="hover">
      <el-form :model="addSlide">
        <el-form-item label="选择商品">
          <el-select v-model="itemNameVal" filterable placeholder="请输入">
              <!-- getOptions -->
            <el-option
              v-for="item in allItemName"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="轮播图片">
          <el-upload
            action="http://127.0.0.1:84/item/uploadUrlOne"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :limit="1 - 0"
          >
            <i slot="default" class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="cancel" style="width:98px">取消</el-button>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
      this.findItemName();
  },
  data() {
    return {
      addSlide: {
        url: "",
        item_name: "",
        item_id: 0,
      },
      itemNameVal: "",
      allItemName: [],
    };
  },
  methods: {
    goBack() {
      this.$router.push("/slideShow");
    },
    findItemName(){
        this.$http.post('/slideshow/findAllItemName').then((res)=>{
            // console.log(res);
            this.allItemName = res.data.data
            // console.log(this.allItemName);
        })
    },
    cancel(){

    },
    onSubmit(){
      // console.log(this.itemNameVal);
      this.addSlide.item_id = this.itemNameVal;
      console.log(this.addSlide);
      this.$http.post('/slideshow/addSlideShow',this.addSlide).then((res)=>{
        console.log(res);
        if(res.data.code==200){
          this.$message.success('创建成功！')
          this.$router.push('/slideShow')
        }
      })
    },
    // 文件上传
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleAvatarSuccess(res, file) {
      this.addSlide.url = res.data;
      // console.log(res.data);
      // console.log(file);
      // console.log(URL.createObjectURL(file.raw));
    },
    getOptions(val){
        console.log(val);
    }
  },
};
</script>

<style lang="less" scoped>
#pageHead {
  margin-bottom: 15px;
}
</style>