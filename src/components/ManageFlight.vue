<template>
  <div>
    <el-form ref="form" :model="SearchForm" label-width="80px">
      <span style="font:bolder">按条件查询航线：</span>
      <el-input v-model="SearchForm.airId" style="width:100px" placeholder="航班号"></el-input>
      <el-input label="航空公司" v-model="SearchForm.airline" style="width:100px" placeholder="航空公司"></el-input>
      <el-input v-model="SearchForm.departure" style="width:100px" placeholder="出发地"></el-input>
      <el-input v-model="SearchForm.destination" style="width:100px" placeholder="目的地"></el-input>
      <el-input v-model="SearchForm.minPrice" style="width:130px" placeholder="价格范围（低）"></el-input>
      <el-input v-model="SearchForm.maxPrice" style="width:130px" placeholder="价格范围（高）"></el-input>
      <el-button @click="handleSearch">搜索</el-button>
    </el-form>
    <!--.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))-->
    <el-table
      v-if="FlightData!=[]"
      :data="FlightData"
      style="width: 100%;height:500px"
      :default-sort="{prop: 'airId', order: 'ascending'}"
    >
      <el-table-column label="航班号" prop="airId" width="100" sortable></el-table-column>
      <el-table-column label="航空公司" prop="airline" width="100" sortable></el-table-column>
      <el-table-column label="执飞机型" prop="aircraftDesignation" width="100" sortable></el-table-column>
      <el-table-column label="出发地" prop="departure" width="70"></el-table-column>
      <el-table-column label="目的地" prop="destination" width="70"></el-table-column>
      <el-table-column label="出发时间" prop="depTime" width="100"></el-table-column>
      <el-table-column label="到达时间" prop="landTime" width="100"></el-table-column>
      <el-table-column label="票价" prop="price" sortable></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

      <el-dialog title="更新航线信息" width="30%" append-to-body :visible.sync="dialogFormVisible">
        <el-form :model="FlightForm" style="width:250px">
          <el-form-item label="航空公司">
            <el-input v-model="FlightForm.airline"></el-input>
          </el-form-item>
          <el-form-item label="执飞机型">
            <el-input v-model="FlightForm.aircraftDesignation"></el-input>
          </el-form-item>
          <el-form-item label="出发地">
            <el-input v-model="FlightForm.departure"></el-input>
          </el-form-item>
          <el-form-item label="目的地">
            <el-input v-model="FlightForm.destination"></el-input>
          </el-form-item>
          <el-form-item label="起飞时间">
            <el-time-picker v-model="FlightForm.depTime" value-format="HH:mm:ss" placeholder="起飞时间"></el-time-picker>
          </el-form-item>
          <el-form-item label="降落时间">
            <el-time-picker
              v-model="FlightForm.landTime"
              value-format="HH:mm:ss"
              placeholder="降落时间"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="FlightForm.price"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitChangeFlightForm">确认</el-button>
        </div>
      </el-dialog>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      search: "",
      SearchForm: {
        airId: null,
        airline: null,
        departure: null,
        destination: null,
        minPrice: null,
        maxPrice: null
      },
      FlightData: [],
      FlightForm: {
        airId: null,
        airline: null,
        aircraftDesignation: null,
        departure: null,
        destination: null,
        depTime: null,
        landTime: null,
        price: null
      }
    };
  },
  methods: {
    handleSearch() {
      this.postRequest(
        "/manage/flight/getFlightSelective",
        this.SearchForm
      ).then(resp => {
        console.log(resp);
        this.FlightData = resp;
      });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.FlightForm.airId = row.airId;
      this.FlightForm.airline = row.airline;
      this.FlightForm.aircraftDesignation = row.aircraftDesignation;
      this.FlightForm.departure = row.departure;
      this.FlightForm.destination = row.destination;
      this.FlightForm.depTime = row.depTime;
      console.log(this.FlightForm.depTime);
      this.FlightForm.landTime = row.landTime;
      this.FlightForm.price = row.price;
    },
    submitChangeFlightForm() {
      console.log(this.FlightForm);
      this.putRequest(
        "/manage/flight/updateFlightSelective",
        this.FlightForm
      ).then(resp => {
        console.log(resp);
      });
      this.handleSearch();
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.deleteRequest(
        "/manage/flight/deleteFlightByAirId/" + row.airId
      ).then(resp => {
        console.log(resp);
      });
      this.handleSearch();
    },
    handleInsert(index, row) {
      console.log(index, row);
      this.postRequest("/manage/flight/insertFlight", this.FlightForm).then(
        resp => {
          console.log(resp);
        }
      );
    }
  }
};
</script>