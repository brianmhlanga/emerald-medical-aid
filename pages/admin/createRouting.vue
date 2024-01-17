<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-5">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Create Request Routing</div>
                    <div class="surface-card p-4 shadow-2 border-round p-fluid">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="company_name" class="font-medium text-900">Originator</label> 
                                <DropDown v-model="owner_id" :options="all_originators" filter optionLabel="name" optionValue="id" placeholder="Select an Originator" class="w-full md:w-14rem" />
                             </div>
                            <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                            <div class="field mb-4 col-12 md:col-6">
                                <div class="field mb-4 col-12 md:col-6"> 
                                    <label for="company_name" class="font-medium text-900">Approver</label> 
                                    <!-- <DropDown @change="saveName(approver_id)" v-model="approver_id"  :options="all_approvers" filter optionLabel="name" optionValue="id" placeholder="Select Approver" class="w-full md:w-14rem" /> -->
                                    <MultiSelect @change="saveName(approver_id)" v-model="approver_id" :options="all_approvers" optionLabel="name" optionValue="id"
                                        :maxSelectedLabels="3" class="w-full md:w-20rem" />
                                </div>
                                <!-- <Button @click="addLineItem = true" label="Add Approvers" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" outlined /> -->
                            </div>
                            <div class="field mb-4 col-12 md:col-12">
                                <Button @click="createRouting()" label="Create Routing" icon="pi pi-file" />
                            </div>
                            <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                            <div class="field mb-4 col-12 md:col-12"> 
                                <label for="customer_name" class="font-medium text-900">Approvers</label> 
                                <DataTable :value="approvers" showGridlines tableStyle="min-width: 50rem">
                                    <Column field="price" header="Routing Owner">
                                        <template #body="slotProps">
                                            {{slotProps.data.routing_owner.name}} {{slotProps.data.routing_owner.surname}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Profile">
                                        <template #body="slotProps">
                                            {{slotProps.data.routing_owner.profile}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Email">
                                        <template #body="slotProps">
                                            {{slotProps.data.routing_owner.email}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Status">
                                        <template #body="slotProps">
                                            {{slotProps.data.routing_owner.account_status}}
                                        </template>
                                    </Column>
                                    <!-- <Column header="Threshold">
                                        <template #body="slotProps">
                                            {{formatCurrency(slotProps.data.threshold)}}
                                        </template>
                                    </Column> -->
                                    <!-- <Column header="Co-Approver">
                                        <template #body="slotProps">
                                            {{slotProps.data.is_co_approver}}
                                        </template>
                                    </Column> -->
                                    <Column header="Actions">
                                        <template #body="slotProps">
                                            <Button @click="removeApprover(slotProps.index)" icon="pi pi-trash" outlined rounded class="mr-2"/>
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                           </div> 
                    </div>
                </div>
            </div>
        </section>
        <!-- <Dialog v-model:visible="addLineItem" maximizable modal header="Create Approver" position="top" :style="{ width: '75vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Approver</label> 
                        <DropDown @change="saveName(approver_id)" v-model="approver_id"  :options="all_approvers" filter optionLabel="name" optionValue="id" placeholder="Select Approver" class="w-full md:w-14rem" /> -->
                        <!-- <MultiSelect @change="saveName(approver_id)" v-model="approver_id" :options="all_approvers" optionLabel="name" optionValue="id"
            :maxSelectedLabels="3" class="w-full md:w-20rem" />
                    </div>
                    <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                </div>
        </Dialog> --> 
    </NuxtLayout>
</template>
<script setup lang="ts">
    import { useToast } from "primevue/usetoast";
    import { storeToRefs } from "pinia";
    import moment from "moment";
    import { ref } from 'vue';
    import { useAuthStore } from "~/stores/auth";
    import { useAdminStore } from "~/stores/admin";
    import { useNormalStore } from "~/stores/normal";
import { types } from "util";

    const authStore = useAuthStore()
    const adminStore = useAdminStore()
    const normalStore =useNormalStore()
    const toast = useToast()
    const all_originators = storeToRefs(adminStore).originators
    const all_approvers = storeToRefs(adminStore).approvers
    const addLineItem = ref<boolean>(false)
    const owner_id = ref()
    const approver_id = ref<string>()
    const cost_center = ref<string>()
    const threshold = ref()
    const co_status = ref(false)
    const approvers = ref()
    const requisition_types = storeToRefs(adminStore).types
    const selected_request_type = ref<string>()
    const request_type = ref(["SPOTBUY","CONTRACT_RELEASE","CAPEX","OTC"])
    const users = storeToRefs(adminStore).users
    const user = storeToRefs(adminStore).user
    
    definePageMeta({ 
        middleware: ["auth"]
    });

    onMounted( async ()=> {
        let types  = await adminStore.getAllTypes()
        let users = await adminStore.getUsers()
        let originators = await adminStore.getOriginators()
        let approvers = await adminStore.getApprovers()
        let result = await normalStore.getRouting(owner_id).then((data) => {
            console.log("huuu",data?.data?.single)
            approvers.value = data?.data?.single
        })
        
    }) 


    let routingNumber = 0;

const getRoutingNumber = () => {
  routingNumber++;
  return routingNumber;
};
    const saveName = async (id) => {
        console.log("picked name",id)
        let result = await adminStore.getUser(id)
    }
    const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'ZAR' });
    };
    const removeApprover = (index: number) => {
        approvers.value.splice(index, 1);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Approver Removed', life: 3000 });
    }
    const createRouting = async () => {
        let data = {
            owner_id: owner_id.value,
            approvers: approver_id.value
        }
        let result = await adminStore.createRouting(data)
        if (result.data.success) {
            toast.add({severity:'success', summary: 'Success', detail:'Routing Succesfully Created', life: 3000});
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