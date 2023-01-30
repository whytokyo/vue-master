<template>
  <div>
    <el-container class="layout-container">
      <Aside/>
      <el-container class="flex-center">
        <Header/>
        <Main/>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from "./components/aside.vue";
import Header from "./components/header.vue";
import Main from "./components/main.vue";</script>


