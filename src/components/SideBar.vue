<template>
  <nav
      :class="['bg-gray-800 text-white', sidebarCollapse ? 'w-64 pa-4' : 'w-16 pa-1', 'transition-all duration-300 min-h-screen shadow-lg']">
    <ul class="flex flex-col space-y-4 mt-4">
      <li v-for="item in menuItems" :key="item.name"
          class="w-100 flex items-center transition-transform duration-200 hover:scale-105">
        <router-link :to="item.to"
                     :class="['w-100 flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-300', sidebarCollapse ? '' : 'justify-center']">
          <v-icon class="text-lg">{{ item.icon }}</v-icon>
          <span v-if="sidebarCollapse" class="ml-2 transition-opacity duration-300 ease-in-out">{{
              item.name
            }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import {ref, watch} from "vue";

const sidebarCollapse = ref(false)

const props = defineProps({
  sidebarOpen: {type: Boolean}
})

watch(() => props.sidebarOpen, (newValue) => {
  sidebarCollapse.value = newValue
})

const menuItems = [
  {name: 'Dashboard', icon: 'mdi-view-dashboard', to: '/'},
  {name: 'Users', icon: 'mdi-account', to: '/users'},
];
</script>