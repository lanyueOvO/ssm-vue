<template>
  <div class="app">
    <!-- <p>hello word</p> -->
    <el-table :data="allOrder" stripe>
      <el-table-column label="订单号" prop="code" width="230"></el-table-column>
      <el-table-column label="商品名称" prop="item_name" width="200">
        <!-- <template slot-scope="scope">
          <el-image :src="scope.row.url1"></el-image>
        </template> -->
      </el-table-column>
      <el-table-column
        label="单价"
        prop="unit_price"
        width="110"
      ></el-table-column>
      <el-table-column label="数量" prop="total" width="110"></el-table-column>
      <el-table-column label="实付" prop="price" width="110"></el-table-column>
      <el-table-column label="订单状态" prop="status" width="120">
        <template slot-scope="scope">
          <p v-if="scope.row.status == 0">新建待发货</p>
          <p v-else-if="scope.row.status == 1" id="wait">
            <span id="waitGoods">已发货</span>
            <el-button
              plain
              round
              type="primary"
              @click="findConfirmId(scope.row.id)"
              >确认收货</el-button
            >
          </p>
          <p v-else-if="scope.row.status == 2">订单已完成</p>
          <p v-else-if="scope.row.status == 3">订单已评价</p>
          <p v-else-if="scope.row.status == 4" class="waitPay">
            <span id="waitPay">未支付</span>
            <el-button
              plain
              round
              type="warning"
              @click="cancelOrder(scope.row.id)"
              >取消订单</el-button
            >
          </p>
          <p v-else-if="scope.row.status == 5">订单已取消</p>
        </template>
      </el-table-column>
      <el-table-column label="删除订单">
        <template slot-scope="scope">
          <el-button
            circle
            type="danger"
            icon="el-icon-delete"
            @click="removeOrder(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-size="pageSize"
      :total="total"
    >
    </el-pagination>
    <el-dialog
      title="评分"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-rate
       v-model="rateVal"
       show-text>
      </el-rate>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmGoods">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.findAllUserOrder();
    this.findUserOrderToTal();
  },
  data() {
    return {
      allOrder: [],
      pageNum: 0,
      pageSize: 3,
      total: 0,
      dialogVisible:false,
      orderId:0,
      rateVal:null,
    };
  },
  methods: {
    removeOrder(val) {
      this.$confirm("是否删除此订单？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          // console.log(res);
          this.$http.post(`/order/removeUserOrder?id=${val}`).then((res) => {
            // console.log(res);
            if (res.data.code == 200) this.$message.error("已删除！");
            this.findAllUserOrder();
            this.findUserOrderToTal();
          });
        })
        .catch(() => {
          this.$message.info("已取消！");
        });
      console.log(val);
    },
    findAllUserOrder() {
      const user_id = window.sessionStorage.getItem("logId");
      // console.log(user_id);
      this.$http
        .post(
          `/order/findAllUserOrderById?user_id=${user_id}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`
        )
        .then((res) => {
          // console.log(res);
          this.allOrder = res.data.data;
          // console.log(this.allOrder);
        });
    },
    findUserOrderToTal() {
      const user_id = window.sessionStorage.getItem("logId");
      this.$http
        .post(`/order/findUserOrderToTal?user_id=${user_id}`)
        .then((res) => {
          // console.log(res);
          this.total = res.data.data;
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.findAllUserOrder();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.findAllUserOrder();
    },
    // 确认收货
    // （中传方法）
    findConfirmId(id){
      this.dialogVisible = true;
      this.orderId = id;
    },
    confirmGoods() {
      // console.log(this.orderId);
      this.$http.post('/order/confirmGoods',this.orderId).then((res)=>{
        // console.log(res);
        if(res.data.code==200){
          this.$message.success('已确认收货')
          this.findAllUserOrder();
        }
      })
      // console.log(this.rateVal);
      this.dialogVisible = false;
    },
    cancelOrder(id) {
      // console.log(id);
      this.$http.post('/order/noPay',id).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message.info("已取消订单");
          this.findAllUserOrder();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.app {
  height: 100%;
}
#waitGoods {
  font-size: 12px;
  padding: 0px 0px 0px 30px;
}
#waitPay {
  font-size: 12px;
  padding: 0px 0px 0px 30px;
}
#wait {
  position: relative;
  bottom: 10px;
  left: -10px;
}
.waitPay {
  position: relative;
  bottom: 10px;
  left: -10px;
}
</style>