<template>
  <DefaultLayout>
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Overview</h1>
      <transition-group name="fade" mode="out-in">
        <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            key="overview"
        >
          <div class="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <h3 class="text-2xl font-semibold mb-2 text-gray-800">Registered Users</h3>
            <p class="text-4xl font-bold text-blue-600">500</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <h3 class="text-2xl font-semibold mb-2 text-gray-800">Active Requests</h3>
            <p class="text-4xl font-bold text-blue-600">50</p>
          </div>
        </div>
      </transition-group>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "../layouts/DefaultLayout.vue";
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>