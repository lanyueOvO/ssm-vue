<template>
  <div class="app">
    <el-row>
      <el-col :span="8">
        <el-date-picker
          v-model="dateFilter"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-button type="primary">日期选择</el-button>
      </el-col>
      <el-col :span="14">
        <el-select v-model="selectFilter" placeholder="筛选订单">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button type="warning">筛选</el-button>
      </el-col>
    </el-row>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      id="tab"
      tab-position="top"
      stretch
    >
      <!-- all -->
      <el-tab-pane label="订单总数" name="codeAll">
        <!-- <el-table :data="orderAll" stripe style="width: 100%">
          <el-table-column label="订单号" prop="code"></el-table-column>
          <el-table-column
            label="下单用户"
            prop="user_account"
          ></el-table-column>
          <el-table-column label="下单商品" prop="item_name"></el-table-column>
          <el-table-column label="下单时间" prop="addTime"></el-table-column>
          <el-table-column label="下单数量" prop="total"></el-table-column>
          <el-table-column label="实付金额" prop="price"></el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
        </el-table> -->
        <div class="codeAll" v-for="item in itemOrderCode" :key="item.id">
          <!-- {{item.orders}} -->
          <div class="code">
            <div class="codeHeader">
              <el-row :gutter="20">
                <el-col :span="4">商品名称</el-col>
                <el-col :span="3">下单数量</el-col>
                <el-col :span="4">下单时间</el-col>
                <el-col :span="3">用户账号</el-col>
                <el-col :span="3">单价</el-col>
                <el-col :span="3">实付金额</el-col>
                <el-col :span="3">订单状态</el-col>
              </el-row>
            </div>
            <span>订单号:</span>
            <div class="id">{{ item.item_code }}</div>
          </div>
          <div
            v-for="itemOrder in item.orders"
            :key="itemOrder.id"
            id="code_main"
          >
            <!-- <div class="itemInfo"> -->
            <el-row>
              <el-col :span="4">{{ itemOrder.item_name }}</el-col>
              <el-col :span="3">{{ itemOrder.total }}</el-col>
              <el-col :span="4">{{ itemOrder.addTime }}</el-col>
              <el-col :span="3"> {{ itemOrder.user_account }}</el-col>
              <el-col :span="3"> {{ itemOrder.unit_price }}</el-col>
              <el-col :span="3"> {{ itemOrder.price }}</el-col>
              
              <el-col :span="3" v-if="itemOrder.status == 0">新建未发货</el-col>
              <el-col :span="3" v-else-if="itemOrder.status == 1"
                >已发货</el-col
              >
              <el-col :span="3" v-else-if="itemOrder.status == 2"
                >订单已完成</el-col
              >
              <el-col :span="3" v-else-if="itemOrder.status == 3"
                >订单已评价</el-col
              >
              <el-col :span="3" v-else-if="itemOrder.status == 4"
                >订单未支付</el-col>
                <el-col :span="3" v-else-if="itemOrder.status == 5"
                >订单已取消</el-col>
            </el-row>
            <!-- </div> -->
          </div>
        </div>
        <!-- 分页 -->
        <el-pagination
          id="page"
          @size-change="AllhandleSizeChange"
          @current-change="AllhandleCurrentChange"
          :current-page="AllpageNum"
          :page-size="AllpageSize"
          background
          layout="prev, pager, next"
          :total="Alltotal"
        ></el-pagination>
      </el-tab-pane>
      <!-- wait -->
      <el-tab-pane label="待发货" name="orderWait" style="height: 666px">
        <!-- <el-table :data="orderWait">
          <el-table-column label="订单号" prop="code"></el-table-column>
          <el-table-column label="下单用户" prop="user_id"></el-table-column>
          <el-table-column label="下单时间" prop="addTime"></el-table-column>
          <el-table-column label="实付金额" prop="total"></el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              查看用户信息 
              <el-button
                type="warning"
                @click="waitLookUser(scope.row.user_id)"
                size="mini"
                icon="el-icon-search"
              ></el-button>
              
              <el-tooltip content="开始发货" placement="top">
                <el-button
                  type="primary"
                  @click="waitDeliver(scope.row.id)"
                  size="mini"
                  icon="el-icon-position"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table> -->
        <!-- 循环 1-->
        <div class="codeWait" v-for="item in orderWait" :key="item.id">
          <div v-if="item.orders.length != 0">
            <div class="waitHeader">
              <span>订单号：</span>
              <div class="waitid">{{ item.item_code }}</div>
              <el-row id="headerRow">
                <el-col :span="4">商品名称</el-col>
                <el-col :span="3">下单名称</el-col>
                <el-col :span="4">下单时间</el-col>
                <el-col :span="3">用户账号</el-col>
                <el-col :span="3">单价</el-col>
                <el-col :span="3">实付金额</el-col>
                <el-col :span="3">去发货</el-col>
              </el-row>
            </div>
            <!-- 循环 2-->
            <div>
              <div
                class="waitMain"
                v-for="itemOrder in item.orders"
                :key="itemOrder.id"
              >
                <el-row :gutter="20">
                  <el-col :span="4">{{ itemOrder.item_name }}</el-col>
                  <el-col :span="3">{{ itemOrder.total }}</el-col>
                  <el-col :span="4">{{ itemOrder.addTime }}</el-col>
                  <el-col :span="3">{{ itemOrder.user_account }}</el-col>
                  <el-col :span="3">{{ itemOrder.unit_price }}</el-col>
                  <el-col :span="3">{{ itemOrder.price }}</el-col>
                  <el-col :span="3">
                    <el-tooltip content="开始发货" placement="top">
                      <el-button
                        type="primary"
                        @click="waitDeliver(itemOrder.id)"
                        size="mini"
                        icon="el-icon-position"
                      ></el-button>
                    </el-tooltip>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <el-pagination
          background
          id="page"
          @size-change="WaithandleSizeChange"
          @current-change="WaithandleCurrentChange"
          :current-page="WaitPageNum"
          :page-size="WaitPageSize"
          layout="prev, pager, next"
          :total="WaitTotal"
        >
        </el-pagination>
      </el-tab-pane>

      <el-tab-pane label="已发货" name="third">
        <el-table
          :data="orderWait"
          border
          default-expand-all
          row-key="id"
          :tree-props="{
            childer: 'orders',
            hasChildren: '34',
          }"
        >
          <el-table-column label="id" prop="id"></el-table-column>
          <!-- <el-table-column label="1"></el-table-column> -->
          <el-table-column label="订单号" prop="item_code"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="订单完成" name="fourth">
        <el-table :data="orderFinsh">
          <el-table-column></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- dialog -->
    <!-- 快递单号 -->
    <!-- expressage:快递 -->
    <el-dialog title="请填写快递单号" :visible.sync="dialogExpressage">
      <el-input v-model="expressageCode"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogExpressage = false">取消</el-button>
        <el-button @click="expressageUpload">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.findOrderAll();
    this.findAllToTal();
    this.findAllItemOrder();
    this.findOrderWait();
    this.findWaitToTal();
  },
  data() {
    return {
      // 分页
      Alltotal: 0,
      AllpageNum: 0,
      AllpageSize: 5,
      // 待发货分页
      WaitTotal: 0,
      WaitPageNum: 0,
      WaitPageSize: 3,
      dialogExpressage: false,
      orderId:0,
      expressageList: [],
      activeName: "codeAll",
      orderAll: [],
      orderWait: [],
      orderShipped: [],
      orderFinsh: [],
      itemOrderCode: [],
      expressageCode: "",
      //   日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        // 日期选择器数据
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      //   筛选数据
      dateFilter: "",
      selectFilter: "",
      // 发货状态
      options: [
        {
          value: "0",
          label: "新建待发货",
        },
        {
          value: "1",
          label: "未收货",
        },
        {
          value: "2",
          label: "订单已完成",
        },
        {
          value: "3",
          label: "已评价",
        },
      ],
    };
  },

  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    waitDeliver(info) {
      // console.log(info);
      (this.dialogExpressage = true), 
      (this.orderId = info);
    },
    expressageUpload() {
      this.dialogExpressage = false;
      this.$http.post('/order/updateWaitOrder',this.orderId).then((res)=>{
        console.log(res);
        if (res.data.code==200) {
          this.$message.success('发货成功！')
          this.findOrderWait();
          this.dialogExpressage = false;
        }
      })
    },
    // 查看订单
    findOrderAll() {
      this.$http
        .post(
          `/itemOrder/findAll?pageNum=${this.AllpageNum}&pageSize=${this.AllpageSize}`
        )
        .then((res) => {
          // console.log(res.data);
          this.itemOrderCode = res.data.data;
          // console.log(this.itemOrderCode);
        });
    },
    findAllToTal() {
      this.$http.post("/itemOrder/findAllToTal").then((res) => {
        // console.log(res.data);
        this.Alltotal = res.data.data;
        // this.total = this.total-0
        // console.log(this.total);
      });
    },
    findAllItemOrder() {
      this.$http.post("/order/findAllOrderTwo").then((res) => {
        // console.log(res);
        this.orderAll = res.data.data;
      });
    },
    // 分页
    AllhandleSizeChange(val) {
      this.AllpageSize = val;
      // console.log(this.pageSize);
      // console.log(val);
      this.findOrderAll();
    },
    AllhandleCurrentChange(val) {
      this.AllpageNum = val;
      // console.log(val);
      this.findOrderAll();
    },
    WaithandleSizeChange(val) {
      this.WaitPageSize = val;
      // console.log(val);
      this.findOrderWait();
    },
    WaithandleCurrentChange(val) {
      this.WaitPageNum = val;
      // console.log(val);
      this.findOrderWait();
    },
    // Wait
    findOrderWait() {
      this.$http
        .post(
          `/itemOrder/findOrderWait?pageNum=${this.WaitPageNum}&pageSize=${this.WaitPageSize}`
        )
        .then((res) => {
          // console.log(res.data);
          this.orderWait = res.data.data;
          // console.log(this.orderWait);
        });
    },
    findWaitToTal() {
      this.$http.post("/itemOrder/findAllToTal").then((res) => {
        // console.log(res);
        this.WaitTotal = res.data.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
#tab {
  margin-right: 20px;
  margin-top: 10px;
}
#page {
  position: fixed;
  bottom: 5px;
  // left: 405px;
  // z-index: 100 !important;
}
.codeAll {
  height: 300px;
}
.code {
  position: relative;
  // float: left;
  height: 20px;
  border-bottom: 3px solid #000;
}
.code > span {
  position: absolute;
  display: block;
  float: left;
}
.id {
  position: absolute;
  left: 50px;
  float: left;
}
.itemInfo > div {
  padding: 10px 20px;
  float: left;
}
#code_main {
  // position: absolute;
  // bottom: 10px;
  padding: 20px 0px;
}
.codeWait {
  // height: 300px;
  padding: 15px 0px 0px 0px;
}
.waitHeader {
  position: relative;
  border-bottom: 3px solid #000;
}
.waitHeader > span {
  position: absolute;
  left: 0px;
}
.waitid {
  position: absolute;
  bottom: -1px;
  left: 60px;
}
#headerRow {
  position: relative;
  top: 30px;
}
.waitMain {
  position: relative;
  top: 35px;
  padding: 10px 0px;
}
</style>