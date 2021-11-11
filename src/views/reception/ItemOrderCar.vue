<template>
  <div class="app" style="background-color: #f4f4f4">
    <el-container>
      <el-header style="background-color: #999; height: 30px" id="hearder">
        <HeaderRe></HeaderRe>
      </el-header>
      <el-main id="main" style="height: 700px">
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
          <p class="address1">{{ orderInfo.address }}</p>
          <p class="phone">{{  orderInfo.phone }}</p>
          <router-link to="#" id="change">更改其他收货地址</router-link>
        </div>
        <!-- order -->
        <div class="order">
          <div class="orderH4">
            <h4>确认订单信息</h4>
            <el-table id="orderTable" :data="order">
              <el-table-column label="宝贝名称" prop="item_name"> </el-table-column>
              <el-table-column label="宝贝属性">xxx</el-table-column>
              <el-table-column label="单价" prop="unit_price"> </el-table-column>
              <el-table-column label="数量" prop="total">
                <!-- <template slot-scope="scope">
                  <el-input-number
                    id="orderNum"
                    v-model="scope.row.num"
                    @change="handleChange"
                    :min="1"
                    :max="10"
                  ></el-input-number>
                </template> -->
              </el-table-column>
              <el-table-column label="优惠">-20</el-table-column>
              <el-table-column label="小计" prop="price"></el-table-column>
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
          <el-button id="cancel" @click="cancel" type="danger">取消订单</el-button>
          <el-button id="pay_btn" @click="pay">提交订单</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeaderRe from "@/views/reception/HeaderRe.vue";
export default {
  created() {
    this.findCode();
    this.findAddUnpaid();
  },
  data() {
    return {
      itemInfo: [],
      findItemInfo: [],  
      order: [],
      orderInfo:{
        address: '湖南省株洲市xxx区xxx地 （张三 收）',
        phone: '1378948743',
        code:'',
        user_id:0
      },
      sumPrice:0
    };
  },
  methods: {
    // 接收code
    findCode(){
      this.orderInfo.code = window.sessionStorage.getItem('code')
      this.orderInfo.user_id = window.sessionStorage.getItem('logId')
      this.sumPrice = window.sessionStorage.getItem('Sprice')
      // this.order.code = this.$route.query.code
      console.log(this.orderInfo);
      // console.log(this.code);
    },
    // 拿到未支付的订单
    findAddUnpaid(){
      this.$http.post('/order/findUnpaidOrder',this.orderInfo.code).then((res)=>{
        console.log(res);
        this.order = res.data.data
      })
    },
    // 支付操作
    pay() {
      this.$http.post('/order/findUnpaidByCode',this.orderInfo).then((res)=>{
        // console.log(res);
        if(res.data.data=='success'){
          alert('支付成功！感谢购买！')
          window.sessionStorage.removeItem('code')
          this.$router.push('/')
        }else{
          alert('系统异常！请联系管理员')
          this.$router.push('/')
        }
      })
    },
    cancel(){
      this.$http.post('/order/cancelOrder',this.orderInfo.code).then((res)=>{
        console.log(res);
        if(res.data.code==200){
          this.$message.info('订单已取消！')
          this.$router.push('/')
        }else{
          this.$message.danger('系统异常')
        }
      })
    },
  },
  components: {
    HeaderRe,
  },
  computed: {
    xiaoji: function () {
      return this.order.price * this.order.total;
    },
    // sumPrice: function () {
    // },
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
#orderNum {
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
  position: absolute;
  // top: 220px;
  left: 978px;
  margin: 260px 0px;
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
#cancel{
    position: absolute;
    top: 50px;
    right: 225px;
}
</style>