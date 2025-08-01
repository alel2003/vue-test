<script setup lang="ts">
import { computed, watchEffect } from 'vue';

import { storeToRefs } from 'pinia';

import { usePhoneStore } from '@/store';

import type { HeroMemoryProps } from '@/types';

const { title, type, options, variants } = defineProps<HeroMemoryProps>()

const store = usePhoneStore()

const { phoneRam, phoneStorage } = storeToRefs(store)
const { setPhoneRam, setPhoneStorage } = store

const ref = {
  ram: { ref: phoneRam, setRef: setPhoneRam },
  storage: { ref: phoneStorage, setRef: setPhoneStorage }
} as const

const selected = computed(() => ref[type].ref.value)

const typeRam = type === 'ram'

watchEffect(() => {
  if (variants) {
    const ramValues = variants.map(v => v.ram)
    const minRam = Math.min(...ramValues)
    const matched = variants.find(v => v.ram === minRam)

    if (matched) {
      setPhoneRam(minRam)
      setPhoneStorage(matched.storage)
    }
  }
})

const handleSelect = (option: number) => {
  ref[type].setRef(option)

  if (typeRam) {
    const matched = variants.find(v => v.ram === option)
    if (matched) {
      setPhoneStorage(matched.storage)
    }
  } else {
    const matched = variants.find(v => v.storage === option)
    if (matched) {
      setPhoneRam(matched.ram)
    }
  }
}

const isDisabled = (option: number) => {
  if (typeRam) {
    return !variants.some(v => v.ram === option && v.storage === phoneStorage.value);
  } else {
    return !variants.some(v => v.storage === option && v.ram === phoneRam.value);
  }
};

</script>

<template>
  <div class="flex flex-col gap-[12px]">
    <h5 class="text-[16px] leading-[19px] font-medium">{{ title }}</h5>
    <div class="flex items-center gap-[8px]">
      <button v-for="(option, idx) in options" :key="idx" @click="handleSelect(option)" :class="{
        'bg-blue-500 text-white border-transparent p-[12px] rounded-[6px]': selected === option && !isDisabled(option),
        'bg-transparent text-blue-500 border border-gray-300 p-[12px] rounded-[6px] cursor-pointer': selected !== option && !isDisabled(option),
        'bg-gray-200 text-gray-400 border-gray-200 p-[12px] rounded-[6px] cursor-pointer': isDisabled(option)
      }">
        {{ option }} ГБ
      </button>
    </div>
  </div>
</template>


