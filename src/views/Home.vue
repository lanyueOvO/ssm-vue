<template>
  <div class="home">
    <el-container style="border: 2px solid #eee">
      <el-header style="background-color: #ccc; height: 80px">
        <Header></Header>
        <el-button 
        type="success" 
        class="index" 
        icon="el-icon-s-home"
        @click="mainRreception"
          >前台首页</el-button
        >
        <el-button
          type="info"
          class="logout"
          icon="el-icon-switch-button"
          @click="logout"
          >退出登录</el-button
        >
        <!-- 头像 -->
        <el-popover
          placement="bottom"
          trigger="hover"
          title="管理员账号"
          content="admin">
        <el-avatar
          slot="reference"
          :src="require('@/assets/imges/logo.jpg')"
          class="avatar"
        ></el-avatar>
        </el-popover>
      </el-header>

      <el-container style="height: 550px">
        <el-aside width="166px" style="background-color: #ccc" class="menu">
          <Menu></Menu>
        </el-aside>
        <el-container>
          <el-main>
            <!-- <router-link to="/welcome">aa</router-link> -->
            <!-- <h1>Wellcom</h1> -->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Menu from "@/views/Menu.vue";
import Header from "@/views/Header.vue";
import Main from "@/views/Main.vue";

export default {
  name: "homes",
  data() {
    return {};
  },
  methods: {
    findAdmin(){
      window.sessionStorage.getItem('admin')
    },
    logout() {
      window.sessionStorage.removeItem('admin');
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    mainRreception(){
      this.$router.push('/mainRreception');
    }
  },
  components: {
    // HelloWorld,
    Menu,
    Header,
    Main,
  },
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
}
.logout {
  position: absolute;
  top: 20px;
  right: 95px;
}
.index {
  position: absolute;
  top: 20px;
  right: 220px;
}
.avatar {
  position: absolute;
  top: 20px;
  right: 25px;
}
</style>