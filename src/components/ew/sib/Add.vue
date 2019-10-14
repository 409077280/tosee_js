<template>
  <div class="mainContent">
    <template>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>安监局管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增</el-breadcrumb-item>
      </el-breadcrumb>
    </template>

    <template>
      <!-- control -->
      <div class="control"></div>
    </template>

    <div class="content">
      <el-form :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="联系人员" prop="linkman">
          <el-input v-model="ruleForm.linkman"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item label="省份" prop="province_id">
          <el-select v-model="ruleForm.province_id" placeholder="请选择省份" @change="getCitys">
            <el-option label="请选择省份" value="0"></el-option>
            <el-option v-for="province in provinces" :label="province.name" :value="province.id" :key="province.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="城市" prop="city_id">
          <el-select v-model="ruleForm.city_id" placeholder="请选择城市" @change="getRegions">
            <el-option label="请选择城市" value="0"></el-option>
            <el-option v-for="city in citys" :label="city.name" :value="city.id" :key="city.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="地区" prop="region_id">
          <el-select v-model="ruleForm.region_id" placeholder="请选择地区">
            <el-option label="请选择地区" value="0"></el-option>
            <el-option v-for="region in regions" :label="region.name" :value="region.id" :key="region.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="详细地址" prop="addr_detail">
          <el-input type="textarea" v-model="ruleForm.addr_detail"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="is_delete">
          <el-select v-model="ruleForm.is_delete" placeholder="请选择状态">
            <el-option label="有效" value="1"></el-option>
            <el-option label="无效" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="status">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
          <el-button type="warning" icon="el-icon-back" @click="goBack()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      provinces: [],
      citys: [],
      regions: [],

      ruleForm: {
        name: "",
        link_man: "",
        moblie: "0",
        password: "",
        province_id: "0",
        city_id: "0",
        region_id: "0",
        addr_detail: "",
        is_delete: "1",
        remark: ""
      }
    };
  },
  mounted() {
      this.getProvinces();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = "/api/apiinsert";
          this.$http
            .post(url, this.ruleForm)
            .then(res => {
              if (res.data.code == 0) {
                this.$router.go(-1);
              }
            })
            .catch(error => {
              this.$message({
                type: "error",
                message: error.msg
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getProvinces() {
      var url = "/api/region/get_provinces";
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 0) {
              this.provinces = res.data.data;
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error
          });
        }); 
    },
    getCitys() {
        this.ruleForm.city_id = '0';
        this.ruleForm.region_id = '0';
        var pid = this.ruleForm.province_id;
      var url = "/api/region/get_citys?pid=" + pid;
      this.$http
        .post(url)
        .then(res => {
          if (res.data.code == 0) {
            this.citys = res.data.data;
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error
          });
        });
    },
    getRegions() {
        this.ruleForm.region_id = '0';
        var pid = this.ruleForm.city_id;
      var url = "/api/region/get_regions?pid=" + pid;
      this.$http
        .post(url)
        .then(res => {
          if (res.data.code == 0) {
            this.regions = res.data.data;
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error
          });
        });
    }
  }
};
</script>

<style>
.demo-ruleForm {
  float: left;
}

form {
  width: 25%;
  padding: 1.5%;
  background-color: #b4d2aa4a;
}
</style>