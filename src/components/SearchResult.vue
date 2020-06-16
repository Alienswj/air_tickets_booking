<template>
  <div>
    <el-row v-for="(ticket, index) in getResult" :key="index" class="row">
      <el-card :body-style="{ padding: '0px' }">
        <el-col :span="6">
          <img :src="require('../assets/img/airline/'+ticket.airline+'.png')" class="image" />
        </el-col>

        <el-col :span="5" style="margin-top:2%">
          <el-row>
            <span class="left">{{ticket.depTime}}</span>
          </el-row>
          <el-row>
            <span class="left">{{ticket.departure}}</span>
          </el-row>
        </el-col>
        <el-col :span="5" style="margin-top:2%">
          <el-row>
            <span style="margin-left:75px">{{ticket.airId}}</span>
          </el-row>
          <el-row>
            <hr />
          </el-row>
          <el-row>
            <span style="margin-left:70px">{{ticket.aircraftDesignation}}</span>
          </el-row>
        </el-col>
        <el-col :span="5" style="margin-top:2%">
          <el-row>
            <span class="right">{{ticket.landTime}}</span>
          </el-row>
          <el-row>
            <span class="right">{{ticket.destination}}</span>
          </el-row>
        </el-col>
        <el-col :span="3" style="margin-top:2%">
          <el-row>
            <span>{{ticket.price}}</span>
          </el-row>
          <el-row>
            <el-button @click="booking">订购</el-button>
          </el-row>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Result",
  data() {
    return {
      tickets: ""
    };
  },
  methods: {},
  computed: {
    getResult() {
      console.log("检测到数据");
      return this.$store.state.searchResult;
    }
  }
};
</script>
<style>
.time {
  font-size: 13px;
  color: #999;
}
span {
}
.left {
  float: right;
  font-size: 20px;
  font-weight: bold;
}
.right {
  float: left;
  font-size: 20px;
  font-weight: bold;
}
.image {
  width: 200px;
  height: 100px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.row {
  margin-bottom: 10px;
  height: 100px;
}
</style>