<template>
  <div class="app">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入要查询的商品">
            <el-button slot="append" icon="el-icon-search" @click="getItemLike"
              >查询</el-button>
          </el-input>
        </el-col>
        <el-col :span="6" class="btn_add">
          <el-button @click="addSlideShow" type="primary">添加轮播商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="slideData">
        <el-table-column label="商品名称" prop="item_name"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-switch
             v-model="scope.row.status"
             @change="changedStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="图片" width="300">
          <template slot-scope="scope">
            <el-image
             :src="scope.row.url"
             style="width: 200px; height: 100px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" plain icon="el-icon-edit" @click="change(scope.row)"></el-button>
            <el-button type="danger" plain icon="el-icon-delete" @click="removeSlide(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.findAllSileShow();
  },
  data() {
    return {
      slideData: [],
    };
  },
  methods: {
    //   操作
    change(val){
        console.log(val);
    },

    findAllSileShow(){
      this.$http.post('/slideshow/findAllSlideShow').then((res)=>{
        // console.log(res);
        this.slideData = res.data.data
      })
    },
    removeSlide(val){
        // console.log(val);
        this.$http.post('/slideshow/removeSlide',val).then((res)=>{
          // console.log(res);
          if (res.data.code==200) {
            this.$message.success('删除成功！')
            this.findAllSileShow();
          }
        })
    },
    addSlideShow() {
      this.$router.push('/addSlideShow')
    },
    getItemLike() {},

    changedStatus(info){
      // console.log(info);
      this.$http.post('/slideshow/changedStatus',info).then((res)=>{
        // console.log(res);
        if(res.data.code == 200){
          this.$message.success('修改成功！')
        }else if(res.data.code ==400){
          this.$message.error('修改失败！超过最大长度！')
          info.status = false
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
</style>