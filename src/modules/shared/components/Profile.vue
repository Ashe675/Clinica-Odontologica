<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts" setup>
import { onBeforeMount,ref } from 'vue';

var informacion= ref('')
async function ObtenerInformacionPerfil() {
  const response = await fetch(`http://127.0.0.1:8000/usuarios/profile/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('jwt-token')}`
    }
  })
  const data = await response.json()
  informacion.value=data
  console.log("infooooo",informacion.value)
}

onBeforeMount(() => {
    ObtenerInformacionPerfil()
})

</script>


<template >
        <div class="sm:flex sm:justify-between">
            <div class="flex items-center">
                <img class="h-12 w-12 rounded-full" src="../../../assets/user.jpeg" alt="">
                <div class="ml-2">
                    <h3 class="text-lg text-gray-800 font-medium">{{ informacion.username }}</h3>
                    <span class="text-gray-600">{{ informacion.email }}</span>
                </div>
            </div>
 
        </div>
        <div class="flex justify-between items-center w-[50%] mt-8">
            <div>
                <h4 class="text-gray-600 text-sm">Id</h4>
                <span class="mt-2 text-xl font-medium text-gray-800">{{ informacion.id }}</span>
            </div>
            <div>
                <h4 class="text-gray-600 text-sm">Rol</h4>
                <span class="mt-2 text-xl font-medium text-gray-800">{{ informacion.rol }}</span>
            </div>
            <div>
                <h4 class="text-gray-600 text-sm">Unión</h4>
                <span class="mt-2 text-xl font-medium text-gray-800">4 de agosto, 2021</span>
            </div>
        </div>

</template>