<script lang="ts" setup>
import { ref } from 'vue'

const alertaExito = ref(false)
const alertaError = ref(false)
const errorMsg = ref('')
const exitoMsg = ref('')


const primer_nombre = ref('')
const segundo_nombre = ref('')

const dni = ref('')
const primer_apellido = ref('')
const segundo_apellido = ref('')
const correo=ref('')
const telefono=ref('')
const fecha_nacimiento=ref('')
const direccion=ref('')
const generoSeleccionado = ref('')


async function crearPaciente() {
  const response = await fetch('http://127.0.0.1:8000/api-pacientes/paciente/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('jwt-token')}`
    },
    body: JSON.stringify({
        dni:dni.value,
        primer_nombre:primer_nombre.value,
        segundo_nombre:segundo_nombre.value,
        primer_apellido:primer_apellido.value,
        segundo_apellido:segundo_apellido.value,
        correo: correo.value,
        telefono:telefono.value,
        fecha_nacimiento:fecha_nacimiento.value,
        direccion:direccion.value,
        genero:generoSeleccionado.value
    })
  })
  
    if (response.ok) {
      alertaExito.value = true
      exitoMsg.value="¡Paciente creado con éxito!"
      setTimeout(() => {
        alertaExito.value = false
      }, 2500)
    } else {
      errorMsg.value = 'Hubo un error. Vuelve a intentarlo'
      alertaError.value = true
      setTimeout(() => {
        alertaError.value = false
      }, 3000)
    }
    dni.value = ''
    primer_apellido.value = ''
    segundo_apellido.value = ''
    correo.value=''
    telefono.value=''
    fecha_nacimiento.value=''
    direccion.value=''
    generoSeleccionado.value = ''
}
</script>

<template>
  <!-- component -->
  <div class="flex items-center justify-center p-0">
    <div class="mx-auto w-full max-w-[550px]">
      <form @submit.prevent="crearPaciente()">
        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label for="fName" class="mb-3 block text-base font-medium text-[#07074D]">
                Primer nombre
              </label>
              <input
                type="text"
                name="fName"
                id="fName"
                placeholder="First Name"
                v-model="primer_nombre"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label for="lName" class="mb-3 block text-base font-medium text-[#07074D]">
                Segundo nombre
              </label>
              <input
                type="text"
                name="lName"
                id="lName"
                placeholder="Last Name"
                v-model="segundo_nombre"

                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            
          </div>

        </div>

        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label for="fName" class="mb-3 block text-base font-medium text-[#07074D]">
                Primer apellido
              </label>
              <input
                type="text"
                name="fName"
                id="fName"
                placeholder="First Name"
                v-model="primer_apellido"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label for="lName" class="mb-3 block text-base font-medium text-[#07074D]">
                Segundo apellido
              </label>
              <input
                type="text"
                name="lName"
                id="lName"
                placeholder="Last Name"
                v-model="segundo_apellido"

                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>
        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label for="date" class="mb-3 block text-base font-medium text-[#07074D]">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                name="date"
                id="date"
                v-model="fecha_nacimiento"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label for="lName" class="mb-3 block text-base font-medium text-[#07074D]">
                DNI
              </label>
              <input
                type="text"
                name="dni"
                id="dni"
                placeholder="0000-0000-00000"
                v-model="dni"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>

        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label for="fName" class="mb-3 block text-base font-medium text-[#07074D]">
                Correo
              </label>
              <input
                type="text"
                name="fName"
                id="fName"
                placeholder="First Name"
                v-model="correo"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label for="fName" class="mb-3 block text-base font-medium text-[#07074D]">
                Teléfono
              </label>
              <input
                type="text"
                name="fName"
                id="fName"
                placeholder="First Name"
                v-model="telefono"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>

        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label for="lName" class="mb-3 block text-base font-medium text-[#07074D]">
                Direccion
              </label>
              <textarea
                type="text"
                name="lName"
                id="lName"
                placeholder="Direccion"
                v-model="direccion"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>

        <div class="mb-5">
    <label class="mb-3 block text-base font-medium text-[#07074D]"> Género </label>
    <div class="flex items-center space-x-6">
      <div class="flex items-center">
        <input type="radio" name="genero" id="masculino" class="h-5 w-5" value="M" v-model="generoSeleccionado">
        <label for="masculino" class="pl-3 text-base font-md text-[#07074D]"> Masculino </label>
      </div>
      <div class="flex items-center">
        <input type="radio" name="genero" id="femenino" class="h-5 w-5" value="F" v-model="generoSeleccionado">
        <label for="femenino" class="pl-3 text-base font-md text-[#07074D]"> Femenino </label>
      </div>
      <div class="flex items-center">
        <input type="radio" name="genero" id="otro" class="h-5 w-5" value="O" v-model="generoSeleccionado">
        <label for="otro" class="pl-3 text-base font-md text-[#07074D]"> Otro </label>
      </div>
    </div>
  </div>

        <div>
          <button
            class="hover:shadow-form rounded-2xl bg-[#187897] py-3 px-8 text-center text-base font-semibold text-white outline-none"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
    <div
      v-if="alertaExito"
      class="fixed w-82 bottom-4.5 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded"
      role="alert"
    >
      <svg
        class="w-5 h-5 inline mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <div>
        <span class="font-medium"> ¡Paciente agregado exitosamente!</span>
      </div>
    </div>

    <div
      v-if="alertaError"
      class="fixed w-82 bottom-4.5 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded"
      role="alert"
    >
      <svg
        class="w-5 h-5 inline mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <div>
        <span class="font-medium">{{errorMsg}}</span>
      </div>
    </div>

  </div>
</template>
