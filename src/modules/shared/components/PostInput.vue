<script lang="ts" setup>
import { ref } from "vue";

interface Props{
    userId: String,
    update1: Function,
    update2: Function

}

const props= defineProps<Props>()
        
const title = ref("");
const errorMsg = ref("");
const content = ref("");
const successAlert = ref(false);
const errorAlert = ref(false);
        
async function addEntry() {
    if (title.value.length == 0 || content.value.length == 0) {
        errorMsg.value = "Fill in all fields";
        errorAlert.value = true;
        setTimeout(() => {
            errorAlert.value = false;
        }, 3000);
        return;
    }
    const response = await fetch("http://localhost:8080/entry/new", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        body: JSON.stringify({
            title: title.value,
            content: content.value,
            user_id: props.userId,
        }),
    });
    const data: { message?: string; token?: string } = await response.json();
    if (data.message) {
        errorMsg.value = data.message;
        errorAlert.value = true;
        setTimeout(() => {
            errorAlert.value = false;
        }, 4000);
    } else {
        successAlert.value = true;
        props.update1()
        props.update2()
        setTimeout(() => {
            successAlert.value = false;
        }, 4000);
    }
    title.value = "";
    content.value = "";
    errorMsg.value = "";
}

</script>

<template>
    <div>
        <form @submit.prevent="addEntry()">
                            <div
                                class="heading text-center font-bold text-2xl m-5 text-gray-800"
                            >
                                New Entry
                            </div>
                            <div
                                class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
                            >
                                <input
                                    class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                                    spellcheck="false"
                                    placeholder="Title"
                                    type="text"
                                    id="title"
                                    v-model="title"
                                />
                                <textarea
                                    class="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
                                    spellcheck="false"
                                    placeholder="Add the content of your entry"
                                    v-model="content"
                                    id="content"
                                ></textarea>

                                <!-- buttons -->
                                <div class="buttons flex m-4">
                                    <button
                                        class="ml-auto btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 rounded-sx bg-indigo-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div class="flex justify-center">
                            <div
                                v-if="successAlert"
                                class="flex w-52 bg-green-100 rounded-lg p-4 mb-4 text-lg justify-center align-middle text-green-700"
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
                                    <span class="font-medium"
                                        >Entry added!</span
                                    >
                                </div>
                            </div>
                            <div
                                v-if="errorAlert"
                                class="flex bg-red-100 rounded-lg p-4 mb-4 text-lg text-red-700"
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
                                    <span class="font-medium">{{
                                        errorMsg
                                    }}</span>
                                    Try again.
                                </div>
                            </div>
                        </div>
    </div>
</template>