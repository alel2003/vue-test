<script setup lang="ts">
import type { Phone } from '@/types';
import { ref } from 'vue';

const { characteristics } = defineProps<Phone>()

const specifications = [
    {
        title: 'Экран',
        items: [
            { name: 'Тип матрицы', value: characteristics?.matrixType },
            { name: 'Диагональ экрана', value: characteristics?.screenDiagonal },
            { name: 'Разрешение экрана', value: characteristics?.screenResolution },
            { name: 'Плотность точек', value: characteristics?.pixelDensity },
            {
                name: 'Яркость', value: characteristics?.brightness
            },
            { name: 'Частота обновления экрана', value: characteristics?.refreshRate },
        ]
    },
    {
        title: 'Система',
        items: [
            { name: 'Операционная система', value: characteristics?.os },
            { name: 'Версия ОС', value: characteristics?.osVersion },
        ]
    },
    {
        title: 'Память',
        items: [
            { name: 'Объем встроенной памяти', value: characteristics?.internalMemory },
            { name: 'Объем оперативной памяти', value: characteristics?.ramMemory },
            { name: 'Слот для карты памяти', value: characteristics?.memoryCardSlot },
        ]
    },
    {
        title: 'Камера',
        items: [
            { name: 'Разрешение основной камеры', value: characteristics?.mainCameraResolution },
            { name: 'Диафрагма основной камеры', value: characteristics?.mainCameraAperture },
            { name: 'Разрешение второй основной камеры', value: characteristics?.secondaryCameraResolution },
            { name: 'Диафрагма второй камеры', value: characteristics?.secondaryCameraAperture },
            { name: 'Разрешение фронтальной камеры', value: characteristics?.frontCameraResolution },
            { name: 'Диафрагма фронтальной камеры', value: characteristics?.frontCameraAperture },
            { name: 'Разрешение видеосъемки (макс)', value: characteristics?.videoResolution },
            { name: 'Частота кадров при видеосъемке', value: characteristics?.videoFramerate },
            { name: 'Функции камеры', value: characteristics?.cameraFeatures.join(', ') },
        ]
    }
] as const

const visibleSections = ref(0)

function showMore() {
  if (visibleSections.value < specifications.length) {
    visibleSections.value++
  }
}

</script>

<template>
    <section class="custom-container flex flex-col gap-5">
        <h6 class="section-title">Характеристики устройства</h6>

        <div class="bg-white shadow-md shadow-[#ECF1FC] rounded-[10px] p-[12px] flex flex-col gap-[20px] md:w-fit w-full">
            <div v-for="(specification, idx) in specifications.slice(0, visibleSections + 1)" :key="idx" class="flex flex-col gap-[16px]">
                <h5 class="text-[16px] leading-[19px] font-medium">
                    {{ specification.title }}
                </h5>

                <div class="flex flex-col gap-[8px]">
                    <div v-for="(item, idx) in specification.items" :key="idx" class="grid grid-cols-2 gap-2">
                        <span class="text-gray-400 text-[14px] leading-[17px] font-normal">{{ item.name }}</span>
                        <span :class="{
                            'text-blue-500 text-[14px] font-normal': idx === 0,
                            'text-[14px] font-normal text-black': idx !== 0
                        }">{{ item.value }}</span>
                    </div>
                </div>
            </div>
            <button v-if="visibleSections < specifications.length" @click="showMore" class="bg-[#24B2D2] text-white w-full p-[12px] text-center rounded-[6px] cursor-pointer">Показать ещё</button>
        </div>
    </section>
</template>
