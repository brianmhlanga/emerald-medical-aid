<template>
    <NuxtLayout name="dashboard">
     <section class="section">
             <div class="container-fluid pt-5">
                 <div class="row">
                     <div class="text-900 font-medium text-xl mb-3">Report Details</div>
                     <div class="surface-card p-4 shadow-2 border-round p-fluid">
                         <div class="grid formgrid p-fluid">
                             <div v-if="reports" class="grid grid-nogutter  surface-border pt-2">
                                <div class="col-12 md:col-6 p-3">
                                <div class="text-500 font-medium mb-2">Cheque On</div>
                                <div class="text-900">{{ reports ? reports[0]?.items[0]?.companyName : "NOT SET" }}</div>
                                </div>
                                <div class="col-12 md:col-6 p-3">
                                <div class="text-500 font-medium mb-2">In Favour Of</div>
                                <div class="text-900">{{ details.in_favour_of }}</div>
                                </div>
                                <div class="col-12 md:col-6 p-3">
                                <div class="text-500 font-medium mb-2">Address</div>
                                <div class="text-900">{{ details.address }}</div>
                                </div>
                                <div class="col-12 md:col-6 p-3">
                                <div class="text-500 font-medium mb-2">Cheque Number</div>
                                <div class="text-900">{{ details.cheque_number }}</div>
                                </div>
                                <div class="col-12 p-3">
                                <div class="text-500 font-medium mb-2">Reason</div>
                                <div class="text-900 line-height-3">{{  details.reason }}</div>
                                </div>
                                <div class="col-12 md:col-6 p-3">
                                <div class="text-500 font-medium mb-2">Amount</div>
                                <div class="text-900 toalam">{{ details.cheque_amount ? formatCurrency(details.cheque_amount) : formatCurrency(0) }}</div>
                                </div>
                                <div class="col-12 p-3">
                                <div class="text-500 font-medium mb-3">Files</div>
                                <div class="flex md:align-items-center md:justify-content-between border-top-1 surface-border p-3 flex-column md:flex-row">
                                    <div class="flex align-items-center">
                                    <span class="block pi pi-file mr-2"></span>
                                    <span class="text-900">resume_en.pdf</span>
                                    </div>
                                    <button class="p-button p-component p-button-outlined mt-2 md:mt-0" type="button" aria-label="Download" data-pc-name="button" data-pc-section="root" data-pd-ripple="true">
                                    <span class="p-button-icon p-button-icon-left pi pi-download" data-pc-section="icon"></span>
                                    <span class="p-button-label" data-pc-section="label">Download</span>
                                    <!---->
                                    <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
                                    </button>
                                </div>
                                <div class="flex md:align-items-center md:justify-content-between border-top-1 border-bottom-1 surface-border p-3 flex-column md:flex-row">
                                    <div class="flex align-items-center">
                                    <span class="block pi pi-file mr-2"></span>
                                    <span class="text-900">cover_letter_en.pdf</span>
                                    </div>
                                    <button class="p-button p-component p-button-outlined mt-2 md:mt-0" type="button" aria-label="Download" data-pc-name="button" data-pc-section="root" data-pd-ripple="true">
                                    <span class="p-button-icon p-button-icon-left pi pi-download" data-pc-section="icon"></span>
                                    <span class="p-button-label" data-pc-section="label">Download</span>
                                    <!---->
                                    <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
                                    </button>
                                </div>
                                </div>
                            </div>

                             <div   class="field mb-4 col-12 md:col-12"> 
                                 
                                 <div   class="surface-card grid grid-nogutter border-round borderrangu">
                                  <table class="col-12">
                                    <thead>
                                        <tr class="table-header">
                                        <th>Account Name</th>
                                        <th>Account Code</th>
                                        <th colspan="6">Details</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in reports">
                                        <td>{{ item.defCode }}</td>
                                        <td></td>
                                        <td>
                                            <!-- Nested v-for for sub rows -->
                                            <table>
                                            <tbody>
                                            <tr v-for="detail in item.items">
                                                <td >{{ detail.companyRuleDisplay }}({{ detail.lineDescription }})</td> <!-- Empty cells for spacing -->
                                                <td>{{detail.total ? formatCurrency(detail.total) : formatCurrency(0) }}</td>
                                            </tr>
                                            </tbody>
                                            </table>
                                        </td>
                                        <td></td> <!-- Empty cell for spacing -->
                                        <td></td> <!-- Empty cell for spacing -->
                                        <td></td> <!-- Empty cell for spacing -->
                                        <td></td> <!-- Empty cell for spacing -->
                                        </tr>

                                        <!-- Repeat the rows for other orders -->
                                        <!-- ... -->

                                        <!-- Calculate and display the total debit -->
                                        <tr class="table-header">
                                        <th colspan="3">Total</th>
                                        <th>{{ reports ? formatCurrency(calculateTotalSum()) : formatCurrency(0) }}</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        </tr>
                                    </tbody>
                                   
                                    </table>
                                    
                                </div>
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
import {useAdminStore} from "~/stores/admin"
import { useAuthStore} from "~/stores/auth"
import moment from "moment";
import { useSageStore } from "~/stores/sage";
import { useConfirm } from "primevue/useconfirm";
import Swal from "sweetalert2";
 
    
  
    // definePageMeta({ 
    //     middleware: ["auth"]
    // });
 const toast = useToast();
 const confirm = useConfirm()
 const adminStore = useAdminStore()
 const authStore = useAuthStore()
 const addPeriod = ref(false)
 const sageStore = useSageStore()
 const originator_id = storeToRefs(authStore).id
 const selectedCompany = ref()
 const companies = ref()
 const getting_company_rules = ref(false)
 const company_rules = ref()
 const details = ref()
 const company_definitions = ref()
 const date_range = ref()
 const periodID = ref()
 const generating = ref(false)
 const in_favour_of = ref()
 const address = ref()
 const cheque_number = ref()
 const date = ref()
 const cheque_amount = ref()
 const reason = ref()
 const amount = ref()
 const selectedCompanyRules = ref()
 const selectedCompanyDefinitions = ref()
 const reports = ref()
 const {params: {id}} = useRoute()
 onMounted( async () => {

    let single = await sageStore.getSingle(id).then((data)=> {
        details.value = data?.data?.single
        reports.value = data?.data?.single?.info
    })

 })

 const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'ZWL' });
};

const getOriginator = async () => {
  let result:any = await authStore.me()
  return result?.user?.id
}
const approveReport = async () => {
      confirm.require({
        header: 'Confirm Approval',
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
       
        let result = await sageStore.approveRequisition(id)
        if (result.data.success) {
            reports.value = null
            navigateTo('/approvals/pending')
            Swal.fire({
            icon: 'success',
            title: 'Report Succesfully Approved',
            showConfirmButton: false,
            timer: 3000})

        }
        else {
            toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
        }
      },
      reject: () => {
            toast.add({ severity: 'warn', summary: 'Rejected', detail: 'You have cancelled the process', life: 3000 });
        }
      })
    }
const rejectReport = async () => {
      confirm.require({
        header: 'Confirm Rejection',
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
       
        let result = await sageStore.rejectRequisition(id)
        if (result.data.success) {
            reports.value = null
            navigateTo('/approvals/pending')
            Swal.fire({
            icon: 'success',
            title: 'Report Succesfully Rejected',
            showConfirmButton: false,
            timer: 3000})

        }
        else {
            toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
        }
      },
      reject: () => {
            toast.add({ severity: 'warn', summary: 'Rejected', detail: 'You have cancelled the process', life: 3000 });
        }
      })
    }
const createRequisition = async () => {
      confirm.require({
        header: 'Generating Confirmation',
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
        let data = {
          in_favour_of: in_favour_of.value,
          address: address.value,
          cheque_number: cheque_number.value,
          date: date.value,
          cheque_amount: await calculateTotalSum(),
          reason: reason.value,
          cheque_on: reports.value[0].items[0].companyName,
          info: reports.value,
          originator_id: await getOriginator()
        }
        let result = await sageStore.createRequisition(data)
        if (result.data.success) {
            reports.value = null
            Swal.fire({
            icon: 'success',
            title: 'Reported Succesfully Created',
            showConfirmButton: false,
            timer: 3000})

        }
        else {
            toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
        }
      },
      reject: () => {
            toast.add({ severity: 'warn', summary: 'Rejected', detail: 'You have cancelled the process', life: 3000 });
        }
      })
    }
 const getActiveCompanyRules = async () => {
  getting_company_rules.value = true
  let active_companies = await sageStore.getActiveCompanyRules(date_range.value).then((data) => {
    
     let unfiltered = data?.data?.data?.data
     const  filterByCompanyID = (arr,id) => {
  // Use the filter method to filter objects with companyID equal to 1
        return arr.filter(function(obj) {
          return obj.companyID === id;
        });
      }
     company_rules.value =  filterByCompanyID(unfiltered,selectedCompany.value)
     getting_company_rules.value = false
     toast.add({ severity: 'success', summary: 'Success', detail: 'Company Rules Succesfully Fetched', life: 3000 });
  })

  getCompanyDefinitions()

 }

 const getCompanyDefinitions = async () => {
  
   let definitions = await sageStore.getAllDefinitions().then((data) => {
     let unfiltered = data?.data?.data?.data
     const  filterByCompanyID = (arr,id) => {
  // Use the filter method to filter objects with companyID equal to 1
        return arr.filter(function(obj) {
          return obj.companyID === id;
        });
      }
     company_definitions.value =  filterByCompanyID(unfiltered,selectedCompany.value)
     toast.add({ severity: 'success', summary: 'Success', detail: 'Company Definitions Succesfully Fetched', life: 3000 });
  })
 }
 
 const generateReport = async () => {
    
    confirm.require({
        header: 'Generating Confirmation',
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          addPeriod.value = false
          generating.value = true
          let report = await sageStore.getReport(selectedCompany.value,periodID.value).then((data)=> {
          let unfiltered_array = data?.data?.data?.data
          const filterByCurrentYearEndDate = async (arr) => {
          const currentYear = new Date().getFullYear();
          const filteredData = arr.filter((obj) => {
            // Extract the year from the periodEndDate using regex
            const yearMatch = obj.periodEndDate.match(/(\d{4})/);
            if (yearMatch) {
              const endDateYear = parseInt(yearMatch[1], 10); // Convert to integer
              return endDateYear === currentYear;
            }
            return false; // Return false if the year couldn't be extracted
          });
          return filteredData;
          }
          const filterByCompanyRuleIDs = (filteredData, ids) => {
            reports.value = filteredData.filter((obj) => ids.includes(obj.companyRuleID));
            return filteredData.filter((obj) => ids.includes(obj.companyRuleID));
          }
          const filterByDefinitionCodes = (selectedObjects, definitionCodes) => {
              reports.value = selectedObjects.filter((obj) => definitionCodes.includes(obj.defCode));
              return selectedObjects.filter((obj) => definitionCodes.includes(obj.defCode));
          }
          const firstFunction = async () => {
           await filterByCompanyRuleIDs(reports.value,selectedCompanyRules.value)

          }
          const secondFunction = async () => {
            await filterByDefinitionCodes(reports.value,selectedCompanyDefinitions.value)
          }
          const groupByDefCode = (data) => {
          const groupedData = {};

          for (const item of data) {
            const { defCode } = item;

            if (!groupedData[defCode]) {
              // Create a new parent object for the first occurrence of defCode
              groupedData[defCode] = {
                defCode,
                items: [item],
              };
            } else {
              // Add the item to the existing parent object
              groupedData[defCode].items.push(item);
            }
          }

          // Convert the groupedData object into an array of parent objects
          const result = Object.values(groupedData);
          reports.value =  Object.values(groupedData)
          return result;
        }
          reports.value =   filterByCurrentYearEndDate(unfiltered_array).then( async(data)=> {
            reports.value = data
           await firstFunction()
           await secondFunction()
           await groupByDefCode(reports.value)
          })
          
          }).then(() => {

            generating.value = false
            
          })

          
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'Rejected', detail: 'You have cancelled the process', life: 3000 });
        }
    });
 }
 const calculateTotalSum = () => {
  let totalSum = 0;

  // Loop through the main objects
  reports.value.forEach(mainObject => {
    // Loop through the "items" array within each main object
    mainObject.items.forEach(item => {
      // Add the "total" value to the totalSum
      totalSum += item.total;
    });
  });

  return totalSum;
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
    button.p-button.p-component.p-button-outlined.mt-2.md\:mt-0 {
    width: 135px;
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
    .borderrangu {
    border: solid 1px #c3c3c3;
    margin-top: 15px !important;
    }
    table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table, th, td {
            border: 1px solid #ccc;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        .table-header {
            background-color: #f2f2f2;
            font-weight: bold;
        }

        .text-900.toalam {
            font-size: 30px;
            font-weight: 900;
        }
  
  </style>