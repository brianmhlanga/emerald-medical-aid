<template>
    <NuxtLayout name="auth">
        <div class="block-content">
            <div class="">
                <div class="flex">
                <div class="surface-section w-full md:w-6 p-6 md:p-8">
                    <div class="mb-5">
                    <img src="/images/logo.png" alt="Image" height="50" class="mb-3">
                    <div class="text-900 text-3xl font-medium mb-3">Welcome To Oacey Recruitment</div>
                    <span class="text-600 font-medium mr-2">Don't have an account?</span>
                    <a href="/e-recruitment/client-registration" class="font-medium no-underline text-blue-500 cursor-pointer">Create today!</a>
                    </div>
                    <div>
                    <form @submit.prevent="login" class="pt-3">
                    <label for="email2" class="block text-900 font-medium mb-2">Email</label>
                    <input v-model="email" class="p-inputtext p-component w-full mb-3 p-3" data-pc-name="inputtext" data-pc-section="root" id="email2" type="text" placeholder="Email address">
                    <label for="password2" class="block text-900 font-medium mb-2">Password</label>
                    <input v-model="password" class="p-inputtext p-component w-full mb-3 p-3" data-pc-name="inputtext" data-pc-section="root" id="password2" type="password" placeholder="Password">
                    <div class="flex align-items-center justify-content-between mb-6">
                        <div class="flex align-items-center">
                        <div class="p-checkbox p-component mr-2" data-pc-name="checkbox" data-pc-section="root" id="rememberme2">
                            <div class="p-hidden-accessible" data-pc-section="hiddeninputwrapper" data-p-hidden-accessible="true">
                            <input type="checkbox" data-pc-section="hiddeninput">
                            </div>
                            <div class="p-checkbox-box" data-pc-section="input" data-p-highlight="false" data-p-disabled="false" data-p-focused="false">
                            <!---->
                            </div>
                        </div>
                        <label for="rememberme2">Remember me</label>
                        </div>
                        <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
                    </div>
                    <Button icon="pi pi-user" class="p-button p-component w-full p-3" type="submit" label="SIGN IN" :loading="isLoading" />
                </form>
                    </div>
                </div>
                <div class="hidden md:block w-6 bg-no-repeat bg-cover" style="background-image: url(/images/rec.png);"></div>
                </div>
            </div>
            <!---->
            </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { storeToRefs } from "pinia";
    import {useToast}  from "primevue/usetoast";
    import { useAuthStore } from "~/stores/auth";

    definePageMeta({
        middleware: ["not-auth"]
    });

    const toast = useToast();
    const authStore = useAuthStore()
    const email = storeToRefs(authStore).loginEmail
    const password = storeToRefs(authStore).loginPassword
    // const employeeData = storeToRefs(authStore).employeeData
    // const employee_id = storeToRefs(authStore).employee_id
    const isLoading = ref(false);

    const goToRegister = async () => {

        navigateTo('/register')
        
    }

    const login = async ()=>{
        //Load animation
        isLoading.value = true;
        let result = await authStore.clientLogin()
            console.log("result rangu iri")
            console.log(result)

            //On login success
            if(result.data.success){
                //Get JWT token
                const token = result.data.token;
                navigateTo('/e-recruitment/client-dashboard')
                // window.location.href = "/";
            }else {
                isLoading.value = false;
                toast.add({severity:'warn', summary: 'Warning Message', detail: result.data.message, life: 6000});
            }
        
    }
</script>

<style>

.surface-card.p-4.shadow-2.border-round.w-full.lg\:w-6 {
  margin: auto;
  width: 35% !important;
} 
.surface-card.p-4.shadow-2.border-round.w-full.lg\:w-6 {
 margin: auto;
 width: 35% !important;
}
.form-group {
 margin: 15px;
}
.surface-card.p-4.border-round.w-full.lg\:w-6 {
 margin: auto;
 width: 35% !important;
}
button.p-button.p-component.bg-primary.btn.btn-bg.tryr.text-white {
 width: 100%;
 margin: auto !important;
 margin: 0px;
}
.rtyt {
 margin-bottom: 15px;
}
.surface-card.p-4.border-round.w-full.lg\:w-6 {
    margin-top: 91px !important;
    margin: auto;
    width: 35% !important;
}
</style>