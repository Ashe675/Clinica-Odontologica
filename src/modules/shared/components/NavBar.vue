<script lang="ts" setup>
interface Props {
  firstName: String
  lastName: String
}

const props = defineProps<Props>()
</script>

<template>
  <nav class="bg-white border-b border-gray-200 fixed z-30 w-full shadow-sm">
    <div class="px-3 py-2 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <div class="flex flex-col ml-6">
            <img src="../../../assets/logo.jpg" class="h-10 mr-2" alt="Windster Logo" />
            <span class="text-sm font-bold whitespace-nowrap text-[#00609C]">Dental Care</span>
          </div>
        </div>

        <div class="flex items-center mr-auto">
          <div class="ml-36">
            <h1 class="text-secondary-dark text-slate-700 font-semibold text-xl block">
              Welcome,
              <span class="font-bold text-[#187897] text-lg">
                {{ props.firstName }} Manuel {{ props.lastName }} Cerrato
              </span>
            </h1>
          </div>
        </div>
        <div
          class="h-12 w-12 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')]"
        >
          <div
            class="drop-down w-48 overflow-hidden bg-white rounded-md shadow absolute top-12 right-3"
          ></div>
        </div>
      </div>
    </div>
  </nav>
</template>
