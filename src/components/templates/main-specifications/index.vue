<script setup lang="ts">

import type { Phone } from '@/types';

const { characteristics } = defineProps<Phone>()

const mainSpecifications = [
    {
        title: "Тип матрицы",
        text: characteristics?.matrixType
    },
    {
        title: "Операционная система",
        text: characteristics?.os
    },
    {
        title: "Основная камера",
        text: characteristics?.mainCameraResolution
    },
    {
        title: "Объем аккумулятора",
        text: characteristics?.battery
    },
    {
        title: "Диагональ экрана",
        text: characteristics?.screenDiagonal
    },
    {
        title: "Формат SIM-карт",
        text: characteristics?.simFormat
    }
] as const

</script>

<template>
    <section class="custom-container flex flex-col gap-5">
        <h3 class="section-title">Основные характеристики</h3>
        <div class="bg-white shadow-md shadow-[#ECF1FC] rounded-[10px] p-[20px] flex flex-col gap-[13px] md:w-fit w-full">
            <div v-for="(specifical, idx) in mainSpecifications" :key="idx" class="grid grid-cols-2 gap-1">
                <span class="text-gray-400 text-[14px] leading-[17px] font-normal">{{ specifical.title }}</span>
                <span :class="{
                    'text-blue-500 text-[14px] font-normal': idx === 0,
                    'text-[14px] font-normal text-black': idx !== 0
                }">
                    {{ specifical.text }}
                </span>
            </div>
        </div>
    </section>
</template>
