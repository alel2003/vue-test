<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/pagination'

import { PHONES } from '@/services/api/phone'

import type { Phone } from '@/types'


const { slug } = defineProps<Phone>()

const modules = [Pagination]

const isLoading = ref(false)
const phones = ref<Phone[] | null>(null)

const getCard = async () => {
    try {
        isLoading.value = true
        const response = await PHONES.get()
        const filteredCard = response.data.filter(v => v.slug !== slug)
        phones.value = filteredCard
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    getCard()
})

</script>

<template>
    <section v-if="phones && phones.length" class="custom-container flex flex-col gap-5">
        <h6 class="section-title">Похожие товары</h6>
        <Swiper :slides-per-view="2" space-between="8" class="h-fit w-full">
            <SwiperSlide v-for="(card, idx) in phones" :key="idx" class="bg-white shadow-md p-[12px] rounded-[10px]">
                <div>
                    <Swiper :pagination="{ el: '.similar-pagination', clickable: true }" :modules="modules" class="h-[136px] w-full">
                    <SwiperSlide v-for="(slide, idx) in card.colors[0].images" :key="idx">
                        <img :src="slide" alt="slide" class="w-full h-full object-cover">
                    </SwiperSlide>
                </Swiper>
                    <div class="flex justify-end">
                        <div class="similar-pagination mt-3 flex justify-end gap-1 bg-black/50 p-[4px] rounded-[8px] cursor-pointer"></div>
                    </div>
                </div>
                <div class="flex flex-col gap-4 mt-[20px]">
                    <h5 class="line-clamp-3 text-[15px] font-normal leading-[18px]">{{ card.title }}</h5>

                    <div v-if="card.colors[0]?.variants[0]" class="flex flex-col gap-1">
                        <p class="text-gray-500 text-[12px] font-normal line-through leading-[15px]">{{
                            card.colors[0].variants[0].price }} <span>сум</span></p>
                        <p class="text-[16px] leading-[19px] font-medium">{{ card.colors[0].variants[0].salePrice }}
                            <span>сум</span></p>
                    </div>

                    <div v-if="card.colors[0]?.variants?.[0]?.offers?.[0]?.installment?.alif?.['3']"
                        class="text-blue-500 text-[12px] leading-[15px]">
                        <span>от</span> {{ card.colors[0].variants[0].offers[0].installment.alif["3"] }}
                        <span>сум/мес</span>
                    </div>

                    <button
                        class="bg-[#9ED74C] p-[8px] flex justify-center items-center rounded-[6px] shadow-md cursor-pointer"><img
                            src="/icons/basket.svg" alt="basket-icon"></button>
                </div>
            </SwiperSlide>
        </Swiper>
        <div class="hero-pagination mt-3 flex justify-center gap-1" />
    </section>
    <div v-else>
        <p>Загрузка...</p>
    </div>
</template>
