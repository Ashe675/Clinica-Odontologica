<script lang="ts" setup>

interface Props {
  usuario: String
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
              Bienvenido,
              <span class="font-bold text-[#187897] text-lg">
                {{ props.usuario }}
              </span>
            </h1>
          </div>
        </div>
        <div id="profile-picture" class="px-5">
          <img src="../../../assets/user.jpeg"
            class="h-12 w-12  hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center]"
          >
        </div>
      </div>
    </div>
  </nav>
</template>
