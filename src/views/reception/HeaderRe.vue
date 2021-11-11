<template>
  <div class="app" style="font-size: 15px">
    <el-row>
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb> -->
      <el-col :span="4">
        <i class="el-icon-location-outline" style="padding-top: 5px">株洲</i>
      </el-col>
      <el-row class="fronrig">
        <span @click="dialogLogin = true" v-if="log === '' || log === null"
          >您好,请先登录</span
        >
        <span v-else-if="log !== null"><img />&nbsp;{{ log }}</span>
        <span v-if="log !== '' && log !== null" @click="quit()">登出</span>

        <span v-if="log == '' || log == null" @click="dialogRegister = true"
          >免费注册</span
        >
        <span v-else-if="log !== null">&nbsp;</span>

        <span v-if="log != null && log != ''" @click="person(loginId)"
          >个人中心</span
        >
        <span v-else-if="log === null || log === ''">&nbsp;</span>
      </el-row>
    </el-row>
    <el-dialog
      title="登录"
      :visible.sync="dialogLogin"
      width="40%"
      @close="dele()"
    >
      <el-form :model="loginForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="userAccount">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginForm.userAccount"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            type="password"
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.passWord"
            placeholder="请输入密码"
            @keyup.enter.native="login()"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogLogin = false">取 消</el-button>
        <el-button type="primary" @click="login()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- register -->
    <el-dialog
      title="用户注册"
      :visible.sync="dialogRegister"
      width="40%"
      @close="dele()"
    >
      <el-form
        :model="userRegister"
        :rules="RegisterRules"
        ref="ruleRegister"
        label-width="100px"
      >
        <el-form-item label="账号" prop="userAccount">
          <el-input v-model="userRegister.userAccount"></el-input>
        </el-form-item>
        <el-form-item label="姓名(昵称)" prop="realName">
          <el-input v-model="userRegister.realName"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="passWord">
          <el-input v-model="userRegister.passWord" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cuPasswordd">
          <el-input
            v-model="userRegister.cuPasswordd"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRegister = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    // var log = window.sessionStorage.getItem('log')
    // console.log(log);
    this.log = window.sessionStorage.getItem("log");
    this.logId = window.sessionStorage.getItem("logId");
    this.selectRealName();
    // this.refresh()
    // this.login()
  },
  data() {
    var valPass = (rule, val, call) => {
      if (val !== this.userRegister.passWord) {
        call(new Error("两次输入密码不一致"));
      }
      call();
    };
    return {
      loginId: 0,
      per: "",
      dialogLogin: false,
      userRegister: {
        userAccount: "",
        realName: "",
        passWord: "",
      },
      RegisterRules: {
        userAccount: [
          { required: true, message: "请输入账号", trigger: "blur" },
        ],
        realName: [
          { required: true, message: "请输入真实姓名(昵称)", trigger: "blur" },
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
        cuPasswordd: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: valPass, trigger: "blur" },
        ],
      },
      log: "",
      logId: 0,
      dialogRegister: false,
      loginForm: {
        userAccount: "",
        passWord: "",
      },
      rules: {
        userAccount: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    quit() {
      window.sessionStorage.removeItem("log");
      window.sessionStorage.removeItem("logId");
      this.log = "";
      this.refresh();
      // this.findCarNum();
      this.$router.push("/");
    },
    dele() {
      this.$refs["ruleForm"].resetFields();
    },
    person(id) {
      id = this.logId;
      // console.log(id);
      this.$router.push({
        path: `/personRe/${id}`,
      });
      // console.log(this.$route.path);
      // this.per = this.$route.path;
    },
    login() {
      this.$http.post("/user/login", this.loginForm).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.log = res.data.data.realName;
          this.logId = res.data.data.id;
          // console.log(this.logId);
          this.$message.success("登录成功！");
          // 设置session
          window.sessionStorage.setItem("log", this.log);
          window.sessionStorage.setItem("logId", this.logId);
          // var log = window.sessionStorage.getItem('log')
          // console.log(log);
          this.refresh();
          // this.findCarNum();
          this.dialogLogin = false;
        } else {
          this.$message.error("账号或者密码错误！");
        }
      });
    },
    register() {
      // console.log(this.userRegister);
      this.$refs.ruleRegister.validate((vaild) => {
        if(!vaild) return;
        this.$http.post("/user/register", this.userRegister).then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message.success("注册成功");
            this.dialogRegister = false;
          } else {
            this.$message.error("注册失败或账号已存在！");
          }
        });
      });
    },
    selectRealName() {
      this.$http.post("/user/selectRealName", this.logId).then((res) => {
        // console.log(res);
        this.log = res.data.data;
      });
    },
    refresh() {
      const logId = window.sessionStorage.getItem("logId");
      // console.log('刷新');
      if (logId === null) {
        this.logId = window.sessionStorage.removeItem("logId");
        // console.log('登出');
        // console.log(this.logId);
      }
      if (logId !== null) {
        this.logId = window.sessionStorage.getItem("logId");
        // console.log('登录');
        // console.log(this.logId);
      }
    },
    findCarNum() {
      const userId = window.sessionStorage.getItem("logId");
      console.log(userId);
      this.$http.post("/car/findCarNumByUserId", userId - 0).then((res) => {
        console.log(res);
        this.carNum = res.data.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  line-height: 60px;
}
.el-breadcrumb::after,
.el-breadcrumb::before {
  display: none;
}
.lethhy {
  float: left;
}
.fronrig {
  float: right;
}
.fronrig > span {
  margin-left: 20px;
}
span:hover {
  color: #ff4400;
}
img {
  width: 35px;
  vertical-align: middle;
}
.el-breadcrumb-item {
  cursor: pointer !important;
}
</style>