<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { defineEmits, ref } from 'vue';

const selectedOption = ref("expedientes");

function updateSelectedOptionc(value: string) {
    selectedOption.value = value;
    emit('NewValue', value);
}

interface Emits{
    (event: 'NewValue', value: String): void
}

 const emit = defineEmits<Emits>()

interface Props{
    role: String,
    defaultOption: String
}

const props= defineProps<Props>()

async function logOut() {
    localStorage.removeItem("jwt-token");
    router.push('/')
    //window.location.reload();

}

</script>

<template>
    <aside
        id="sidebar"
        class="fixed z-20 h-full  top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
        aria-label="Sidebar"
    >
        <div
            class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0"
        >
            <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto ">
                <div class="flex-1 px-3 bg-white divide-y space-y-1 ">
                    <ul class="space-y-2 ml-4 pb-2">
                        <li v-if="props.role=='D'">
                            <a
                                href="#"
                                target="_blank"
                                @click.prevent= "updateSelectedOptionc('consulta')"
                                :class="['text-base text-gray-900 font-normal rounded-lg hover:scale-105 flex items-center p-2 group', selectedOption == 'consulta' || props.defaultOption=='consulta' ? 'bg-[#00609c1c]' : '']"
                            >
                                <svg
                                    class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="Layer_1"
                                    data-name="Layer 1"
                                    viewBox="0 0 24 24"
                                    width="512"
                                    height="512"
                                >
                                    <path
                                        d="M22.2,2.163a4.992,4.992,0,0,0-4.1-1.081l-3.822.694A4,4,0,0,0,12,3.065,4,4,0,0,0,9.716,1.776L5.9,1.082A5,5,0,0,0,0,6V16.793a5,5,0,0,0,4.105,4.919l6.286,1.143a9,9,0,0,0,3.218,0L19.9,21.712A5,5,0,0,0,24,16.793V6A4.983,4.983,0,0,0,22.2,2.163ZM11,20.928c-.084-.012-.168-.026-.252-.041L4.463,19.745A3,3,0,0,1,2,16.793V6A3,3,0,0,1,5,3a3.081,3.081,0,0,1,.54.049l3.82.7A2,2,0,0,1,11,5.712Zm11-4.135a3,3,0,0,1-2.463,2.952l-6.285,1.142c-.084.015-.168.029-.252.041V5.712a2,2,0,0,1,1.642-1.968l3.821-.7A3,3,0,0,1,22,6Z"
                                    />
                                </svg>
                                <span class="ml-3 flex-1 whitespace-nowrap"
                                    >Consulta</span
                                >
                            </a>
                        </li>
                        <li  v-if="props.role=='R' ">
                            <a
                                href="#"
                                target="_blank"
                                @click.prevent= "updateSelectedOptionc('expedientes')"
                                :class="['text-base text-gray-900 font-normal rounded-lg hover:scale-105  flex items-center p-2 group', selectedOption == 'expedientes' || props.defaultOption=='expedientes'? 'bg-[#00609c1c]' : '']"
                            >
                                <svg
                                    class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="Layer_1"
                                    data-name="Layer 1"
                                    viewBox="0 0 24 24"
                                    width="512"
                                    height="512"
                                >
                                    <path
                                        d="M22.2,2.163a4.992,4.992,0,0,0-4.1-1.081l-3.822.694A4,4,0,0,0,12,3.065,4,4,0,0,0,9.716,1.776L5.9,1.082A5,5,0,0,0,0,6V16.793a5,5,0,0,0,4.105,4.919l6.286,1.143a9,9,0,0,0,3.218,0L19.9,21.712A5,5,0,0,0,24,16.793V6A4.983,4.983,0,0,0,22.2,2.163ZM11,20.928c-.084-.012-.168-.026-.252-.041L4.463,19.745A3,3,0,0,1,2,16.793V6A3,3,0,0,1,5,3a3.081,3.081,0,0,1,.54.049l3.82.7A2,2,0,0,1,11,5.712Zm11-4.135a3,3,0,0,1-2.463,2.952l-6.285,1.142c-.084.015-.168.029-.252.041V5.712a2,2,0,0,1,1.642-1.968l3.821-.7A3,3,0,0,1,22,6Z"
                                    />
                                </svg>
                                <span class="ml-3 flex-1 whitespace-nowrap"
                                    >Expedientes</span
                                >
                            </a>
                        </li>
                            
                        <li v-if="props.role=='R'">
                            <a
                                href="#"
                                target="_blank"
                                @click.prevent="updateSelectedOptionc('registrar-paciente')"
                                :class="['text-base text-gray-900 font-normal rounded-lg hover:scale-105 flex items-center p-2 group', selectedOption == 'registrar-paciente' ? 'bg-[#00609c1c]' : '']"

                            >
                                <svg
                                    class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="Outline"
                                    viewBox="0 0 24 24"
                                    width="512"
                                    height="512"
                                >
                                    <path
                                        d="M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z"
                                    />
                                    <path
                                        d="M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z"
                                    />
                                </svg>
                                <span class="ml-3 flex-1 whitespace-nowrap"
                                    >Registrar Paciente</span
                                >
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                @click.prevent="updateSelectedOptionc('perfil')"
                                :class="['text-base text-gray-900 font-normal rounded-lg hover:scale-105 flex items-center p-2 group', selectedOption == 'perfil' ? 'bg-[#00609c1c]' : '']"

                            >
                            <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="-ml-1">
                                <g clip-path="url(#clip0_15_82)">
                                <rect width="24" height="24" fill="none"/>
                                <g filter="url(#filter0_d_15_82)">
                                <path d="M14.3365 12.3466L14.0765 11.9195C13.9082 12.022 13.8158 12.2137 13.8405 12.4092C13.8651 12.6046 14.0022 12.7674 14.1907 12.8249L14.3365 12.3466ZM9.6634 12.3466L9.80923 12.8249C9.99769 12.7674 10.1348 12.6046 10.1595 12.4092C10.1841 12.2137 10.0917 12.022 9.92339 11.9195L9.6634 12.3466ZM4.06161 19.002L3.56544 18.9402L4.06161 19.002ZM19.9383 19.002L20.4345 18.9402L19.9383 19.002ZM16 8.5C16 9.94799 15.2309 11.2168 14.0765 11.9195L14.5965 12.7737C16.0365 11.8971 17 10.3113 17 8.5H16ZM12 4.5C14.2091 4.5 16 6.29086 16 8.5H17C17 5.73858 14.7614 3.5 12 3.5V4.5ZM7.99996 8.5C7.99996 6.29086 9.79082 4.5 12 4.5V3.5C9.23854 3.5 6.99996 5.73858 6.99996 8.5H7.99996ZM9.92339 11.9195C8.76904 11.2168 7.99996 9.948 7.99996 8.5H6.99996C6.99996 10.3113 7.96342 11.8971 9.40342 12.7737L9.92339 11.9195ZM9.51758 11.8683C6.36083 12.8309 3.98356 15.5804 3.56544 18.9402L4.55778 19.0637C4.92638 16.1018 7.02381 13.6742 9.80923 12.8249L9.51758 11.8683ZM3.56544 18.9402C3.45493 19.8282 4.19055 20.5 4.99996 20.5V19.5C4.70481 19.5 4.53188 19.2719 4.55778 19.0637L3.56544 18.9402ZM4.99996 20.5H19V19.5H4.99996V20.5ZM19 20.5C19.8094 20.5 20.545 19.8282 20.4345 18.9402L19.4421 19.0637C19.468 19.2719 19.2951 19.5 19 19.5V20.5ZM20.4345 18.9402C20.0164 15.5804 17.6391 12.8309 14.4823 11.8683L14.1907 12.8249C16.9761 13.6742 19.0735 16.1018 19.4421 19.0637L20.4345 18.9402Z" fill="#000000"/>
                                </g>
                                </g>
                                <defs>
                                <filter id="filter0_d_15_82" x="2.55444" y="3.5" width="18.8911" height="19" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="1"/>
                                <feGaussianBlur stdDeviation="0.5"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_82"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_82" result="shape"/>
                                </filter>
                                <clipPath id="clip0_15_82">
                                <rect width="24" height="24" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                                <span class="ml-3 flex-1 whitespace-nowrap"
                                    >Perfil</span
                                >
                            </a>
                        </li>
                        <div
                            @click="logOut"
                            class='text-base text-gray-900 font-normal rounded-lg hover:scale-105 flex items-center p-2 group cursor-pointer'

                        >
                            <svg
                                class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75 "
                                xmlns="http://www.w3.org/2000/svg"
                                id="Layer_1"
                                data-name="Layer 1"
                                viewBox="0 0 24 24"
                                width="512"
                                height="512"
                            >
                                <path
                                    d="M22.763,10.232l-4.95-4.95L16.4,6.7,20.7,11H6.617v2H20.7l-4.3,4.3,1.414,1.414,4.95-4.95a2.5,2.5,0,0,0,0-3.536Z"
                                />
                                <path
                                    d="M10.476,21a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H9.476a1,1,0,0,1,1,1V8.333h2V3a3,3,0,0,0-3-3H3A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H9.476a3,3,0,0,0,3-3V15.667h-2Z"
                                />
                            </svg>
    
                            <span @click="logOut" class="ml-4">Cerrar Sesión</span>
                        </div>
                        <a
                            target="_blank"
                            class="text-base text-gray-900 cursor-pointer font-normal rounded-lg hover:scale-105 group transition duration-75 flex items-center p-2"
                        >
                            <svg
                                class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                xmlns="http://www.w3.org/2000/svg"
                                id="Outline"
                                viewBox="0 0 24 24"
                                width="512"
                                height="512"
                            >
                                <path
                                    d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"
                                />
                                <path
                                    d="M12,10H11a1,1,0,0,0,0,2h1v6a1,1,0,0,0,2,0V12A2,2,0,0,0,12,10Z"
                                />
                                <circle cx="12" cy="6.5" r="1.5" />
                            </svg>
    
                            <span class="ml-3">Ayuda</span>
                        </a>
                    </ul>
                    
                </div>
            </div>
        </div>
    </aside>
</template>
