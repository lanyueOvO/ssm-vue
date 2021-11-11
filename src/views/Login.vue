<template>
  <div class="login_container">
    <div class="login_box">
      <!-- logo -->
      <div class="logo">
        <img
          src="../assets/imges/logo.jpg"
          alt=""
          width="140px"
          height="140px"
        />
      </div>
      <!-- 表单 -->
      <el-form
        label-width="50px"
        class="login_form"
        :model="Admin"
        :rules="login_rules"
        ref="loginRef"
      >
        <el-form-item label="账号" prop="account">
          <el-input
            prefix-icon="el-icon-s-custom"
            v-model="Admin.account"
            type="text"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="Admin.password"
            type="password"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>

        <el-button type="primary" class="btn" @click="login">登录</el-button>
        <!-- <button @click="test">测试</button> -->
      </el-form>
    </div>
  </div>

  <!-- <el-container>
      <el-form label-width="100px" class="demo-ruleForm" ref="ruleForm">
          <el-form-item label="账号" prop="account">
              <el-input type="text" v-model="ruleForm.account"><i class="el-icon-s-custom"></i></el-input>
          </el-form-item>
      </el-form>
  </el-container> -->
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      Admin: {
        account: "root",
        password: "",
      },
      login_rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      // alert('dsadad')
      // console.log(this.Admin);
     
      this.$refs.loginRef.validate(async (vaild) => {
        if (!vaild) return;
        await this.$http.post("/control/login", this.Admin).then((res) => {
          // console.log(res.data);
          if (res.data.code != 200) {
            return this.$message.error("登录失败")
          }
          window.sessionStorage.setItem("admin", res.data.data.account);
          this.$message.success("登录成功");
          this.$router.push("/admin");
          /* 1.将登录成功后的 token 保存到客户端的 sessionStorage 中
              1.1.项目中除了登录之外的其他API接口 必须在登录之后才能访问
              1.2.token 只应在当前网站打开期间生效 所以将 token 保存在 sessionStorage中 */
          
          // console.log(res.data.data.account);
          var admin = window.sessionStorage.getItem('admin')
          // console.log(admin);
          /*  2.通过编程式导航跳转到后台主页 路由地址是 /home  */
        });
        // res.meta.status
      });
    },

    // login(){
    //   this.$http.post('/control/login',this.Admin).then(res=>{
    //     console.log(res.data);
    //   }).catch(error=>{
    //     console.log(error);
    //   })
    // }
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background: url("../assets/imges/bg2.jpeg");
  // background-color: #3c3c;
  height: 100%;
}
.login_box {
  position: absolute;
  width: 500px;
  height: 350px;
  background-color: #f5f5f5;
  border-radius: 4px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.logo {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  img {
    border-radius: 50%;
  }
}
.login_form {
  position: absolute;
  bottom: 30px;
  width: 93%;
}
.btn {
  position: relative;
  left: 20px;
}
</style>