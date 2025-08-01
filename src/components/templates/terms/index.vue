<script setup lang="ts">
import { TERMS } from '@/constants';
</script>

<template>
    <section class="custom-container flex flex-col gap-[20px]">
        <h5 class="section-title">Дополнительные условия</h5>
        <div class="flex flex-col gap-4 md:w-lg w-full bg-white shadow-md p-[20px] rounded-[18px]">
            <div v-for="(term, idx) in TERMS" :key="idx" class="flex flex-col gap-1">
                <h5 class="text-[16px] leading-[19px] font-medium">{{ term.title }}</h5>
                <p class="text-[15px] leading-[18px] font-normal">{{ term.description }}</p>
            </div>
        </div>
    </section>
</template>
