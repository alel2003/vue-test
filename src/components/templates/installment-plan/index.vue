<script setup lang="ts">
import { ref } from 'vue';

import { storeToRefs } from 'pinia';

import { usePhoneStore } from '@/store';

const store = usePhoneStore()

const { phoneInstallmentPlan, selectedOffer } = storeToRefs(store)
const { setPhoneInstallmentPlan } = store

const tabPeriods = [
    {
        title: "3 мес",
        type: 3
    },
    {
        title: "6 мес",
        type: 6
    }, {
        title: "9 мес",
        type: 9
    },
    {
        title: "12 мес",
        type: 12
    }
] as const

const period = ref<3 | 6 | 9 | 12>(tabPeriods[0].type)

const handleInstallmentClick = (plans: any) => {
    const value = plans[period.value.toString()]
    setPhoneInstallmentPlan(value)
}

const isActivePlan = (plans: any) => {
    const currentPlan = plans[period.value.toString()]
    const isActive = phoneInstallmentPlan.value === currentPlan
    return isActive
}

</script>

<template>
    <section class="custom-container flex flex-col gap-5">
        <h4 class="section-title">Воспользуйтесь рассрочкой</h4>
        <div class="flex flex-col gap-[16px] md:w-fit w-full">
            <div class="flex items-center justify-between md:gap-3 gap-1">
                <button @click="period = item.type" :class="{
                    'text-white bg-blue-500': period === item.type,
                    'text-yellow-400 border-yellow-400': item.type === 12 && period !== item.type,
                    'cursor-pointer p-[12px] text-blue-500 border border-gray-300 rounded-[6px]': true
                }" v-for="(item, idx) in tabPeriods" :key="idx">
                    {{ item.title }}
                </button>
            </div>

            <div class="flex flex-col gap-[8px]" v-if="selectedOffer?.installment">
                <button 
                    @click="handleInstallmentClick(plans)"
                    v-for="(plans, provider) in selectedOffer.installment" 
                    :key="provider" 
                    :class="{
                        'border border-blue-500': isActivePlan(plans),
                        'border border-gray-200': !isActivePlan(plans),
                        'flex justify-between items-center  rounded py-[20px] px-[12px] cursor-pointer': true
                    }"
                >
                    <h5 class="capitalize font-medium">{{ provider }} <span>Nasiya</span></h5>
                    <p class="text-gray-700 font-semibold">
                        <span>от</span> {{ plans[period.toString()]?.toLocaleString() }} <span>сум</span>
                    </p>
                </button>
            </div>
        </div>
    </section>
</template>