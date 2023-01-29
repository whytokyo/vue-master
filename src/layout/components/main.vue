<template>
  <el-main class="layout-main">
      <router-view v-slot="{ Component }">
        <component :is="Component"/>
      </router-view>
  </el-main>
</template>

