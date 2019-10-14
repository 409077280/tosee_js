<template>
  <div class="mainContent">
    <template>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备列表</el-breadcrumb-item>
      </el-breadcrumb>
    </template>

    <template>
      <div class="control">
        <el-form :inline="true" v-model="info" class="demo-form-inline">
          <el-form-item label="关键字">
            <el-input v-model="info" placeholder="设备名/设备ID"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="status" placeholder="状态">
              <el-option label="全部" value></el-option>
              <el-option label="在线" value="0"></el-option>
              <el-option label="离线" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
          </el-form-item>

          <el-form-item style="margin-left: 30px">
            <el-button type="success" icon="el-icon-video-play" @click="turnAllOn()">一键全开</el-button>
            <el-button type="danger" icon="el-icon-switch-button" @click="turnAllOff()">一键全关</el-button>
          </el-form-item>

          <el-form-item style="margin-left: 50px">
            <el-button type="primary" icon="el-icon-plus" @click="openAddWindow">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>

    <div class="content">
      <template>
        <el-table :data="tableData" @selection-change="multiple" ref="multipleTable">
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column label="编号" align="center" width="80">
            <template slot-scope="scope">
              <span>{{ (scope.$index + 1) + ((currentPage - 1) * limit) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="设备名称" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>

          <el-table-column label="设备ID" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.deviceid }}</span>
            </template>
          </el-table-column>

          <el-table-column label="设备地点" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.address }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" align="center" width="120">
            <template slot-scope="scope">
              <div
                v-if="scope.row.clientid == null"
                style="background-color: #a23232;color: white;width: 90px; margin: 0 auto;"
              >
                <span>离线</span>
              </div>
              <div
                v-if="scope.row.clientid"
                style="background-color: #12a77c;color: white;width: 90px; margin: 0 auto;"
              >
                <span>在线</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="300">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="查看分路器" placement="top-start">
                <el-button icon="el-icon-view" @click="jumpShunting(scope.row.deviceid)" circle></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="openEditWindow(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteDevice(scope.row.id)"
                  circle
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="一键全开" placement="top-start">
                <el-button
                  type="success"
                  icon="el-icon-video-play"
                  @click="turnAllOn(scope.row.id)"
                  circle
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="一键全关" placement="top-start">
                <el-button
                  type="danger"
                  icon="el-icon-switch-button"
                  @click="turnAllOff(scope.row.id)"
                  circle
                ></el-button>
              </el-tooltip>
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

    <!-- 新增或修改设备信息 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogEditDevice"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <input type="text" hidden="true" :value="form.id" />

        <el-form-item label="设备名称">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="设备ID">
          <el-input v-model="form.deviceid" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="设备地点">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditDevice = false">取 消</el-button>
        <el-button type="primary" @click="editOrAddDevice()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: "apilist",
  data() {
    return {
      tableData: [],
      dataTotal: 0,

      info: "", // 查询条件：名称或者ID
      status: "", //查询条件：设备状态

      currentRow: [], // 表格已选择的列表

      currentPage: 1,
      limit: 10,

      dialogEditDevice: false, // 平台表单是否显示
      dialogTitle: "", // 平台弹出框名称
      form: {
        id: null,
        title: "",
        deviceid: "",
        address: ""
      }
    };
  },
  mounted() {
    this.apiGet();
  },
  methods: {
    renderheader(h, { column, $index }) {
      return h("span", {}, [
        h("span", {}, column.label.split("<br/>")[0]),
        h("br"),
        h("span", {}, column.label.split("<br/>")[1])
      ]);
    },
    sizeChange(val) {
      this.limit = val;
      this.apiGet();
    },
    currentChange(val) {
      this.currentPage = val;
      this.apiGet();
    },
    search() {
      this.currentPage = 1;
      this.apiGet();
    },
    apiGet() {
      var url = "/api/em.device/devices_list?";
      var page = "page=" + this.currentPage;
      var limit = "&limit=" + this.limit;
      var info = "&info=" + this.info;
      var status = "&status=" + this.status;
      var userid = "";
      if (this.$route.query.userid) {
        userid = "&userid=" + this.$route.query.userid;
      }
      url = url + page + limit + info + status + userid;
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
    openEditWindow(row) {
      this.form = row;
      this.dialogTitle = "修改设备信息";
      this.dialogEditDevice = true;
    },
    openAddWindow() {
      this.form.id = null;
      this.dialogTitle = "新增设备";
      this.dialogEditDevice = true;
    },
    // 修改设备
    editOrAddDevice(row) {
      var url = "/api/em.device/save_device";
      var row = this.form;
      this.$http
        .post(url, row)
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
            this.dialogEditDevice = false;
            this.apiGet();
          } else {
            this.$message({
              type: "error",
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
    },
    // 删除设备
    deleteDevice(id) {
      this.$confirm("Are you sure?", "Warning", {
        cancelButtonText: "No",
        confirmButtonText: "Yes",
        type: "warning"
      })
        .then(() => {
          var url = "/api/em.device/dalete_device?";
          if (!id) {
            return;
          }
          id = "id=" + id;
          url = url + id;
          this.$http
            .delete(url)
            .then(res => {
              if (res.data.code == 0) {
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
                this.dialogEditDevice = false;
                this.apiGet();
              } else {
                this.$message({
                  type: "error",
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
    },
    // 获取表格多选的数组
    multiple(indexs) {
      this.currentRow = indexs;
    },
    // 设备全部开启
    turnAllOn() {
      console.log(this.currentRow);
    },
    // 设备全部关闭
    turnAllOff() {
      console.log(this.currentRow);
    },
    // 跳转到当前设备的分路页
    jumpShunting(deviceid) {
      this.$router.push("/em/device/shunting?deviceid=" + deviceid);
    }
  }
};
</script>