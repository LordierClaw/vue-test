<script setup>
import {RouterLink} from "vue-router";
</script>

<template>
  <div class="nav-bar">
    <RouterLink active-class="active" to="/">Home</RouterLink>
    <RouterLink active-class="active" to="/quiz">Quiz</RouterLink>
  </div>
</template>

<style scoped>
.active {
  color: orange;
  font-weight: bold;
}
</style>