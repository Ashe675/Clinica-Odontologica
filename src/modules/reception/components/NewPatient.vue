<template>
    <!-- component -->
    <div class="flex items-center justify-center p-0">
        <div class="mx-auto w-full max-w-[550px]">
            <form action="https://formbold.com/s/FORM_ID" method="POST">
                <div class="-mx-3 flex flex-wrap">
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                            <label
                                for="fName"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Nombres
                            </label>
                            <input
                                type="text"
                                name="fName"
                                id="fName"
                                placeholder="First Name"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                            <label
                                for="lName"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Apellidos
                            </label>
                            <input
                                type="text"
                                name="lName"
                                id="lName"
                                placeholder="Last Name"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>
                </div>
                <div class="-mx-3 flex flex-wrap">
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                            <label
                                for="date"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Fecha de nacimiento
                            </label>
                            <input
                                type="date"
                                name="date"
                                id="date"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                            <label
                                for="lName"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                DNI
                            </label>
                            <input
                                type="text"
                                name="dni"
                                id="dni"
                                placeholder="0000-0000-00000"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>
                </div>

                <div class="-mx-3 flex flex-wrap">
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                            <label
                                for="fName"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Correo
                            </label>
                            <input
                                type="text"
                                name="fName"
                                id="fName"
                                placeholder="First Name"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                            <label
                                for="lName"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Direccion
                            </label>
                            <input
                                type="text"
                                name="lName"
                                id="lName"
                                placeholder="Last Name"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>
                </div>

                <div class="mb-5">
        <label class="mb-3 block text-base font-medium text-[#07074D]">
          Genero
        </label>
        <div class="flex items-center space-x-6">
          <div class="flex items-center">
            <input
              type="radio"
              name="radio1"
              id="radioButton1"
              class="h-5 w-5"
            />
            <label
              for="radioButton1"
              class="pl-3 text-base font-md text-[#07074D]"
            >
              Masculino
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="radio"
              name="radio1"
              id="radioButton2"
              class="h-5 w-5"
            />
            <label
              for="radioButton2"
              class="pl-3 text-base font-md text-[#07074D]"
            >
              Femenino
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="radio"
              name="radio1"
              id="radioButton2"
              class="h-5 w-5"
            />
            <label
              for="radioButton2"
              class="pl-3 text-base font-md text-[#07074D]"
            >
              Otro
            </label>
          </div>
        </div>
      </div>

                <div>
                    <button
                        class="hover:shadow-form rounded-2xl bg-[#187897] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
