<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-5">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">In Favour of(Companies)</div>
                    <div class="surface-card p-4 shadow-2 border-round p-fluid">
                        <div class="grid formgrid p-fluid">
                          
                           
                          
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Add Company" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" outlined />
                            </div>
                            <div class="field mb-4 col-12 md:col-12"> 
                                <label for="customer_name" class="font-medium text-900">In Favour of(Companies)</label> 
                                <DataTable :value="companies" showGridlines tableStyle="min-width: 50rem">
                                    <Column field="price" header="Company Name">
                                        <template #body="slotProps">
                                            {{slotProps.data.company_name}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Address">
                                        <template #body="slotProps">
                                            {{slotProps.data.address}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Bank Name">
                                        <template #body="slotProps">
                                            {{slotProps.data.bank_name}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Account Number">
                                        <template #body="slotProps">
                                            {{slotProps.data.account_number}}
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
        <Dialog v-model:visible="addLineItem" maximizable modal header="Create Company" position="top" :style="{ width: '75vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Company Name</label> 
                        <InputText v-model="company_name" placeholder="Company Name" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Company Address</label> 
                        <InputText v-model="address" placeholder="Company Address" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Bank Name</label> 
                        <InputText v-model="bank_name" placeholder="Bank Name" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Account Number</label> 
                        <InputText v-model="account_number" placeholder="Account Number" />
                    </div>
                    <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                </div>
                <Button @click="createCompany()" label="Create Company" icon="pi pi-plus" />
        </Dialog>
    </NuxtLayout>
</template>
<script setup lang="ts">
    import { useToast } from "primevue/usetoast";
    import { storeToRefs } from "pinia";
    import moment from "moment";
    import { ref } from 'vue';
    import { useAuthStore } from "~/stores/auth";
    import { useAdminStore } from "~/stores/admin";
    import { useSageStore } from "~/stores/sage";
    const sageStore = useSageStore()
    const authStore = useAuthStore()
    const adminStore = useAdminStore()
    const suppliers = storeToRefs(adminStore).suppliers
    const companies = storeToRefs(sageStore).favour_companies
    const toast = useToast()
    const addLineItem = ref<boolean>(false)
    const company_name = ref()
    const address = ref()
    const bank_name = ref()
    const account_number = ref()
    const supplier_code = ref()
    const supplier_name = ref()
    const postal_code = ref()
    const short_name = ref()
    const commodities = storeToRefs(adminStore).commodities
    const selectedCommodities = storeToRefs(adminStore).selectedCommodities
    
    definePageMeta({ 
        middleware: ["auth"]
    });

    onMounted( async ()=> {
        let suppliers  = await adminStore.getAllSuppliers()
        let commodities = await adminStore.getAllCommodities()
        let centers  = await sageStore.getAllCompanies()
    })


    const createCompany = async () => {
        let data = {
            company_name: company_name.value,
            address: address.value,
            bank_name: bank_name.value,
            account_number: account_number.value,
            
        }
        let result = await sageStore.createCompany(data)
        if (result.data.success) {
            toast.add({severity:'success', summary: 'Success', detail:'Company Succesfully Created', life: 3000});
            let centers  = await sageStore.getAllCompanies()
            addLineItem.value = false
        }
        else {
            toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
        }
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