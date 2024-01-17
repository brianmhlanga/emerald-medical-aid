<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-5">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">General Ledger Codes</div>
                    <div class="surface-card p-4 shadow-2 border-round p-fluid">
                        <div class="grid formgrid p-fluid">
                          
                           
                          
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Add General Ledger Code" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" outlined />
                            </div>
                            <div class="field mb-4 col-12 md:col-12"> 
                                <label for="customer_name" class="font-medium text-900">General Ledger Codes</label> 
                                <DataTable :value="ledgers" showGridlines tableStyle="min-width: 50rem">
                                    <Column field="price" header="General Ledger Code">
                                        <template #body="slotProps">
                                            {{slotProps.data?.ledger_code}}
                                        </template>
                                    </Column>
                                    <Column field="price" header="Cost Center">
                                        <template #body="slotProps">
                                            {{slotProps.data?.cost_center?.center_code}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Description">
                                        <template #body="slotProps">
                                            {{slotProps.data?.description}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Balance">
                                        <template #body="slotProps">
                                            {{slotProps.data?.balance}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Group">
                                        <template #body="slotProps">
                                            {{slotProps.data?.group}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Type">
                                        <template #body="slotProps">
                                            {{slotProps.data?.type}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Control Status">
                                        <template #body="slotProps">
                                            {{slotProps.data?.control}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="On Hold Status">
                                        <template #body="slotProps">
                                            {{slotProps.data?.on_hold}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Index 1">
                                        <template #body="slotProps">
                                            {{slotProps.data?.index_1}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="index 2">
                                        <template #body="slotProps">
                                            {{slotProps.data?.index_2}}
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
        <Dialog v-model:visible="addLineItem" maximizable modal header="Create General Ledger Code" position="top" :style="{ width: '75vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Cost Center</label> 
                        <DropDown v-model="selected_center"  :options="centers" filter optionLabel="center_code" optionValue="id" placeholder="Select Cost Center" class="w-full md:w-14rem" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Ledger Code</label> 
                        <InputText v-model="ledger_code" placeholder="Ledger Code" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Description</label> 
                        <TextArea v-model="description" placeholder="Description" rows="5" cols="30" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Balance</label> 
                        <InputNumber v-model="balance" inputId="currency-us" mode="currency" currency="ZAR" locale="en-US" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Group</label> 
                        <InputText v-model="group" placeholder="Group" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Type</label> 
                        <InputText v-model="type" placeholder="Type" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Control</label> 
                        <ToggleButton v-model="control" class="w-8rem" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">On Hold</label> 
                        <ToggleButton v-model="on_hold" class="w-8rem" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Index 1</label> 
                        <InputText v-model="index_1" placeholder="Index 1" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Index 2</label> 
                        <InputText v-model="index_2" placeholder="Index 2" />
                    </div>
                    <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                </div>
                <Button @click="createGeneral()" label="Create General Ledger Code" icon="pi pi-plus" />
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
    const centers = storeToRefs(adminStore).centers
    const ledgers = storeToRefs(adminStore).ledgers
    const toast = useToast()
    const addLineItem = ref<boolean>(false)
    const center_code = ref<string>()
    const selected_center = ref()
    const ledger_code = ref()
    const balance =ref()
    const group = ref()
    const type = ref()
    const control = ref(false)
    const on_hold = ref(false)
    const index_1 = ref()
    const index_2 = ref()
    const description = ref<string>()
    const approvers = ref([])
    
    definePageMeta({ 
        middleware: ["auth"]
    });

    onMounted( async ()=> {
        let centers  = await adminStore.getAllCost()
        let ledgers = await adminStore.getAllLedgers()
    })


    const createGeneral = async () => {
        let data = {
            ledger_code: ledger_code.value,
            description: description.value,
            balance: balance.value,
            group: group.value,
            cost_center_id: selected_center.value,
            type: type.value,
            control: control.value,
            on_hold: on_hold.value,
            index_1: index_1.value,
            index_2: index_2.value
        }
        let result = await adminStore.createLedger(data)
        if (result.data.success) {
            toast.add({severity:'success', summary: 'Success', detail:'Ledger Code Succesfully Createdd', life: 3000});
            let centers  = await adminStore.getAllLedgers()
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