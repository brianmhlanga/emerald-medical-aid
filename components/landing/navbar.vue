<template>
    <div class="surface-overlay shadow-2 flex relative lg:static align-items-center lg:align-items-stretch" style="min-height: 5rem;">
    <div class="bg-indigo-500 inline-flex justify-content-center align-items-center" style="width: 5rem; height: 5rem;">
        <img src="https://blocks.primevue.org/images/blocks/logos/hyper-light.svg" alt="Image" height="50">
    </div>
    <a class="cursor-pointer block lg:hidden text-700 mr-6 mt-1 ml-auto p-ripple" data-pd-ripple="true" data-pd-styleclass="true">
        <i class="pi pi-bars text-4xl"></i>
        <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
    </a>
    <div class="flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full surface-overlay left-0 top-100 px-0 pt-3 lg:pt-0 z-1 shadow-2 lg:shadow-none">
        <ul class="list-none p-0 m-0 flex text-900 select-none flex-column lg:flex-row cursor-pointer">
        <li class="relative">
            <a class="flex px-6 lg:px-5 py-3 lg:py-0 h-full align-items-center hover:surface-50 font-medium transition-colors transition-duration-150 p-ripple" data-pd-ripple="true" data-pd-styleclass="true">
            <span>Products</span>
            <i class="pi pi-chevron-down ml-auto lg:ml-3"></i>
            <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
            </a>
            <ul class="list-none m-0 px-5 lg:p-0 py-0 border-round shadow-0 lg:shadow-2 lg:absolute surface-overlay hidden origin-top w-full lg:w-15rem">
            <li>
                <a class="flex p-3 align-items-center hover:surface-50 transition-colors transition-duration-150 p-ripple" data-pd-ripple="true">
                <i class="pi pi-list text-2xl mr-2 text-blue-600"></i>
                <span>Features</span>
                <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
                </a>
            </li>
            <li>
                <a class="flex p-3 align-items-center hover:surface-50 transition-colors transition-duration-150 p-ripple" data-pd-ripple="true">
                <i class="pi pi-shield text-2xl mr-2 text-blue-600"></i>
                <span>Solutions</span>
                <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
                </a>
            </li>
            <li>
                <a class="flex p-3 align-items-center hover:surface-50 transition-colors transition-duration-150 p-ripple" data-pd-ripple="true">
                <i class="pi pi-users text-2xl mr-2 text-blue-600"></i>
                <span>Customers</span>
                <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
                </a>
            </li>
            <li class="relative">
                <a class="flex p-3 align-items-center hover:surface-50 transition-colors transition-duration-150 p-ripple" data-pd-ripple="true" data-pd-styleclass="true">
                <i class="pi pi-question-circle text-2xl mr-2 text-blue-600"></i>
                <span>Support</span>
                <i class="pi pi-chevron-down ml-auto lg:-rotate-90"></i>
                <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
                </a>
                <ul class="list-none py-3 pl-3 pr-0 m-0 lg:px-0 lg:py-0 border-round shadow-0 lg:shadow-2 lg:absolute surface-overlay hidden origin-top w-full lg:w-15rem cursor-pointer left-100 top-0">
                <li>
                    <a class="flex p-3 align-items-center hover:surface-50 transition-colors transition-duration-150 p-ripple" data-pd-ripple="true">
                    <i class="pi pi-cloud mr-2"></i>
                    <span class="font-medium">Help Center</span>
                    <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
                    </a>
                </li>
                <li class="relative">
                    <a class="flex p-3 align-items-center hover:surface-50 transition-colors transition-duration-150 p-ripple" data-pd-ripple="true">
                    <i class="pi pi-question-circle mr-2"></i>
                    <span class="font-medium">Faq</span>
                    <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
                    </a>
                </li>
                </ul>
            </li>
            </ul>
        </li>
        <li>
            <a class="flex px-6 lg:px-5 py-3 lg:py-0 h-full align-items-center hover:surface-50 font-medium transition-colors transition-duration-150 p-ripple" data-pd-ripple="true">
            <span>Corporate</span>
            <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
            </a>
        </li>
        <li>
            <a class="flex px-6 lg:px-5 py-3 lg:py-0 h-full align-items-center hover:surface-50 font-medium transition-colors transition-duration-150 p-ripple" data-pd-ripple="true">
            <span>Resources</span>
            <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
            </a>
        </li>
        <li>
            <a class="flex px-6 lg:px-5 py-3 lg:py-0 h-full align-items-center hover:surface-50 font-medium transition-colors transition-duration-150 p-ripple" data-pd-ripple="true">
            <span>Pricing</span>
            <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
            </a>
        </li>
        </ul>
        <div v-if="first_name" class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 px-6 lg:px-0 mt-3 lg:mt-0">
        <button  class="p-button p-component p-button-text font-bold h-full" type="button" aria-label="Login" data-pc-name="button" data-pc-section="root" data-pd-ripple="true" style="border-radius: 0px;">
            <!---->
            <span class="p-button-label" data-pc-section="label">Hi, {{first_name}} {{ last_name }} </span>
            <!---->
            <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
        </button>
        <button v-if="profile === 'ADMIN'" @click="navigateTo('/admin/dashboard')" class="p-button p-component ml-3 font-bold h-full" type="button" aria-label="Register" data-pc-name="button" data-pc-section="root" data-pd-ripple="true" style="border-radius: 0px;">
            <!---->
            <span class="p-button-label" data-pc-section="label">Admin Dashboard</span>
            <!---->
            <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
        </button>
        <button @click="logOut" class="p-button p-component ml-3 font-bold h-full" type="button" aria-label="Register" data-pc-name="button" data-pc-section="root" data-pd-ripple="true" style="border-radius: 0px;">
            <!---->
            <span class="p-button-label" data-pc-section="label">Log Out</span>
            <!---->
            <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
        </button>
        </div>
        <div v-else class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 px-6 lg:px-0 mt-3 lg:mt-0">
        <button @click="navigateTo('/login')" class="p-button p-component p-button-text font-bold h-full" type="button" aria-label="Login" data-pc-name="button" data-pc-section="root" data-pd-ripple="true" style="border-radius: 0px;">
            <!---->
            <span class="p-button-label" data-pc-section="label">Login</span>
            <!---->
            <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
        </button>
        <button @click="navigateTo('/register')" class="p-button p-component ml-3 font-bold h-full" type="button" aria-label="Register" data-pc-name="button" data-pc-section="root" data-pd-ripple="true" style="border-radius: 0px;">
            <!---->
            <span class="p-button-label" data-pc-section="label">Register</span>
            <!---->
            <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
        </button>
        </div>
    </div>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore()
//@ts-ignore
const { value: { first_name, last_name, profile, id }} = useCookie('user');
const logOut = async () => {
    let result = await authStore.logout()
}
</script>