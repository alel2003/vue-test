<script setup lang="ts">
import { computed } from 'vue';


import { storeToRefs } from 'pinia';

import { usePhoneStore } from '@/store';

import type { Phone } from '@/types';

const store = usePhoneStore()

const { phoneTabIndex, phoneRam, phoneStorage, phoneOfferIndex } = storeToRefs(store)

const { colors } = defineProps<Phone>()

const variants = computed(() => colors[phoneTabIndex.value].variants)

const selectedVariant = computed(() => variants.value.find(v => v.ram === phoneRam.value && v.storage === phoneStorage.value))

const selectedOfferInstallment = computed(() => selectedVariant.value?.offers?.find(v => v.type === phoneOfferIndex.value))

</script>

<template>
    <div v-if="selectedOfferInstallment" class="grid grid-cols-2 gap-[50px] fixed bottom-0 bg-white shadow-md py-[21px] z-100 right-0 left-0">
        <div class="flex flex-col gap-1 custom-container">
            <p class="text-gray-500 text-[12px] font-normal line-through leading-[15px]">{{ selectedOfferInstallment.price }} <span>сум</span></p>
            <p class="text-[16px] leading-[19px] font-semibold">{{ selectedOfferInstallment.salePrice }} <span>сум</span></p>
        </div>
        <a href="#" class="bg-[#9ED74C] p-[12px] text-white text-[14px] font-medium leading-[20px] text-center rounded-[6px] flex justify-center items-center">Оформить заказ</a>
    </div>
</template>
