<template>
  <div class="app">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>首页商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入要查询的商品">
            <el-button slot="append" icon="el-icon-search" @click="getItemLike"
              >查询</el-button
            >
          </el-input>
        </el-col>
        <el-col :span="6" class="btn_add">
          <el-button @click="addItem" type="primary">添加新商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodsData">
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="图片">
            <template slot-scope="scope">
                <el-image
                 :src="scope.row.url1"
                 style="width:100px;height:100px"></el-image>
            </template>
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="itemCateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="warning"
              plain
              icon="el-icon-edit"
              @click="change(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              @click="remove(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
      this.findGoods();
  },
  data() {
    return {
      goodsData: [],
    };
  },
  methods: {
    findGoods(){
        this.$http.post('/item/findShowItem').then((res)=>{
            console.log(res);
            this.goodsData = res.data.data
        })
    },
    getItemLike() {},
    addItem() {},
    change(val) {
      console.log(val);
    },
    remove(val) {
      console.log(val);
    },
    itemCateChanged(val){
        console.log(val);
        this.$http.post('/item/updateStatus',val).then((res)=>{
            console.log(res);
            if(res.data.code==200){
                this.$message.success('修改成功')
            }
        })
    },
  },
};
</script>

<style>
</style>