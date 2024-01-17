<template>
    <NuxtLayout name="dashboard">
     <section class="section">
             <div class="container-fluid pt-5">
                 <div class="row">
                     <div class="text-900 font-medium text-xl mb-3">Generate Report</div>
                     <div class="surface-card p-4 shadow-2 border-round p-fluid">
                      <InlineMessage v-if="my_error === false"  :style="{margin: '5px',  border: 'solid #696cff', borderWidth: '0 0 0 6px', color: '#696cff' }"
                              severity="error" class="border-primary w-full justify-content-start">
                          <div class="flex align-items-center">
                              <img alt="logo" src="/images/sage.png" width="32" />
                              <div class="ml-2">Could not connect to you Sage server. Contact your IT adminstrator</div>
                          </div>
                      </InlineMessage>
                         <div class="grid formgrid p-fluid">
                          <div class="flex flex-wrap gap-3">
                            <div class="flex align-items-center">
                              <DropDown v-model="selectedCompany" :options="companies" optionLabel="companyDisplay" optionValue="companyID" placeholder="Select a Company" class="w-full md:w-14rem" />
                            </div>
                            <div class="flex align-items-center">
                              <Calendar v-model="date_range" selectionMode="range" :manualInput="false" />
                              <label for="ingredient4" class="ml-2">Pick Range</label>
                            </div>
                            <div class="flex align-items-center">
                              <Button v-if="getting_company_rules === false" v-bind="{'disabled': date_range === null}"  @click="getActiveCompanyRules()" label="Get Company Rules" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" outlined />
                              <Button v-else label="Generating" icon="pi pi-spin pi-spinner" class="p-button p-component p-button-secondary  w-auto" disabled/>
                            </div>
                            <div class="flex align-items-center">
                              <MultiSelect v-model="selectedCompanyRules" display="chip" :options="company_rules" optionValue="companyRuleID" optionLabel="longDescription" placeholder="Select Company Rule/s" class="w-full md:w-15rem" />
                            </div>
                            <div class="flex align-items-center">
                              <MultiSelect v-model="selectedCompanyDefinitions" display="chip" :options="company_definitions" optionValue="defCode" optionLabel="longDescription" placeholder="Select Definition" class="w-full md:w-15rem" />
                            </div>
                            <div class="flex align-items-center">
                              <Button v-if="generating === false" @click="addPeriod = true" label="Generate Report" icon="pi pi-plus" class="p-button p-component p-button-secondary  w-auto" />
                              <Button v-else label="Generating" icon="pi pi-spin pi-spinner" class="p-button p-component p-button-secondary  w-auto" disabled/>
                            </div>
                            
                        </div>
                             <div v-if="reports"  class="field mb-4 col-12 md:col-12"> 
                                 
                                 <div v-if="reports.length > 0"  class="surface-card grid grid-nogutter border-round borderrangu">
                                  <div class="col-12 flex p-2 surface-100 border-round-top">
                                    <div class="p-2 flex-auto text-center md:text-left">
                                      <span class="text-700 block">Requisition for Cheque On:</span>
                                      <span class="text-900 font-medium block mt-2">{{ reports ? reports[0]?.items[0]?.companyName : "NOT SET" }}</span>
                                    </div>
                                    <div class="p-divider p-component p-divider-vertical p-divider-solid p-divider-center h-full mx-0 lg:mx-3" role="separator" aria-orientation="vertical" data-pc-name="divider" data-pc-section="root" style="align-items: center;">
                                      <!---->
                                    </div>
                                    <div class="p-2 flex-auto text-center md:text-left">
                                      <span class="text-700 block">In favour of:</span>
                                      <DropDown v-model="in_favour_of"  :options="favour_companies" filter @change="onCompanySelected" optionLabel="company_name" optionValue="company_name" placeholder="Select Company" class="w-full md:w-14rem" />
                                    </div>
                                    <div class="p-divider p-component p-divider-vertical p-divider-solid p-divider-center h-full mx-0 lg:mx-3" role="separator" aria-orientation="vertical" data-pc-name="divider" data-pc-section="root" style="align-items: center;">
                                      <!---->
                                    </div>
                                    <div class="p-2 flex-auto text-center md:text-left">
                                      <span class="text-700 block">Address:</span>
                                      <InputText v-model="address" type="text"  placeholder="Address" />
                                    </div>
                                    <div class="p-divider p-component p-divider-vertical p-divider-solid p-divider-center h-full mx-0 lg:mx-3" role="separator" aria-orientation="vertical" data-pc-name="divider" data-pc-section="root" style="align-items: center;">
                                      <!---->
                                    </div>
                                    <div class="p-2 flex-auto text-center md:text-left">
                                      <span class="text-700 block">Cheque Number:</span>
                                      <InputText v-model="cheque_number"  type="text"  placeholder="Cheque Number" />
                                    </div>
                                    <div class="p-divider p-component p-divider-vertical p-divider-solid p-divider-center h-full mx-0 lg:mx-3" role="separator" aria-orientation="vertical" data-pc-name="divider" data-pc-section="root" style="align-items: center;">
                                      <!---->
                                    </div>
                                    <div class="p-2 flex-auto text-center md:text-left">
                                      <span class="text-700 block">Date:</span>
                                      <Calendar v-model="date" />
                                    </div>
                                    <div class="p-divider p-component p-divider-vertical p-divider-solid p-divider-center h-full mx-0 lg:mx-3" role="separator" aria-orientation="vertical" data-pc-name="divider" data-pc-section="root" style="align-items: center;">
                                      <!---->
                                    </div>
                                    <div class="p-2 flex-auto text-center md:text-left">
                                      <span class="text-700 block">Cheque Amount</span>
                                      <span class="text-900 font-medium block mt-2">{{ reports ? formatCurrency(calculateTotalSum()) : formatCurrency(0) }}</span>
                                    </div>
                                  </div>
                                  <div class="col-12 flex p-2 surface-100 border-round-top">
                                    <div class="p-2 flex-auto text-center md:text-left">
                                      <span class="text-700 block">Reason for Payment:</span>
                                      <InputText v-model= "reason"  type="text"  placeholder="Reason" />
                                    </div>
                                    <div class="p-divider p-component p-divider-vertical p-divider-solid p-divider-center h-full mx-0 lg:mx-3" role="separator" aria-orientation="vertical" data-pc-name="divider" data-pc-section="root" style="align-items: center;">
                                      <!---->
                                    </div>
                                  </div>
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
                                  <Button @click="createRequisition()" label="Create Request" icon="pi pi-plus" :disabled="!in_favour_of || !address || !cheque_number || !date || !reason" />
                                </div>
                             </div>
                            </div> 
                     
                     </div>
                 </div>
             </div>
         </section>
         <Dialog v-model:visible="addPeriod" maximizable modal header="Add Period" position="top" :style="{ width: '75vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Period</label> 
                        <InputNumber v-model="periodID" inputId="minmax" :min="1" :max="12" />
                    </div>
                    <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                </div>
                <Button @click="generateReport()" label="Generate Report" icon="pi pi-plus" />
        </Dialog>
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
 const my_error = storeToRefs(sageStore).errorInformation
 const originator_id = storeToRefs(authStore).id
 const selectedCompany = ref()
 const companies = ref()
 const favour_companies = storeToRefs(sageStore).favour_companies
 const getting_company_rules = ref(false)
 const company_rules = ref()
 const unfiltered_data = ref()
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
 onMounted( async () => {
    let result = sageStore.getSageCompanies().then((data) => {
      companies.value = data?.data?.data?.data
    })
    let centers  = await sageStore.getAllCompanies()
 })

 const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'ZWL' });
};

const getOriginator = async () => {
  let result:any = await authStore.me()
  return result?.user?.id
}
const onCompanySelected = () => {
  const company = favour_companies.value.find(
        (c) => c.company_name === in_favour_of.value
  );
  reason.value = company ? `${company.bank_name} - ACCOUNT NUMBER ${company.account_number}`: null;
  address.value = company ? company.address : null;
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
          console.log("data filtered by year match",filteredData)
          return filteredData;
          }
          const filterByCompanyRuleIDs = (filteredData, ids) => {
            console.log("data filtered by company',filteredData",filteredData)
            unfiltered_data.value = filteredData
            console.log("data filtered by company',filteredData",ids)
            reports.value = filteredData.filter((obj) => ids.includes(obj.companyRuleID));
            console.log("data filter by company rule id", reports.value);
            return filteredData.filter((obj) => ids.includes(obj.companyRuleID));
          }
          const filterByDefinitionCodes = (selectedObjects, definitionCodes) => {
              reports.value = selectedObjects.filter((obj) => definitionCodes.includes(obj.defCode));
              console.log("data filter by definition", reports.value)
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
          console.log("group by definition codes",reports.value)
          return result;
        }

          
          reports.value =  filterByCurrentYearEndDate(unfiltered_array).then( async(data)=> {
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
  
  </style>