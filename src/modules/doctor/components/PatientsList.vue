<script setup lang="ts">
import { ref } from 'vue'

var currentPatient = ref('')

var patientSelected = ref(false)

const updatePatient = (name: string) => {
  currentPatient.value = name
  patientSelected.value = true
}
</script>

<template>
  <!-- component -->
  <div
    v-if="!patientSelected"
    class="-my-2 py-0 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8"
  >
    <div
      class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12"
    >
      <div class="flex justify-between">
        <div class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
          <div class="flex flex-wrap items-stretch w-full h-full mb-6 relative">
            <div class="flex">
              <span
                class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm"
              >
                <svg
                  width="18"
                  height="18"
                  class="w-4 lg:w-auto"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                    stroke="#455A64"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.9993 16.9993L13.1328 13.1328"
                    stroke="#455A64"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
            <input
              type="text"
              class="flex-shrink flex-grow leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs text-gray-500 font-thin"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg"
    >
      <table class="min-w-full">
        <thead>
          <tr>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-[#187897] tracking-wider"
            >
              ID
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#187897] tracking-wider"
            >
              Nombre
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#187897] tracking-wider"
            >
              Nacimiento
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#187897] tracking-wider"
            >
              Procedimiento
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#187897] tracking-wider"
            >
              Status
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300"></th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="flex items-center">
                <div>
                  <div class="text-sm leading-5 text-gray-800">#1</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="text-sm leading-5 text-blue-900">Damilare Anjorin</div>
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
            >
              12 de junio, 2000
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
            >
              Ortodoncia
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"
            >
              4 de marzo, 2024
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5"
            >
              <button
                @click="updatePatient('dsdspp')"
                class="px-5 py-2 rounded-2xl border-[#187897] border text-[#187897] font-bold transition duration-300 hover:bg-[#187897] hover:text-white focus:outline-none"
              >
                Iniciar consulta
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
        <div></div>
      </div>
    </div>
  </div>

  <section v-if="patientSelected" class="flex items-center justify-center">
    <div class="mx-auto w-full max-w-[550px]">
      <button
        @click="patientSelected = false; currentPatient = ''"
        class="flex hover:text-[#187897] hover:scale-105 items-center outline-none space-x-2 w-24 h-10 py-1 px-2 text-slate-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>
        <span>Back</span>
      </button>
      <h1 class="font-bold my-5 text-xl">Paciente: {{ currentPatient }}</h1>
      <form action="#" method="POST">
        <div class="mb-5">
          <label for="message" class="mb-3 block text-base font-medium text-[#07074D]">
            Motivo de la consulta
          </label>
          <textarea
            rows="4"
            name="message"
            id="message"
            placeholder=""
            class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#187897] focus:shadow-md"
          ></textarea>
        </div>
        <div class="mb-5">
          <label for="message" class="mb-3 block text-base font-medium text-[#07074D]">
            Observaciones
          </label>
          <textarea
            rows="4"
            name="message"
            id="message"
            placeholder=""
            class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#187897] focus:shadow-md"
          ></textarea>
        </div>
        <div id="treatments-container" class="my-5 grid grid-cols-3 gap-4">
  <div>
    <input type="checkbox" id="myCheckbox1" class="form-checkbox h-5 w-5 text-indigo-600">
    <label for="myCheckbox1" class="ml-2 text-gray-700">Endodoncia</label>
  </div>
  <div>
    <input type="checkbox" id="myCheckbox2" class="form-checkbox h-5 w-5 text-indigo-600">
    <label for="myCheckbox2" class="ml-2 text-gray-700">Limpieza</label>
  </div>
  <div>
    <input type="checkbox" id="myCheckbox3" class="form-checkbox h-5 w-5 text-indigo-600">
    <label for="myCheckbox3" class="ml-2 text-gray-700">Extracción</label>
  </div>
</div>


        <div>
          <button
            class="hover:shadow-form rounded-2xl bg-[#187897] py-2 px-8 text-center text-base font-semibold text-white outline-none"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
