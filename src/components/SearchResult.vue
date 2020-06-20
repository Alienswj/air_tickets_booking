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
            <span style="font-size: 25px;font-weight: bold;">{{ticket.price}}</span>
          </el-row>
          <el-row>
            <el-button type="primary" @click="select(ticket.airId,ticket.airDate)">选择</el-button>

            <el-dialog title="请选择一位乘客" :visible.sync="dialogFormVisible">
              <el-table
                :data="travelers.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              >
                <el-table-column property="name" label="姓名" width="100"></el-table-column>
                <el-table-column property="idNumber" label="身份证号" width="200"></el-table-column>
                <el-table-column property="telephone" label="手机号"></el-table-column>
                <el-table-column align="right">
                  <template slot="header">
                    <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                  </template>
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                    <el-button
                      size="mini"
                      type="primary"
                      @click="handleSelect(scope.$index, scope.row)"
                    >选择</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button type="text" @click="innerVisible=true">添加旅客</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="booking">预 订</el-button>
              </div>
              <el-dialog width="25%" title="添加旅客" :visible.sync="innerAddVisible" append-to-body>
                <el-form style="width:300px">
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="travelerInfoForm.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input v-model="travelerInfoForm.idNumber" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="travelerInfoForm.telephone" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="addTravelerInfo">添加</el-button>
                </div>
              </el-dialog>
              <el-dialog width="25%" title="更新旅客信息" :visible.sync="innerPutVisible" append-to-body>
                <el-form style="width:300px">
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="travelerInfoForm.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input v-model="travelerInfoForm.idNumber" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="travelerInfoForm.telephone" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="putTravelerInfo">更新</el-button>
                </div>
              </el-dialog>
            </el-dialog>
          </el-row>
        </el-col>
      </el-card>
    </el-row>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        :total="total"
        :current-page.sync="currentPage"
        :page-size="pageSize"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "Result",
  data() {
    return {
      //tickets: "",
      totalPages: 1,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      search: "",
      travelers: [],
      innerAddVisible: false,
      innerPutVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      travelerInfoForm: {
        id: "",
        name: "",
        telephone: "",
        idNumber: "",
        uid: ""
      },
      orderForm: {
        tid: "",
        airId: "",
        airDate: "",
        uid: ""
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log("每页" + val + "条");
    },
    handleCurrentChange(val) {
      console.log("当前第" + val + "页");
      this.changePage("/ticket/queryAllTickets", val);
    },
    handlePrevClick() {
      if (this.currentPage > 1) {
        this.changePage("/ticket/queryAllTickets", this.currentPage - 1);
      }
    },
    handleNextClick() {
      if (this.currentPage < this.totalPages) {
        this.changePage("/ticket/queryAllTickets", this.currentPage + 1);
      }
    },
    changePage(url, currentPage) {
      this.getRequest(url, {
        departure: this.$store.state.queryCondition.departure,
        destination: this.$store.state.queryCondition.destination,
        airDate: this.$store.state.queryCondition.airDate,
        currentPage: currentPage,
        pageSize: this.pageSize
      }).then(resp => {
        console.log(resp);
        this.$store.commit("initSearchResult", null);
        this.$store.commit("initSearchResult", resp);
      });
    },
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
      this.innerPutVisible = true;
      this.travelerInfoForm.id = row.id;
      this.travelerInfoForm.name = row.name;
      this.travelerInfoForm.telephone = row.telephone;
      this.travelerInfoForm.idNumber = row.idNumber;
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.deleteRequest("/traveler/" + row.id).then(resp => {
        console.log(resp);
      });
    },
    handleSelect(index, row) {
      console.log(index, row);
      this.orderForm.tid = row.id;
    },
    initTravlerInfo() {
      this.getRequest(
        "/traveler/" + this.$store.state.currentUser.id,
        null
      ).then(resp => {
        console.log(resp);
        this.travelers = resp;
      });
    },
    addTravelerInfo() {
      this.travelerInfoForm.uid = this.$store.state.currentUser.id;
      this.postRequest("/traveler", this.travelerInfoForm).then(resp => {
        if (resp.status == 200) {
          console.log(resp);
          this.initTravlerInfo();
          this.innerAddVisible = false;
        }
      });
    },
    putTravelerInfo() {
      this.travelerInfoForm.uid = this.$store.state.currentUser.id;
      this.putRequest("/traveler", this.travelerInfoForm).then(resp => {
        if (resp.status == 200) {
          console.log(resp);
          this.initTravlerInfo();
          this.innerPutVisible = false;
        }
      });
    },
    select(airId, airDate) {
      this.dialogFormVisible = true;
      this.orderForm.airId = airId;
      this.orderForm.airDate = airDate;
      this.orderForm.uid = this.$store.state.currentUser.id;
      this.initTravlerInfo();
    },
    booking() {
      console.log(this.orderForm);
      if (this.orderForm.tid == null) {
        this.$message("请选择旅客！");
      } else {
        this.postRequest("/order/booking", this.orderForm).then(resp => {
          if (resp.status == 200) {
            this.dialogFormVisible = false;
          }
        });
      }
    }
  },
  computed: {
    getResult() {
      console.log("检测到数据");
      return this.$store.state.searchResult.list;
    }
  },
  beforeUpdate: function() {
    this.total = this.$store.state.searchResult.total;
    //this.tickets = this.$store.state.searchResult.list;
    this.totalPages = this.$store.state.searchResult.pages;
    this.currentPage = this.$store.state.searchResult.pageNum;
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