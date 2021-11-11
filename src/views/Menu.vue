<template>
  <!-- <el-row class="tac"> -->
  <el-col :span="24" class="col">
    <h5>首页</h5>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#ccc"
      text-color="#000"
      active-text-color="#000000"
      router
      unique-opened
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/item_category"><i class="el-icon-grape"></i>产品类别</el-menu-item>
        <el-menu-item index="item_categorySon"><i class="el-icon-cherry"></i>二级类别</el-menu-item>
        <el-menu-item index="/item_sum"><i class="el-icon-apple"></i>全部商品</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index="/orderMain"><i class="el-icon-monitor"></i>订单列表</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>用户管理</span>
        </template>
      <el-menu-item index="/user"><i class="el-icon-pear"></i>用户列表</el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>数据报表</span>
        </template>
        <el-menu-item index="/itemCategoryView"><i class="el-icon-watermelon"></i>产品视图数据</el-menu-item>
        <el-menu-item index="/dateView"><i class="el-icon-coffee"></i>日历数据</el-menu-item>
      </el-submenu>

      <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>设&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置</span>
        </template>
        <el-menu-item index="/updateAdmin"><i class="el-icon-orange"></i>修改信息</el-menu-item>
        <el-menu-item index="/slideShow"><i class="el-icon-ice-tea"></i>首页轮播图</el-menu-item>
        <el-menu-item index="/homeGoods"><i class="el-icon-milk-tea"></i>首页商品展示</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: "menus",
};
</script>

<style lang="less" scoped>
</style>