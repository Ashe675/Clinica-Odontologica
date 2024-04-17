<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const rol = ref('')
const errorMsg = ref('')
const errorAlert = ref(false);
const router = useRouter()

async function login() {
  const response = await fetch('http://127.0.0.1:8000/usuarios/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: email.value,
      password: password.value
    })
  }
  )
  const data = await response.json()
  console.log(data)

  if (data.error) {
    errorMsg.value = data.error
    console.log(errorMsg)
    errorAlert.value = true;
    setTimeout(() => {
      errorAlert.value = false;
    }, 3000);
  }
  if (data.token) {
    localStorage.setItem('jwt-token', data.token)
    localStorage.setItem('rol', data.user.rol)
    rol.value=data.user.rol
    if (rol.value== 'Doctor'){
      router.push('/doctor')
    }
    else if (rol.value=='Recepcionista')
    router.push('/reception')
  }

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

      <form @submit.prevent="login()">
        <!-- Username Input -->
        <div class="mb-4">
          <label for="username" class="block text-gray-600">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            autocomplete="off"
            v-model="email"
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
            v-model="password"
          />
        </div>
        <div class=" h-8 m-0">
          <div
          v-if="errorAlert"
          class="inline-block align-baseline text-sm text-red-600 ml-2"
        >  {{errorMsg}}
        </div>
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
