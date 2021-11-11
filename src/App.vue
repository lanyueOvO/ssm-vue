<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- <el-form action="">
       <input type="button" name="" id="" @click="test" value="测试">  
    </el-form> -->

    <!-- <component :is="comName"></component> -->
    <!-- <about></about> -->
    <!-- <el-card>ll</el-card> -->
    <!-- <About></About> -->
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import about from './views/About.vue'
export default {
  name: 'app',
  
  components: {
    HelloWorld,
    about,
    
  },
  data() {
    return {
      user:{},
      comName:'about'
    }
  },
  methods: {
    // test(){
    //   console.log(this.user);
    //   this.$http.get('/control/check?id=1').then(res=>{
    //     console.log(res);
    //     if(res.data.success){
    //       this.$router.push({name:'Success',params:{user:this.user}})
    //     }
    //   })
    // }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
