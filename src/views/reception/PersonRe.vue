<template>
  <div class="app">
    <el-container>
      <el-header style="background-color: #999; height: 40px" id="hearder">
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="margin-top: 10px"
        >
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <div class="logo">
          <h2>我的商城</h2>
        </div>
        <div class="perInfo_left">
            <ul>
                <li><router-link to="/userInfo">我的个人信息</router-link></li>
                <li><router-link to="/car">我的购物车</router-link></li>
                <li><router-link to="/userOrder">我的订单</router-link></li>
                <li><router-link to="#">我的收藏</router-link></li>       
                <li><router-link to="#">我的评价</router-link></li>
                <li><router-link to="#">我的足迹</router-link></li>
            </ul>
        </div>
        <div class="perInfo_right">
            <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeaderRe from "../reception/HeaderRe.vue";
export default {
  //   props: [id],
  created() {},
  data() {
    return {
      id: this.$route.params.id,
      
    };
  },
  methods: {
  },
  components: {
    HeaderRe,
  },
};
</script>

<style lang="less" scoped>
.app{
    height: 100%;
    width: 100%;
    background-color: #f4f4f4;
}
li{
    list-style: none;
}
a{
    text-decoration: none;
    color: #000;
}
a:hover{
    color:#E5ADB3;
}
.logo {
  position: absolute;
  top: 45px;
  margin: 0 10px;
  width: 95%;
  height: 60px;
  background-color: #ff4401;
}
.logo > h2 {
  position: absolute;
  left: 10px;
  bottom: 0px;
}
.perInfo_left{
    position: absolute;
    left: 10px;
    top: 100px;
    width: 190px;
    height: 330px;
    // background-color: bisque;
}
.perInfo_left>ul>li{
    text-align: left;
    padding: 15px;
}
.user{
    width: 750px;
    height: 72px;
    background-color: blueviolet;
}
.perInfo_right{
    position: absolute;
    top: 120px;
    right: 39px;
    width: 1000px;
    height: 330px;
    // background-color: aqua;
}
.item{
   margin-top: 10px;
   margin-right: 40px;
}
</style>