<template>
  <div class="mainContent">
    <template>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>检测管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备分路</el-breadcrumb-item>
      </el-breadcrumb>
    </template>

    <template>
      <div class="control">
        <el-form :inline="true" v-model="info" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input v-model="info" placeholder="分路名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="status" placeholder="状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="在线" value="0"></el-option>
            <el-option label="离线" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
        </el-form-item>

        <el-form-item style="margin-left: 30px">
          <el-button type="success" icon="el-icon-video-play" @click="search()">一键全开</el-button>
          <el-button type="danger" icon="el-icon-switch-button" @click="search()">一键全关</el-button>
        </el-form-item>
        
        <el-form-item style="margin-left: 50px">
          <el-button type="primary" icon="el-icon-plus" @click="search()">新增</el-button>
        </el-form-item>
      </el-form>
      </div>
    </template>

    <div class="content">
      <template>
        <el-table :data="tableData" @selection-change="multiple" ref="multipleTable">

          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column label="#" align="center" width="80">
            <template slot-scope="scope">
              <span>{{ (scope.$index + 1) + ((currentPage - 1) * limit) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="分路名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>

          <el-table-column label="电压(V)" align="center" :render-header="renderheader" width="150">
            <template slot-scope="scope">
              <span
                v-if="scope.row.lhx_voltage <= 198 || scope.row.lhx_voltage >= 236"
                style="color: red;"
              >{{ scope.row.lhx_voltage }}</span>
              <span
                v-if="scope.row.lhx_voltage > 198 && scope.row.lhx_voltage < 236"
              >{{ scope.row.lhx_voltage }}</span>
            </template>
          </el-table-column>

          <el-table-column label="电流(mA)" align="center" :render-header="renderheader" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.leakage >= 5" style="color: red;">{{ scope.row.leakage }}</span>
              <span v-if="scope.row.leakage < 5">{{ scope.row.leakage }}</span>
            </template>
          </el-table-column>

          <el-table-column label="功率(W)" align="center" :render-header="renderheader" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.leakage >= 5" style="color: red;">{{ scope.row.leakage }}</span>
              <span v-if="scope.row.leakage < 5">{{ scope.row.leakage }}</span>
            </template>
          </el-table-column>

          <el-table-column label="温度(°C)" align="center" :render-header="renderheader" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.leakage >= 5" style="color: red;">{{ scope.row.leakage }}</span>
              <span v-if="scope.row.leakage < 5">{{ scope.row.leakage }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <div
                v-if="scope.row.gnd == 1"
                style="background-color: #a23232;color: white;width: 90px; margin: 0 auto;"
              >
                <span>关闭</span>
              </div>
              <div
                v-if="scope.row.gnd == 0"
                style="background-color: #12a77c;color: white;width: 90px; margin: 0 auto;"
              >
                <span style>开启</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="用电状态" placement="top-start">
                <el-button icon="el-icon-view" @click="jumpShunting(scope.row.id)" circle></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="editSubdeviceWindow(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="用电设置" placement="top-start">
                <el-button
                  type="danger"
                  icon="el-icon-s-tools"
                  @click="openPowerSetting(scope.row.id)"
                  circle
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="用电统计" placement="top-start">
                <el-button
                  type="primary"
                  icon="el-icon-data-line"
                  @click="deleteDevice(scope.row.id)"
                  circle
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="全程锁控" placement="top-start">
                <el-button
                  type="danger"
                  icon="el-icon-lock"
                  @click="deleteDevice(scope.row.id)"
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

    <!-- 修改分路 -->
    <el-dialog
      title="修改分路"
      :visible.sync="dialogEditSubdevice"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form :model="form">

        <input type="text" hidden="true" :value="form.id" />

        <el-form-item label="分路名称">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditSubdevice = false">取 消</el-button>
        <el-button type="primary" @click="editSubdevice()">确 定</el-button>
      </div>
    </el-dialog>

        <!-- 分路用电设置 -->
    <el-dialog
      title="用电设置"
      :visible.sync="dialogPowerSetting"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form :model="form">

        <input type="text" hidden="true" :value="powerSettingForm.id" />

        <el-form-item label="限定电能">
          <el-input type="number" v-model="powerSettingForm.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item type="number" label="限定载额">
          <el-input type="number" v-model="powerSettingForm.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="超温保护值">
          <el-input type="number" v-model="powerSettingForm.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="过压">
          <el-input type="number" v-model="powerSettingForm.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="欠压">
          <el-input type="number" v-model="powerSettingForm.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-checkbox v-model="powerSettingForm.checked">漏电检测(每月一次)</el-checkbox>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPowerSetting = false">取 消</el-button>
        <el-button type="primary" @click="editSubdevice()">确 定</el-button>
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

      dialogEditSubdevice: false, // 平台表单是否显示
      dialogPowerSetting: false, // 用电设置显示

      form:{
        id: null,
        title: '',
      },

      powerSettingForm:{
        id: null,
        title: '',
        checked: true,
      },

      currentPage: 1,
      limit: 10
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
    goBack() {
      this.$router.go(-1);
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
    //  获取表格多选的数组
    multiple(indexs){
      this.currentRow = indexs;
    },
    apiGet() {
      var url = '/api/em.subdevice/get_list?';
      var page = "page=" + this.currentPage;
      var limit = "&limit=" + this.limit;
      var info = "&info=" + this.info;
      var status = "&status=" + this.status;
      var userid = "";
      if (this.$route.query.userid) {
        userid = "&userid=" + this.$route.query.userid;
      }
      var deviceid = '';
      if (this.$route.query.deviceid) {
        deviceid = "&deviceid=" + this.$route.query.deviceid;
      }else{
        return;
      }
      url = url + page + limit + info + status + userid + deviceid;
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
    // 打开修改分路信息窗口
    editSubdeviceWindow(row){
      this.form = row;
      this.dialogEditSubdevice = true;
    },
    openPowerSetting(id){
      this.form.id = id;
      this.dialogPowerSetting = true;
    },
    // 修改分路信息
    editSubdevice() {
      var url = "/api/em.subdevice/save_subdevice";
      var row = this.form;
      this.$http
        .put(url, row)
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
      this.dialogEditSubdevice = false;
    },
    // 用电设置
    powerSetting(){
      console.log(this.form);
      this.dialogPowerSetting = false;
    },
    // 删除分路
    deleteSubdevice(id){

    },
    // 获取表格多选的数组
    multiple(indexs){
      this.currentRow = indexs;
    },
    // 分路全部开启
    turnAllOn() {
      console.log(this.currentRow);
    },
    // 分路全部关闭
    turnAllOff() {
      console.log(this.currentRow);
    },
    jumpDetail(id) {
      this.$router.push("/ew/inspect/report_detail?id=" + id);
    },
    // 时间戳转换成时间
    timeTo(unixTime) {
      return this.$commen.unixTimeToDateTime(unixTime);
    },
  }
};
</script>