<template>
   <NuxtLayout name="dashboard">
       <section class="section">
        <Toast/>
         <div class="container-fluid pt-5">
             <div class="row">
               <div class="text-900 font-medium text-xl mb-3">Create Tax Codes</div>
                    <div class="surface-card p-4 shadow-2 border-round p-fluid">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="first_name" class="font-medium text-900">Tax Code</label> 
                                <input class="p-inputtext p-component" id="first_name" v-model="tax_code" type="text">
                             </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="surname" class="font-medium text-900">Description</label> 
                                <input class="p-inputtext p-component" v-model="description" id="surname" type="text"> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="username" class="font-medium text-900">Current Rate</label> 
                                <input class="p-inputtext p-component" v-model="current_rate" id="username" type="text"> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="user_email" class="font-medium text-900">Previous Rate</label> 
                                <input class="p-inputtext p-component" v-model="previous_rate" id="user_email" type="text"> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="title" class="font-medium text-900">Basis</label> 
                                <input class="p-inputtext p-component" v-model="basis" id="user_email" type="text"> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="age" class="font-medium text-900">Effective Date</label> 
                                <Calendar id="calendar-24h" v-model="effective_date" showTime hourFormat="24" />
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="phone" class="font-medium text-900">Sales Ledger Code</label> 
                                <input class="p-inputtext p-component" v-model="sales_ledger_code" id="phone" type="text"> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6">
                              <label for="phone" class="font-medium text-900">AP Ledger Code</label> 
                              <input class="p-inputtext p-component" v-model="ap_ledger_code" id="password" type="text">
                            </div>
                            </div>
                            <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                          
                           <button class="p-button p-component w-auto" type="button" aria-label="Create Invoice" @click="create()"> <span class="p-button-icon p-button-icon-left pi pi-file"></span> <span class="p-button-label">Create Tax Codes</span>
                              <span class="p-ink" role="presentation" aria-hidden="true"></span>
                           </button>
                        </div>
                        
                    </div>
                </div>
               
       </section>
   </NuxtLayout>
 </template>

 <script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { storeToRefs } from "pinia";
import {useTaxStore} from "~/stores/tax"

import {ref} from "vue"
   
 
   
const toast = useToast();
const taxStore = useTaxStore()

const tax_code = storeToRefs(taxStore).tax_code
const description = storeToRefs(taxStore).description
const current_rate = storeToRefs(taxStore).current_rate
const previous_rate  = storeToRefs(taxStore).previous_rate 
const basis = storeToRefs(taxStore).basis
const effective_date = storeToRefs(taxStore).effective_date
const sales_ledger_code = storeToRefs(taxStore).sales_ledger_code
const ap_ledger_code = storeToRefs(taxStore).ap_ledger_code



const create = async() => {
let result = await taxStore.createTaxCodes();
console.log ("my result")
console.log(result.data)
console.log(result.data.success)
if(result.data.success){

       toast.add({severity:'success', summary: 'You are registered', detail:'Tax Code successfully created', life: 3000});
      //  navigateTo('/login')

    }
    else{

        toast.add({severity:'warn', summary: 'Error!', detail:result.data.message, life: 3000});
      
    }

}
 </script>
 