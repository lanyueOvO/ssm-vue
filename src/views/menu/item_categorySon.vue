<template>
  <div class="app">
    <!-- <h1>二级分类</h1> -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>二级类别</el-breadcrumb-item>
      <!-- <el-button @click="test">测试</el-button> -->
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入类别名称">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUpdateLikeSon"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" class="btn_primary">
          <el-button type="primary" @click="dialogFormSonAdd = true"
            >添加二级类别</el-button
          >
        </el-col>
      </el-row>
      <el-table border :data="itemCategorySonList">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="类别名称" prop="name"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="itemCateSonChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <!-- <el-table-column label="父类别名称"></el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-tooltip content="修改" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="medium"
                @click="updateItemCategorySon(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- 删除 -->
            <el-tooltip content="删除" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="medium"
                @click="removeCategorySon(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-size="pageSize"
        layout=" prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 弹框 -->
    <!-- 修改 -->
    <el-dialog title="类别修改" :visible.sync="dialogFormSonUpdate">
      <el-form
        :model="updateFormSon"
        :rules="formItemSonUpdate_rules"
        ref="updateFormSonRef"
      >
        <el-form-item
          label="类别名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <!-- <el-input v-model="updateFormSon.name"></el-input> -->
          <el-select
            placeholder="请选择类别"
            v-model="insertFormSon.name"
            :label-width="formLabelWidth"
          >
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别备注" :label-width="formLabelWidth">
          <el-input
            v-model="updateFormSon.remark"
            @keyup.enter.native="updateCategorySon"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormSonUpdate = false">取 消</el-button>
        <el-button type="primary" @click="updateCategorySon">确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog title="添加类别" :visible.sync="dialogFormSonAdd">
      <el-form
        :model="insertFormSon"
        :rules="formItemSonAdd_rules"
        ref="insertFormRef"
      >
        <el-form-item
          label="选择父类别"
          :label-width="formLabelWidth"
          prop="pid"
        >
          <!-- <el-input v-model="insertFormSon.name"></el-input> -->
          <el-select
            placeholder="请选择类别"
            filterable
            v-model="insertFormSon.pid"
            :label-width="formLabelWidth"
          >
            <el-option
              v-for="item in allItemCategory"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 选择器 -->
        <el-form-item
          label="类别名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="insertFormSon.name"></el-input>
        </el-form-item>
        <el-form-item label="类别备注" :label-width="formLabelWidth">
          <el-input
            v-model="insertFormSon.remark"
            @keyup.enter.native="insertItemCategorySon"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormSonAdd = false">取 消</el-button>
        <el-button type="primary" @click="addItemCateSon">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.findTotal();
    this.getItemCategorySon();
    this.findAllItemCateName();
  },
  beforeUpdate() {
    // this.getItemCategoryFaName();
  },

  data() {
    return {
      pageNum: 0,
      pageSize: 5,
      total: 0,
      itemCategorySonList: [],
      faNameList: [],
      //   弹框数据
      dialogFormSonUpdate: false,
      dialogFormSonAdd: false,
      formItemSonUpdate_rules: {
        name: [
          { required: true, message: "类目名称必须输入！", trigger: "blur" },
        ],
      },
      formItemSonAdd_rules: {
        name: [
          { required: true, message: "类目名称必须输入！", trigger: "blur" },
        ],
        pid: [
          { required: true, message: "必须选择！", trigger: "blur" },
        ],
      },
      formLabelWidth: "100px",
      // 全部父类名
      allItemCategory:[],
      updateFormSon: {
        id: "",
        name: "",
        remark: "",
      },
      insertFormSon: {
        pid:'',
        name: "",
        remark: "",
      },
    };
  },
  methods: {
    getItemCategorySon() {
      this.$http
        .get(
          `/itemCate/findAllSon?pageNum=${this.pageNum}&pageSize=${this.pageSize}`
        )
        .then((res) => {
          this.itemCategorySonList = res.data.data;
          // console.log(this.itemCategoryList);
        });
    },
    // 查询子级父名
    getItemCategoryFaName() {
      // console.log(this.itemCategorySonList);
      var faName;
      this.$http
        .post("/itemCateSon/selectFaName", this.itemCategorySonList)
        .then((res) => {
          // console.log(res);
          faName = res;
          // console.log(faName.data.data);
          this.faNameList = faName.data.data;
          // this.itemCategorySonList.push(faName);
          console.log(this.faNameList);
        });
    },
    // 模糊查询子级
    getUpdateLikeSon() {},
    // 监听状态改变
    itemCateSonChanged(info) {},
    // 修改二级类别(获取数据)
    updateItemCategorySon(info) {
      this.dialogFormSonUpdate = true;
    },
    updateCategorySon() {},
    // 删除二级类别
    removeCategorySon(info) {},
    // 分页
    findTotal() {
      this.$http.post("/itemCate/findSonTotal").then((res) => {
        // console.log(res);
        this.total = res.data.data;
      });
    },
    // 分页数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getItemCategorySon();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getItemCategorySon();
    },
    findAllItemCateName(){
      this.$http.post('/itemCateSon/findAllItemCateName').then((res)=>{
        this.allItemCategory = res.data.data
      })
    },
    addItemCateSon(){
      console.log(this.insertFormSon);
      this.$refs.insertFormRef.validate(async (vaild)=>{
        if(!vaild) return;
      await this.$http.post('/itemCateSon/addItemCateSon',this.insertFormSon).then((res)=>{
        console.log(res);
        if (res.data.code==200) {
          this.$message.success('添加成功！');
          this.dialogFormSonAdd = false
          this.getItemCategorySon();
        }
      })
       }) 
    } 
   
 },
};
</script>

<style lang="less" scope>
.btn_primary {
  position: absolute;
  right: 15px;
}
</style>