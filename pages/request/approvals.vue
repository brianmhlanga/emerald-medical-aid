<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-5">
                <div class="row">
                    <div v-if="display_toggle === false" class="text-900 font-medium text-xl mb-3">Pending Requisitions</div>
                    <div v-if="display_toggle === true" class="text-900 font-medium text-xl mb-3">Requisition Details</div>
                    <div class="surface-card p-4 shadow-2 border-round p-fluid">
                        <div class="grid formgrid p-fluid">
                            <div v-if="display_toggle === false" class="field mb-4 col-12 md:col-12"> 
                                <label for="customer_name" class="font-medium text-900">Requisitions</label> 
                                <DataTable :value="pending" showGridlines tableStyle="min-width: 50rem">
                                    <Column field="price" header="Originator">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.originator?.name}} {{slotProps?.data?.originator?.surname}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Username">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.originator?.username}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Items">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.lines ? slotProps?.data?.lines.length : 0}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Due">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.due_date ? formatDate(slotProps?.data?.due_date) : "NOT SET"}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Created">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.created_at ? formatDate(slotProps?.data?.created_at) : "NOT SET"}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Budget Status">
                                        <template #body="slotProps">
                                            <Tag v-if="slotProps.data.over_budget === true" value="Out of Budget" class="exceeded" />  
                                            <Tag v-else value="Within Budget" :severity="getSeverity(slotProps.data)" class="good" />  
                                         </template>
                                    </Column>
                                    <Column field="rating" header="History">
                                        <template #body="slotProps">
                                            <Tag v-if="slotProps.data.history_id" @click="getRequisition(slotProps.data?.history_id)" value="Available" class="history" /> 
                                            <Tag v-else value="Not Available" class="no_history" /> 
                                         </template>
                                    </Column>
                                    <Column field="rating" header="Total">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.total ? formatCurrency(slotProps?.data?.total) : formatCurrency(0)}}
                                        </template>
                                    </Column>
                                    <Column header="Actions">
                                        <template #body="slotProps">
                                            <Button @click="getRequisition(slotProps.data?.id)"  icon="pi pi-eye" outlined rounded class="mr-2"/>
                                            <Button @click="navigateTo(`detail-${slotProps.data?.id}`)"  icon="pi pi-pencil" outlined rounded class="mr-2"/>
                                            <Button @click="returnRequisition(slotProps.data?.id)"  icon="pi pi-times" outlined rounded class="mr-2"/>
                                            <Button @click="forwardRequisition(slotProps.data?.id)"  icon="pi pi-check" outlined rounded class="mr-2"/>
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                            <div v-else class="field mb-4 col-12 md:col-12"> 
                                <Button @click="display_toggle = false" icon="pi pi-arrow-left" severity="secondary" rounded />
                                <div class="font-medium text-3xl text-900 mb-3">Requisition Detail</div>
                                <div class="text-500 mb-5">This represents all the information entered on the requisition by the originator</div>
                                <div class="grid budgets">
                                <div class="col-4 md:col-4">
                                    <div class="text-center border-1 surface-border border-round p-4">
                                    <i class="pi pi-chart-pie text-5xl text-blue-500"></i>
                                    <div class="text-900 text-2xl font-700 my-3 font-bold">{{formatCurrency(yearlyBudget)}}</div>
                                    <span class="font-medium text-600">Yearly Budget</span>
                                    </div>
                                </div>
                                <div class="col-4 md:col-4 text-center">
                                    <div class="text-center border-1 surface-border border-round p-4">
                                    <i class="pi pi-chart-line text-5xl text-blue-500"></i>
                                    <div class="text-900 text-2xl font-700 my-3 font-bold">{{formatCurrency(remainingBudget + total)}}</div>
                                    <span class="font-medium text-600">Remaining Budget</span>
                                    </div>
                                </div>
                                <div class="col-4 md:col-4 text-center">
                                    <div class="text-center border-1 surface-border border-round p-4">
                                    <i class="pi pi-dollar text-5xl text-blue-500"></i>
                                    <div class="text-900 text-2xl font-700 my-3 font-bold">{{formatCurrency(total)}}</div>
                                    <span class="font-medium text-600">Requisition Total</span>
                                    </div>
                                </div>
                                </div>
                                <ul class="list-none p-0 m-0 border-top-1 surface-border">
                                    <li class="flex align-items-center py-3 px-2 flex-wrap surface-50">
                                    <div class="text-500 w-full md:w-2 font-medium">Originator</div>
                                    <div class="text-900 w-full md:w-10">{{originator}}</div>
                                    </li>
                                    <li class="flex align-items-center py-3 px-2 flex-wrap surface-50">
                                    <div class="text-500 w-full md:w-2 font-medium">Requisition Total</div>
                                    <div class="text-900 w-full md:w-10">{{total ?  formatCurrency(total) : formatCurrency(0)}}</div>
                                    </li>
                                    <li class="flex align-items-center py-3 px-2 flex-wrap surface-50">
                                    <div class="text-500 w-full md:w-2 font-medium">Requests</div>
                                    <div class="text-900 w-full md:w-10">
                                        <div class="grid mt-0 mr-0">
                                        <div class="col-12 md:col-12">
                                            <div class="p-3 border-1 surface-border border-round surface-card">
                                                <DataTable :value="lines" showGridlines tableStyle="min-width: 50rem">
                                                    <Column field="price" header="Item #">
                                                        <template #body="slotProps">
                                                            {{(slotProps.index)+1}}
                                                        </template>
                                                    </Column>
                                                    <Column field="price" header="Stock Code">
                                                        <template #body="slotProps">
                                                            {{slotProps?.data?.stock_code}}
                                                        </template>
                                                    </Column>
                                                    <Column field="rating" header="Description">
                                                        <template #body="slotProps">
                                                            {{slotProps?.data?.description}}
                                                        </template>
                                                    </Column>
                                                    <Column field="rating" header="Long Description">
                                                        <template #body="slotProps">
                                                            {{slotProps?.data?.long_description}}
                                                        </template>
                                                    </Column>
                                                    <Column field="rating" header="Commodity Code">
                                                        <template #body="slotProps">
                                                            {{slotProps?.data?.commodity_code?.code}}
                                                        </template>
                                                    </Column>
                                                    <Column field="rating" header="Order UOM">
                                                        <template #body="slotProps">
                                                            {{slotProps?.data?.order_uom}}
                                                        </template>
                                                    </Column>
                                                    <Column field="rating" header="Reason">
                                                        <template #body="slotProps">
                                                            {{slotProps?.data?.reason_for_requisition}}
                                                        </template>
                                                    </Column>
                                                    <Column field="rating" header="Ledger Code">
                                                        <template #body="slotProps">
                                                            {{slotProps?.data?.general_ledger?.ledger_code}}
                                                        </template>
                                                    </Column>
                                                    <Column field="rating" header="Non Conformance">
                                                        <template #body="slotProps">
                                                            {{slotProps?.data?.non_conformance}}
                                                        </template>
                                                    </Column>
                                                    <Column field="rating" header="Warehouse">
                                                        <template #body="slotProps">
                                                            {{slotProps?.data?.warehouse}}
                                                        </template>
                                                    </Column>
                                                    <Column field="rating" header="Quantity">
                                                        <template #body="slotProps">
                                                            {{slotProps?.data?.quantity}}
                                                        </template>
                                                    </Column>
                                                    <Column field="rating" header="Price">
                                                        <template #body="slotProps">
                                                            {{formatCurrency(slotProps?.data?.price)}}
                                                        </template>
                                                    </Column>
                                                    <Column field="rating" header="Total">
                                                        <template #body="slotProps">
                                                            {{formatCurrency((slotProps?.data?.price)*(slotProps?.data?.quantity))}}
                                                        </template>
                                                    </Column>
                                                    <!-- <Column header="Actions">
                                                        <template #body="slotProps">
                                                            <Button @click="getRequisition(slotProps.data?.id)"  icon="pi pi-eye" outlined rounded class="mr-2"/>
                                                        </template>
                                                    </Column> -->
                                                </DataTable>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </li>
                                </ul>
                                <div  class=" col-12 text-500 w-full md:w-2 font-medium">Comments</div><i class="pi pi-comment" @click="commentDialog = true">Add Comment</i>
                                <div class=" p-4">
                                <ul v-for="item in comments" class="list-none p-0 m-0">
                                    <li class="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                                    <div class="flex align-items-start mr-0 lg:mr-5">
                                        <img src="https://blocks.primevue.org/images/blocks/avatars/circle-big/avatar-m-2.png" class="mr-3 w-3rem h-3rem">
                                        <div>
                                        <span class="text-900 font-medium block mb-2">{{ item.user.name }} {{ item.user.surname }}</span>
                                        <div class="text-700 mb-2" v-html="item.comment"></div>
                                        </div>
                                    </div>
                                    <span class="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">{{ timeAgo(item.created_at) }}</span>
                                    </li>
                                </ul>
                                </div>
                                <div  class=" col-12 text-500 w-full md:w-2 font-medium">Attachments</div>
                                    <div v-for="attachment in attachments" class="text-900 w-full md:w-10">
                                        <div class="flex md:align-items-center md:justify-content-between border-top-1 surface-border p-3 flex-column md:flex-row">
                                            <div class="flex align-items-center">
                                            <span class="block pi pi-file mr-2"></span>
                                            <span class="text-900">{{attachment.file_name}}</span>
                                            </div>
                                            <Button @click="downloadMe(attachment.file_name)" class="download" type="button" label="Download" icon="pi pi-download" outlined />
                                        </div>
                                    </div>
                                </div>
                           </div> 
                    
                    </div>
                </div>
            </div>
        </section>
        <Dialog v-model:visible="commentDialog" maximizable modal header="Add Comment" position="top" :style="{ width: '75vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Commend</label> 
                        <Editor v-model="comment" editorStyle="height: 200px" />
                    </div>
                    <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                </div>
                <Button @click="addComment()" label="Add Comment" icon="pi pi-plus" />
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
    import { useConfirm } from "primevue/useconfirm";

    const confirm = useConfirm();

    const authStore = useAuthStore()
    const adminStore = useAdminStore()
    const commentDialog = ref(false)
    const pending = storeToRefs(adminStore).my_pending
    const requests = storeToRefs(adminStore).requests
    const toast = useToast()
    const addLineItem = ref<boolean>(false)
    const comments = ref()
    const comment = ref()
    const single_request = storeToRefs(adminStore).single_request
    const requisition_id = ref()
    const is_co_approver = storeToRefs(adminStore).is_co_approver
    const attachments = ref()
    const address = ref()
    const status = ref()
    const user_id = storeToRefs(authStore).user_id
    const originator = ref()
    const total = ref()
    const due_date = ref()
    const supplier = ref()
    const created_at = ref()
    const lines = ref()
    const display_toggle = ref<boolean>(false)
    const yearlyBudget = ref()
    const remainingBudget = ref()
    
    definePageMeta({ 
        middleware: ["auth"]
    });

    const downloadMe = (value) => {
      const link = document.createElement('a')
      link.href = `/uploads/${value}`
      link.download = `${value}`
      link.target = '_blank'
      link.click()
    }
    const timeAgo = (dateString) => {
        var now = moment(); // Get the current date and time
      var givenDate = moment(dateString); // Convert givenDateTime to a Moment object

      let timeAgo = givenDate.from(now);
      return timeAgo
    }

    onMounted( async ()=> {
        let id = user_id.value
        let pending = await adminStore.getMyPendingRequests(id)
        let requests = await adminStore.getRequests(await authStore.user_id)
    })

    const addComment = async () => {
        let message = {
            requisition_id: requisition_id.value,
            user_id: user_id.value,
            comment: comment.value
        }
        let result = await adminStore.addComment(message)

        if (result.data.success) {
        commentDialog.value = false
        await adminStore.getMyPendingRequests(user_id.value)
        await getRequisition(requisition_id.value)
        toast.add({severity:'success', summary: 'Success', detail:'Successfully Added', life: 3000});

        }      
        else {
        toast.add({severity:'warn', summary: 'Failed', detail:'Approval Failed', life: 3000});
        }
    }

    const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'ZAR' });
    };

    const formatDate = (value) => {
        const date = new Date(value);
        const day = date.getUTCDate();
        const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
        const year = date.getUTCFullYear();

        const formattedDate = `${day} ${month} ${year}`;
        return formattedDate
    }
    const getSeverity = (over_budget) => {
    switch (over_budget) {
        case 'false':
            return 'success';

        case 'true':
            return 'danger';

        default:
            return null;
    }
};

    const getRequisition = async (value) => {
        console.log(value)
        let result = await adminStore.getSingleRequest(value).then((data)=> {
            display_toggle.value = true
            let request = data.data.pending
            requisition_id.value = request?.id
            console.log(request)
            console.log(request.lines)
            originator.value = request?.originator?.name + " " + request?.originator?.surname
            yearlyBudget.value = request?.originator?.normal_profile?.cost_center?.budget?.yearlyBudget
            remainingBudget.value = request?.originator?.normal_profile?.cost_center?.budget?.remainingBudget
            comments.value = request?.comments
            total.value = request?.total
            lines.value = request?.lines
            attachments.value = request?.attachments

        })       
    }
    const forwardRequisition = async (value) => {
        confirm.require({
        header: 'Forwarding Confirmation',
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
            let my_object = {
                id: value,
                is_co_approver: is_co_approver.value,
                approver_id: user_id.value
            }
              let result = await adminStore.normalApprove(my_object)
                   
              if (result.data.success) {

                    await adminStore.getMyPendingRequests(user_id.value)
                    toast.add({severity:'success', summary: 'Success', detail:'Successfully Approved', life: 3000});

              }      
              else {
                     toast.add({severity:'warn', summary: 'Failed', detail:'Approval Failed', life: 3000});
              }
            
                
        
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'Rejected', detail: 'You have cancelled the process', life: 3000 });
        }
    });
    }

    const returnRequisition = async (value) => {
        confirm.require({
        header: 'Returning Confirmation',
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
            let result: any = adminStore.clerkDecline(value).then(async()=>{
                    await adminStore.getPendingRequests()
                    toast.add({severity:'success', summary: 'Success', detail:'Requisition Returned To Originator', life: 3000});
                    
            }).catch(()=>{
                toast.add({severity:'warn', summary: 'Failed', detail:'Fowarding Failed', life: 3000});
            })
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'Rejected', detail: 'You have cancelled the process', life: 3000 });
        }
    });
    }

  
   
  
</script>
  
  <style>
    span.p-tag.p-component.history {
    cursor: pointer;
    background-color: #6a6a6a;
    }
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
    button.p-button.p-component.p-button-outlined.download {
    width: 180px;
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
  .grid.budgets {
    margin-bottom: 10px;
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
    span.p-tag.p-component.exceeded {
    background-color: red;
    }
    span.p-tag.p-component.good {
    background-color: #00d800;
    }
  
  </style>