<script setup>
import { useRoute } from "vue-router";
import {ref, defineEmits, watch} from "vue";
import data from "../data/quiz.json";

const route = useRoute();

const quiz = {
  question: "",
  choices: []
}
watch(() => route.params.id, () => {
  const quizData = data.quiz.find((quiz) => quiz.id === parseInt(route.params.id));
  console.log(quizData);
  quiz.question = quizData.question;
  quiz.choices = quizData.choice.map((choice, i) => ({
    choice: choice,
    index: i,
  }))
}, {immediate: true})

const emit = defineEmits(["quizSelect"]);

const selectAnswer = (index) => {
  emit("quizSelect", index);
}
</script>

<template>
  <h3>Question: {{ quiz.question }}</h3>
  <ul>
    <li v-for="{choice, index} in quiz.choices" @click="selectAnswer(index)">{{ choice }}</li>
  </ul>
</template>

<style scoped>

</style>