import { ref, computed } from "vue";

import { defineStore } from "pinia";

import type { Phone } from "@/types";

export const usePhoneStore = defineStore("phone", () => {
  const phoneTabIndex = ref(0);
  const phoneRam = ref(0);
  const phoneStorage = ref(0);
  const phoneOfferIndex = ref("")
  const phoneInstallmentPlan = ref(0)
  
  const currentPhone = ref<Phone | null>(null);

  const currentColor = computed(() => {
    if (!currentPhone.value) return null;
    return currentPhone.value.colors[phoneTabIndex.value];
  });

  const variants = computed(() => {
    return currentColor.value?.variants || [];
  });

  const selectedVariant = computed(() => {
    return variants.value.find(v => 
      v.ram === phoneRam.value && v.storage === phoneStorage.value
    );
  });

  const selectedOffers = computed(() => {
    return selectedVariant.value?.offers || [];
  });

  const selectedOffer = computed(() => {
    return selectedOffers.value.find(offer => offer.type === phoneOfferIndex.value);
  });

  function setPhoneTabIndex(value: number) {
    phoneTabIndex.value = value;
  }

  function setPhoneRam(value: number) {
    phoneRam.value = value;
  }

  function setPhoneStorage(value: number) {
    phoneStorage.value = value;
  }

  function setPhoneOfferIndex(value: string) {
    phoneOfferIndex.value = value;
  }

  function setPhoneInstallmentPlan(value: number) {
    phoneInstallmentPlan.value = value;
  }

  function setCurrentPhone(phone: Phone) {
    currentPhone.value = phone;
    phoneTabIndex.value = 0;
    phoneRam.value = 0;
    phoneStorage.value = 0;
    phoneOfferIndex.value = "";
    phoneInstallmentPlan.value = 0;

    if (phone.colors[0]?.variants.length > 0) {
      const firstVariant = phone.colors[0].variants[0];
      phoneRam.value = firstVariant.ram;
      phoneStorage.value = firstVariant.storage;
      
      if (firstVariant.offers && firstVariant.offers.length > 0) {
        const bestOffer = [...firstVariant.offers].sort((a, b) => a.salePrice - b.salePrice)[0];
        phoneOfferIndex.value = bestOffer.type;
      }
    }
  }

  return {
    phoneRam,
    phoneStorage,
    phoneTabIndex,
    phoneOfferIndex,
    phoneInstallmentPlan,
    currentPhone,
    currentColor,
    variants,
    selectedVariant,
    selectedOffers,
    selectedOffer,
    setPhoneRam,
    setPhoneStorage,
    setPhoneTabIndex,
    setPhoneOfferIndex,
    setPhoneInstallmentPlan,
    setCurrentPhone
  };
});
