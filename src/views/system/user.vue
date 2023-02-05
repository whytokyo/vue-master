<template>
  <el-form :inline="true" :model="state.queryParams" class="demo-form-inline">
    <el-form-item label="用户编号">
      <el-input v-model="state.queryParams.userId" placeholder="请输入用户编号"/>
    </el-form-item>
    <el-form-item label="用户名称">
      <el-input v-model="state.queryParams.userName" placeholder="请输入用户名称"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="queryUser">查询</el-button>
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
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                 :size="'default'" status-icon>
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
            <el-button type="primary" @click="handleAdd">创建</el-button>
            <el-button @click="resetForm">重置</el-button>
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
      <template #default="scope">
        <el-button type="success" :icon="Edit" circle size="small" @click="handleEdit(scope.row)"
                   title="修改"></el-button>
        <el-button type="danger" :icon="Delete" circle size="small" @click="handleDel(scope.row)"
                   title="删除"></el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination background layout="prev, pager, next" @current-change="onHandleSizeChange"
                 :page-size="state.queryParams.pageSize"
                 :total="state.tableData.total"/>

  <el-dialog v-model="editDialogVisible">
    <el-form ref="ruleFormRef" :model="editForm" label-width="120px" class="demo-ruleForm"
             :size="'default'" status-icon>
      <template #default="scope">
        <el-form-item label="用户编号" prop="userId">
          <el-input v-model="userId" placeholder=""/>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-input v-model="editForm.deptId" placeholder=""/>
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="editForm.userName"/>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="editForm.nickName"/>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="editForm.password" type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editFormSubmit">修改</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </template>
    </el-form>
  </el-dialog>


</template>

<script setup>
import {getCurrentInstance, reactive, ref} from 'vue'
import {addUser, delUser, editUser, listUser} from "../../api/user.js";
import {Delete, Edit} from '@element-plus/icons-vue'
import {ElMessage, ElMessageBox} from "element-plus";

const ruleForm = ref({
  userId: '',
  deptId: '',
  userName: '',
  nickName: '',
  password: '',
})


const state = reactive({
  tableData: {
    data: [],
    total: 0,
  },
  queryParams: {
    pageNum: 1,
    pageSize: 5,
    userId: undefined,
    userName: undefined,
  },
})

const dialogVisible = ref(false)

const editDialogVisible = ref(false)

const {proxy} = getCurrentInstance();

function queryUser() {
  listUser(state.queryParams).then(res => {
    state.tableData.data = res.data.data.list;
    state.tableData.total = res.data.data.total;
  })
}

const handleAdd = () => {
  proxy.$refs.ruleFormRef.validate(() => {
    addUser(ruleForm.value).then(res => {
      ElMessage({
        message: '操作成功',
        type: 'success'
      })
      dialogVisible.value = false;
    })
  })
}

const handleDel = (row) => {
  const userId = row.userId
  ElMessageBox({
    message: '是否确认删除用户编号为"' + userId + '"的数据项?',
    title: "警告",
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(() => {
    delUser(userId)
    ElMessage.success("删除成功")
  })
}

let userId = ref(0);

const handleEdit = (row) => {
  editDialogVisible.value = true
  userId = row.userId
  return userId
}


const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const reset = () => {
  state.queryParams = ''
}

const onHandleSizeChange = (val) => {
  state.queryParams.pageNum = val;
  queryUser();
};

const editForm = ref({
  userId: undefined,
  deptId: undefined,
  userName: undefined,
  nickName: undefined,
  password: undefined
})

const editFormSubmit = () => {
  editForm.value.userId = userId
  editUser(editForm.value).then(() => {
    ElMessage.success("修改成功")
  })
}


queryUser();
</script>
