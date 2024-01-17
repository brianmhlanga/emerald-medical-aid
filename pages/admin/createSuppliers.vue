<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-5">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Suppliers</div>
                    <div class="surface-card p-4 shadow-2 border-round p-fluid">
                        <div class="grid formgrid p-fluid">
                          
                           
                          
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Add Supplier" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" outlined />
                            </div>
                            <div class="field mb-4 col-12 md:col-12"> 
                                <label for="customer_name" class="font-medium text-900">Suppliers</label> 
                                <DataTable :value="suppliers" showGridlines tableStyle="min-width: 50rem">
                                    <Column field="price" header="Supplier Code">
                                        <template #body="slotProps">
                                            {{slotProps.data.supplier_code}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Supplier Name">
                                        <template #body="slotProps">
                                            {{slotProps.data.supplier_name}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Short Name">
                                        <template #body="slotProps">
                                            {{slotProps.data.short_name}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Postal Code">
                                        <template #body="slotProps">
                                            {{slotProps.data.postal_code}}
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
        <Dialog v-model:visible="addLineItem" maximizable modal header="Create Supplier" position="top" :style="{ width: '75vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Supplier Code</label> 
                        <InputText v-model="supplier_code" placeholder="Supplier Code" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Supplier Name</label> 
                        <InputText v-model="supplier_name" placeholder="Supplier Name" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Short Name</label> 
                        <InputText v-model="short_name" placeholder="Short Name" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Postal Code</label> 
                        <InputText v-model="postal_code" placeholder="Postal Code" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Commodity Codes</label> 
                        <MultiSelect v-model="selectedCommodities" :options="commodities" optionValue="id" optionLabel="code" placeholder="Select Commodities"  :maxSelectedLabels="3" class="w-full md:w-20rem" />
                    </div>
                    
                          
                    <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                </div>
                <Button @click="createSupplier()" label="Create Supplier" icon="pi pi-plus" />
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

    const authStore = useAuthStore()
    const adminStore = useAdminStore()
    const suppliers = storeToRefs(adminStore).suppliers
    const toast = useToast()
    const addLineItem = ref<boolean>(false)
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
    })


    const createSupplier = async () => {
        let data = {
            supplier_code: supplier_code.value,
            supplier_name: supplier_name.value,
            short_name: short_name.value,
            postal_code: postal_code.value,
            selectedCommodities: selectedCommodities.value
        }
        let result = await adminStore.createSupplier(data)
        if (result.data.success) {
            toast.add({severity:'success', summary: 'Success', detail:'Supplier Succesfully Created', life: 3000});
            let centers  = await adminStore.getAllSuppliers()
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