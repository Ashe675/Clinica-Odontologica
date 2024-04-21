<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

var tratamientos=[
        { nombre: 'Endodoncia', id:1, selected: false },
        { nombre: 'Limpieza', id:2, selected: false },
        { nombre: 'Extracción', id:3, selected: false }
      ]

const alertaExito = ref(false)
const alertaError = ref(false)
const errorMsg = ref('')

var pacienteSeleccionado= ref([])
var pacienteConsulta= ref('')
var crearConsulta = ref(false)
var pacientes = ref([])
var diagnosticoSeleccinado = ref(false)
var diagnosticoSeleccinadoId = ref(0)
var facturaSeleccionada = ref(false)
var consultasPaciente= ref('')
var consultaPaciente= ref('')
var expedienteSeleccionado=ref([])
var dniPaciente= ref('')
const motivoConsulta = ref('')
const observaciones = ref('')

function CamposVacios() {
  const hayTratamientoSeleccionado = tratamientos.some(tratamiento => tratamiento.selected);
  const motivoVacio = motivoConsulta.value.trim() === '';
  const observacionesVacias = observaciones.value.trim() === '';

  return !hayTratamientoSeleccionado || motivoVacio || observacionesVacias;
}

function verDetalleConsulta(id: number){
  facturaSeleccionada.value = true;
  consultaPaciente.value=consultasPaciente.value[id]
  console.log(consultasPaciente.value[id])
}


const ComenzarConsulta = (nombre : string, apellido: string,id:number) => {
  crearConsulta.value = true
  pacienteConsulta.value=nombre + " "+ apellido
  ObtenerPaciente(id)
}

async function ObtenerPaciente(id:number) {
  let strID = id.toString()
  const response = await fetch(`http://127.0.0.1:8000/api-pacientes/pacientes/`+ strID, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('jwt-token')}`
    }
  })
  const data = await response.json()
  dniPaciente.value= data.dni
  console.log("info",dniPaciente.value)
}


async function GuardarConsulta(){

  if  (CamposVacios() ){
    alertaError.value=true
      errorMsg.value="los campos no deben estar vacios"
      setTimeout(() => {
        alertaError.value = false
      }, 3000)
  }
  else{

    const tratamientosSeleccionados = tratamientos
          .filter(tratamiento => tratamiento.selected)
          .map(tratamiento => tratamiento.id);
  
  
    const response = await fetch('http://127.0.0.1:8000/api-consultas/create-consulta/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('jwt-token')}`
      },
      body: JSON.stringify({
        motivo_consulta: motivoConsulta.value,
        descripcion: observaciones.value,
        dniPaciente: dniPaciente.value,
        tratamientos: tratamientosSeleccionados
      })
    })
  
    const data = await response.json()
    console.log(data)
  
    if (response.ok) {
      alertaExito.value = true
      setTimeout(() => {
        alertaExito.value = false
      }, 2500)
    } else {
      errorMsg.value = 'Hubo un error.,'
      alertaError.value = true
      setTimeout(() => {
        alertaError.value = false
      }, 3000)
    }
    motivoConsulta.value = ''
    observaciones.value = ''
    tratamientos.forEach(tratamiento => {
          tratamiento.selected = false;
        })
  }
}


async function ObtenerTratamientos() {
  const response = await fetch(`http://127.0.0.1:8000/api-consultas/tratamientos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('jwt-token')}`
    }
  })
  const data = await response.json()
}

async function ObtenerListaDePacientes() {
  const response = await fetch('http://127.0.0.1:8000/api-pacientes/pacientes/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('jwt-token')}`
    }
  })
  const data = await response.json()
  pacientes.value = data
}


async function obtenerExpediente( id:number) {
  diagnosticoSeleccinadoId.value = id
  diagnosticoSeleccinado.value = true
  dniPaciente.value= pacientes.value[id].dni
 

  const url = 'http://127.0.0.1:8000/api-consultas/expediente/?dniPaciente=' + dniPaciente.value;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('jwt-token')}`
    }
  }
  )
  const data = await response.json()
  expedienteSeleccionado.value=data
  pacienteSeleccionado.value= expedienteSeleccionado.value.paciente
  consultasPaciente.value= expedienteSeleccionado.value.consultas
  console.log("consultas",consultasPaciente.value)


}


onBeforeMount(() => {
  ObtenerListaDePacientes()
  ObtenerTratamientos()
})
</script>

<template>
  <!-- component -->
  <div
    v-if="!crearConsulta"
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
      class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-2 pt-3 rounded-bl-lg rounded-br-lg"
    >
      <table class="min-w-full">
        <thead>
          <tr>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#187897] tracking-wider"
            >
              #ID
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#187897] tracking-wider"
            >
              Nombre
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#187897] tracking-wider"
            >
              Correo
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#187897] tracking-wider"
            >
              Nacimiento
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#187897] tracking-wider"
            >
              DNI
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#187897] tracking-wider"
            >
              Teléfono
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#187897] tracking-wider">Acciones</th>
          
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(patient, index) in pacientes" :key="index">
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="text-sm leading-5 text-blue-900">{{ index +1 }}</div>
            </td>
            
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="flex items-center">
                <div>
                  <div class="text-sm leading-5 text-blue-900">{{ patient.primer_nombre }} {{ patient.primer_apellido }}</div>
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
              {{ patient.dni }}
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"
            >
              {{ patient.telefono }}
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap text-right border-b flex flex-col gap-2 border-gray-500 text-sm "
            >
              <button
                @click="ComenzarConsulta(patient.primer_nombre, patient.primer_apellido, index+1 )"
                class="group relative h-10 w-36 overflow-hidden hover:scale rounded-2xl bg-[#187897] text-sm font-bold text-white"
              >
            Iniciar consulta
            <div class="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

            
              </button>
              <button
                @click="obtenerExpediente(index)"
                class="group relative h-10 w-36 overflow-hidden hover:shadow-lg rounded-2xl bg-[#187897] text-sm font-bold text-white"
              >
                Ver expediente
                <div class="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
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

  <section v-if="crearConsulta" class="flex items-center justify-center">
    <div class="mx-auto w-full max-w-[550px]">
      <button
        @click="crearConsulta = false"
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
      <h1 class="font-bold my-5 text-xl">Paciente: {{pacienteConsulta}}</h1>
      <form @submit.prevent="GuardarConsulta()">
        <div class="mb-5">
          <label for="message" class="mb-3 block text-base font-medium text-[#07074D]">
            Motivo de la consulta
          </label>
          <textarea
            rows="4"
            name="message"
            id="message"
            placeholder=""
            v-model="motivoConsulta"
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
            v-model="observaciones"
            class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#187897] focus:shadow-md"
          ></textarea>
        </div>
        <div class="inline mx-2" v-for="(tratamiento, index) in tratamientos" :key="index">
          <input type="checkbox" :id="'myCheckbox' + (index + 1)" class="form-checkbox h-5 w-5 text-indigo-600" v-model="tratamiento.selected">
          <label :for="'myCheckbox' + (index + 1)" class="ml-2 text-gray-700">{{ tratamiento.nombre }}</label>
      </div>

        <div>
          <button
            class="hover:shadow-form rounded-2xl mt-5 bg-[#187897] py-2 px-8 text-center text-base font-semibold text-white outline-none"
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
        <span class="font-medium">¡Consulta agregada!</span>
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
  </section>

  <!-- vista de expediente -->
  <div
    v-if="diagnosticoSeleccinado"
    class="fixed left-0 top-0 ml-20 flex h-full w-full items-center justify-center bg-slate-200 bg-opacity-50 py-10"
  >
    <div class="bg-white">
      <button
        @click="diagnosticoSeleccinado = false"
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
              <span class="text-gray-600 mt-1 text-xs">{{pacienteSeleccionado.primer_nombre}} {{pacienteSeleccionado.primer_apellido}}</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Nacimiento:</span>
              <span class="text-gray-600 mt-1 text-xs">{{pacienteSeleccionado.fecha_nacimiento}}</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">DNI:</span>
              <span class="text-gray-600 mt-1 text-xs ">{{pacienteSeleccionado.dni}}</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Teléfono:</span>
              <span class="text-gray-600 mt-1 text-xs">{{pacienteSeleccionado.telefono}}</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Correo:</span>
              <span class="text-gray-600 mt-1 text-xs">{{pacienteSeleccionado.correo}}</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Direccion:</span>
              <span class="text-gray-600 mt-1 text-xs">{{pacienteSeleccionado.direccion}}</span>
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
                    <th scope="col" class="text-sm  font-bold text-gray-900 px-6 py-4 text-left">
                      
                    </th>
                    <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left w-10">
                      
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                  v-for="(consulta, index) in consultasPaciente" :key="index"
                  :class="['', index%2 ==0  ? 'bg-[#dedfe01c]' : 'bg-[#00609c10]']"
                   class="bg-gray-100 border-b">
                    <td class="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {{consulta.fecha}}
                    </td>
                    <td class="text-xs leading-6 line-clamp-2 mx-3 text-gray-900 text-ellipsis w-[10rem]">
                      {{consulta.descripcion}}
                    </td>
                    
                    <td class="whitespace-no-wrap text-right border-gray-500 text-sm leading-5">
                      <button
                        @click=" verDetalleConsulta(index)"
                        class="group relative h-8 w-20 overflow-hidden hover:shadow-lg rounded-2xl bg-[#187897] text-sm font-bold text-white"
                      >
                        Detalles
                        <div class="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
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
    v-if="facturaSeleccionada"
    class="fixed left-0 top-0 flex h-full ml-10 w-full items-center justify-center bg-slate-200 bg-opacity-50 p-10"
  >
    <div class="bg-white p-5">
      <button
        @click="facturaSeleccionada = false"
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
          <h4 class="text-xl text-gray-900 font-bold">Detalle de consulta</h4>
          <ul class="mt-2 text-gray-700">
            <li class="flex border-y py-2">
              <span class="font-bold w-24">Paciente:</span>
              <span class="text-gray-700">{{consultaPaciente.paciente}}</span>
            </li>


            <li class="flex border-b py-2">
              <span class="font-bold w-24">Expediente:</span>
              <span class="text-gray-700">{{consultaPaciente.expediente_id}}</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Motivo:</span>
              <span class="text-gray-700 leading-6 line-clamp-2 mx-3 text-ellipsis w-[20rem]">{{consultaPaciente.motivo_consulta}}</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Doctor:</span>
              <span class="text-gray-700">{{consultaPaciente.doctor}}</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Descripcion:</span>
              <span class="text-gray-700  leading-6  mx-3 text-ellipsis w-[20rem]">{{consultaPaciente.descripcion}}</span>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24 mr-5">Tratamientos:</span>
              <span v-for="(tratamiento,index) in consultaPaciente.tratamientos" :key="index"
               class="relative inline-block px-3 py-1 font-semibold leading-tight">
                <span
                  aria-hidden
                  class="absolute inset-0 bg-[#187897] opacity-20 rounded-full"
                ></span>
                <span class="relative text-xs">{{tratamiento.tratamiento}}</span> </span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

