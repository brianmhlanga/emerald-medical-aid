<template>
    <NuxtLayout name="default">
        <div class="block-content">
        <div class="">
            <div class="flex">
                <div class="surface-section w-full md:w-6 p-6 md:p-8">
                    <div class="mb-5">
                        <img src="https://blocks.primevue.org//images/blocks/logos/hyper.svg" alt="Image" height="50" class="mb-3">
                        <div class="text-900 text-3xl font-medium mb-3">Welcome To Mfundo</div>
                        <span class="text-600 font-medium mr-2">Already have an account?</span>
                        <a @click="navigateTo('/login')" class="font-medium no-underline text-blue-500 cursor-pointer">Sign In!</a>
                    </div>
                    <div class="flex">
                        <div class="col-6 mb-3">
                        <label for="firstName" class="block text-900 font-medium mb-2">First Name</label>
                        <input v-model="first_name" class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" id="firstName" type="text" placeholder="First Name">
                        </div>
                        <div class="col-6 mb-3">
                        <label for="lastName" class="block text-900 font-medium mb-2">Last Name</label>
                        <input v-model="last_name" class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" id="lastName" type="text" placeholder="Last Name">
                        </div>
                    </div>
                    <div class="flex">
                        <div class="col-6 mb-3">
                        <label for="firstName" class="block text-900 font-medium mb-2">Date of Birth</label>
                        <Calendar v-model="date_of_birth" class="mydate" showIcon iconDisplay="input" />
                        </div>
                        <div class="col-6 mb-3">
                        <label for="lastName" class="block text-900 font-medium mb-2">Country</label>
                        <DropDown v-model="selectedCountry" :options="countries" filter optionLabel="name" placeholder="Select a Country" class="w-full">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                    <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
                                    <div>{{ slotProps.value.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </Dropdown>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="col-6 mb-3">
                        <label for="firstName" class="block text-900 font-medium mb-2">School/Institution Name</label>
                        <input v-model="school" class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root"  type="text" placeholder="School/Institution Name">
                        </div>
                        <div class="col-6 mb-3">
                        <label for="lastName" class="block text-900 font-medium mb-2">Grade/Class</label>
                        <input v-model="grade" class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root"  type="text" placeholder="Grade/Class">
                        </div>
                    </div>
                    <div class="flex">
                        <div class="col-6 mb-3">
                        <label for="firstName" class="block text-900 font-medium mb-2">Email</label>
                        <input v-model="email" class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root"  type="email" placeholder="Email Address">
                        </div>
                        <div class="col-6 mb-3">
                        <label for="lastName" class="block text-900 font-medium mb-2">Phone Number</label>
                        <input v-model="phone" class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root"  type="text" placeholder="Phone Number">
                        </div>
                        
                    </div>
                    <div class="flex">
                        <div class="col-6 mb-3">
                        <label for="lastName" class="block text-900 font-medium mb-2">Password</label>
                        <input v-model="password" class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" id="lastName" type="password" placeholder="Password">
                        </div>
                        <div class="col-6 mb-3">
                        <label for="lastName" class="block text-900 font-medium mb-2">Confirm Password</label>
                        <input v-model="confirm_password" class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" id="lastName" type="text" placeholder="Phone Number">
                        </div>
                    </div>
                    
                    <button @click="signUp" class="p-button p-component w-full p-3" type="button" aria-label="Sign In" data-pc-name="button" data-pc-section="root" data-pd-ripple="true">
                        <span class="p-button-icon p-button-icon-left pi pi-user" data-pc-section="icon"></span>
                        <span class="p-button-label" data-pc-section="label">Sign Up</span>
                        <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
                    </button>
                </div>

            <div class="hidden md:block w-6 bg-no-repeat bg-cover" style="background-image: url(&quot;/images/little-girl-with-colorful-books-table.jpg&quot;);"></div>
            </div>
        </div>
        </div>
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore()
const toast = useToast()
import countriesData from '~/json/countries.json';
const selectedCountry = ref();
const first_name = ref()
const last_name = ref()
const date_of_birth = ref()
const school = ref()
const grade = ref()
const email = ref()
const phone = ref()
const password = ref()
const confirm_password = ref()
const countries = ref([]);
onMounted(() => {
  countries.value = countriesData;
});

const signUp = async () => {
    let data = {
       first_name: first_name.value,
       last_name: last_name.value,
       date_of_birth: date_of_birth.value,
       country: selectedCountry.value,
       school: school.value,
       grade: grade.value,
       email: email.value,
       phone: phone.value,
       password: password.value,
       confirm_password: confirm_password
    }
    let result = await authStore.register(data).then((data) => {
        console.log(data)
        if (data?.data?.success) {
            toast.add({severity:'info', summary: 'Success', detail: "Succesfully Registred", life: 6000});
            navigateTo('/login')
        }
        else {
                toast.add({severity:'warn', summary: 'Registration failed', detail: "Failed to Register", life: 6000});
        }
    })
}
</script>
<style>
.surface-section.w-full.md\:w-6.p-6.md\:p-8 {
    height: 100vh;
}
.p-input-icon-right > .p-inputtext {
    padding-right: 2.5rem;
    width: 100%;
    height: 50px;
}
.p-input-icon-right > .p-inputtext {
    padding-right: 2.5rem;
    width: 515px;
}
input.p-inputtext.p-component {
    width: 100% !important;
}
.p-input-icon-right > .p-inputtext {
    padding-right: 218px !important;
}
</style>