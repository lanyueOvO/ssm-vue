<template>
  <div class="app">
    <el-container>
      <div class="heard">
        <div class="allOrder"><router-link to="#">所有订单</router-link></div>
        <div class="waitOrder"><router-link to="#">待发货</router-link></div>
        <div class="receivingOrder"><router-link to="#">待收货</router-link></div>
        <div class="evaluate"><router-link to="#">待评价</router-link></div>
      </div>
      <!-- 搜索 -->
      <div class="seach">
        <el-input placeholder="输入商品标题或者订单号搜索" v-model="search_input">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getOrder"></el-button>
        </el-input>
      </div>
      <!-- 订单主体-->
      <div class="mainOrder">
        <router-view></router-view>
      </div>
    </el-container>
    <!-- <p>Hello Word</p> -->
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      search_input:'',
    };
  },
  methods: {
    getOrder(){

    },
  },
};
</script>

<style lang="less" scoped>
a{
  text-decoration: none;
}
.app{
  position: relative;
  width: 100%;
  // background-color: #f4f4f4;
  height: 400px;
}
.heard{
  position: absolute;
  width: 100%;
  height: 70px;
  // background-color: antiquewhite;
  float: left;
  border-bottom: 3px solid #e8e8e8;
}
.heard>div{
  float: left;
  margin: 15px 0px;
  padding: 0px 70px;
  border-right: 3px solid #e8e8e8;
  font-size: 22px;
  font-weight: 700;
  
}
.heard>div>a{
  color: #000;
}
.seach{
  position: absolute;
  top: 80px;
  width: 400px;
}
.mainOrder{
  position: absolute;
  top: 125px;
  width: 100%;
  height: 340px;
  // background-color: aqua;
}
</style>