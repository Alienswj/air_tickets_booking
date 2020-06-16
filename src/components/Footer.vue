<template>
  <div>
    <el-row>
      <el-col :span="6" class="grid-content bg-purple">
        <div style="padding-left:50px">
          <figure>
            <h3>
              <strong>
                <i class="el-icon-s-promotion"></i>
              </strong>关于龙航
            </h3>
          </figure>
          <ul>
            <li>走进龙航</li>
            <li>龙航资讯</li>
            <li>龙航招聘</li>
            <li>法律和隐私条款</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="6" class="grid-content bg-purple">
        <div style="padding-left:50px">
          <figure>
            <h3>
              <strong>
                <i class="el-icon-s-promotion"></i>
              </strong>互动支持
            </h3>
          </figure>
          <ul>
            <li>联系我们</li>
            <li>常见问题</li>
            <li>网站导航</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="6" class="grid-content bg-purple">
        <div style="padding-left:50px">
          <figure>
            <h3>
              <strong>
                <i class="el-icon-s-promotion"></i>
              </strong>友情链接
            </h3>
          </figure>
          <ul>
            <li>中国国际航空</li>
            <li>中国东方航空</li>
            <li>中国南方航空</li>
            <li>四川航空</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="6" class="grid-content bg-purple">
        <div style="padding-left:50px">
          <figure>
            <h3>
              <strong>
                <i class="el-icon-s-promotion"></i>
              </strong>关注我们
            </h3>
          </figure>
          <figure>
            <el-image :src="url_qq" :fit="'fill'" class="contact"></el-image>
            <el-image :src="url_alipay" :fit="'fill'" class="contact"></el-image>
          </figure>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      url_qq: require("../assets/img/contact_qq.jpg"),
      url_alipay: require("../assets/img/contact_alipay.jpg")
    };
  }
};
</script>

<style scope>
li {
  list-style: none;
}
.contact {
  margin: 10px;
  height: 100px;
  width: 100px;
}
.elmt-argmt {
  display: flex;
  flex-direction: column;
}
.bg-purple-dark {
  background: #606266;
}
.bg-purple {
  background: #606266;
}
.bg-purple-light {
  background: #606266;
}
.grid-content {
  min-height: 250px;
}
.row-bg {
  padding: 0px;
  background-color: #f9fafc;
}
</style>