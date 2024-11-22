<script setup>
import {RouterView, useRouter} from "vue-router";
import {useQuizStore} from "@/stores/quiz.js";

const router = useRouter();

const quizStore = useQuizStore();

if (!quizStore.isCategorySelected) {
  router.push("/quiz/category")
} else {
  router.push("/quiz/" + quizStore.currentQuiz.id)
}

</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped>

</style>