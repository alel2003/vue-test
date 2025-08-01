<script setup lang="ts">
import { computed, watchEffect } from 'vue';

import { storeToRefs } from 'pinia';

import { usePhoneStore } from '@/store';

const store = usePhoneStore()

const { phoneOfferIndex, selectedOffers } = storeToRefs(store)
const { setPhoneOfferIndex } = store

const bestOfferType = computed(() => {
    if (selectedOffers.value) {
        const best = [...selectedOffers.value].sort((a, b) => a.salePrice - b.salePrice)[0]
        return best?.type
    }
})

watchEffect(() => {
    const offers = selectedOffers.value
    if (offers && offers.length > 0) {
        const best = [...offers].sort((a, b) => a.salePrice - b.salePrice)[0]
        if (best?.type) setPhoneOfferIndex(best.type)
    }
})

</script>

<template>
    <section class="custom-container flex flex-col gap-5">
        <h2 class="section-title">Предложения для Вас</h2>
        <div v-if="selectedOffers && selectedOffers.length" class="flex flex-col gap-[8px] md:w-fit w-full">
            <button v-for="offer in selectedOffers" :key="offer.type" @click="setPhoneOfferIndex(offer.type)" :class="{
                'border border-blue-500': phoneOfferIndex === offer.type,
                'md:py-5 md:px-30 pl-[16px] py-[16px] rounded-[10px] shadow-md shadow-[#ECF1FC] flex item-center justify-between gap-1 bg-white cursor-pointer relative': true
            }">
                <div class="flex flex-col gap-1 text-start">
                    <p class="text-gray-500 text-[16px] font-medium line-through leading-[21px]">{{ offer.price }}
                        <span>сум</span>
                    </p>
                    <p class="text-[24px] font-semibold leading-[21px]">{{ offer.salePrice }} <span>сум</span></p>
                    <div class="text-[15px] font-normal leading-[18px] mt-2">
                        <div v-if="offer.type === 'first'">
                            <span>{{ selectedOffers[0]?.title }}</span>
                        </div>
                        <div v-else-if="offer.type === 'second'">
                            <span>{{ selectedOffers[0]?.title }}</span> + <span class="text-blue-500">{{
                                selectedOffers[1]?.title }}</span>
                        </div>
                        <div v-else>
                            <span>{{ selectedOffers[0]?.title }}</span> + <span>{{ selectedOffers[1]?.title }}</span> +
                            <span class="text-yellow-500">{{ selectedOffers[2]?.title }}</span>
                        </div>
                    </div>
                </div>

                <div v-if="offer.type === bestOfferType"
                    class="absolute top-0 -right-1 h-full bg-blue-500 text-white text-[12px] font-semibold px-2 py-1 rounded-l-[10px] flex items-center justify-center writing-vertical">
                    Лучшее предложение
                </div>
            </button>
        </div>
    </section>
</template>
