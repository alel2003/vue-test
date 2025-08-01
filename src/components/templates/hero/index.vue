<script setup lang="ts">
import { computed } from 'vue';

import { storeToRefs } from 'pinia';

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/pagination'

import HeroMemory from '@/components/molecules/memory/index.vue';

import { usePhoneStore } from '@/store';

import type { Phone } from '@/types';

const { title, colors } = defineProps<Phone>()

const store = usePhoneStore()

const { phoneTabIndex } = storeToRefs(store)
const { setPhoneTabIndex } = store

const modules = [Pagination]

const labelList = {
    payment_plan: { text: "Рассрочка", style: "bg-white text-black" },
    success_test: { text: "Пройдено тестирование сети", style: "bg-blue-500 text-white" },
    warranty: { text: "Гарантия лучшей цены", style: "bg-black text-white" }
} as const

const variants = computed(() => colors[phoneTabIndex.value].variants)

const validRamOptions = computed(() => {
    if (!variants.value) return []
    return [...new Set(variants.value.map(v => v.ram))].sort();
});

const validStorageOptions = computed(() => {
    if (!variants.value) return []
    return [...new Set(variants.value.map(v => v.storage))].sort();
});

const memoryList = computed(() => [
    {
        title: "Объем оперативной памяти:",
        type: "ram",
        options: validRamOptions.value,
    },
    {
        title: "Объем встроенной памяти:",
        type: "storage",
        options: validStorageOptions.value,
    }
] as const)

</script>

<template>
    <section class="custom-container flex flex-col gap-7">
        <h1 class="text-[22px] font-semibold text-black leading-[27px]">{{ title }}</h1>
        <div class="flex flex-wrap items-center gap-[8px]">
            <div :class="[labelList[label.type].style, 'px-[12px] py-[8px] rounded-[4px] shadow-[0_4px_4px_0_rgba(236,241,252,1)] text-[12px] font-medium leading-[15px]']"
                v-for="label in labels" :key="label.id">
                {{ labelList[label.type].text }}
            </div>
        </div>

        <div v-if="colors && colors.length" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2 md:w-[500px] w-full">
                <Swiper :pagination="{ el: '.hero-pagination', clickable: true }" :modules="modules"
                    class="md:h-[500px] h-[360px] w-full">
                    <SwiperSlide v-for="(slide, idx) in colors[phoneTabIndex].images" :key="idx">
                        <img :src="slide" alt="slide" class="w-full h-auto object-contain">
                    </SwiperSlide>
                </Swiper>
                <div class="hero-pagination mt-3 flex justify-center gap-1"></div>
            </div>

            <div class="flex flex-col gap-[12px]">
                <h5 class="text-[16px] leading-[19px] font-medium">Цвет устройства: <span class="text-gray-500">{{
                    colors[phoneTabIndex].title }}</span></h5>
                <div class="flex items-center gap-[8px]">
                    <button v-for="(color, idx) in colors" :key="color.id" @click="setPhoneTabIndex(idx)" :class="{
                        'border-2 border-blue-500': phoneTabIndex === idx,
                        'border border-transparent': phoneTabIndex !== idx,
                        'p-[2px] rounded-[10px] bg-white cursor-pointer': true
                    }">
                        <div class="size-[50px] rounded-[6px]" :style="{ backgroundColor: color.color }"></div>
                    </button>
                </div>
            </div>

            <HeroMemory v-for="item in memoryList" :key="item.title" :title="item.title" :options="item.options"
                :type="item.type" :variants="variants" />
        </div>
    </section>
</template>