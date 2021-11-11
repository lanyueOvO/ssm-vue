<template>
  <div class="app">
    <!-- <h1>产品总数</h1> -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>全部商品</el-breadcrumb-item>
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
          <el-button @click="addItem" type="primary"
            >添加新商品</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="itemAllList" style="width: 100%">
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <!-- <el-table-column label="下单数" prop="gmNum"></el-table-column> -->
        <el-table-column label="库存" prop="repertory"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.url1"
              style="width: 80px; height: 80px; padding-right: 10px"
            ></el-image>
            <!-- <el-link 
              icon="el-icon-edit"
              @mouseover.native="imgLook(scope.row)">查看</el-link> -->
          </template>
        </el-table-column>
        <el-table-column label="是否展示" prop="status">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="itemChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              @click="updateItemZk(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增弹出框 -->
    <el-dialog :visible.sync="dialogItemAdd">
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.findItemCategorySonName();
    this.findTotal();
    this.getItemAll();
  },
  data() {
    return {
      // 分页数据
      pageNum: 0,
      pageSize: 3,
      total: 0,
      // 全部商品
      itemAllList: [],
      listAllItemgorySonName:[],
      valueName:'',
      dialogItemAdd: false,
      // 图片地址
      // url1: '',
    };
  },
  methods: {
    // 所有商品
    getItemAll() {
      this.$http
        .get(`/item/findAll?pageNum=${this.pageNum}&pageSize=${this.pageSize}`)
        .then((res) => {
          this.itemAllList = res.data.data;
        });
    },
    // 商品模糊查询
    getItemLike() {},
    // 修改折扣
    updateItemZk(info) {},
    // 修改状态
    itemChanged(info) {
      console.log(info);
      this.$http.post('/item/updateItemStatus',info).then((res)=>{
        console.log(res);
        if (res.data.code==200) {
          this.$message.success('修改成功')
        }
      })
    },
    // 分页
    findTotal() {
      this.$http.post("/item/findTotal").then((res) => {
        // console.log(res);
        this.total = res.data.data;
      });
    },
    // 分页数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getItemAll();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getItemAll();
    },
    findItemCategorySonName() {
      this.$http.post("/item/findItemCategorySonName").then((res) => {
        // console.log(res);
        this.findItemCategorySonName = res.data.data
      });
    },
    addItem(){
      this.$router.push('/addItem')
    }
  },
};
</script>

<style lang="less" scope>
.btn_add {
  position: absolute;
  right: 15px;
  // display: block;
}
</style>