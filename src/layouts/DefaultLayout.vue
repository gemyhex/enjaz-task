<template>
  <div class="flex">
    <!-- Sidebar Component -->
    <Sidebar :sidebarOpen="sidebarOpen"/>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col bg-gray-100">
      <!-- Top Bar Component -->
      <TopBar :side-bar-open="sidebarOpen" @toggle-sidebar="toggleSidebar"/>

      <!-- Page Content -->
      <main class="flex-1 p-4">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import Sidebar from '../components/Sidebar.vue';
import TopBar from '../components/TopBar.vue';

const sidebarOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    sidebarOpen.value = true;
  } else {
    sidebarOpen.value = false;
  }
});
</script>
