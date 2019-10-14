<template>
  <div class="mainContent">
    <template>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/ew/sib' }">系统设置</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/ew/sib/list' }">菜单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </template>

    <template>
      <div class="control">
        <el-button type="primary" icon="el-icon-circle-plus" @click="openDialog('添加菜单')">添加菜单</el-button>
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

          <el-table-column label="菜单名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="菜单图标" align="center">
            <template slot-scope="scope">
              <el-button :icon="scope.row.ico"></el-button>
            </template>
          </el-table-column>

          <el-table-column label="url" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="平台编号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="添加时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.create_time }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="addChildMenu(scope.$index)">添加子菜单</el-button>
              <el-button size="mini" @click="changePlatform(scope.$index)">修改</el-button>
              <el-button size="mini" @click="changePlatform(scope.$index)">删除</el-button>
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

        <el-form-item label="菜单名称">
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

        <el-form-item label="父级菜单ID">
          <el-input v-model="form.parent_id" autocomplete="off" type="number" disabled></el-input>
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
        menu_id: 0,
        name: "",
        ico: "",
        url: "",
        platform_id: 0,
        parent_id: 0
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
      var url = "/api/ew.menu/get_list?platform_id=" + platform_id;
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
            message: error.msg
          });
        });
    },
    openDialog(title) {
      this.dialogTitle = title;
      this.dialogFormVisible = true;
    },
    // 添加或修改API
    saveMenu() {
      var url = "/api/ew.menu/save";
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
            this.getList();
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.msg
          });
        });
    },
    // 添加新菜单
    addNewMenu() {
      this.form.platform_id = localStorage.platform_id;
    },
    // 添加子菜单
    addChildMenu(index) {
      this.form.parent_id = this.tableData[index].parent_id;
      this.form.platform_id = this.tableData[index].platform_id;
      this.openDialog("添加子菜单");
    },
    // 修改菜单
    changeMenu(index) {
      this.form = this.tableData[index];
      this.openDialog("修改菜单信息");
    }
  }
};
</script>