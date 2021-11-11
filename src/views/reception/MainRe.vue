<template>
  <div class="app">
    <!-- <h1>hello</h1> -->
    <div id="search">
      <div class="logo">
        <img
          src="../../assets/imges/wen2.jpg"
          alt=""
          style="width: 100%; height: 100%"
        />
      </div>
      <div class="input">
        <el-input v-model="search_input" placeholder="搜点什么吧~">
          <el-button
            slot="append"
            style="width: 60px"
            icon="el-icon-search"
            @click="searchBtn"
          ></el-button>
        </el-input>
      </div>
      <div class="car">
        <i class="el-icon-shopping-cart-full"></i>
        <el-badge :value='carNum' class="item"><router-link to="/car">我的购物车</router-link></el-badge>
        <!-- <el-link to="/car"></el-link> -->
      </div>
    </div>
    <!-- 中间 -->
    <div class="middle">
      <div class="left">
        <ul>
          <li><i class="el-icon-s-goods"></i>手机 / 运营商 / 数码</li>
          <li><i class="el-icon-s-goods"></i>手机 / 运营商 / 数码</li>
          <li><i class="el-icon-s-goods"></i>手机 / 运营商 / 数码</li>
          <li><i class="el-icon-s-goods"></i>手机 / 运营商 / 数码</li>
          <li><i class="el-icon-s-goods"></i>手机 / 运营商 / 数码</li>
          <li><i class="el-icon-s-goods"></i>手机 / 运营商 / 数码</li>
          <li><i class="el-icon-s-goods"></i>手机 / 运营商 / 数码</li>
          <li><i class="el-icon-s-goods"></i>手机 / 运营商 / 数码</li>
          <!-- <li>手机/运营商/数码</li> -->
          <!-- <li>手机/运营商/数码</li> -->
        </ul>
      </div>
      <!-- 走马灯 -->
      <div class="right">
        <el-carousel indicator-position="outside" autoplay>
          <el-carousel-item v-for="item in banner_imags" :key="item.id">
            <!-- <h3>{{ item }}</h3> -->
            <img
              @click="commodity(item.item_id)"
              :src="item.url"
              ref="bannerHeight"
              @load="imgLoad"
              style="width: 100%; height:100%"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 分割 -->
    <div class="fenBanner">
      <!-- 国际大牌 -->
      <img src="../../assets/imges/itemBanner.jpg" alt="...." width="100%" />
    </div>
    <!-- 商品推荐 -->
    <div class="recommed">
      <ul class="tu_recommed" v-for="item in recommed_images" :key="item.id">
        <li @click="commodity(item.id)">
          <img :src="item.url1"/>
          <span>{{item.name}}</span><br>
          <span class="price">￥{{item.price}}</span>
        </li>
        <!-- <li>
          <img :src="recommed_images.url2"/>
        </li>
        <li>
          <img :src="recommed_images.url3"/>
        </li>
        <li>
          <img :src="recommed_images.url4"/>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import Login from "../Login.vue";
export default {
  mounted() {},
  components: { Login },
  created() {
    this.findItem();
    this.logId = window.sessionStorage.getItem('logId');
    this.findCarNum();
    this.findSlideShow();
    // console.log(this.logId);
  },
  data() {
    return {
      logId:0,
      search_input: "",
      banner_imags: [],
      recommed_images: [],
      fit: "fill",
      carNum:0,
    };
  },
  methods: {
    findItem(){
      this.$http.post('/item/findShowItem').then((res)=>{
        // console.log(res);
        this.recommed_images = res.data.data
      })
    },
    searchBtn() {},
    imgLoad() {},
    commodity(id){
      const token  = window.sessionStorage.getItem('logId')
      // console.log('main');
      // console.log(token);
      this.logId = token
      // console.log(this.logId);
      if(this.logId===null){
        alert('请先登录！');
      }else{
      this.$router.push({
        path:`/commodity/${id}`
      })
      }
    },
    findCarNum(){
      const userId = window.sessionStorage.getItem('logId');
      // console.log(userId);
      this.$http.post('/car/findCarNumByUserId',userId-0).then((res)=>{
        // console.log(res);
        this.carNum = res.data.data
      })
    },
    findSlideShow(){
      this.$http.post('/slideshow/homeShow').then((res)=>{
        // console.log(res);
        this.banner_imags = res.data.data
      })
    },
  },
};
</script>

<style lang="less" scoped>
a{
  text-decoration: none;
  font-size: 13px;
  color: #e1251b;
}
.app {
  width: 100%;
  height: 450px;
  //   background-color: #ccc;
  background-color: #fff;
}
#search {
  // float: left;
  position: relative;
  height: 80px;
  background-color: #fff;
}
.logo {
  position: absolute;
  float: left;
  width: 80px;
  height: 80px;
  left: 60px;
  background-color: #fff;
}
.input {
  position: absolute;
  top: 25%;
  right: 30%;
  float: left;
  width: 500px;
}
.car {
  position: absolute;
  float: left;
  top: 27%;
  right: 60px;
  width: 130px;
  height: 34px;
  line-height: 34px;
  background-color: #ccc;
}
.middle {
  //   position: absolute;
  float: left;
  position: absolute;
  width: 90%;
  height: 320px;
  top: 22%;
  left: 5%;
  //   padding-top: 40px;
  background-color: #f4f4f4;
}
.left {
  float: left;
  position: absolute;
}
li {
  list-style: none;
  padding: 5px;
}
li:hover {
  color: #f40;
}
.right {
  // float: left;
  width: 900px;
  height: 100%;
  position: absolute;
  right: 0px;
}
.fenBanner {
  position: absolute;
  top: 77%;
  width: 100%;
  height: 80px;
  background-color: blueviolet;
}
.recommed {
  float: left;
  position: absolute;
  top: 580px;
  width: 100%;
  height: 260px;
  // background-color: aqua;
}
.tu_recommed > li {
  float: left;
  display: block;
  padding: 30px;
  width: 230px;
}
.tu_recommed>li>img{
  height: 220px;
  width: 220px;
}
.price{
  margin-right: 150px;
  // text-align: right;
  color: #f40;
  font-size: 20px;
}
.item {
  margin-top: 0px;
  margin-right: 0px;
}
</style>