<script setup>
import data from '../data/quiz.json'
import { defineEmits } from 'vue'

const emit = defineEmits(['quizCategorySelect'])

const selectCategory = (id) => {
  emit('quizCategorySelect', id)
}
</script>

<template>
  <h3>Select a quiz collection:</h3>
  <ul v-if="data && data.category && data.category.length > 0" class="quiz">
    <li v-for="category in data.category" :key="category.id" @click="selectCategory(category.id)">{{ category.name }}</li>
  </ul>
  <h4 v-else>Unfortunately, there is no quiz collection here...</h4>
</template>

<style scoped>

</style>