<script setup lang="ts">
import NavBar from "@/modules/shared/components/NavBar.vue";
import { onBeforeMount, ref, onUpdated } from "vue";
import PatientsRecordList from "../components/PatientsRecordList.vue";
import NewPatient from "../components/NewPatient.vue";
import SideBar from "@/modules/shared/components/SideBar.vue";

const userRole='R'


interface UserResponse {
    ID: string;
    email: string;
    firstName: string;
    lastName: string;
}


const userData = ref<UserResponse>({
    ID: "",
    email: "",
    firstName: "",
    lastName: "",
});


const selectedOption = ref("expedientes");
//const userId = ref("");

function updateSelectedOption(value: string){
selectedOption.value= value

}

onBeforeMount(() => {
});

onUpdated(() => {

});
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
                
                </main>
            </div>
        </div>
    </div>
</template>
