<script lang="ts" setup>
import { ref } from "vue";

export interface UserResponse {
    ID: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface UserEntries {
    CreatedAt: string;
    ID: string;
    user_id: string;
    title: string;
    content: string;
}

interface Props {
    Entries: {
        type: () => UserEntries; 
        required: true;
    };
    User: {
        type: () => UserResponse;  
        required: true;
    };
    update1: Function;
    update2: Function;
}

const props= defineProps<Props>()
    
        const selectedEntry = ref("");
        const showModal = ref(false);

        async function deleteEntry(entryId: any) {
            const response = await fetch(
                `http://localhost:8080/entry/delete/${entryId}/`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "jwt-token",
                        )}`,
                    },
                },
            );

            if (response.ok) {
                props.update1()
                props.update2()
                selectedEntry.value = "";
                showModal.value = false;
            } else {
                console.error("Failed to delete entry");
            }
        }

</script>
<template>
    <div
    v-for="(entry, index) in Entries"
    :key="index"
     class="rounded-xl border p-5 shadow-md w-9/12 bg-white my-5">
        <div class="flex w-full items-center justify-between border-b pb-3">
            <div class="flex items-center space-x-3">
                <div
                    class="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"
                ></div>

                <div
                    v-if="User.ID == entry.user_id"
                    class="text-lg font-bold text-slate-700"
                >
                    {{ props.User.firstName }} {{ props.User.lastName }}
                </div>

                <div v-else class="text-lg font-bold text-slate-700">
                    User {{ User.ID }}
                </div>
            </div>
            <div class="flex items-center space-x-8">
                <button
                    class="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold"
                >
                    Public 
                </button>
            </div>
        </div>

        <div class="mt-4 mb-6">
            <div class="mb-3 text-xl font-bold">
                {{ entry.title }}
            </div>
            <div class="text-sm text-neutral-600">
                {{ entry.content }}
            </div>
        </div>
        <div>
            <div class="flex items-center justify-between text-slate-500">
                <div class="flex space-x-4 md:space-x-8"></div>
            </div>
        </div>

        <div v-if="entry.user_id == User.ID" id="actions" class="flex">
            <div
                class="flex cursor-pointer items-center transition hover:text-slate-600"
            >
                <svg
                    class="mx-2"
                    width="24px"
                    height="24px"
                    viewBox="0 -0.5 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z"
                        fill="#000000"
                    />
                </svg>
            </div>
            <div
                @click="(showModal = true), (selectedEntry = entry.ID)"
                id="delete"
                class="flex cursor-pointer items-center transition hover:text-slate-600"
            >
                <svg
                    width="17px"
                    height="17px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
        </div>
    </div>

    <div
        v-if="showModal"
        class="fixed inset-0 z-50 p-6 bg-black bg-opacity-50 rounded-lg text-left overflow-hidden shadow-xl transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
    >
        <div
            class="bg-white ml-auto mr-auto mt-40 w-96 px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
        >
            <!-- Modal content -->
            <div class="sm:flex sm:items-start">
                <div
                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                >
                    <svg
                        width="64px"
                        height="64px"
                        class="h-6 w-6 text-red-600"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24.00 24.00"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke-width="0.45600000000000007"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
                                fill="#ef4444"
                            ></path>
                            <path
                                d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                                fill="#ef4444"
                            ></path>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.2944 4.47643C9.36631 3.11493 10.5018 2.25 12 2.25C13.4981 2.25 14.6336 3.11493 15.7056 4.47643C16.7598 5.81544 17.8769 7.79622 19.3063 10.3305L19.7418 11.1027C20.9234 13.1976 21.8566 14.8523 22.3468 16.1804C22.8478 17.5376 22.9668 18.7699 22.209 19.8569C21.4736 20.9118 20.2466 21.3434 18.6991 21.5471C17.1576 21.75 15.0845 21.75 12.4248 21.75H11.5752C8.91552 21.75 6.84239 21.75 5.30082 21.5471C3.75331 21.3434 2.52637 20.9118 1.79099 19.8569C1.03318 18.7699 1.15218 17.5376 1.65314 16.1804C2.14334 14.8523 3.07658 13.1977 4.25818 11.1027L4.69361 10.3307C6.123 7.79629 7.24019 5.81547 8.2944 4.47643ZM9.47297 5.40432C8.49896 6.64148 7.43704 8.51988 5.96495 11.1299L5.60129 11.7747C4.37507 13.9488 3.50368 15.4986 3.06034 16.6998C2.6227 17.8855 2.68338 18.5141 3.02148 18.9991C3.38202 19.5163 4.05873 19.8706 5.49659 20.0599C6.92858 20.2484 8.9026 20.25 11.6363 20.25H12.3636C15.0974 20.25 17.0714 20.2484 18.5034 20.0599C19.9412 19.8706 20.6179 19.5163 20.9785 18.9991C21.3166 18.5141 21.3773 17.8855 20.9396 16.6998C20.4963 15.4986 19.6249 13.9488 18.3987 11.7747L18.035 11.1299C16.5629 8.51987 15.501 6.64148 14.527 5.40431C13.562 4.17865 12.8126 3.75 12 3.75C11.1874 3.75 10.4379 4.17865 9.47297 5.40432Z"
                                fill="#ef4444"
                            ></path>
                        </g>
                    </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                        class="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                    >
                        Delete Entry
                    </h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500">
                            Are you sure you want to delete
                            <span class="font-bold">this entry</span>? This
                            action cannot be undone.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="bg-gray-50 ml-auto mr-auto w-96 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
        >
            <button
                @click="deleteEntry(selectedEntry)"
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
                Delete
            </button>
            <button
                @click="showModal = false"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
                Cancel
            </button>
        </div>
    </div>
</template>
