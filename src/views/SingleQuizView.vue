<script setup>
import {useRoute, useRouter} from "vue-router";
import {watch} from "vue";
import data from "../data/quiz.json";
import {useQuizStore} from "@/stores/quiz.js"

const route = useRoute();
const router = useRouter();

const quizStore = useQuizStore();

const quiz = {
  question: "",
  choices: []
}
watch(() => route.params.id, () => {
  const quizData = data.quiz.find((quiz) => quiz.id === parseInt(route.params.id));
  quiz.question = quizData.question;
  quiz.choices = quizData.choice.map((choice, i) => ({
    choice: choice,
    index: i,
  }))
}, {immediate: true})

const nextQuestion = (index) => {
  quizStore.selectAnswer(index);
  if (quizStore.hasNextQuiz) {
    router.push("/quiz/" + quizStore.currentQuiz.id);
  } else {
    alert("Your score: " + quizStore.score)
  }
}
</script>

<template>
  <h3>Question: {{ quiz.question }}</h3>
  <ul>
    <li v-for="{choice, index} in quiz.choices" @click="nextQuestion(index)">{{ choice }}</li>
  </ul>
</template>

<style scoped>

</style>