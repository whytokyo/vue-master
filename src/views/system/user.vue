<template>
  <el-form :inline="true" :model="state.queryParams" class="demo-form-inline">
    <el-form-item label="用户编号">
      <el-input v-model="state.queryParams.userId" placeholder="请输入用户编号"/>
    </el-form-item>
    <el-form-item label="用户名称">
      <el-input v-model="state.queryParams.userName" placeholder="请输入用户名称"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
  <el-row :gutter="10" class="mb-4">
    <el-row>
      <el-button plain type="primary" @click="dialogVisible = true">新增</el-button>
      <el-button plain type="success" disabled>修改</el-button>
      <el-button plain type="danger" disabled>删除</el-button>
      <el-button text @click="dialogVisible = true">click to open the Dialog</el-button>

      <el-dialog v-model="dialogVisible">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="'default'" status-icon>
          <el-form-item label="用户编号" prop="userId">
            <el-input v-model="ruleForm.userId"/>
          </el-form-item>
          <el-form-item label="部门" prop="deptId">
            <el-input v-model="ruleForm.deptId"/>
          </el-form-item>
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="ruleForm.userName"/>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="ruleForm.nickName"/>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">创建</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>
  </el-row>

  <el-table :data="state.tableData.data" style="width: 100%">
    <el-table-column prop="userId" label="用户编号" width="180"/>
    <el-table-column prop="deptId" label="部门" width="180"/>
    <el-table-column prop="userName" label="用户名称" width="180"/>
    <el-table-column prop="nickName" label="用户昵称"/>
    <el-table-column prop="path" label="操作">
      <el-button type="success" :icon="Edit" circle size="small" title="修改"></el-button>
      <el-button type="danger" :icon="Delete" circle size="small" title="删除"></el-button>
    </el-table-column>
  </el-table>

  <el-pagination background layout="prev, pager, next" @current-change="onHandleSizeChange" :total="state.tableData.total"/>
</template>
<!--TODO 函数名称修改和后端接口实现-->
<script setup>
import {getCurrentInstance, reactive, ref} from 'vue'

import {Delete, Edit} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import {addUser, listUser} from "../../api/user.js";

const total = ref(0);

const dialogVisible = ref(false)

const ruleFormRef = ref()
const ruleForm = ref({
  userId: '',
  deptId: '',
  userName: '',
  nickName: '',
  password: '',

})

const rules = reactive({
  userId: [
    {required: true, message: '该项为必填项', trigger: 'blur'},
    // {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'},
  ],
  deptId: [
    {required: true, message: '该项为必填项', trigger: 'blur'},
  ],
  userName: [
    {required: true, message: '该项为必填项', trigger: 'blur'},
  ],
  nickName: [
    {required: true, message: '该项为必填项', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '该项为必填项', trigger: 'blur'},
    {min: 3, max: 5, message: '密码长度3-5', trigger: 'blur'},

  ],
})

const {proxy} = getCurrentInstance();

const submitForm = () => {
  proxy.$refs.ruleFormRef.validate(() => {
    addUser(ruleForm.value).then(res => {
      if (res.data.code == 200) {
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
        dialogVisible.value = false;
      }
    })
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}


const state = reactive({
  tableData: {
    data: [],
    total: 0,
  },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    userId: undefined,
    userName: undefined,
  },
})


const formInline = reactive({
  user: '',
  region: '',
})

function onSubmit() {
  listUser(state.queryParams).then(res => {
    state.tableData.data = res.data.data.list
    state.tableData.total = res.data.data.total
  })
}

const reset = () => {
  state.queryParams = ''
  onSubmit();
}

const onHandleSizeChange = (val) => {
  state.queryParams.pageNum = val;
  onSubmit();
};


// onSubmit();
</script>
