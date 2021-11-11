<template>
  <div class="app">
    <div class="user">
      <div class="header">
        <img
          :src="userInfo.headPhoto"
          alt="图片未加载"
          width="70px"
          style="border-radius: 50%; float: left"
        />
      </div>
      <p class="user_name">{{ userInfo.realName }}</p>
      <div class="user_marke">
        <ul>
          <li><router-link to="#">我的收货地址</router-link></li>
          <li>我的xxx</li>
          <li>我的xxx</li>
        </ul>
      </div>
    </div>
    <!-- person -->
    <div class="fen">编辑个人信息</div>
    <div class="markeInfo">
      <el-descriptions class="margin-top" :column="3" :size="size" id="el-desc">
        <template slot="extra">
          <el-button type="primary" size="small" @click="userInfoDialog = true"
            >编辑</el-button
          >
        </template>
        <el-descriptions-item label="账号">{{
          userInfo.userAccount
        }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{
          userInfo.email
        }}</el-descriptions-item>
        <el-descriptions-item label="生日">{{
          userInfo.birthday
        }}</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">{{ userInfo.remark }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">{{
          userInfo.address
        }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- dialog -->
    <el-dialog title="修改个人信息" :visible.sync="userInfoDialog">
      <el-form :model="userInfo">
        <el-form-item label="个人头像">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:84/item/uploadUrlOne"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="userInfo.headPhoto" class="avatar" width="120px" :src="userInfo.headPhoto" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userInfo.realName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="userInfo.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-select v-model="userInfo.remark" placeholder="请选择">
            <el-option label="学校" value="学校"></el-option>
            <el-option label="公司" value="公司"></el-option>
            <el-option label="小区" value="小区"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="userInfo.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="colseInfo">取 消</el-button>
        <el-button type="primary" @click="updateInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.userInfo.logId = window.sessionStorage.getItem("logId");
    // console.log(this.logId);
    // console.log('........');
    this.findUserById();
  },
  data() {
    return {
      size: "medium",
      // logId: 0,
      userInfo: {
        birthday:"",
        headPhoto: "",
        realName: "",
        userAccount: "",
        address: "",
        email: "",
        remark: "",
        logId: 0,
      },
      heardUrl: "",
      userInfoDialog: false,
      userDate: "",
    };
  },
  methods: {
    findUserById() {
      this.$http.post("/user/findUserById", this.userInfo.logId).then((res) => {
        // console.log(res);
        this.userInfo = res.data.data[0];
        // console.log(this.userInfo);
      });
    },
    updateInfo() {
      console.log(this.userInfo);
      this.$http.post("/user/updateUserInfo", this.userInfo).then((res) => {
        // this.findUserById();
        console.log(res);
        this.userInfo.logId = res.data;
        if(res.msg='200'){
          this.$message.success('修改成功！')
          // this.findUserById()
        }else{
          this.$message.erro('修改失败！')
        }
      });
      this.userInfoDialog = false;
      
    },
    handleAvatarSuccess(res, file) {
      this.userInfo.headPhoto = URL.createObjectURL(file.raw);
      this.userInfo.headPhoto = res.data;
    },
    beforeAvatarUpload(file) {},
    colseInfo(){
      this.userInfoDialog = false
      this.userInfo.logId = window.sessionStorage.getItem("logId");
      this.findUserById();
          
    }
  },
};
</script>

<style lang="less" scoped>
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #000;
}
.app {
  position: relative;
}
.user {
  position: absolute;
  top: 10px;
  width: 850px;
  height: 80px;
  background-color: #f5f8fa;
}
.header {
  position: absolute;
  float: left;
  left: 5px;
}
.user_name {
  position: absolute;
  float: left;
  left: 95px;
}
.user_marke {
  position: absolute;
  top: 15px;
  left: 160px;
}
.user_marke > ul > li {
  float: left;
  margin: 0 40px;
}
.fen {
  position: absolute;
  top: 110px;
  width: 100%;
  height: 20px;
  //   background-color: aqua;
}
.markeInfo {
  position: absolute;
  top: 140px;
}
.el-desc {
  background-color: #f4f4f4;
}
.el-descriptions {
  background-color: #fff;
}
</style>