<template>
   <NuxtLayout name="dashboard">
    <section class="section">
            <div class="container-fluid pt-5">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Create Users</div>
                    <div class="surface-card p-4 shadow-2 border-round p-fluid">
                        <div class="grid formgrid p-fluid">
                          
                           
                          
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Create User" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" outlined />
                            </div>
                            <div class="field mb-4 col-12 md:col-12"> 
                                <label for="customer_name" class="font-medium text-900">Current Users</label> 
                                <DataTable :value="users" showGridlines tableStyle="min-width: 50rem">
                                    <Column field="price" header="Full Name">
                                        <template #body="slotProps">
                                            {{slotProps.data?.name}} {{slotProps.data?.surname}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Email Address">
                                        <template #body="slotProps">
                                            {{slotProps.data?.email}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Profile Type">
                                        <template #body="slotProps">
                                            {{slotProps.data?.profile }}
                                        </template>
                                    </Column>
                                    <Column header="Actions">
                                        <template #body="slotProps">
                                            <Button  icon="pi pi-trash" outlined rounded class="mr-2"/>
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                           </div> 
                    
                    </div>
                </div>
            </div>
        </section>
       <Dialog v-model:visible="addLineItem" maximizable modal header="Create User" position="top" :style="{ width: '75vw' }">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="first_name" class="font-medium text-900">First name</label> 
                                <input class="p-inputtext p-component" id="first_name" v-model="name" type="text">
                             </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="surname" class="font-medium text-900">Surname</label> 
                                <input class="p-inputtext p-component" v-model="surname" id="surname" type="text"> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="username" class="font-medium text-900">Username</label> 
                                <input class="p-inputtext p-component" v-model="username" id="username" type="text"> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="user_email" class="font-medium text-900">Email</label> 
                                <input class="p-inputtext p-component" v-model="email" id="user_email" type="text"> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="title" class="font-medium text-900">Title</label> 
                                <DropDown v-model="title" :options="title_options"   placeholder="Select  Title"  /> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="age" class="font-medium text-900">Age</label> 
                                <input class="p-inputtext p-component" v-model="age" id="age" type="number"> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="phone" class="font-medium text-900">Phone number</label> 
                                <input class="p-inputtext p-component" v-model="phone" id="phone" type="text"> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6">
                              <label for="phone" class="font-medium text-900">Gender</label> 
                              <DropDown v-model="gender" :options="gender1"   placeholder="Select  Gender"  />
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="password" class="font-medium text-900">Password</label> 
                                <input class="p-inputtext p-component" v-model="password" id="password" type="text"> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6">
                              <label for="phone" class="font-medium text-900">User Type</label> 
                              <DropDown  v-model="accountTypes" :options="user_type"  placeholder="Select a user type"  />
                            </div>
                            <!-- <div v-if="accountTypes === 'NORMAL'" class="field mb-4 col-12 md:col-6">
                              <label for="phone" class="font-medium text-900">Cost Center</label>
                              <DropDown @change="selectCommodityCodes(selected_center)"  v-model="selected_center" :options="cost_centers" optionValue="id" optionLabel="center_code"  placeholder="Select Cost Center"  />
                            </div> -->
                            <!-- <div v-if="accountTypes === 'NORMAL'" class="field mb-4 col-12 md:col-6">
                              <label for="phone" class="font-medium text-900">Commodity Access</label> 
                              <MultiSelect v-model="selectedCommodities" :options="commodities" optionValue="code" optionLabel="code" placeholder="Select Commodities"  :maxSelectedLabels="3" class="w-full md:w-20rem" />
                            </div> -->
                            </div>
                            <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                          
                           <button class="p-button p-component w-auto" type="button" aria-label="Create Invoice" @click="register()"> <span class="p-button-icon p-button-icon-left pi pi-file"></span> <span class="p-button-label">Create User</span>
                              <span class="p-ink" role="presentation" aria-hidden="true"></span>
                           </button>
        </Dialog>
   </NuxtLayout>
 </template>
 
 <script setup lang="ts">
   import { useToast } from "primevue/usetoast";
   import { storeToRefs } from "pinia";
   import {useAdminStore} from "~/stores/admin"
   import moment from "moment";

   
 
   // definePageMeta({ 
   //     middleware: ["auth"]
   // });
const toast = useToast();
const selectGender = ref()
const gender1 = ref(["FEMALE","MALE"]);
const user_type = ref(["ADMIN","HR_OFFICER","HR_MANAGER","HR_DIRECTOR","FINANCE"])
const title_options = ref(["Mr","Mrs","Ms"])
const adminStore = useAdminStore()
const addLineItem = ref(false)
const users = storeToRefs(adminStore).users
const name = storeToRefs(adminStore).name
const surname = storeToRefs(adminStore).surname
const username = storeToRefs(adminStore).username
const email = storeToRefs(adminStore).email
const phone = storeToRefs(adminStore).phone
const gender = storeToRefs(adminStore).gender
const title = storeToRefs(adminStore).title
const age = storeToRefs(adminStore).age
const accountTypes = storeToRefs(adminStore).profile
const password = storeToRefs(adminStore).password
const cost_centers = storeToRefs(adminStore).centers
const selected_center = storeToRefs(adminStore).selected_center
const commodities = storeToRefs(adminStore).cost_commodities
const selectedCommodities = storeToRefs(adminStore).selectedCommodities

onMounted( async () => {
  let cost_centers = await adminStore.getAllCost()
  let users  = await adminStore.getAllUsers()
})
const register = async () =>{

let result = await adminStore.registerUser();
console.log ("my result")
console.log(result.data)
console.log(result.data.success)
if(result.data.success){
       addLineItem.value = false
       toast.add({severity:'success', summary: 'You are registered', detail:'You will be notified once your account is activated', life: 3000});
      //  navigateTo('/login')

    }
    else{

        toast.add({severity:'warn', summary: 'Error!', detail:result.data.message, life: 3000});
      
    }
} 

const selectCommodityCodes = async (value) => {
  selectedCommodities.value = null
  let result = await adminStore.getManySelectedCommodities(value)

}
 
  
 
 </script>
 
 <style>
   .card-style {
   background: #fff;
   box-sizing: border-box;
   padding: 25px 30px;
   height: 100%;
   position: relative;
   border: 1px solid #fff;
   box-shadow: 0px 10px 20px rgb(200 208 216 / 0%);
   border-radius: 10px;
   }
   .row.dashtop {
   margin-bottom: 30px;
   }
   .c-dashboardInfo {
   margin-bottom: 15px;
   }
   .c-dashboardInfo .wrap {
     background: #ffffff;
     box-shadow: 2px 10px 20px rgb(0 0 0 / 10%);
     border-radius: 5px;
     text-align: center;
     position: relative;
     border: solid 1px white;
     border-color: red solid 2px;
     overflow: hidden;
     padding: 40px 25px 20px;
     height: 100%;
 }
   .c-dashboardInfo__title,
   .c-dashboardInfo__subInfo {
   color: #6c6c6c;
   font-size: 1.18em;
   }
   .c-dashboardInfo span {
   display: block;
   }
   .c-dashboardInfo__count {
   font-weight: 600;
   font-size: 2.5em;
   line-height: 64px;
   color: #323c43;
   }
   .c-dashboardInfo .wrap:after {
     display: block;
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 15px;
     content: "";
 }
 .loader{
   position: fixed;
   left: 0px;
   top: 0px;
   width: 100%;
   height: 100%;
   z-index: 9999;
  }
 
   .c-dashboardInfo:nth-child(1) .wrap:after {
     background: linear-gradient(82.59deg, #6477c6 0%, #4a6cf7 100%);
   }
   .c-dashboardInfo:nth-child(2) .wrap:after {
     background: linear-gradient(82.59deg, #6477c6 0%, #4a6cf7 100%);
   }
   .c-dashboardInfo:nth-child(3) .wrap:after {
     background: linear-gradient(82.59deg, #6477c6 0%, #4a6cf7 100%);
   }
   .c-dashboardInfo:nth-child(4) .wrap:after {
     background: linear-gradient(82.59deg, #6477c6 0%, #4a6cf7 100%);
   }
   .c-dashboardInfo:nth-child(5) .wrap:after {
     background: linear-gradient(82.59deg, #6477c6 0%, #4a6cf7 100%);
   }
   .c-dashboardInfo__title svg {
   color: #d7d7d7;
   margin-left: 5px;
   }
   .MuiSvgIcon-root-19 {
   fill: currentColor;
   width: 1em;
   height: 1em;
   display: inline-block;
   font-size: 24px;
   transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
   user-select: none;
   flex-shrink: 0;
   }
 
 </style>