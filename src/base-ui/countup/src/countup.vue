<template>
  <span ref="counterRef"></span>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { CountUp } from 'countup.js'
import type { CountUpOptions } from 'countup.js'

const defaultOptions: CountUpOptions = {
  decimalPlaces: 2,
  duration: 2,
  separator: ',',
  decimal: '.',
  prefix: '￥'
}

const props = withDefaults(
  defineProps<{
    number: number
    option: any
  }>(),
  {
    number: 0,
    option: () => ({})
  }
)
const counterRef = ref<HTMLElement>()
const instance = ref<CountUp>()
// const counterRef = ref<HTMLDivElement | null>(null)
// const instance = ref<CountUp | null>(null)

onMounted(() => {
  createCounter()
})
watch(
  () => props.number,
  () => {
    update(props.number)
  }
)

const createCounter = () => {
  if (!counterRef.value) return
  const opts: CountUpOptions = Object.assign(defaultOptions, props.option)
  instance.value = new CountUp(counterRef.value, props.number, opts)
  start()
}

const start = () => {
  if (!instance.value) return
  instance.value.start()
}

const update = (number: number) => {
  if (!instance.value) return
  instance.value.update(number)
}
</script>

<style scoped></style>
