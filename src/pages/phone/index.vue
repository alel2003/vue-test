<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import PhoneHero from '@/components/templates/hero/index.vue'
import PhoneTerms from '@/components/templates/terms/index.vue'
import PhoneOffers from '@/components/templates/offers/index.vue'
import PhoneMainSpecifications from '@/components/templates/main-specifications/index.vue'
import PhoneInstallmentPlan from '@/components/templates/installment-plan/index.vue'
import PhoneSpecifications from '@/components/templates/specifications/index.vue'
import PhoneSimilarProducts from '@/components/templates/similar-products/index.vue'
import PhoneOrderProcessing from '@/components/templates/order-processing/index.vue'

import { usePhoneStore } from '@/store'
import { PHONE_SLUG } from '@/services/api/phone/slug'

import type { Phone } from '@/types'

const route = useRoute()
const slug = route.params.slug as string

const store = usePhoneStore()
const isLoading = ref(false)
const phone = ref<Phone | null>(null)

const getPhoneSlugPage = async () => {
  try {
    isLoading.value = true
    const response = await PHONE_SLUG.get(slug)
    phone.value = response.data
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

watch(phone, (newPhone) => {
  if (newPhone) {
    store.setCurrentPhone(newPhone)
  }
}, { immediate: true })

onMounted(() => {
  getPhoneSlugPage()
})

</script>

<template>
  <div v-if="phone" class="flex flex-col gap-10">
    <div class="flex flex-col gap-10 pt-[10px] pb-30">
      <PhoneHero v-bind="phone" />
      <PhoneOffers v-bind="phone" />
      <PhoneMainSpecifications v-bind="phone" />
      <PhoneInstallmentPlan v-bind="phone" />
      <PhoneTerms />
      <PhoneSpecifications v-bind="phone" />
      <PhoneSimilarProducts v-bind="phone" />
    </div>
    <PhoneOrderProcessing v-bind="phone" />
  </div>
  <div v-else>
    <p>Загрузка...</p>
  </div>
</template>
