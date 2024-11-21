<script setup>
import {RouterView, useRouter} from "vue-router";
import {ref} from "vue";
import data from "../data/quiz.json";

const router = useRouter();

const quizData = ref({
  category: {
    id: undefined,
    name: undefined,
  },
  list: [],
  currentCount: -1,
  currentScore: -1,
  totalCount: -1,
  currentQuiz: undefined,
})

if (!quizData.value.category.id) {
  console.log(quizData.value.category.id)
  useRouter().push("/quiz/category")
}

const handleQuizCategorySelect = (categoryId) => {
  console.log(categoryId)
  quizData.value.category.id = categoryId
  // Get data
  quizData.value.category.name = data.category.find((c) => c.id === parseInt(categoryId)).name
  console.log(quizData.value.category.name)

  const categoryPrefix = categoryId.toString().slice(0, 3)
  const list = data.quiz.filter((q) => q.id.toString().startsWith(categoryPrefix))
  console.log(list)
  quizData.value.list = list
  quizData.value.totalCount = quizData.value.list.length
  quizData.value.currentCount = 0
  quizData.value.currentScore = 0

  quizData.value.currentQuiz = quizData.value.list[0]
  console.log("CurrentQuiz: " + quizData.value.currentQuiz.id)
  router.push("/quiz/" + quizData.value.currentQuiz.id)
}

const handleQuizSelect = (selectedIndex) => {
  console.log(selectedIndex)
  console.log("CurrentQuiz: " + quizData.value.currentQuiz.answer)
  if (selectedIndex === quizData.value.currentQuiz.answer) {
    quizData.value.currentScore++
  }
  quizData.value.currentCount++
  if (quizData.value.currentCount >= quizData.value.totalCount) {
    alert(`Your score: ${quizData.value.currentScore} / ${quizData.value.totalCount}`)
    router.push("/home/")
  }
  quizData.value.currentQuiz = quizData.value.list[quizData.value.currentCount]
  router.push("/quiz/" + quizData.value.currentQuiz.id)
}

</script>

<template>
  <RouterView @quizSelect="handleQuizSelect" @quizCategorySelect="handleQuizCategorySelect"></RouterView>
</template>

<style scoped>

</style>