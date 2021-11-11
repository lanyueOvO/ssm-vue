<template>
  <div class="app">
    <el-container>
      <el-header style="background-color: #999; height: 30px" id="hearder">
        <HeaderRe></HeaderRe>
      </el-header>
      <div class="navigation">
        <div class="image">
          <router-link to="/"
            ><img src="../../assets/imges/wen2.jpg" alt="" width="100%"
          /></router-link>
        </div>
        <div class="store">xxx官方旗舰店</div>
        <div class="search">
          <el-input v-model="search_input" placeholder="搜索/商店/品牌/店铺">
            <el-button
              slot="append"
              style="width: 70px"
              icon="el-icon-search"
              @click="searchBtn"
            ></el-button>
          </el-input>
        </div>
      </div>
      <el-main>
        <div class="picture">
          <img :src="itemIfo.url1" alt="" width="100%" height="100%" />
        </div>
        <!-- 详情 -->
        <div class="details">
          <p class="itemMs">
            {{ itemIfo.name }}
          </p>
          <div class="price">
            <p>￥{{ itemIfo.price }}</p>
            <div class="juan">卷后价￥{{ juanPrice }}</div>
          </div>
          <!-- 库存 -->
          <span class="repertory">（库存{{ itemIfo.repertory }}）</span>
        </div>

        <div class="num">
          数量
          <el-input-number
            v-model="itemIfo.num"
            @change="handleChange"
            :min="1"
            :max="10"
          ></el-input-number>
        </div>
        <div class="settlement">
          <el-button id="car" round @click="addCar">加入购物车</el-button>
          <el-button id="buy" round @click="buyItem">购买</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeaderRe from "@/views/reception/HeaderRe.vue";
export default {
  created() {
    this.commId = this.$route.params.id;
    this.findItemInfo();
  },
  data() {
    return {
      commId: 0,
      search_input: "",
      itemIfo: {
        id:'',
        url1: "",
        name: "",
        price: 0,
        repertory: "",
        num: 1,
        userId:0
      },
      car:{
        item_id:0,
        user_id:0,
        num:0,
        price:0,
        item_url:'',
        item_name:'',
        unit_price:0
      },
      juanPrice: 0,
    };
  },
  methods: {
    findItemInfo() {
      const token = window.sessionStorage.getItem("logId");
      // console.log(token);
      if (!token) return;
      this.$http.post("/item/findItemInfo", this.commId).then((res) => {
        // console.log(res);
        this.itemIfo = res.data.data[0];
        this.juanPri();
      });
    },
    searchBtn(info) {},
    juanPri() {
      this.juanPrice = this.itemIfo.price - 20;
    },
    handleChange(value) {
      //   console.log(value);
    },
    buyItem(){
      let objData = JSON.stringify(this.itemIfo);
      // console.log('json');
      // console.log(objData);
      this.$router.push({
        path:'/itemOrder',
        query:{allData:encodeURIComponent(objData)}
      })
    },
    addCar(){
      const userId = window.sessionStorage.getItem("logId");
      // console.log(token);
      this.car.item_id = this.itemIfo.id;
      this.car.user_id = userId-0;
      this.car.num = this.itemIfo.num;
      this.car.price = this.juanPrice;
      this.car.item_url = this.itemIfo.url1;
      this.car.item_name = this.itemIfo.name;
      this.car.unit_price = this.itemIfo.price-0;
      // console.log(this.itemIfo);
      // console.log('-----');
      // console.log(this.car);
      this.$http.post('/car/addCar',this.car).then((res)=>{
        // console.log(res);
        if(res.data.code==200){
          this.$message.success('添加成功！快去购物车看看吧~')
        }else{
          this.$message.error('系统异常！请联系管理员')
        }
      })
    }
  },
  components: {
    HeaderRe,
  },
};
</script>

<style lang="less" scoped>
.navigation {
  position: relative;
  width: 100%;
  height: 115px;
  background-color: #f4f4f4;
}
.image {
  position: absolute;
  top: 6px;
  left: 20px;
  width: 100px;
  height: 100px;
  // background-color: blanchedalmond;
}
.store {
  position: absolute;
  font-size: 22px;
  top: 20%;
  left: 140px;
  border-left: solid 2px #f4f4f4;
  float: left;
}
.search {
  position: absolute;
  width: 400px;
  top: 20%;
  right: 50px;
}
.picture {
  position: absolute;
  left: 60px;
  width: 418px;
  height: 418px;
}
.details {
  position: absolute;
  margin-left: 580px;
  width: 600px;
  height: 418px;
  background-color: #f4f4f4;
}
.details > p {
  position: absolute;
  //   background-color: yellow;
  font-weight: 700;
  width: 550px;
  left: 10px;
  font-size: 20px;
  display: block;
}
.price {
  position: absolute;
  background: url("../../assets/imges/priceBg.png") no-repeat;
  top: 70px;
  left: 45px;
  width: 500px;
  height: 100px;
  border-radius: 8px;
  background-color: #f4f4f4;
}
.price > p {
  font-size: 42px;
  position: absolute;
  left: 20px;
  bottom: 0px;
  color: #fffdfd;
}
.juan {
  position: absolute;
  background-color: #eaa0c6;
  color: #ce0e74;
  left: 175px;
  top: 40px;
  width: 85px;
  height: 26px;
  border-radius: 5px;
  font-size: 13px;
}
.num {
  position: absolute;
  right: 430px;
  top: 390px;
  color: #ced0d1;
}
.settlement {
  position: absolute;
  right: 210px;
  top: 500px;
}
.repertory{
  position: absolute;
  top: 245px;
  left: 245px;
  color: #eaa0c6;
  font-size: 14px;
}
#car {
  // width: 120px;
  background-color: #ffe4d0;
  color: #e5511d;
}
#buy {
  width: 120px;
  color: #fff;
  background-color: #f22d00;
}
</style>