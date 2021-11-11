<template>
  <div class="app">
    <el-container style="height: 650px">
      <!-- <p>hello Word</p> -->
      <el-header style="height: 30px" id="hearder">
        <Hearder></Hearder>
      </el-header>
      <!-- banner -->
      <div class="banner">
        <div class="logo">
          <router-link to="/"
            ><img src="../../assets/imges/wen2.jpg"
          /></router-link>
          <h5>我的购物车</h5>
        </div>
        <div class="search">
          <el-input v-model="search_input" placeholder="订单号">
            <el-button
              slot="append"
              icon="el-icon-search"
              style="width: 70px"
            ></el-button>
          </el-input>
        </div>
      </div>
      <!-- main -->
      <el-main>
        <div class="main">
          <div class="navigation">
            <div class="allItem">全部商品</div>
            <div class="depreciate">降价商品</div>
            <div class="repertoryLess">库存紧张</div>
          </div>
          <div class="table">
            <el-table
              :data="allUserCar"
              ref="carTable"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column label="名称" prop="item_name"></el-table-column>
              <el-table-column label="图片">
                <template slot-scope="scope">
                  <el-image :src="scope.row.item_url" style="width: 65px; height: 65px">
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column label="单价" prop="unit_price"></el-table-column>
              <el-table-column label="数量" prop="num">
                <template> </template>
              </el-table-column>
              <el-table-column label="金额" prop="price"></el-table-column>
              <el-table-column label="删除">
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    circle
                    icon="el-icon-delete"
                    @click="removeCar(scope.row.id)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              :total="total"
              background
              layout="prev, pager, next"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-size="pageSize"
            ></el-pagination>
          </div>
        </div>
      </el-main>
      <div class="footer">
        <div class="sum">
          <span class="xiaoji">合计</span>
          <span class="￥">￥</span>
          <span class="price">{{ Sprice }}</span>
        </div>
        <div class="footerBtn">
          <el-button type="danger" @click="batchRemove">批量删除</el-button>
          <el-button type="primary" @click="batchPay" style="width: 98px"
            >付款</el-button
          >
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import Hearder from "./HeaderRe.vue";
export default {
  created() {
    this.findCarByUserId();
    this.findCarToTalByUserId();
  },
  data() {
    return {
      pageNum: 0,
      pageSize: 3,
      total: 0,
      search_input: "",
      allUserCar: [],
      sum: [],
      carId: [],
      Sprice: 0,
    };
  },
  methods: {
    // 批量操作
    handleSelectionChange(val) {
      // console.log(val);
      if (this.carId.length != val.length) {
        this.carId = [];
        this.sum = [];
      }
      for (let index = 0; index < val.length; index++) {
        this.carId[index] = val[index].id;
        this.sum[index] = val[index].price;
        // console.log(val[index]);
      }
      // console.log(this.carId);
      this.Sprice = 0 
      for (let index = 0; index < this.sum.length; index++) {
        this.Sprice += this.sum[index]
        window.sessionStorage.setItem('Sprice',this.Sprice)
      }

    },
    findCarByUserId() {
      const userId = window.sessionStorage.getItem("logId");
      this.$http
        .post(
          `/car/findCarByUserId?user_id=${userId}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`
        )
        .then((res) => {
          //   console.log(res);
          this.allUserCar = res.data.data;
        });
    },
    findCarToTalByUserId() {
      const userId = window.sessionStorage.getItem("logId");
      this.$http
        .post(`/car/findCarToTalByUserId?user_id=${userId}`)
        .then((res) => {
          //  console.log(res);
          this.total = res.data.data;
        });
    },
    // 单独删除购物车
    removeCar(val) {
      // console.log(val);
      this.$http.post(`/car/removeCarById?id=${val}`).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("删除成功！");
          this.findCarByUserId();
        } else {
          this.$message.error("删除失败！请联系管理员");
        }
      });
    },
    // 分页方法
    handleSizeChange(val) {
      this.pageSize = val;
      this.findCarByUserId();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.findCarByUserId();
    },
    // 批量删除
    batchRemove() {
      if (this.carId.length === 0) {
        this.$message.info("暂时还未选中商品哦~");
      }
    },
    // 批量购买
    batchPay() {
      if (this.carId.length === 0) {
        this.$message.info("暂时还未选中商品哦~");
      }
      this.$http.post("/car/batchPay", this.carId).then((res) => {
        // console.log(res.data);
        const code = res.data.data;
        // console.log(code);
        if (res.data.code == 200) {
          // '/itemOrderCar'
          window.sessionStorage.setItem("code", code);
          this.$router.push({
            path: "/itemOrderCar",
          });
        }
      });
    },
  },
  components: {
    Hearder,
  },
  // 计算属性
  computed: {
    xiaoji: function () {},
  },
};
</script>

<style lang="less" scoped>
.app {
  position: relative;
  background-color: #f5f5f5;
}
.banner {
  position: absolute;
  margin: 0 65px;
  top: 40px;
  width: 90%;
  height: 110px;
  //   background-color: aqua;
}
.logo > a > img {
  position: absolute;
  left: 0px;
  width: 100px;
  height: 100px;
}
.logo > h5 {
  position: absolute;
  bottom: -10px;
  left: 115px;
  font-size: 30px;
}
.search {
  position: absolute;
  bottom: 35px;
  right: 0px;
  width: 500px;
}
.main {
  position: relative;
  top: 100px;
  width: 93%;
  height: 400px;
  margin: 0 45px;
  //   background-color: antiquewhite;
}
.navigation {
  position: absolute;
  top: 10px;
  left: -28px;
  float: left;
}
.navigation > div {
  // position: absolute;
  border-right: 3px solid #ccc;
  padding: 0 30px;
  float: left;
  font-size: 20px;
}
.repertoryLess {
  border: none !important;
}
.table {
  position: absolute;
  width: 100%;
  top: 60px;
}
.footer {
  position: relative;
  // top: 5px;
  float: left;
  right: 0px;
  bottom: 35px;
  width: 100%;
  height: 50px;
  // background-color: aqua;
}
.sum {
  float: left;
  position: absolute;
  right: 420px;
  top: 10px;
}
.footerBtn {
  position: absolute;
  top: 5px;
  right: 56px;
}
.xiaoji {
  font-size: 12px;
}
.￥ {
  font-size: 14px;
  color: #f40;
}
.price {
  font-size: 22px;
  color: #f40;
}
</style>