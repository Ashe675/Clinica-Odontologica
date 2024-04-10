<script setup lang="ts">
import { ref } from "vue";
import PatientsList from "@/modules/doctor/components/PatientsList.vue";
import NavBar from "@/modules/shared/components/NavBar.vue";
import SideBar from "@/modules/shared/components/SideBar.vue";
import PatientsDiagnosticList from "../components/PatientsDiagnosticList.vue";


interface UserResponse {
    firstName: string;
    lastName: string;
}

const userData = ref<UserResponse>({
    firstName: "",
    lastName: "",
});

const selectedOption = ref("cosulta");
const userRole='D'

function updateSelectedOption(value: string){
selectedOption.value= value
}

</script>

<template>
    <div class="overflow-hidden">
        <NavBar
        :firstName="userData.firstName"
        :lastName="userData.lastName"
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
                        v-if="selectedOption === 'expedientes'"
                        class="p-0 sm:p-6 xl:p-8 h-full overflow-y-auto"
                    >
                    <PatientsDiagnosticList/>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>
