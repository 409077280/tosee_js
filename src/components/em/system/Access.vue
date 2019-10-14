<template>
  <div class="mainContent">
    <template>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </template>

    <template>
      <div class="control">
        <el-button type="primary" icon="el-icon-circle-plus" @click="addNewAccess()">添加权限</el-button>
      </div>
    </template>

    <div class="content">
      <template>
        <el-table :data="tableData">
          <el-table-column label="编号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.access_id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="权限名称">
            <template slot-scope="scope">
              <span>{{ scope.row.name_h1 }}</span>
            </template>
          </el-table-column>

          <el-table-column label="菜单图标(菜单用)" align="center">
            <template slot-scope="scope">
              <el-button :icon="scope.row.ico"></el-button>
            </template>
          </el-table-column>

          <el-table-column label="url">
            <template slot-scope="scope">
              <span>{{ scope.row.url }}</span>
            </template>
          </el-table-column>

          <el-table-column label="父级编号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.parent_id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="平台编号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.platform_id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              <div
                v-if="scope.row.type == 0"
                style="background-color: #a23232;color: white;width: 90px; margin: 0 auto;"
              >
                <span>菜单</span>
              </div>
              <div
                v-if="scope.row.type == 1"
                style="background-color: #12a77c;color: white;width: 90px; margin: 0 auto;"
              >
                <span style>API</span>
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
              <el-button size="mini" @click="addChildAccess(scope.$index)">添加子权限</el-button>
              <el-button size="mini" @click="changeAccess(scope.$index)">修改</el-button>
              <el-button size="mini" @click="deleteAccess(scope.$index)">删除</el-button>
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false">
      <el-form :model="form">
        <input type="text" hidden="true" :value="form.platform_id" />

        <el-form-item label="权限名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="Url">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图标编码">
          <el-input v-model="form.ico" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="平台ID">
          <el-input v-model="form.platform_id" autocomplete="off" type="number" disabled></el-input>
        </el-form-item>

        <el-form-item label="父级权限ID">
          <el-input v-model="form.parent_id" autocomplete="off" type="number" disabled></el-input>
        </el-form-item>

        <el-form-item label="类型">
          <el-radio v-model="form.type" label="0">菜单</el-radio>
          <el-radio v-model="form.type" label="1">API</el-radio>
        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model="form.sort" autocomplete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAccess()">确 定</el-button>
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
        access_id: 0,
        name: "",
        ico: "",
        url: "",
        parent_id: 0,
        platform_id: 0,
        type: "0",
        sort: 0
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
      var platform_id = localStorage.platform_id;
      var url = "/api/access/get_list?platform_id=" + platform_id;
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 0) {
            var temp = res.data.data;
            this.formatTreeData(temp, 0, 1);
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error
          });
        });
    },
    // 添加或修改
    saveAccess() {
      var url = "/api/access/save";
      var row = this.form;
      this.$http
        .post(url, row)
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
            this.dialogFormVisible = false;
            window.location.reload();
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error
          });
        });
    },
    // 添加新权限
    addNewAccess() {
      console.log(this.form);
      this.form.parent_id = 0;
      this.openDialog("新增权限");
    },
    // 添加子权限
    addChildAccess(index) {
      this.form.access_id = null;
      this.form.name = this.tableData[index].name;
      this.form.ico = this.tableData[index].ico;
      this.form.url = this.tableData[index].url;
      this.form.parent_id = this.tableData[index].access_id;
      this.form.platform_id = this.tableData[index].platform_id;
      this.form.type = this.tableData[index].type.toString();
      this.form.sort = this.form.sort;
      this.openDialog("添加子权限");
    },
    // 修改权限
    changeAccess(index) {
      this.form.access_id = this.tableData[index].access_id;
      this.form.name = this.tableData[index].name;
      this.form.ico = this.tableData[index].ico;
      this.form.url = this.tableData[index].url;
      this.form.parent_id = this.tableData[index].parent_id;
      this.form.platform_id = this.tableData[index].platform_id;
      this.form.type = this.tableData[index].type.toString();
      this.form.sort = this.form.sort;
      console.log(this.form);
      this.openDialog("修改权限信息");
    },
    // 删除权限
    deleteAccess(index) {
      var access_id = this.tableData[index].access_id;
      var url = "/api/access/delete?access_id=" + access_id;
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
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
                window.location.reload();
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
    // 打开窗口
    openDialog(title) {
      this.dialogTitle = title;
      this.dialogFormVisible = true;
      // 获取平台ID
      this.form.platform_id = localStorage.platform_id;
    },
    // 权限树
    formatTreeData(accessList, parentId, deep) {
      for (var i = 0; i < accessList.length; i++) {
        if (accessList[i].parent_id == parentId) {
          console.log('pid: ' + parentId + '  id: ' + accessList[i].access_id);
          // 记录深度
          //accessList[i].deep = deep;
          // 根据角色深度处理名称前缀
          accessList[i].name_h1 = this.htmlPrefix(deep) + accessList[i].name;
          this.tableData.push(accessList[i]);
          this.formatTreeData(accessList, accessList[i].access_id, deep + 1);
        }
      }
    },
    // 树形展示
    htmlPrefix(deep) {
      // 根据角色深度处理名称前缀
      var prefix = "";
      if (deep >= 1) {
        for (var i = 0; i < deep; i++) {
          prefix += "   |—";
        }
        prefix += " ";
      }
      return prefix;
    },
    // 时间戳转换成时间
    unixTimeToDateTime(unixTime) {
      return this.$commen.unixTimeToDateTime(unixTime);
    }
  }
};
</script>