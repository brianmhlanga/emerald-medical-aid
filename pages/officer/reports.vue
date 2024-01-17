<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-5">
                <div class="row">                  
                    <div  class="text-900 font-medium text-xl mb-3">My Requisitions</div>
                    <div class="surface-card p-4 shadow-2 border-round p-fluid">
                        <div class="grid formgrid p-fluid">
                            <div  class="field mb-4 col-12 md:col-12"> 
                                <label for="customer_name" class="font-medium text-900">Requisitions</label> 
                                <DataTable :value="requisitions" showGridlines tableStyle="min-width: 50rem">
                                    <Column field="price" header="Requisition #">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.requisition_number}} 
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Cheque Number">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.cheque_number}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Current Approver">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.current_approver?.name}} {{slotProps?.data?.current_approver?.surname}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Cheque On">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.cheque_on}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="In Favour of">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.in_favour_of}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Date">
                                        <template #body="slotProps">
                                            {{formatDate(slotProps?.data?.created_at)}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Amount">
                                        <template #body="slotProps">
                                            {{formatCurrency(slotProps?.data?.cheque_amount)}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Status">
                                        <template #body="slotProps">
                                            <Tag :class="slotProps?.data?.status" :value="slotProps?.data?.status" :severity="getSeverity(slotProps.data)" />
                                        </template>
                                    </Column>
                                    <Column header="Actions">
                                       <template #body="slotProps">
                                           <Button  @click="navigateTo(`odetail-${slotProps?.data?.id}`)" icon="pi pi-eye" outlined rounded class="mr-2"/>
                                       </template>
                                   </Column>
                                </DataTable>
                            </div>
                           </div> 
                    
                    </div>
                </div>
            </div>
        </section>
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
    import { useSageStore } from "~/stores/sage";
 
    const confirm = useConfirm();
    const sageStore = useSageStore()
    const authStore = useAuthStore()
    const adminStore = useAdminStore()
    const commentDialog = ref(false)
    const pending = storeToRefs(adminStore).my_pending
    const requests = storeToRefs(adminStore).requests
    const toast = useToast()
    const addLineItem = ref<boolean>(false)
    const comments = ref()
    const requisitions = ref()
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
        let {user: {id}} = await authStore.me()
        let approvals = await sageStore.myApprovals(id).then((data)=> {
            requisitions.value = data?.data?.approvals
        })
    })
 
 
    const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'ZWL' });
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
        case 'PAYED':
            return 'success';
 
        case 'MOVING':
            return 'danger';

        case 'REJECTED':
        return 'success';
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
  span.p-tag.p-component.PAYED {
    background-color: #0eec10;
  }
  span.p-tag.p-component.REJECTED {
    background-color: red;
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