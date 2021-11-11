<template>
  <div class="app" style="background-color: #f4f4f4">
    <el-container>
      <el-header style="background-color: #999; height: 30px" id="hearder">
        <HeaderRe></HeaderRe>
      </el-header>
      <el-main id="main" style="height: 600px">
        <div class="navigation">
          <div class="image">
            <router-link to="/"
              ><img src="../../assets/imges/wen2.jpg" alt="" width="100%"
            /></router-link>
          </div>
          <div class="step">xxx--xxx--xxx--xxx</div>
        </div>
        <!-- address -->
        <div class="address">
          <div class="addressH4">
            <h4>确认收货地址</h4>
          </div>
          <span><i class="el-icon-location-information"></i>配送至</span>
          <p class="address1">{{ address1 }}</p>
          <p class="phone">{{ phone }}</p>
          <router-link to="#" id="change">更改其他收货地址</router-link>
        </div>
        <!-- order -->
        <div class="order">
          <div class="orderH4">
            <h4>确认订单信息</h4>
            <el-table id="orderTable" :data="itemInfo">
              <el-table-column label="宝贝名称" prop="name">
              </el-table-column>
              <el-table-column label="宝贝属性">xxx</el-table-column>
              <el-table-column label="单价" prop="price">
              </el-table-column>
              <el-table-column label="数量">
                <template slot-scope="scope">
                  <el-input-number
                  id="orderNum"
                  v-model="scope.row.num"
                  @change="handleChange"
                  :min="1"
                  :max="10"
                ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="优惠">-20</el-table-column>
              <el-table-column label="小计">{{ xiaoji }}</el-table-column>
            </el-table>
          </div>
        </div>
        <!-- pay -->
        <div class="pay">
          <div class="payPrice">
            <span id="payFont">实付款</span>
            <span id="y">￥</span>
            <span id="payPrice">{{ sumPrice }}</span>
          </div>
          <el-button id="pay_btn" @click="pay">提交订单</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeaderRe from "./HeaderRe.vue";
export default {
  created() {
    this.findItem();
    this.findSumPrice();
  },
  data() {
    return {
      itemInfo:[],
      findItemInfo: [],
      address1: "湖南省株洲市xxx区xxx地 （张三 收）",
      phone: '1378948743',
      order:{
        item_id:0,
        total:0,
        price:0,
        unit_price:0,
        address:'',
        phone:'',
        item_name:'',
        user_id:0,
      },
    };
  },
  methods: {
    findItem() {
      if (this.$route.query.allData) {
        let formObj = decodeURIComponent(this.$route.query.allData);
        // console.log(formObj);
        this.findItemInfo = JSON.parse(formObj);
        this.itemInfo.push(this.findItemInfo);
// console.log(this.aaaa);
        // console.log(this.itemInfo);
        // console.log(this.itemInfo.name);
      }
    },
    findSumPrice() {
      // console.log(this.sumPrice);
    },
    pay() {
      // console.log(this.sumPrice);
      const userId = window.sessionStorage.getItem('logId')
      // 赋值数据
      this.order.item_id = this.itemInfo[0].id;
      this.order.unit_price = this.itemInfo[0].price-0
      this.order.total = this.itemInfo[0].num;
      this.order.price = this.sumPrice;
      this.order.address = this.address1;
      this.order.phone = this.phone;
      this.order.user_id = userId-0;
      this.order.item_name = this.itemInfo[0].name;

      this.$http.post('/order/addOrder',this.order).then((res)=>{
        if(res.data.code==200){
          alert("付款成功，感谢购买！");
        }else{
          alert('购买失败！请联系管理员！')
        }
        // console.log(res.data.msg);
      })
      // console.log(this.itemInfo);
      console.log(this.order);
      this.$router.push("/");
    },
    handleChange(val) {},

  },
  components: {
    HeaderRe,
  },
  computed: {
    xiaoji:function(){
      return this.findItemInfo.price*(this.findItemInfo.num)
    },
    sumPrice: function () {
      return this.findItemInfo.price * this.findItemInfo.num - 20;
    },
  },
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}
.navigation {
  position: relative;
  width: 100%;
  height: 115px;
  // background-color: #fff;
}
.image {
  position: absolute;
  top: 6px;
  left: 55px;
  width: 100px;
  height: 100px;
  // background-color: blanchedalmond;
}
.step {
  position: absolute;
  float: left;
  top: 25%;
  right: 260px;
  font-size: 30px;
}
.address {
  position: absolute;
  width: 88%;
  height: 200px;
  left: 75px;
  margin: 30px 0px;
  // background-color: aqua;
}
.addressH4 {
  position: absolute;
  width: 100%;
  bottom: 170px;
  // left: 0px;
  border-bottom: 2px solid #999;
}
.addressH4 > h4 {
  position: absolute;
  color: #333;
  bottom: -15px;
  left: 0px;
}
.address > span {
  position: absolute;
  top: 30px;
  left: 15px;
  font-size: 15px;
}
.address > .address1 {
  position: absolute;
  // display: inline-block;
  left: 80px;
  font-weight: 700;
  font-size: 16px;
  top: 15px;
  padding: 0px 20px;
}
.address > .phone {
  position: absolute;
  left: 365px;
  top: 17px;
  color: #828487;
}
#change {
  position: absolute;
  left: 100px;
  top: 65px;
  font-size: 12px;
  color: #36c;
}
.order {
  position: relative;
  top: 150px;
  width: 92%;
  height: 200px;
  left: 20px;
  margin: 0px 30px;
  // background-color: aqua;
}
#orderNum{
  position: absolute;
  left: -65px;
  top: 2px;
  z-index: 100;
  // text-align: center;
}
.orderH4 {
  position: absolute;
  width: 100%;
  bottom: 170px;
  // left: 0px;
  border-bottom: 2px solid #000;
}
.orderH4 > h4 {
  position: absolute;
  color: #333;
  bottom: -15px;
  left: 0px;
}
#orderTable {
  position: absolute;
  top: 20px;
}
.pay {
  position: relative;
  top: 120px;
  left: 978px;
  width: 200px;
  height: 80px;
  // background-color: #ff0036;
  // border: 2px solid #ff0036;
}
.payPrice {
  position: absolute;
  width: 100%;
  font-size: 24px;
  border-bottom: 3px solid #828487;
}
#payFont {
  font-size: 12px;
}
#y {
  color: #999;
  font-size: 30px;
}
#payPrice {
  font-size: 24px;
  color: #ff0036;
}
#pay_btn {
  position: absolute;
  top: 50px;
  right: 45px;
  color: #fff;
  background-color: rgb(255, 80, 0);
}
</style>