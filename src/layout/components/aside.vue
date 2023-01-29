<template>
  <el-aside class="layout-aside">
    <el-scrollbar>
      <el-menu :default-openeds="['2', '3']" :router="true">
        <el-menu-item index="/index">
          <template #title>
            <el-icon>
              <HomeFilled/>
            </el-icon>
            首页
          </template>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <setting/>
            </el-icon>
            系统管理
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user">用户管理</el-menu-item>
            <el-menu-item index="/rate">角色管理</el-menu-item>
            <el-menu-item index="2-3">菜单管理</el-menu-item>
            <el-menu-item index="2-4">部门管理</el-menu-item>
            <el-menu-item index="2-4">岗位管理</el-menu-item>
            <el-menu-item index="2-5">字典管理</el-menu-item>
            <el-menu-item index="2-6">通知公告</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="2-7">
            <template #title>日志管理</template>
            <el-menu-item index="2-4-1">操作日志</el-menu-item>
            <el-menu-item index="2-4-2">登录日志</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <icon-menu/>
            </el-icon>
            Navigator Three
          </template>
          <el-menu-item-group>
            <template #title>Group 1</template>
            <el-menu-item index="3-1">Option 1</el-menu-item>
            <el-menu-item index="3-2">Option 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="3-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="3-4">
            <template #title>Option 4</template>
            <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>


