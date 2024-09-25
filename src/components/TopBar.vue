<template>
  <header class="bg-white shadow-md py-4 px-4 flex justify-between items-center">
    <v-btn @click="toggleSidebar" icon flat>
      <v-icon>{{ sidebarOpen ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
    </v-btn>

    <div class="flex items-center space-x-4">
      <span class="text-gray-800">Username</span>
      <v-btn icon flat>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </div>
  </header>
</template>

<script setup>
import {ref, watch} from 'vue';

const props = defineProps(['sideBarOpen'])
const emit = defineEmits(['toggle-sidebar'])
const sidebarOpen = ref(false);

watch(() => props.sideBarOpen, () => {
  sidebarOpen.value = props.sideBarOpen;
})

const toggleSidebar = () => {
  emit('toggle-sidebar', sidebarOpen.value);
};
</script>
