<template>
  <el-table
    :data="orderData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%;height:500px"
    :default-sort="{prop: 'createdAt', order: 'descending'}"
  >
    <el-table-column label="订单号" prop="id" width="300"></el-table-column>
    <el-table-column label="预定日期" prop="createdAt" width="100" sortable></el-table-column>
    <el-table-column label="航班号" prop="airId" width="100" sortable></el-table-column>
    <el-table-column label="出发地" prop="departure" width="70"></el-table-column>
    <el-table-column label="目的地" prop="destination" width="70"></el-table-column>
    <el-table-column label="出发日期" prop="airDate" width="100" sortable></el-table-column>
    <el-table-column label="出发时间" prop="depTime" width="100"></el-table-column>
    <el-table-column label="到达时间" prop="landTime" width="100"></el-table-column>
    <el-table-column label="出行人" prop="name" width="100" sortable></el-table-column>
    <el-table-column label="票价" prop="price" sortable></el-table-column>
    <el-table-column align="right">
      <template slot="header">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          v-if="compareTime(scope.row.airDate)"
          @click="handleChangeDate(scope.$index, scope.row)"
        >改签</el-button>

        <el-button
          size="mini"
          type="danger"
          v-if="compareTime(scope.row.airDate)"
          @click="handleRefundOrder(scope.$index, scope.row)"
        >退票</el-button>
        <el-button
          size="mini"
          type="danger"
          v-else
          @click="handleDeleteOrder(scope.$index, scope.row)"
        >删除订单</el-button>
      </template>
    </el-table-column>
    <el-dialog title="请选择一位乘客" width="30%" append-to-body :visible.sync="dialogFormVisible">
      <el-form :model="changeTicketForm" style="width:300px">
        <el-form-item label="请选择新的日期" prop="airDate">
          <el-date-picker
            placeholder="点击选择"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="changeTicketForm.airDate"
            style="width: 100%;"
            :picker-options="expireTimeOption"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitChangeTicketForm">确认</el-button>
      </div>
    </el-dialog>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      orderData: [],
      changeTicketForm: {
        id: "",
        tid: "",
        airId: "",
        airDate: "",
        uid: ""
      },
      search: "",
      dialogFormVisible: false,
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() <= Date.now();
        }
      }
    };
  },
  methods: {
    handleChangeDate(index, row) {
      console.log(index, row);
      this.changeTicketForm.id = row.id;
      this.changeTicketForm.tid = row.tid;
      this.changeTicketForm.airId = row.airId;
      this.changeTicketForm.uid = row.uid;
      this.dialogFormVisible = true;
      this.getAllOrder();
    },
    handleRefundOrder(index, row) {
      console.log(index, row);
      this.changeTicketForm.id = row.id;
      this.changeTicketForm.tid = row.tid;
      this.changeTicketForm.airId = row.airId;
      this.changeTicketForm.airDate = row.airDate;
      this.changeTicketForm.uid = row.uid;
      this.putRequest("/order/refund", this.changeTicketForm).then(resp => {
        console.log(resp);
        this.getAllOrder();
      });
    },
    handleDeleteOrder(index, row) {
      console.log(index, row);
      this.deleteRequest("/order/delete/" + row.id).then(resp => {
        console.log(resp);
        this.getAllOrder();
      });
    },
    compareTime(airDate) {
      console.log(airDate);
      var today = new Date();
      console.log(today);
      return parseInt(airDate.substr(8, 2)) > today.getDate() ? true : false;
    },
    submitChangeTicketForm() {
      console.log(this.changeTicketForm);
      this.putRequest("/order/change", this.changeTicketForm).then(resp => {
        console.log(resp);
        this.dialogFormVisible = false;
      });
      this.getAllOrder();
    },
    getAllOrder() {
      this.getRequest("/order/" + this.$store.state.currentUser.id, null).then(
        resp => {
          console.log(resp);
          this.orderData = resp;
        }
      );
    }
  },
  beforeMount: function() {
    this.getAllOrder();
  }
};
</script>