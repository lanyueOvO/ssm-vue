<template>
  <div class="app">
    <h1 id="heard">修改管理员登录密码</h1>
    <el-card>
      <el-form :model="ruleForm" :rules="formRules" ref="formRef">
        <el-form-item label="原密码" prop="oldPass">
          <el-input v-model="ruleForm.oldPass" type="text"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input
            type="password"
            autocomplete="off"
            v-model="ruleForm.pass"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            autocomplete="off"
            v-model="ruleForm.checkPass"
            @keyup.enter.native="submitForm"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()"
            >提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.formRef.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPass: "",
        checkPass: "",
        pass: "",
      },
      formRules: {
        oldPass: [
          { required: true, message: "请输入原密码！", trigger: "blur" },
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
        //   alert("submit!");
            this.$http.get(`/admin/update?oldPass=${this.ruleForm.oldPass}&pass=${this.ruleForm.pass}`).then((res)=>{
                // console.log(res);
                if(res.data.msg=='success'){
                    // console.log(true);
                    this.$message.success('修改成功,将退出登录')
                    window.sessionStorage.clear();
                    this.$router.push("/login");
                }else{
                    this.$message.error('修改失败！请检查原密码！')
                }
                
            })
        } else {
        //   console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scope>
#heard {
  font-size: 20px;
  align-content: center;
}
</style>