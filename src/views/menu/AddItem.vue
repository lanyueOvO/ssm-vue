<template>
  <div class="app">
    <!-- 新增表单 -->
    <el-page-header
      @back="goBack"
      content="添加商品"
      id="pageHead"
    ></el-page-header>
    <el-card>
      <el-form :model="addForm">
        <!-- <el-form-item label="选择二级类别">
           下拉框 
          <el-select
            placeholder="请选择"
            v-model="addForm.valueName"
            id="selectItem"
          >
            <el-option
              v-for="item in ItemCategorySonName"
              :key="item.index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="选择分类">
          <el-cascader
            v-model="addForm.valueID"
            :options="options"
            :props="{
              expandTrigger: 'hover',
              value: 'id',
              label: 'name',
              children: 'children',
            }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addForm.ms"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="addForm.repertory"></el-input>
        </el-form-item>
        <el-form-item label="商品主图片">
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
        <el-form-item label="商品附图1">
          <el-upload
            action="http://127.0.0.1:84/item/uploadUrlOne"
            list-type="picture-card"
            :on-preview="handlePreviewOther"
            :on-remove="handleRemoveOther"
            :on-success="handleAvatarSuccessOther"
            :limit="1 - 0"
          >
            <i slot="default" class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品附图2">
          <el-upload
            action="http://127.0.0.1:84/item/uploadUrlOne"
            list-type="picture-card"
            :on-preview="otherTwo"
            :on-remove="otherRemTwo"
            :on-success="otherSuccTwo"
            :limit="1 - 0"
          >
            <i slot="default" class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品附图3">
          <el-upload
            action="http://127.0.0.1:84/item/uploadUrlOne"
            list-type="picture-card"
            :on-preview="otherThree"
            :on-remove="otherRemThree"
            :on-success="otherSuccThre"
            :limit="1 - 0"
          >
            <i slot="default" class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   listAllItemgorySonName: [],
      options: [],
      ItemCategorySonName: [],
      fileList: [],
      uploadOther_list: [],
      addForm: {
        valueID: [],
        name: "",
        ms: "",
        price: "",
        repertory: "",
        url1: "",
        url2: "",
        url3: "",
        url4: "",
      },
    };
  },
  created() {
    this.getOptions();
    this.findItemCategorySonName();
  },
  methods: {
    findItemCategorySonName() {
      this.$http.post("/item/findItemCategorySonName").then((res) => {
        // console.log(res);
        this.ItemCategorySonName = res.data.data;
      });
    },
    goBack() {
      this.$router.push("/item_sum");
    },
    // 文件上传
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleAvatarSuccess(res, file) {
      this.addForm.url1 = res.data;
      // console.log(res.data);
      // console.log(file);
      // console.log(URL.createObjectURL(file.raw));
    },
    // 上传附图
    handlePreviewOther(file) {},
    handleRemoveOther(file, fileList) {},
    handleAvatarSuccessOther(res, file, fileList) {
      // console.log(res.data);
      // console.log(file);
      // console.log(res);
      // this.uploadOther_list.push(res)
      this.addForm.url2 = res.data;
    },
    // 附图2
    otherTwo(file) {},
    otherRemTwo(file, fileList) {},
    otherSuccTwo(res, file) {
      this.addForm.url3 = res.data;
    },
    // 附图3
    otherThree() {},
    otherRemThree() {},
    otherSuccThre(res, file) {
      this.addForm.url4 = res.data;
    },
    // 提交
    onSubmit() {
      this.$http.post("item/addItem?", this.addForm).then((res) => {
        // console.log(res);
        // console.log(this.addForm.valueID);
        if (res.data.msg == "success") {
          this.$message.success("添加成功！");
          this.$router.push("/item_sum");
        }else{
        this.$message.error('添加失败！')
        }
      });
      // console.log(this.addForm);
    },
    // 选择类目
    handleChange(val) {
      console.log(val);
    },
    getOptions() {
      this.$http.post("/test/three").then((res) => {
        this.options = res.data.data;
        // console.log(this.options);
      });
    },
  },
};
</script>

<style lang="less" scope>
#pageHead {
  margin-bottom: 15px;
}
#selectItem {
  padding-right: 300px;
}
</style>