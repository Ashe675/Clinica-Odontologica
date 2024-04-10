<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const errorAlert = ref(false);

async function login() {
// 

}

</script>

<template>
  <div class="bg-white flex justify-center items-center h-screen">
    <!-- Left: Image -->
    <div class="w-1/2 h-screen relative">
      <img
        src="../../../assets/login_cover.jpg"
        alt="Placeholder Image"
        class="object-cover w-full h-full"
      />
      <div
        class="absolute inset-0 opacity-80"
        style="background: linear-gradient(135deg, #12eeca, #148f9e)"
      ></div>
    </div>
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <div class="w-1/2 ml-auto mr-auto">
        <img
          src="../../../assets/logo.jpg "
          alt="Placeholder Image"
          class="object-cover w-full h-full"
        />
        <h1 class="font-bold text-2xl text-[#00609C] ml-10">Dental Care</h1>
      </div>

      <!--FORM-->

      <form @submit.prevent="login">
        <!-- Username Input -->
        <div class="mb-4">
          <label for="username" class="block text-gray-600">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            autocomplete="off"
          />
        </div>
        <!-- Password Input -->
        <div class="mb-4">
          <label for="password" class="block text-gray-600">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            autocomplete="off"
          />
        </div>
        <!-- Remember Me Checkbox -->
        <div class="mb-4 flex items-center">
          <input type="checkbox" id="remember" name="remember" class="text-[#148F9E]" />
          <label for="remember" class="text-gray-600 ml-2">Recuerdame</label>
        </div>
        <!-- Login Button -->
        <button
          class="bg-[#148F9E] hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
