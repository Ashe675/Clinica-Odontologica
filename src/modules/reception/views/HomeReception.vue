<script setup lang="ts">
import NavBar from "@/modules/shared/components/NavBar.vue";
import { onBeforeMount, ref, onUpdated } from "vue";
import PatientsRecordList from "../components/PatientsRecordList.vue";
import NewPatient from "../components/NewPatient.vue";
import SideBar from "@/modules/shared/components/SideBar.vue";
import Profile from "@/modules/shared/components/Profile.vue";

const userRole='R'


const selectedOption = ref("expedientes");

function updateSelectedOption(value: string){
selectedOption.value= value

}

const usuario = ref('')

async function ObtenerUsuario() {
  const response = await fetch(`http://127.0.0.1:8000/usuarios/profile/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('jwt-token')}`
    }
  })
  const data = await response.json()
  usuario.value=data.username

  console.log(data)
}


onBeforeMount(() => {
    ObtenerUsuario()
})

</script>

<template>
    <div class="overflow-hidden">
        <NavBar
        :usuario="usuario"
        />
        <div class="flex overflow-hidden bg-gray-50 pt-16">
            <SideBar
            @NewValue="updateSelectedOption"
            :role="userRole"
            :defaultOption="expedientes"
            />
            <div
                class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
                id="sidebarBackdrop"
            ></div>
            <div id="main-content" class="h-full w-full relative lg:ml-64">
                <main class="bg-white p-5">
                    <div
                        v-if="selectedOption === 'expedientes'"
                        class="p-0 sm:p-6 xl:p-8 h-full overflow-y-auto"
                    >
                    <PatientsRecordList/>
                    </div>
                    <div
                        v-if="selectedOption === 'registrar-paciente'"
                        class="p-0 sm:p-6 xl:p-8 h-full overflow-y-auto"
                    >
                    <NewPatient/>
                    </div>
                    <div
                        v-if="selectedOption === 'perfil'"
                        class="p-0 sm:p-6 xl:p-8 h-full overflow-y-auto"
                    >
                    <Profile/>
                    </div>
                
                </main>
            </div>
        </div>
    </div>
</template>
