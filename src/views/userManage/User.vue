<template>
  <div class="app">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
      <el-card shadow="hover">
        <el-table :data="userList">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="账号" prop="userName"></el-table-column>
          <el-table-column label="真实姓名" prop="realName"></el-table-column>
          <el-table-column label="性别" prop="sex"></el-table-column>
          <el-table-column label="生日">
            <template slot-scope="scope">
              <p v-if="(scope.row.birthday!=null)">{{(scope.row.birthday)}}</p>
              <p v-else-if="(scope.row.birthday)==null || (scope.row.birthday)==''">&nbsp;</p>
            </template>
          </el-table-column>
          <el-table-column label="邮箱" prop="email"></el-table-column>
          <el-table-column label="拉黑">
            <template slot-scope="scope">
              <el-switch 
                v-model="scope.row.black"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="userChange(scope.row)">   
              </el-switch>
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
      :total="total">
    </el-pagination>
      </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNum: 0,
      pageSize: 5,
      total: 0,
      // 全部数据
      userList: [],
    };
  },
  created() {
    this.getUserList()
    this.findTotal()
  },
  methods: {
    userChange(info) {
      console.log(info);
    },
    getUserList() {
      this.$http
        .get(
          `/user/findAllUser?pageNum=${this.pageNum}&pageSize=${this.pageSize}`
        )
        .then((res) => {
          this.userList = res.data.data;
          // console.log(this.itemCategoryList);
        });
    },
    // 分页
    findTotal() {
      this.$http.post("/user/findTotal").then((res) => {
        // console.log(res);
        this.total = res.data.data;
      });
    },
    // 分页数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getUserList();
    },
  },
};
</script>

<style lang="">
</style>