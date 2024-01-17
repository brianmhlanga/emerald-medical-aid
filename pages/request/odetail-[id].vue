<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-5">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Create Requisition</div>
                    <ul class="list-none p-0 m-0 flex flex-column md:flex-row budget">
                        <li class="relative mr-0 md:mr-8 flex-auto">
                            <div class="border-1 surface-border surface-card border-round p-3 flex flex-column md:flex-row align-items-center z-1">
                            <i class="pi pi-chart-pie text-green-500 text-2xl md:text-4xl mb-2 md:mb-0 mr-0 md:mr-3"></i>
                            <div>
                                <div class="text-900 font-medium mb-1">Yearly Budget</div>
                                <span class="text-600 text-sm hidden md:block">{{ yearlyBudget ? formatCurrency(yearlyBudget) : formatCurrency(0) }}</span>
                            </div>
                            </div>
                            <div class="w-full absolute top-50 left-100 surface-300 hidden md:block" style="transform: translateY(-50%); height: 2px;"></div>
                        </li>
                        <li class="relative mr-0 md:mr-8 flex-auto">
                            <div class="border-2 border-blue-500 surface-card border-round p-3 flex flex-column md:flex-row align-items-center z-1">
                            <i class="pi pi-chart-line text-blue-600 text-2xl md:text-4xl mb-2 md:mb-0 mr-0 md:mr-3"></i>
                            <div>
                                <div class="text-blue-600 font-medium mb-1">Remaining Budget</div>
                                <span class="text-600 text-sm hidden md:block">{{remainingBudget ? formatCurrency(remainingBudget): formatCurrency(0)}}</span>
                            </div>
                            </div>
                            <div class="w-full absolute top-50 left-100 surface-300 hidden md:block" style="transform: translateY(-50%); height: 2px;"></div>
                        </li>
                        <li class="relative flex-auto">
                            <div class="border-1 surface-border surface-card border-round p-3 flex flex-column md:flex-row align-items-center z-1">
                            <i class="pi pi-dollar text-600 text-2xl md:text-4xl mb-2 md:mb-0 mr-0 md:mr-3"></i>
                            <div>
                                <div class="text-900 font-medium mb-1">Current Total</div>
                                <span class="text-600 text-sm hidden md:block">{{requisition_lines.length > 0 ? formatCurrency(calculateTotal()) : formatCurrency(0)}}</span>
                            </div>
                            </div>
                        </li>
                    </ul>
                    <div class="surface-card p-4 shadow-2 border-round p-fluid">
                        <div class="grid formgrid p-fluid">
                            <div v-if="popDisplay" class="field mb-12 col-12 md:col-12"> 
                            <div class="flex align-items-start p-4 bg-green-100 border-round border-1 border-green-300">
                            <i class="pi pi-check-circle text-green-900 text-2xl mr-3"></i>
                            <div class="mr-3">
                                <div class="text-green-900 font-medium text-xl mb-2 line-height-1">{{ popDisplayName }}</div>
                                <p class="m-0 p-0 text-green-700 line-height-3">{{ popDisplayDescription }}</p>
                            </div>
                            <div class="ml-auto">
                                <a @click="popDisplay = false" class="inline-flex align-items-center justify-content-center ml-auto border-circle hover:bg-green-50 no-underline cursor-pointer transition-colors transition-duration-150 p-ripple" style="width: 1.5rem; height: 1.5rem;">
                                <i class="pi pi-times text-green-900"></i>
                                <span class="p-ink" role="presentation" aria-hidden="true"></span>
                                </a>
                            </div>
                            </div>
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="company_name" class="font-medium text-900">Requesting Employee</label> 
                                <Button type="button" :label="full_name()" icon="pi pi-user" class="p-button-warning"/>
                             </div>
                             <div class="field mb-4 col-12 md:col-6"> 
                                <label for="customer_email" class="font-medium text-900">Requisition Type</label> 
                                <DropDown  @change="checkRouting(selected_type)" v-model="selected_type" optionValue="id" optionLabel="name"  :options="requestion_type"  placeholder="Select requisition type"  />
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="invoice_id" class="font-medium text-900">Routing ID</label> 
                                <input v-model="routing_id" class="p-inputtext p-component" id="invoice_id" type="text" placeholder="NO ROUTING AVAILABLE FOR THIS ORIGINATOR" disabled> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="invoice_id" class="font-medium text-900">Approver Id</label> 
                                <InputText v-model="approver_id" :value="checkApprover()" class="p-inputtext p-component" id="invoice_id" type="text" placeholder="NO ROUTING AVAILABLE FOR THIS ORIGINATOR" disabled/> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="invoice_id" class="font-medium text-900">Approver Name</label> 
                                <InputText v-model="next_approver_name" class="p-inputtext p-component" id="invoice_id" type="text" placeholder="NO ROUTING AVAILABLE FOR THIS ORIGINATOR" disabled/> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="customer_name" class="font-medium text-900">Contract Number</label> 
                                <input class="p-inputtext p-component" id="customer_name" type="text"> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="customer_email" class="font-medium text-900">SYSPRO Contract</label> 
                                <input class="p-inputtext p-component" id="customer_email" type="text"> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="customer_email" class="font-medium text-900">Requisition Number</label> 
                                <input class="p-inputtext p-component" id="customer_email" type="text"> 
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="company_name" class="font-medium text-900">Delivery Address</label> 
                                <DropDown   v-model="address_id" optionValue="id" optionLabel="description"  :options="addresses"  placeholder="Select Address">
                                    <template #header>
                                        <div class="d-flex justify-content-center">
                                            <Button  @click="addAddress = true" class="mt-3" label="New Address" icon="pi pi-plus" size="small" outlined />
                                        </div>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div>{{ slotProps.option.description }}</div>
                                        </div>
                                    </template>
                                </DropDown>
                                <!-- <DropDown v-model="address_id" optionValue="id" :options="addresses" optionLabel="name" placeholder="Select Address" class="w-full md:w-14rem">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value" class="flex align-items-center">
                                            <div>{{ slotProps.value.description }}</div>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #header>
                                        <div class="d-flex justify-content-center">
                                            <Button  @click="addAddress = true" class="mt-3" label="New Address" icon="pi pi-plus" size="small" outlined />
                                        </div>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div>{{ slotProps.option.description }}</div>
                                        </div>
                                    </template>
                                </DropDown> -->
                                <!-- <DropDown optionLabel="code" optionValue="id" v-model="address_id"  :options="addresses"  placeholder="Select Delivery Address"  /> -->
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="company_name" class="font-medium text-900">Due Date</label> 
                                <Calendar v-model="due_date"  showIcon />
                            </div>
                            <div class="field mb-4 col-12 md:col-6"> 
                                <label for="company_name" class="font-medium text-900">Requisition Total</label> 
                                <div class="text-900 text-2xl font-700 my-3 font-bold">{{requisition_lines.length > 0 ? formatCurrency(calculateTotal()) : formatCurrency(0)}}</div>
                            </div>
                            
                            <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                          
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Add item" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" outlined />
                            </div>
                            <div class="field mb-4 col-12 md:col-12"> 
                                <label for="customer_name" class="font-medium text-900">Requisition Lines</label> 
                                <DataTable :value="requisition_lines" showGridlines tableStyle="min-width: 50rem">
                                    <Column field="price" header="Item">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.stock_code}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Description">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.description}}
                                        </template>
                                    </Column>
                                    <Column header="Quantity">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.quantity}} Units
                                        </template>
                                    </Column>
                                    <Column header="Price">
                                        <template #body="slotProps">
                                            {{formatCurrency(slotProps?.data?.price)}}
                                        </template>
                                    </Column>
                                    <Column header="Total">
                                        <template #body="slotProps">
                                            {{formatCurrency((slotProps?.data?.price)*(slotProps?.data?.quantity))}}
                                        </template>
                                    </Column>
                                    <Column header="Actions">
                                        <template #body="slotProps">
                                            <Button @click="removeRequest(slotProps.index)" icon="pi pi-trash" outlined rounded class="mr-2"/>
                                            <Button @click="editRequest(slotProps.index)" icon="pi pi-pencil" outlined rounded class="mr-2"/>
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                            <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                            <div class="field mb-4 col-12"> <label for="notes" class="font-medium text-900">Comments</label>
                                <Editor v-model="comments" editorStyle="height: 320px" />
                            </div>
                            <div class="field mb-4 col-12"> <label for="notes" class="font-medium text-900">Attachments</label>
                                <FileUpload class="upload" name="attachment" url="/requisitions/attachments" @upload="onAdvancedUpload($event)" :multiple="false" accept="application/pdf" :maxFileSize="1000000">
                                    <template #empty>
                                        <p>Upload Attachment</p>
                                    </template>
                                </FileUpload>
                                <label v-if="attachments.length>0" for="customer_name" class="font-medium text-900">Attachments</label> 
                                <DataTable v-if="attachments.length>0" :value="attachments" showGridlines tableStyle="min-width: 50rem">
                                    <Column field="price" header="Attachments">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.file_name}}
                                        </template>
                                    </Column>
                                    <Column header="Actions">
                                        <template #body="slotProps">
                                            <Button @click="removeAttachement(slotProps.index)" icon="pi pi-trash" outlined rounded class="mr-2"/>
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
      
                            <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                           </div>
                           <div v-if="calculateTotal() > remainingBudget"  class="flex align-items-start p-4 bg-yellow-100 border-round border-1 border-yellow-300 budgetwarning">
                                <i class="pi pi-exclamation-triangle text-yellow-900 text-2xl mr-3"></i>
                                <div class="mr-3">
                                    <div class="text-yellow-900 font-medium text-xl mb-2 line-height-1">Attention</div>
                                    <p class="m-0 p-0 text-yellow-700 mb-3 line-height-3">Your have exceeded the yearly budget for this cost center, please re-adjust your requisition or comment with reason for the overspending!!!</p>
                                </div>
                                <div class="ml-auto">
                                    <a class="inline-flex align-items-center justify-content-center ml-auto border-circle hover:bg-yellow-50 no-underline cursor-pointer transition-colors transition-duration-150 p-ripple" style="width: 1.5rem; height: 1.5rem;">
                                    <i class="pi pi-times text-yellow-900"></i>
                                    <span class="p-ink" role="presentation" aria-hidden="true"></span>
                                    </a>
                                </div>
                                </div>
                               <div class="row">
                                <div class="col-6">
                                   <Button @click="createRequest()" label="Create Request" icon="pi pi-file"  v-bind="{ 'disabled': !approver_id}" :class="{ 'p-button-secondary': !approver_id}"/>
                               </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Dialog v-model:visible="addLineItem" maximizable modal header="Line Item" position="top" :style="{ width: '75vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Stock Code</label> 
                        <input v-model="stock_code" class="p-inputtext p-component" id="company_name" type="text"> 
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Description</label> 
                        <input v-model="description" class="p-inputtext p-component" id="company_name" type="text"> 
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Long Description</label> 
                        <input v-model="long_description" class="p-inputtext p-component" id="company_name" type="text"> 
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Quantity</label> 
                        <InputNumber v-model="quantity" inputId="minmax" :min="1"/>
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Quantity UOM</label> 
                        <DropDown v-model="selected_quantity_uom" :options="uom_examples"  placeholder="Select UOM" class="w-full md:w-14rem" /> 
                    </div>
                    <!-- <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Currency</label> 
                        <input class="p-inputtext p-component" id="company_name" type="text"> 
                    </div> -->
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Price</label> 
                        <InputNumber v-model="price" inputId="currency-us" mode="currency" currency="ZAR" locale="en-US" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Price UOM</label> 
                        <DropDown v-model="selected_price_uom" :options="price_uoms"  placeholder="Select UOM" class="w-full md:w-14rem" /> 
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Order UOM</label> 
                        <DropDown v-model="selected_quantity_uom" :options="uom_examples"  placeholder="Select UOM" class="w-full md:w-14rem" />  
                    </div>
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label for="company_name" class="font-medium text-900">Reason for Requisition</label> 
                        <textarea v-model="reason_for_requisition" class="p-inputtextarea p-inputtext p-component p-inputtextarea-resizable" id="notes" rows="5" style="height: calc(133.6px); overflow: hidden;" data-lt-tmp-id="lt-407524" spellcheck="false" data-gramm="false"></textarea>
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                                <label for="company_name" class="font-medium text-900">Supplier</label>
                                <DropDown   v-model="supplier_id" optionValue="id" optionLabel="supplier_name"  :options="suppliers"  placeholder="Select Address">
                                    <template #header>
                                        <div class="d-flex justify-content-center">
                                            <Button  @click="addSupplier = true" class="mt-3" label="New Supplier" icon="pi pi-plus" size="small" outlined />
                                        </div>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div>{{ slotProps.option.supplier_name }}</div>
                                        </div>
                                    </template>
                                </DropDown>
                                <!-- <DropDown v-model="supplier_id" optionValue="id" :options="suppliers" optionLabel="name" placeholder="Select Address" class="w-full md:w-14rem">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value" class="flex align-items-center">
                                            <div>{{ slotProps.value.supplier_name}}</div>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #header>
                                        <div class="d-flex justify-content-center">
                                            <Button  @click="addSupplier = true" class="mt-3" label="New Address" icon="pi pi-plus" size="small" outlined />
                                        </div>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div>{{ slotProps.value.supplier_name}}</div>
                                        </div>
                                    </template>
                                </DropDown>  -->
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Ledger Code</label> 
                        <DropDown @change="getCommodities(selected_ledger)" v-model="selected_ledger"  :options="ledgers" filter optionLabel="ledger_code" optionValue="id" placeholder="Select General Ledger Code" class="w-full" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Commodity Code</label> 
                        <DropDown @change="getBuyer(commodity_code_id)" v-model="commodity_code_id"  :options="selected_commodities" filter optionLabel="code" optionValue="id" placeholder="Select Commodity ID" class="w-full" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Non-Conformance</label> 
                        <SelectButton v-model="non_conformance" :options="conformance_options" optionLabel="name" /> 
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Warehouse</label> 
                        <input v-model="warehouse" class="p-inputtext p-component" id="company_name" type="text"> 
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Discount Type</label> 
                        <input class="p-inputtext p-component" id="company_name" type="text"> 
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Discount Code</label> 
                        <input class="p-inputtext p-component" id="company_name" type="text"> 
                    </div>
                    <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                </div>
                <Button @click="addRequest()" label="Add Item" icon="pi pi-plus" />
        </Dialog>
        <Dialog v-model:visible="updateLineItem" maximizable modal header="Line Item" position="top" :style="{ width: '75vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Stock Code</label> 
                        <input v-model="stock_code" class="p-inputtext p-component" id="company_name" type="text"> 
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Description</label> 
                        <input v-model="description" class="p-inputtext p-component" id="company_name" type="text"> 
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Long Description</label> 
                        <input v-model="long_description" class="p-inputtext p-component" id="company_name" type="text"> 
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Quantity</label> 
                        <InputNumber v-model="quantity" inputId="minmax" :min="1"/>
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Quantity UOM</label> 
                        <DropDown v-model="selected_quantity_uom" :options="uom_examples"  placeholder="Select UOM" class="w-full md:w-14rem" /> 
                    </div>
                    <!-- <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Currency</label> 
                        <input class="p-inputtext p-component" id="company_name" type="text"> 
                    </div> -->
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Price</label> 
                        <InputNumber v-model="price" inputId="currency-us" mode="currency" currency="ZAR" locale="en-US" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Price UOM</label> 
                        <DropDown v-model="selected_price_uom" :options="price_uoms"  placeholder="Select UOM" class="w-full md:w-14rem" /> 
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Order UOM</label> 
                        <DropDown v-model="selected_quantity_uom" :options="uom_examples"  placeholder="Select UOM" class="w-full md:w-14rem" />  
                    </div>
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label for="company_name" class="font-medium text-900">Reason for Requisition</label> 
                        <textarea v-model="reason_for_requisition" class="p-inputtextarea p-inputtext p-component p-inputtextarea-resizable" id="notes" rows="5" style="height: calc(133.6px); overflow: hidden;" data-lt-tmp-id="lt-407524" spellcheck="false" data-gramm="false"></textarea>
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                                <label for="company_name" class="font-medium text-900">Supplier</label>
                                <DropDown   v-model="supplier_id" optionValue="id" optionLabel="supplier_name"  :options="suppliers"  placeholder="Select Address">
                                    <template #header>
                                        <div class="d-flex justify-content-center">
                                            <Button  @click="addSupplier = true" class="mt-3" label="New Supplier" icon="pi pi-plus" size="small" outlined />
                                        </div>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div>{{ slotProps.option.supplier_name }}</div>
                                        </div>
                                    </template>
                                </DropDown>
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Ledger Code</label> 
                        <DropDown @change="getCommodities(selected_ledger)" v-model="selected_ledger"  :options="ledgers" filter optionLabel="ledger_code" optionValue="id" placeholder="Select General Ledger Code" class="w-full" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Commodity Code</label> 
                        <DropDown @change="getBuyer(commodity_code_id)" v-model="commodity_code_id"  :options="selected_commodities" filter optionLabel="code" optionValue="id" placeholder="Select Commodity ID" class="w-full" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Non-Conformance</label> 
                        <SelectButton v-model="non_conformance" :options="conformance_options" optionValue="value" optionLabel="name" /> 
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Warehouse</label> 
                        <input v-model="warehouse" class="p-inputtext p-component" id="company_name" type="text"> 
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Discount Type</label> 
                        <input class="p-inputtext p-component" id="company_name" type="text"> 
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Discount Code</label> 
                        <input class="p-inputtext p-component" id="company_name" type="text"> 
                    </div>
                    <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                </div>
                <Button @click="updateRequest(current_index)" label="Update Item" icon="pi pi-plus" />
        </Dialog>
        <Dialog v-model:visible="addAddress" maximizable modal header="Create Address" position="top" :style="{ width: '75vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Address Code</label> 
                        <InputText v-model="address_code" placeholder="Address Code" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Address Description</label> 
                        <InputText v-model="address_description" placeholder="Description" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Address Number</label> 
                        <InputText v-model="address_number" placeholder="Address Number" />
                    </div>
                    <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                </div>
                <Button @click="createAddress()" label="Create Address" icon="pi pi-plus" />
        </Dialog>
        <Dialog v-model:visible="addSupplier" maximizable modal header="Create Supplier" position="top" :style="{ width: '75vw' }">
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
    import {useNormalStore} from "~/stores/normal"
    import { useAdminStore } from "~/stores/admin";
    
    const authStore = useAuthStore()
    const adminStore = useAdminStore()
    const normalStore = useNormalStore()
    const toast = useToast()
    const over_budget = ref(false)
    const addAddress = ref(false)
    const addSupplier = ref(false)
    const address_code = ref()
    const address_description = ref()
    const address_number = ref()
    const selected_commodity_id = ref()
    const approver_id = ref()
    const selected_commodities = storeToRefs(adminStore).selected_commodities
    const addLineItem = ref<boolean>(false)
    const suppliers = storeToRefs(adminStore).suppliers
    const selected_supplier = ref()
    const routing = storeToRefs(normalStore).routing
    const routing_id = storeToRefs(normalStore).routing
    const approvers = storeToRefs(normalStore).approvers
    const selected_type = ref<string>()
    const selected_quantity_uom = ref()
    const conformance_options = ref([
            { name: 'Comforming', value: true },
            { name: 'Not Conforming', value: false }
    ]);
    const uom_examples = ref(["Each (EA)",
    "Dozen (DZ)",
    "Box (BX)",
    "Case (CS)",
    "Pound (LB)",
    "Kilogram (KG)",
    "Gallon (GAL)",
    "Liter (L)",
    "Roll",
    "Cubic Meter (M3)",
    "Square Meter (M2)",
    "Pair (PR)",
    "Carton",
    "Ton (T)",
    "Meter (M)",
    "Liter per Minute (LPM)",
    "Square Foot (SF)",
    "Pallet",
    "Carat (CT)"])
    const selected_price_uom = ref()
    const price_uoms = ref([
    "Per Item",
    "Per Dozen",
    "Per Case",
    "Per Pound",
    "Per Kilogram",
    "Per Gallon",
    "Per Liter",
    "Per Meter",
    "Per Square Foot",
    "Per Hour",
    "Per Unit of Time",
    "Per Usage",
    "Per User",
    "Per Transaction",
    "Per Mile/Kilometer",
    "Flat Rate",
    "Tiered Pricing",
    "Cost Plus Percentage",
    "Negotiated Rate",
    "Subscription Fee",
    "Royalty Fee",
    "Lump Sum",
    "Per Seat",
    "Per Module/Feature",
    "Cost per Impression (CPM)"
])
    const comments = ref()
    const requestion_type = storeToRefs(adminStore).types
    const ledgers = storeToRefs(adminStore).ledgers
    const selected_ledger = ref()
    const selected_buyer = storeToRefs(adminStore).selected_buyer
    const full_name = () => authStore.userData.first_name + "  " + authStore.userData.last_name
    const originator_id = storeToRefs(authStore).user_id
    const cost_center_id = () => authStore?.userData?.cost_center?.id
    const address_id = ref()
    const popDisplay = ref(false)
    const updateLineItem = ref(false)
    const current_index = ref()
    const line_id = ref()
    const popDisplayName = ref()
    const popDisplayDescription = ref()
    const addresses = storeToRefs(adminStore).addresses
    const supplier_id = ref()
    const stock_code = ref()
    const yearlyBudget = storeToRefs(adminStore).yearlyBudget
    const remainingBudget = storeToRefs(adminStore).remainingBudget
    const budget_id = storeToRefs(adminStore).budget_id
    const description = ref()
    const commodity_access = () => authStore?.userData?.commodity_access
    const co_approver_count = ref()
    const long_description = ref()
    const commodity_code_id = ref()
    const quantity = ref()
    const { params: { id } } = useRoute();
    const order_uom = ref()
    const reason_for_requisition = ref()
    const price = ref()
    const requisition_id = ref()
    const price_uom = ref()
    const attachments =ref([])
    const next_approver_name = ref()
    const taxes = storeToRefs(adminStore).taxes
    const due_date = ref()
    const supplier_code = ref()
    const supplier_name = ref()
    const short_name = ref()
    const postal_code = ref()
    const tax_code_id = ref()
    const ledger_code = ref()
    const buyer_id = storeToRefs(adminStore).buyer_id
    const non_conformance = ref<boolean>(false)
    const warehouse = ref()
    const filteredAddresses = ref()
    const filteredSuppliers = ref()
    const requisition_lines = ref([])
    const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'ZAR' });
    };
    const search = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredAddresses.value = [...addresses.value];
        } else {
            filteredAddresses.value = addresses.value.filter((address) => {
                return address.code.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
    }
    const search_supplier = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredSuppliers.value = [...suppliers.value];
        } else {
            filteredSuppliers.value = suppliers.value.filter((supplier) => {
                return supplier.supplier_code.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
    }
    const createSupplier = async () => {
        let data = {
            supplier_code: supplier_code.value,
            supplier_name: supplier_name.value,
            short_name: short_name.value,
            postal_code: postal_code.value
        }
        let result = await adminStore.createSupplier(data)
        if (result.data.success) {
            toast.add({severity:'success', summary: 'Success', detail:'Supplier Succesfully Created', life: 3000});
            let centers  = await adminStore.getAllSuppliers()
            addSupplier.value = false
        }
        else {
            toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
        }
    }
    const onAdvancedUpload = (event) => {
        const { attachment:{attachment_name}, success, message } = JSON.parse(event.xhr.response);
         console.log({attachment_name})
        if(success){
            let file_object = {
                file_name: attachment_name
            }
            attachments.value.push(file_object)
            toast.add({ severity: 'success', summary: 'Documents successfully uploaded', detail: message, life: 5000 });
        }else {
            toast.add({ severity: 'warn', summary: 'Upload Failed', detail: message, life: 5000 });
        }
    };
    const checkRouting = async (string) => {
       popDisplayName.value = string
       let type = await adminStore.getType(string).then((data) => {
         console.log("my type darta",data.data.type)
         popDisplay.value = true
         popDisplayName.value = data?.data?.type?.name
         popDisplayDescription.value = data?.data?.type?.description
       })
       console.log("my string",string,authStore.userData.id)  
       setTimeout(() => {
        popDisplay.value = false;
        }, 5000);
       let data = {
            id: authStore.userData.id,
            type: string
        }
        let result = await normalStore.getRouting(data)
    }
    const editRequest = (index: number) => {
        updateLineItem.value = true
        current_index.value = index
        line_id.value = requisition_lines.value[index]?.id
        stock_code.value = requisition_lines.value[index]?.stock_code
        description.value =requisition_lines.value[index]?.description
        long_description.value = requisition_lines.value[index]?.long_description
        quantity.value = requisition_lines.value[index]?.quantity
        price.value = requisition_lines.value[index]?.price
        reason_for_requisition.value = requisition_lines.value[index]?.reason_for_requisition
        supplier_id.value = requisition_lines.value[index]?.supplier_id
        selected_ledger.value = requisition_lines.value[index]?.ledger_code
        getCommodities(selected_ledger.value)
        commodity_code_id.value = requisition_lines.value[index]?.commodity_code_id
        non_conformance.value = requisition_lines.value[index]?.non_conformance
        warehouse.value = requisition_lines.value[index]?.warehouse
        toast.add({ severity: 'success', summary: 'Success', detail: 'Line Removed', life: 3000 });
    }
    const updateRequest = (indexToUpdate) => {
  let conf = non_conformance.value;

  let updatedObject = {
    id: line_id.value,
    stock_code: stock_code.value,
    description: description.value,
    long_description: long_description.value,
    commodity_code_id: commodity_code_id.value,
    quantity: quantity.value,
    supplier_id: supplier_id.value?.id,
    order_uom: order_uom,
    reason_for_requisition: reason_for_requisition.value,
    price: price.value,
    price_uom: price_uom.value,
    tax_code_id: tax_code_id.value,
    ledger_code: selected_ledger.value,
    buyer_id: buyer_id.value,
    non_conformance: conf,
    warehouse: warehouse.value,
  };

  // Update the object at the specified index
  requisition_lines.value.splice(indexToUpdate, 1, updatedObject);

  // Reset any necessary state
  updateLineItem.value = false;

  // Display a success toast
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Line Updated',
    life: 3000,
  });

};
    const addRequest = () => {
    let conf:any = non_conformance.value
    let request_object = {
        stock_code: stock_code.value,
        description: description.value,
        long_description: long_description.value,
        commodity_code_id: commodity_code_id.value,
        quantity: quantity.value,
        supplier_id: supplier_id.value?.id,
        order_uom: order_uom,
        reason_for_requisition: reason_for_requisition.value,
        price: price.value,
        price_uom: price_uom.value,
        tax_code_id: tax_code_id.value,
        ledger_code: selected_ledger.value,
        buyer_id: buyer_id.value,
        non_conformance: conf?.value,
        warehouse: warehouse.value
    }
    requisition_lines.value.push(request_object)
    addLineItem.value = false
    toast.add({ severity: 'success', summary: 'Success', detail: 'Line Added', life: 3000 });
    console.log("new length",requisition_lines.value.length)
    }

    const createRequest = async () => {
        let data = {
            id: requisition_id.value,
            originator_id: originator_id.value,
            address_id: address_id.value.id,
            routing_id: routing_id.value,
            total: await calculateTotal(),
            comments: comments.value,
            over_budget:  await calculateTotal() > remainingBudget.value ? true : false ,
            budget_id: budget_id.value,
            approver_id: approver_id.value,
            co_approver_count: co_approver_count.value,
            due_date: due_date.value,
            attachments: attachments.value,
            requisition_lines: requisition_lines.value
        }
        
        let result = await adminStore.unDraftRequest(data)
        if (result.data.success) {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Requisition Moved From Drafts', life: 3000 });
            navigateTo('/request/myRequisitions')
        }
        else {
            toast.add({ severity: 'warn', summary: 'Failed', detail: result.data.message, life: 3000 });
        }
    }
    const createDraft = async () => {
        let data = {
            originator_id: originator_id.value,
            address_id: address_id.value.id,
            routing_id: routing_id.value,
            total: await calculateTotal(),
            comments: comments.value,
            approver_id: approver_id.value,
            co_approver_count: co_approver_count.value,
            due_date: due_date.value,
            attachments: attachments.value,
            requisition_lines: requisition_lines.value
        }
        
        let result = await adminStore.createDraft(data)
        if (result.data.success) {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Requisition Created', life: 3000 });
        }
        else {
            toast.add({ severity: 'warn', summary: 'Failed', detail: result.data.message, life: 3000 });
        }
    }
    const createAddress = async () => {
        let data = {
            code:  address_code.value,
            description: address_description.value,
            address_number: address_number.value
        }
        let result = await adminStore.createAddresses(data)
        if (result.data.success) {
            toast.add({severity:'success', summary: 'Success', detail:'Address Succesfully Created', life: 3000});
            let centers  = await adminStore.getAllAddresses()
            addAddress.value = false
        }
        else {
            toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
        }
    }

    const  calculateTotal = () => {
        let objectsArray = requisition_lines.value
        let total = 0;
        
        for (let i = 0; i < objectsArray.length; i++) {
            const object = objectsArray[i];
            const { price, quantity } = object;
            
            // Assuming price and quantity are numeric values
            total += price * quantity;
        }
        return total;
    }
    const getCommodities = async (id) => {
        console.log("get commodity",id)
        let commomidities = await adminStore.getSelectedCommodities(id,await commodity_access())
    }
    const getBuyer = async (id) => {
        console.log("get buyer",id)
        let buyer = await adminStore.getSingle(id)
    }
    const removeRequest = (index: number) => {
        requisition_lines.value.splice(index, 1);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Line Removed', life: 3000 });
    }
    const removeAttachement = (index: number) => {
        attachments.value.splice(index, 1);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Attachment Removed', life: 3000 });
    }
    const checkApprover = () => {
    let approver_array = approvers.value ? approvers.value : [];

    if (approver_array.length > 0) {
        const id = approver_array[0]?.profile.id || null;
        const first_name = approver_array[0]?.profile.name || null;
        const surname = approver_array[0]?.profile.surname || null;
        next_approver_name.value = `${first_name} ${surname}`
        approver_id.value = id;
        return id;
    } else {
        approver_id.value = null;
        return "NO APPROVER FOR THAT LEVEL";
    }
   };
//     const checkApprover = () => {
//     let approver_array = approvers.value ? approvers.value : [];
//     let total = calculateTotal();

//     if (approver_array.length > 0) {
//         const approver = approver_array.find(approver => total <= approver.threshold);
//         let id = approver ? approver.profile.id : null;

//         if (!approver) {
//             // If no co-approver with appropriate threshold found, fall back to first approver in the array
//             const firstApprover = approver_array.find(approver => approver.is_co_approver);
//             id = firstApprover ? firstApprover.profile.id : null;
//         }
//         co_approver_count.value = 0
//         approver_id.value = id;
//         return id;
//     } else {
//         approver_id.value = null;
//         return "NO APPROVER FOR THAT LEVEL";
//     }
// };

// Usage example

    onMounted(async()=> {
        let ledgers = await adminStore.getAllLedgers()
        let types  = await adminStore.getAllTypes()
        let suppliers = await adminStore.getAllSuppliers()
        let addresses = await adminStore.getAllAddresses()
        let taxes = await adminStore.getAllTaxes()
        let budget = await adminStore.getBudget(await cost_center_id())
        let result = await adminStore.getSingleRequest(id).then((data) => {
            let req = data.data.pending
            requisition_id.value = req?.id
            console.log(req)
            routing_id.value = req?.routing_id
            due_date.value = req?.due_date
            address_id.value = req?.address_id
            requisition_lines.value = req?.lines
            attachments.value = req?.attachments
            yearlyBudget.value = req?.originator?.normal_profile?.cost_center?.budget?.yearlyBudget
            remainingBudget.value = req?.originator?.normal_profile?.cost_center?.budget?.remainingBudget
            selected_type.value = req?.routing?.type?.id
            checkRouting(selected_type.value)
        })
    })
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
  .budgetwarning {
    margin-bottom: 15px;
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
    img.p-fileupload-file-thumbnail {
    display: none;
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
    ul.list-none.p-0.m-0.flex.flex-column.md\:flex-row.budget {
    margin-bottom: 10px !important;
    }
  
  </style>