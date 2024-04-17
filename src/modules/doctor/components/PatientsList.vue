<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

var currentPatient = ref('')
var patientSelected = ref(false)
var patients = ref([])
var recordSelected = ref(false)
var recordSelectedId = ref(0)
var invoiceSelected = ref(false)


const openRecord = (id: number) => {
  recordSelectedId.value = id
  recordSelected.value = true
  GetPatient(id)
}

const updatePatient = (name: string) => {
  currentPatient.value = name
  patientSelected.value = true
}

async function GetPatient(id: number) {
  const response = await fetch(`http://127.0.0.1:8000/api_pacientes/pacientes/${id + 1}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('jwt-token')}`
    }
  })
  const data = await response.json()
  console.log('paciente', data)
}


async function PatientsList() {
  const response = await fetch('http://127.0.0.1:8000/api_pacientes/pacientes/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('jwt-token')}`
    }
  })
  const data = await response.json()
  patients.value = data
  console.log(data)
}

onBeforeMount(() => {
  PatientsList()
})
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
              Correo
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#187897] tracking-wider"
            >
              Fecha de Nacimiento
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#187897] tracking-wider"
            >
              Dirección
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#187897] tracking-wider"
            >
              Teléfono
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300"></th>
            <th class="px-6 py-3 border-b-2 border-gray-300"></th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(patient, index) in patients" :key="index">
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="flex items-center">
                <div>
                  <div class="text-sm leading-5 text-gray-800">#{{ index + 1 }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="text-sm leading-5 text-blue-900">{{ patient.correo }}</div>
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
            >
              {{ patient.fecha_nacimiento }}
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
            >
              {{ patient.direccion }}
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"
            >
              {{ patient.telefono }}
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5"
            >
              <button
                @click="updatePatient('dsdspp')"
                class="px-2 py-2 rounded-2xl text-xs border-[#187897] border text-[#187897] font-bold transition duration-300 hover:bg-[#187897] hover:text-white focus:outline-none"
              >
                Iniciar consulta
              </button>
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5"
            >
              <button
                @click="openRecord(index)"
                class="px-2 py-2 rounded-2xl text-xs border-[#187897] border text-[#187897] font-bold transition duration-300 hover:bg-[#187897] hover:text-white focus:outline-none"
              >
                Ver expediente
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

  <!-- inicio de consulta -->

  <section v-if="patientSelected" class="flex items-center justify-center">
    <div class="mx-auto w-full max-w-[550px]">
      <button
        @click="patientSelected = false;currentPatient = ''"
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
            <input type="checkbox" id="myCheckbox1" class="form-checkbox h-5 w-5 text-indigo-600" />
            <label for="myCheckbox1" class="ml-2 text-gray-700">Endodoncia</label>
          </div>
          <div>
            <input type="checkbox" id="myCheckbox2" class="form-checkbox h-5 w-5 text-indigo-600" />
            <label for="myCheckbox2" class="ml-2 text-gray-700">Limpieza</label>
          </div>
          <div>
            <input type="checkbox" id="myCheckbox3" class="form-checkbox h-5 w-5 text-indigo-600" />
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

  <!-- vista de expediente -->
  <div
    v-if="recordSelected"
    class="fixed left-0 top-0 ml-20 flex h-full w-full items-center justify-center bg-slate-200 bg-opacity-50 py-10"
  >
    <div class="bg-white">
      <button
        @click="recordSelected = false"
        type="button"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-toggle="default-modal"
      >
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        class="flex flex-row items-center gap-10 p-5 mx-auto max-w-4xl bg-white shadow-b-lg rounded-md text-[#333] font-[sans-serif]"
      >
        <div class="flex-1 bg-white rounded-lg py-8">
          <h4 class="text-xl text-gray-900 font-bold">Información del paciente</h4>
          <ul class="mt-2 text-gray-700">
            <li class="flex border-y py-2">
              <span class="font-bold w-24">Nombre:</span>
              <span class="text-gray-700">Amanda S. Ross</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Nacimiento:</span>
              <span class="text-gray-700">24 Jul, 1991</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">DNI:</span>
              <span class="text-gray-700">185889898989</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Teléfono:</span>
              <span class="text-gray-700">(123) 123-1234</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Correo:</span>
              <span class="text-gray-700">amandaross@example.com</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Direccion:</span>
              <span class="text-gray-700">New York, US</span>
            </li>
          </ul>
        </div>

        <div class="overflow-y-auto overflow-x-hidden sm:mx-0.5 lg:mx-0.5">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <h4 class="text-xl text-gray-900 font-bold">Citas Previas</h4>
            <div class="overflow-y-auto h-80">
              <table class="min-w-full">
                <thead class="bg-white border-b">
                  <tr>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Nombre
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Fecha
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Doctor
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-gray-100 border-b">
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Jorge Coello
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      12/08/2024
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Doctor1
                    </td>
                    <td class="whitespace-no-wrap text-right border-gray-500 text-sm leading-5">
                      <button
                        @click="invoiceSelected = true"
                        class="px-2 py-2 text-sm rounded-2xl border-[#187897] border text-[#187897] font-bold transition duration-300 hover:bg-[#187897] hover:text-white focus:outline-none"
                      >
                        Detalles
                      </button>
                    </td>
                  </tr>
                  <tr class="bg-gray-100 border-b">
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Jorge Coello
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      12/08/2024
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Doctor1
                    </td>
                    <td class="whitespace-no-wrap text-right border-gray-500 text-sm leading-5">
                      <button
                        @click="invoiceSelected = true"
                        class="px-2 py-2 text-sm rounded-2xl border-[#187897] border text-[#187897] font-bold transition duration-300 hover:bg-[#187897] hover:text-white focus:outline-none"
                      >
                        Factura
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="invoiceSelected"
    class="fixed left-0 top-0 flex h-full ml-10 w-full items-center justify-center bg-slate-200 bg-opacity-50 p-10"
  >
    <div class="bg-white p-5">
      <button
        @click="invoiceSelected = false"
        type="button"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-toggle="default-modal"
      >
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        class="flex flex-row items-center gap-10 p-5 mx-auto max-w-4xl bg-white shadow-b-lg rounded-md text-[#333] font-[sans-serif]"
      >
        <div class="flex-1 bg-white rounded-lg py-8">
          <h4 class="text-xl text-gray-900 font-bold">Detalle</h4>
          <ul class="mt-2 text-gray-700">
            <li class="flex border-y py-2">
              <span class="font-bold w-24">Paciente:</span>
              <span class="text-gray-700">Amanda S. Ross</span>
            </li>

            <li class="flex border-b py-2">
              <span class="font-bold w-24 mr-5">Tratamientos:</span>
              <span class="relative inline-block px-3 py-1 font-semibold leading-tight">
                <span
                  aria-hidden
                  class="absolute inset-0 bg-[#187897] opacity-20 rounded-full"
                ></span>
                <span class="relative text-xs">Extraccion</span> </span
              >,
              <span class="relative inline-block px-3 py-1 font-semibold leading-tight">
                <span
                  aria-hidden
                  class="absolute inset-0 bg-[#187897] opacity-20 rounded-full"
                ></span>
                <span class="relative text-xs">Limpieaza</span> </span
              >,
              <span class="relative inline-block px-3 py-1 font-semibold leading-tight">
                <span
                  aria-hidden
                  class="absolute inset-0 bg-[#187897] opacity-20 rounded-full"
                ></span>
                <span class="relative text-xs">Extraccion</span>
              </span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Doctor:</span>
              <span class="text-gray-700">Mario Gonzales</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
