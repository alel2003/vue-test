<template>
  <div class="min-h-screen bg-white flex items-center justify-center px-6 py-12">
    <div class="text-center">
      <h1 class="text-[120px] font-extrabold text-gray-900 leading-none tracking-tight animate-pulse">
        404
      </h1>
      <p class="mt-4 text-2xl font-semibold text-gray-700">Упс! Страница не найдена</p>
      <p class="mt-2 text-gray-500">Кажется, вы заблудились. Проверьте адрес или вернитесь назад.</p>
      <RouterLink
        to="/phone/honor-x9c-1/"
        class="mt-6 inline-block rounded-xl bg-blue-500 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-blue-700"
      >
        Перейти к карточке телефона
      </RouterLink>
    </div>
  </div>
</template>
