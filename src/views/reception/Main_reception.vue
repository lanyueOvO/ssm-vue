<template>
  <div class="app" style="background-color: #f4f4f4;">
    <!-- <el-empty description="还没写还没写，别急别急！" :image-size="200"></el-empty> -->
    <el-container>
      <el-header style="background-color:#999;height: 30px;" id="hearder">
        <HeaderRe></HeaderRe>
      </el-header>
      <!-- 主体 -->
      <el-main id="main">
        <MainRe></MainRe>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import HeaderRe from './HeaderRe.vue'
import MainRe from './MainRe.vue'
export default {
  components: {
     HeaderRe,
     MainRe
    },
  created() {
    
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
};
</script>

<style lang="less" scoped>
  #hearder{
    height: 30px;
    
  }
  #main{
    padding: 10px;
  }
</style>