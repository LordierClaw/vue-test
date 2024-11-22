import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import data from "@/data/quiz.json";

export const useQuizStore = defineStore('quiz', () => {
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

    const isCategorySelected = computed(() => quizData.value.category && quizData.value.category.id)

    function selectCategoryAndStart(categoryId) {
        quizData.value.category.id = categoryId
        quizData.value.category.name = data.category.find((c) => c.id === parseInt(categoryId)).name

        const categoryPrefix = categoryId.toString().slice(0, 3)
        quizData.value.list = data.quiz.filter((q) => q.id.toString().startsWith(categoryPrefix))
        quizData.value.totalCount = quizData.value.list.length
        quizData.value.currentCount = 0
        quizData.value.currentScore = 0

        quizData.value.currentQuiz = quizData.value.list[0]
    }

    const currentQuiz = computed(() => quizData.value.currentQuiz)

    const hasNextQuiz = computed(() => quizData.value.currentCount < quizData.value.totalCount)

    function selectAnswer(index) {
        if (index === currentQuiz.answer) {
            quizData.value.currentScore++
        }
        quizData.value.currentCount++
        quizData.value.currentQuiz = quizData.value.list[quizData.value.currentCount]
    }

    const score = computed(() => {
        if (quizData.value.totalCount <= 0) {
            return 0
        }
        return Math.round(1.0 * quizData.value.currentScore / quizData.value.totalCount)
    })

    return { quizData, isCategorySelected, selectCategoryAndStart, currentQuiz, hasNextQuiz, selectAnswer, score }
})