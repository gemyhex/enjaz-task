<template>
  <DefaultLayout>
    <v-container>
      <h1 class="text-h4 mb-4">Users</h1>

      <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="pagination.itemsPerPage"
          :server-items-length="totalUsers"
          :page.sync="pagination.page"
          :loading="loading"
          class="elevation-1 responsive-table overflow-x-auto max-w-full"
          item-value="id"
          @update:options="onPagination"
          :mobile-breakpoint="600"
      >
        <template v-slot:top>
          <div class="flex flex-col sm:flex-row justify-between items-center my-2 px-2">
            <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="w-full lg:max-w-2xl me-2 mb-2"
                variant="outlined"
            ></v-text-field>

            <div class="flex flex-col sm:flex-row justify-between items-center">
              <v-select
                  v-model="filterStatus"
                  :items="statusOptions"
                  label="Filter by Status"
                  class="mb-2 me-2"
                  hide-details
                  variant="outlined"
                  max-width="300"
                  min-width="300"
                  @change="fetchUsers(search, pagination.page, pagination.itemsPerPage)"
              ></v-select>

              <v-btn
                  height="56"
                  min-width="150"
                  max-width="100%"
                  color="primary"
                  @click="openDialog('add')"
                  class="self-start sm:self-auto mb-2"
              >
                <v-icon>mdi-plus</v-icon>
                <span class="ms-2">Add User</span>
              </v-btn>
            </div>
          </div>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
              small
              color="blue darken-1"
              class="hover:bg-blue-900 transition duration-300 me-1"
              icon
              flat
              @click="openDialog('edit', item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
              small
              color="red darken-1"
              class="hover:accent-red-900 transition duration-300"
              icon
              flat
              @click="deleteUser(item.id)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>

        <template v-slot:progress>
          <v-progress-linear indeterminate color="blue"></v-progress-linear>
        </template>

        <!-- Add responsiveness to the columns -->
        <template v-slot:item="{ item }">
          <tr>
            <td class="whitespace-nowrap">
              <div class="flex flex-col sm:flex-row">
                <span class="font-bold">{{ item.name }}</span>
              </div>
            </td>
            <td class="whitespace-nowrap">{{ item.email }}</td>
            <td class="whitespace-nowrap">{{ item.active ? 'Active' : 'Inactive' }}</td>
            <td>
              <v-btn
                  small
                  color="blue darken-1"
                  class="hover:bg-blue-900 transition duration-300 me-1"
                  icon
                  flat
                  @click="openDialog('edit', item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                  small
                  color="red darken-1"
                  class="hover:accent-red-900 transition duration-300"
                  icon
                  flat
                  @click="deleteUser(item.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>

      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ dialogType === 'add' ? 'Add' : 'Edit' }} User</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="form.name" variant="outlined" label="Name" required></v-text-field>
            <v-text-field v-model="form.email" variant="outlined" label="Email" required></v-text-field>
            <v-switch v-model="form.active" label="Active" color="primary"></v-switch>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="saveUser">{{ dialogType === 'add' ? 'Add' : 'Save' }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </DefaultLayout>
</template>

<script setup>
import {ref, watch} from 'vue';
import axios from '../utils/axios';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import {showAlert, confirmDelete} from "../composables/useSwal.js";

const dialog = ref(false);
const dialogType = ref('add');
const search = ref('');
const users = ref([]);
const totalUsers = ref(0);
const loading = ref(false);
const form = ref({
  id: null,
  name: '',
  email: '',
  active: true,
});

// Add filter status
const filterStatus = ref(null);
const statusOptions = [
  {title: 'All', value: null},
  {title: 'Active', value: true},
  {title: 'Inactive', value: false},
];

const headers = [
  {title: 'Name', value: 'name'},
  {title: 'Email', value: 'email'},
  {title: 'Active', value: 'active'},
  {title: 'Actions', value: 'actions', sortable: false},
];

const pagination = ref({
  page: 1,
  itemsPerPage: 10,
});

async function fetchUsers(query = '', page = 1, itemsPerPage = 10, status = null) {
  loading.value = true;
  try {
    const response = await axios.get('users', {
      params: {
        q: query,
        _page: page,
        _limit: itemsPerPage,
        active: status,
      },
    });
    users.value = response.data;
    totalUsers.value = parseInt(response.headers['x-total-count'], 10);
  } catch (error) {
    console.error('Error fetching users', error);
  }
  loading.value = false;
}

watch([search, filterStatus], () => {
  fetchUsers(search.value, pagination.value.page, pagination.value.itemsPerPage, filterStatus.value);
});

function onPagination(options) {
  fetchUsers(search.value, options.page, options.itemsPerPage, filterStatus.value);
}

function openDialog(type, user = null) {
  dialogType.value = type;
  if (type === 'edit' && user) {
    form.value = {...user};
  } else {
    form.value = {name: '', email: '', active: true};
  }
  dialog.value = true;
}

async function saveUser() {
  if (dialogType.value === 'add') {
    const response = await axios.post('users', form.value);
    users.value.push({...response.data, id: users.value.length + 1});
    showAlert('Item Added Successfully')
  } else {
    const response = await axios.put(`users/${form.value.id}`, form.value);
    const index = users.value.findIndex((u) => u.id === form.value.id);
    if (index !== -1) {
      users.value[index] = response.data;
      showAlert('Item Edited Successfully')
    }
  }
  dialog.value = false;
}

async function deleteUser(id) {
  confirmDelete('', `users/${id}`).then((res) => {
    users.value = users.value.filter((user) => user.id !== id);
    if (res) {
      showAlert('Item Deleted Successfully')
    }
  })
}
</script>