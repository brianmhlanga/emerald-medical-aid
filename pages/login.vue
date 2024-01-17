<template>
    <NuxtLayout name="default">
        <div class="block-content">
        <div class="surface-ground px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center">
            <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
            <div class="text-center mb-5">
                <img src="/images/blocks/logos/hyper.svg" alt="Image" height="50" class="mb-3">
                <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                <span class="text-600 font-medium line-height-3">Don't have an account?</span>
                <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
            </div>
            <div>
                <label for="email1" class="block text-900 font-medium mb-2">Email</label>
                <input v-model="email" class="p-inputtext p-component w-full mb-3" data-pc-name="inputtext" data-pc-section="root" id="email1" type="text" placeholder="Email address">
                <label for="password1" class="block text-900 font-medium mb-2">Password</label>
                <input v-model="password" class="p-inputtext p-component w-full mb-3" data-pc-name="inputtext" data-pc-section="root" id="password1" type="password" placehoder="Password">
                <div class="flex align-items-center justify-content-between mb-6">
              
                <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
                </div>
                <button @click="signIn" class="p-button p-component w-full" type="button" aria-label="Sign In" data-pc-name="button" data-pc-section="root" data-pd-ripple="true">
                <span class="p-button-icon p-button-icon-left pi pi-user" data-pc-section="icon"></span>
                <span class="p-button-label" data-pc-section="label">Sign In</span>
                <!---->
                <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
                </button>
            </div>
            </div>
        </div>
        <!---->
        </div>
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore()
const toast = useToast()
const email = ref()
const password = ref()
definePageMeta({
        middleware: ["not-auth"]
});

const signIn = async () => {
    let data = {
       email: email.value,
       password: password.value
    }
    let result = await authStore.login(data).then((data) => {
        console.log(data)
        if (data?.data?.success) {
            toast.add({severity:'info', summary: 'Success', detail: "Succesfully Login", life: 6000});
            navigateTo('/')
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