<template>
  <div class="mainContent">
    <template>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/ew/sib' }">检测管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/ew/sib/list' }">检测员列表</el-breadcrumb-item>
      </el-breadcrumb>
    </template>

    <template>
      <div class="control">
        <el-button type="primary" icon="el-icon-circle-plus" @click="apiAdd()">添加检测员</el-button>
      </div>
    </template>

    <div class="content">
      <template>
        <el-table :data="tableData">

          <el-table-column label="" align="center">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked"></el-checkbox>
            </template>
          </el-table-column>

          <el-table-column label="编号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sib_id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="姓名">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="工号">
            <template slot-scope="scope">
              <span>{{ scope.row.empno }}</span>
            </template>
          </el-table-column>

          <el-table-column label="联系方式" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile }}</span>
            </template>
          </el-table-column>

         <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status"></el-switch>
            </template>
          </el-table-column>

          <el-table-column label="添加时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.create_time }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="apiEdit(scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="apiDelete(scope.$index)">删除</el-button>
              <el-button size="mini" @click="apiEdit(scope.row)">重置密码</el-button>
              <el-button size="mini" @click="apiEdit(scope.row)">检测列表</el-button>
            
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
          >
          </el-pagination>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "apilist",
  data() {
    return {
      tableData: [],
      dataTotal: 0,
      currentPage: 1,
      limit: 10
    };
  },
  mounted() {
    this.apiGet();
  },
  methods: {
    sizeChange(val) {
      this.limit = val;
      this.apiGet();
    },
    currentChange(val) {
      this.currentPage = val;
      this.apiGet();
    },
    apiGet() {
      var url =
        "/api/apitablelist?page=" + this.currentPage + "&limit=" + this.limit;
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
    apiAdd() {
      window.location.href = `/admin/system/apiadd`;
    },
    apiEdit(row) {
      var url = "/api/apireset";
      this.$confirm("Are you sure?", "Warning", {
        cancelButtonText: "No",
        confirmButtonText: "Yes",
        type: "warning"
      })
        .then(() => {
          this.$http
            .put(url, row)
            .then(res => {
              if (res.data.code == 0) {
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
                this.apiGet();
              }
            })
            .catch(error => {
              this.$message({
                type: "error",
                message: error
              });
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    apiDelete(index) {
      var url = "/api/apidelete?id=" + this.tableData[index].id;
      this.$confirm("Are you sure?", "Warning", {
        cancelButtonText: "No",
        confirmButtonText: "Yes",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete(url)
            .then(res => {
              if (res.data.code == 0) {
                this.tableData.splice(index, 1);
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
              }
            })
            .catch(error => {
              this.$message({
                type: "error",
                message: error
              });
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>