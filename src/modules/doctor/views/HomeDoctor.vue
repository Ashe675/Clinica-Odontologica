<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import PatientsList from "@/modules/doctor/components/PatientsList.vue";
import NavBar from "@/modules/shared/components/NavBar.vue";
import SideBar from "@/modules/shared/components/SideBar.vue";
import Profile from "@/modules/shared/components/Profile.vue"

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

const selectedOption = ref("consulta");
const userRole='D'

function updateSelectedOption(value: string){
selectedOption.value= value
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
            :defaultOption='consulta'
            />
            <div
                class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
                id="sidebarBackdrop"
            ></div>
            <div id="main-content" class="h-full w-full relative lg:ml-64">
                <main class="bg-white p-5">
                    <div
                    v-if="selectedOption === 'consulta' "
                        class="p-0 sm:p-6 xl:p-8 h-full overflow-y-auto"
                    >
                    <PatientsList/>

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
