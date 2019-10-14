<template>
  <div class="mainContent">
    <template>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/ew/sib' }">平台</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/ew/sib/list' }">平台管理</el-breadcrumb-item>
      </el-breadcrumb>
    </template>

    <template>
      <div class="control">
        <el-button type="primary" icon="el-icon-circle-plus" @click="openDialog('添加平台')">添加平台</el-button>
      </div>
    </template>

    <div class="content">
      <template>
        <el-table :data="tableData">
          <el-table-column label="编号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.platform_id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="平台名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="url" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status == 0" style="background-color: #a23232;color: white;width: 90px; margin: 0 auto;">
                <span >不开放</span>
              </div>
              <div v-if="scope.row.status == 1" style="background-color: #12a77c;color: white;width: 90px; margin: 0 auto;">
                <span style="">开放</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="添加时间" align="center">
            <template slot-scope="scope">
              <span>{{ unixTimeToDateTime(scope.row.create_time) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="changePlatform(scope.$index)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="block">
          <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="currentPage"
            :page-sizes="[10, 50, 250, 1250]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataTotal"
          ></el-pagination>
        </div>
      </template>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <input type="text" hidden="true" :value="form.platform_id" />
        
        <el-form-item label="平台名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="平台Url">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="开放状态">
          <el-select v-model="form.status" placeholder="清选择状态" style="width:100%">
            <el-option label="不开放" value="0"></el-option>
            <el-option label="开放" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePlatform()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { truncate } from "fs";
export default {
  name: "apilist",
  data() {
    return {
      tableData: [],
      dataTotal: 0,

      currentPage: 1,
      limit: 10,

      dialogFormVisible: false, // 平台表单是否显示
      dialogTitle: "", // 平台弹出框名称
      form: {
        platform_id: 0,
        name: "",
        url: "",
        status: '1'
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    sizeChange(val) {
      this.page = val;
      this.getList();
    },
    currentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    getList() {
      var url = "/api/platform/get_list?page=" + this.currentPage + "&limit=" + this.limit;
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 0) {
            this.dataTotal = res.data.data.total;
            this.tableData = res.data.data.data;
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error
          });
        });
    },
    openDialog(title){
      this.dialogTitle = title;
      this.dialogFormVisible = true;
    },
    savePlatform() {
      var url = "/api/platform/save";
      var row = this.form;
      this.$http.post(url, row).then(res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: res.data.msg
            });
            this.dialogFormVisible = false;
            this.getList();
            }}).catch(error => {
              this.$message({
                type: "error",
                message: error
              });
            });
    },
    changePlatform(index){
      this.form = this.tableData[index];
      this.form.status = this.form.status.toString();
      this.openDialog('修改平台信息');
    },
    // 时间戳转换成时间
    unixTimeToDateTime (unixTime) {
        var checkHour = function (m) {
            return m<10?'0'+m:m
        };
        var time = new Date(unixTime * 1000);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+checkHour(m)+'-'+checkHour(d)+' '+checkHour(h)+':'+checkHour(mm)+':'+checkHour(s);
    },
  }
};
</script>