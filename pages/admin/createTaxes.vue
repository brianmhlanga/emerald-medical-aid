<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-5">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Taxes</div>
                    <div class="surface-card p-4 shadow-2 border-round p-fluid">
                        <div class="grid formgrid p-fluid">
                          
                           
                          
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Add Tax" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" outlined />
                            </div>
                            <div class="field mb-4 col-12 md:col-12"> 
                                <label for="customer_name" class="font-medium text-900">Taxes</label> 
                                <DataTable :value="taxes" showGridlines tableStyle="min-width: 50rem">
                                    <Column field="price" header="Tax Code">
                                        <template #body="slotProps">
                                            {{slotProps.data.tax_code}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Description">
                                        <template #body="slotProps">
                                            {{slotProps.data.description}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Current Rate">
                                        <template #body="slotProps">
                                            {{slotProps.data.current_rate}} %
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Previous Rate">
                                        <template #body="slotProps">
                                            {{slotProps.data.previous_rate}} %
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Basis">
                                        <template #body="slotProps">
                                            {{slotProps.data.basis}} 
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Effective Date">
                                        <template #body="slotProps">
                                            {{slotProps.data.effective_date}} 
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Sales ledger Code">
                                        <template #body="slotProps">
                                            {{slotProps.data.sales_ledger_code}} 
                                        </template>
                                    </Column>
                                    <Column field="rating" header="AP Ledger Code">
                                        <template #body="slotProps">
                                            {{slotProps.data.ap_ledger_code}} 
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
        <Dialog v-model:visible="addLineItem" maximizable modal header="Create tax" position="top" :style="{ width: '75vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Tax Code</label> 
                        <InputText v-model="tax_code" placeholder="Tax Code" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Tax Description</label> 
                        <InputText v-model="description" placeholder="Description" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Current Rate</label> 
                        <InputNumber v-model="current_rate" placeholder="Current Rate" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Previous Rate</label> 
                        <InputNumber v-model="previous_rate" placeholder="Previous Rate" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Basis</label> 
                        <InputText v-model="basis" placeholder="Basis" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Effective Date</label> 
                        <Calendar v-model="effective_date" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Sales Ledger Code</label> 
                        <InputText v-model="sales_ledger_code" placeholder="Sales Ledger Code" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">AP Ledger Code</label> 
                        <InputText v-model="ap_ledger_code" placeholder="AP Ledger Code" />
                    </div>
                    <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                </div>
                <Button @click="createTax()" label="Create Tax" icon="pi pi-plus" />
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
    const taxes = storeToRefs(adminStore).taxes
    const toast = useToast()
    const addLineItem = ref<boolean>(false)
    const tax_code = ref()
    const description = ref()
    const current_rate = ref()
    const previous_rate = ref()
    const basis = ref()
    const effective_date = ref()
    const sales_ledger_code = ref()
    const ap_ledger_code = ref()

    
    definePageMeta({ 
        middleware: ["auth"]
    });

    onMounted( async ()=> {
        let taxes  = await adminStore.getAllTaxes()
    })


    const createTax = async () => {
        let data = {
            tax_code: tax_code.value,
            description: description.value,
            current_rate: current_rate.value,
            previous_rate: previous_rate.value,
            basis: basis.value,
            effective_date: effective_date.value,
            sales_ledger_code: sales_ledger_code.value,
            ap_ledger_code: ap_ledger_code.value
        }
        let result = await adminStore.createTaxes(data)
        if (result.data.success) {
            toast.add({severity:'success', summary: 'Success', detail:'Tax Succesfully Created', life: 3000});
            let centers  = await adminStore.getAllTaxes()
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