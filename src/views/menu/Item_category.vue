<template>
  <div class="app">
    <!-- <h2>产品类别</h2>
    <el-button type="success" @click="test">测试</el-button> -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>产品类别</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入类别名称" v-model="queryInfo.query">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUpdateLikeFa"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" class="btn_primary">
          <el-button type="primary" @click="dialogFormInsert = true"
            >添加类别</el-button
          >
        </el-col>
      </el-row>

      <!-- Category -->
      <el-table :data="itemCategoryList" border>
        <!-- <el-table-column type="index" label="#"></el-table-column> -->
        <el-table-column label="类别id" prop="id"></el-table-column>
        <el-table-column label="类别名称" prop="name"></el-table-column>
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
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip content="修改" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="updateItemCategory(scope.row)"
              ></el-button>
            </el-tooltip>

            <!-- 删除 -->
            <el-tooltip content="删除" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                class="delete_btn"
                @click="removeCategory(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- 查看 -->
            <el-tooltip
              content="查看二级分类"
              placement="top"
              :enterable="false"
              class="selectSon"
            >
              <el-popover placement="left" width="260" trigger="click">
                <el-table :data="findCategorySon">
                  <el-table-column
                    width="50"
                    label="id"
                    prop="id"
                  ></el-table-column>
                  <el-table-column
                    width="80"
                    label="名称"
                    prop="name"
                  ></el-table-column>
                  <el-table-column
                    width="80"
                    label="备注"
                    prop="remark"
                  ></el-table-column>
                </el-table>
                <el-button
                  type="warning"
                  icon="el-icon-s-promotion"
                  size="mini"
                  slot="reference"
                  @click="findListSon(scope.row)"
                ></el-button>
              </el-popover>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pageNum"
      :page-sizes="[3, 5, 7, 9]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 弹框 -->
    <!--dialogUpdate-->
    <el-dialog title="类别修改" :visible.sync="dialogFormUpdate">
      <el-form :model="updateForm" :rules="formItem_rules" ref="updateFormRef">
        <el-form-item
          label="类别名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类别备注" :label-width="formLabelWidth">
          <el-input
            v-model="updateForm.remark"
            @keyup.enter.native="updateCategory"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormUpdate = false">取 消</el-button>
        <el-button type="primary" @click="updateCategory">确定</el-button>
      </div>
    </el-dialog>
    <!-- dialogInsert -->
    <el-dialog title="添加类别" :visible.sync="dialogFormInsert">
      <el-form
        :model="insertForm"
        :rules="formItemAdd_rules"
        ref="insertFormRef"
      >
        <el-form-item
          label="类别名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="insertForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类别备注" :label-width="formLabelWidth">
          <el-input
            v-model="insertForm.remark"
            @keyup.enter.native="insertItemCategory"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormInsert = false">取 消</el-button>
        <el-button type="primary" @click="insertItemCategory">确定</el-button>
      </div>
    </el-dialog>
    <!-- /dialog -->
  </div>
</template>

<script>
export default {
  // create生命周期调用axios
  created() {
    this.getItemCategory();
    this.findTotal();
  },

  computed: {},
  data() {
    return {
      // 页码数据
      queryInfo: {
        pageNum: 0,
        pageSize: 5,
      },
      formItem_rules: {
        name: [
          { required: true, message: "类目名称必须输入！", trigger: "blur" },
        ],
      },
      formItemAdd_rules: {
        name: [
          { required: true, message: "类目名称必须输入！", trigger: "blur" },
        ],
      },
      formLabelWidth: "100px",
      updateForm: {
        id: "",
        name: "",
        remark: "",
      },
      insertForm: {
        name: "",
        remark: "",
      },
      // 全局数据
      itemCategoryList: [],
      // 子查询
      findCategorySon: [],
      total: 0,
      dialogFormInsert: false,
      dialogFormUpdate: false,
    };
  },
  methods: {
    // 获取全局
    getItemCategory() {
      // console.log(this.queryInfo.pageNum);
      this.$http
        .get(
          `/itemCate/findListPid?pageNum=${this.queryInfo.pageNum}&pageSize=${this.queryInfo.pageSize}`
        )
        .then((res) => {
          this.itemCategoryList = res.data.data;
        });
    },
    // 修改状态
    itemCateChanged(info) {
      // console.log(info);
      // 发送请求修改状态
      this.$http.post("/itemCate/updateItemStatus", info).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          return this.$message.success("修改成功");
        } else {
          return this.$message.error("修改失败");
        }
      });
    },
    // 修改类别(获得数据)
    updateItemCategory(info) {
      this.dialogFormUpdate = true;
      // console.log(info);
      this.updateForm.id = info.id;
      this.updateForm.name = info.name;
      this.updateForm.remark = info.remark;
      console.log(this.updateForm);
      // this.dialogFormUpdate=false
    },
    updateCategory() {
      const info = this.updateForm;
      this.$http.post("/itemCate/updateItemCategory", info).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success("修改成功");
          this.getItemCategory();
          this.dialogFormUpdate = false;
        } else {
          this.$message.error("修改失败");
          this.dialogFormUpdate = false;
        }
      });
    },
    // 类别添加
    insertItemCategory() {
      this.$refs.insertFormRef.validate(async (vaild) => {
        if (!vaild) return;
        await this.$http
          .post("/itemCate/addCategory", this.insertForm)
          .then((res) => {
            if (res.data.code != 200) return this.$message.error("添加失败");
            this.$message.success("添加成功");
            this.getItemCategory();
            this.findTotal();
            // console.log('执行了。。。。');
          });
      });
      // console.log(this.insertForm);
      this.dialogFormInsert = false;
    },
    // 类别删除
    removeCategory(info) {
      // console.log(info);
      this.$confirm("此操作将删除该类别无法挽回！是否继续？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // console.log(info.id);
          this.$http.post("/itemCate/removeCategory", info).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("删除成功！");
              this.getItemCategory();
              this.findTotal();
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消！");
        });
    },
    // 模糊查询
    getUpdateLikeFa() {
      // console.log(this.queryInfo.query);
      if (this.queryInfo.query == "") {
        this.getItemCategory();
      }
      this.$http
        .post("/itemCate/selectLikeFa", this.queryInfo.query)
        .then((res) => {
          // console.log(res.data)
          this.itemCategoryList = res.data.data;
          // this.findTotal()
        });
    },
    // 查询二级分类(子)
    findListSon(info) {
      // console.log(info);
      this.$http.post("/itemCate/selectCategorySon", info).then((res) => {
        // console.log(res.data.data);
        this.findCategorySon = res.data.data;
        // console.log(this.findCategorySon);
      });
    },
    // 分页数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryInfo.pageSize = val;
      // console.log(val);
      // console.log(this.queryInfo.pageSize);
      this.getItemCategory();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.queryInfo.pageNum = val;
      // console.log(this.queryInfo.pagenum);
      // console.log(val);
      this.getItemCategory();
    },
    findTotal() {
      this.$http.post("/itemCate/findTotal").then((res) => {
        // console.log(res);
        this.total = res.data.data;
      });
    },
  },
};
</script>

<style lang="less" scope>
.btn_primary {
  position: absolute;
  right: 15px;
}
.selectSon {
  padding-left: 10px;
}
</style>