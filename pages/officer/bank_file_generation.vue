<template>
    <NuxtLayout name="dashboard">
     <section class="section">
             <div class="container-fluid pt-5">
                 <div class="row">
                     <div class="text-900 font-medium text-xl mb-3">Bank File Generation</div>
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
                                <InputText v-model="reference" type="text" class="w-full md:w-15rem" placeholder="Enter Reference" />
                            </div>
                            <div class="flex align-items-center">
                                <Calendar v-model="payment_date" :manualInput="false" />
                            </div>
                            <div class="flex align-items-center">
                              <Button :disabled="!reference || !selectedCompanyRules || !payment_date || !selectedCompany" v-if="generating === false" @click="generateFile()" label="Generate Bank File" icon="pi pi-plus" class="p-button p-component p-button-secondary  w-auto" />
                              <Button v-else label="Generating" icon="pi pi-spin pi-spinner" class="p-button p-component p-button-secondary  w-auto" disabled/>
                            </div>
                            <InlineMessage v-if="no_records === true"  :style="{margin: '5px',  border: 'solid #696cff', borderWidth: '0 0 0 6px', color: '#696cff' }"
                              severity="error" class="border-primary w-full justify-content-start">
                              <div class="flex align-items-center">
                                  <img alt="logo" src="/images/sage.png" width="32" />
                                  <div class="ml-2">No records for the set parameters</div>
                              </div>
                          </InlineMessage>
                                
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
                <Button @click="generateFile()" label="Generate Report" icon="pi pi-plus" />
        </Dialog>
        <Dialog v-model:visible="custom_export_table" @show="TableFiller" modal header="Custom Export Table" :style="{ width: '75vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }" maximizable>
                                
                                <div class="card-style">
                                    <div id="dataTableContainer" class="modlas">
                                       
                                    </div>
                                </div>
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
import { empty } from "@prisma/client/runtime/library";

    
  
    // definePageMeta({ 
    //     middleware: ["auth"]
    // });
 const toast = useToast();
 const confirm = useConfirm()
 const adminStore = useAdminStore()
 const authStore = useAuthStore()
 const addPeriod = ref(false)
 const custom_export_table = ref(false)
 const sageStore = useSageStore()
 const records = ref()
 const reference = ref()
 const payment_date = ref()
 const my_error = storeToRefs(sageStore).errorInformation
 const originator_id = storeToRefs(authStore).id
 const selectedCompany = ref()
 const companies = ref()
 const no_records = ref(false)
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
 let headers = ref([]);
 onMounted( async () => {
    let result = sageStore.getSageCompanies().then((data) => {
      companies.value = data?.data?.data?.data
    })
 })

 const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'ZWL' });
};

const getOriginator = async () => {
  let result:any = await authStore.me()
  return result?.user?.id
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
 const TableFiller = () => {
            let users =  records.value
                console.log(users);
                
                let headersRaw: void[] | string[] = Object.keys(users[0]);
                headersRaw = headersRaw.map(header => {
                    let _header = header.split('_')
                                        .map(word => {
                                            return word.slice(0, 1) 
                                                       .toUpperCase() + word.slice(1);
                                        })
                                        .join(' ');
                    return _header;
                });
                headers.value = headersRaw;
                console.log(headers.value);
    
                //Add the data table
                addDataTable(users);
    
                //load DataTable
                let _$: any = $;
                _$('#table').DataTable({ 
                    dom: 'Bfrtip',
                    pageLength: 10, 
                    buttons: [ 
                        'pageLength',
                        {
                            extend: 'colvis',
                            collectionLayout: 'fixed columns',
                            collectionTitle: 'Column visibility control'
                        },
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ],
                    keys: true,
                    scrollX: true
                });
        }
        const addDataTable = (employees) => {
            
            let headerEl = "";
            headerEl += '<th></th>';
            headerEl += '<th></th>';
            headerEl += '<th></th>';
            headerEl += '<th></th>';
            headerEl += '<th></th>';
           
           


            let rows = '';

            

            employees.forEach((employee: any)=>{
                rows += `
                    <tr>
                        <td>${employee.displayName}</td>
                        <td>${employee.accountNo ? convertToString(employee.accountNo) : ""}</td>
                        <td>${employee.branchCode}</td>
                        <td>${employee.paymentAmount}</td>
                        <td>${reference.value}</td>
                    
                    </tr>
                `;
            });

            const table = `
                <table id="table" class="table table-striped table-responsive" style="width: 100%">
                    <thead>
                        <tr>
                            ${headerEl}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>    
            `;
            function padWithZeros(number) {
            const numString = number.toString();
            const numZerosToAdd = 6 - numString.length;
            const paddedString = "0".repeat(numZerosToAdd) + numString;
            return paddedString;
            }
            function convertToString (my_string){
                let converted = my_string.toString()
                return converted
            }
            function dateConverter (isoDate){
               
                const date = new Date(isoDate);

                const day = date.getUTCDate().toString().padStart(2, "0");
                const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
                const year = date.getUTCFullYear().toString();
                const formattedDate = `${day}/${month}/${year}`;

                return formattedDate
            }
            
            $("#dataTableContainer").html(table);
            console.log("my table",table)
        };
        const filterByCompanyRuleIDs = (filteredData, ids) => {
              console.log("data filtered by company',filteredData",ids)
              records.value = filteredData.filter((obj) => ids.includes(obj.companyRuleID));
              console.log("data filter by company rule id", reports.value);
              return filteredData.filter((obj) => ids.includes(obj.companyRuleID));
            }
 const generateFile = async () => {
    
    confirm.require({
        header: 'Generating Confirmation',
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          addPeriod.value = false
          generating.value = true
          let report = await sageStore.bankFileGeneration(selectedCompany.value,payment_date.value).then((data)=> {
             console.log(data.data.data.data)
             records.value = data.data.data.data
             filterByCompanyRuleIDs(records.value,selectedCompanyRules.value)
          }).then(() => {

            if(records.value.length) {
              console.log("recordsssssssssssssss",records.value)
              custom_export_table.value = true
              no_records.value = false
              generating.value = false
            } else {
               no_records.value = true
               generating.value = false
            }
           
            
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