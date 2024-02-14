<template>
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div class="parent-container">
            <img width="180" src="/images/logo.png" alt="Logo">
        </div>
        <div class=" px-4 py-8 md:px-6 lg:px-8">
        <div class="text-900 font-medium text-xl mb-3">Membership Application Form</div>
        <p class="m-0 mb-4 p-0 text-600 line-height-3 mr-3">Member Details</p>
        <div class="surface-card p-4 shadow-2 border-round">
            <div class="grid formgrid p-fluid">
            <div class="field mb-4 col-6">
                <label for="nickname2" class="font-medium text-900">First Name/s</label>
                <input v-model="first_name" class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text">
                <small style="color:red">Required</small>
            </div>
            <div class="field mb-4 col-6">
                <label for="nickname2" class="font-medium text-900">Last Name</label>
                <input v-model="last_name" class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text">
                <small style="color:red">Required</small>
            </div>
            <div class="field mb-4 col-3">
                <label for="nickname2" class="font-medium text-900">Title</label>
                <DropDown v-model="selected_titles" :options="titles" placeholder="Select Title" class="w-full md:12" />
                <small style="color:red">Required</small>
            </div>
            <div class="field mb-4 col-3">
                <label for="nickname2" class="font-medium text-900">Date of Birth</label>
                <Calendar v-model="date_of_birth" :maxDate="maxDate" class="w-full md:12" />
                <small style="color:red">Required</small>
            </div>
            <div class="field mb-4 col-3">
                <InlineMessage v-if="valid_id === false" severity="warn">ID Number is not valid Zimbabwean ID</InlineMessage>
                <label for="nickname2" class="font-medium text-900">ID Number</label>
                <input @keyup="isValidZimbabweanID()" v-model="id_number" class="p-inputtext p-component" placeholder="e.g 15-225668V75" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text">
                <small style="color:red">Required</small>
            </div>
            <div class="field mb-4 col-3">
                <label for="nickname2" class="font-medium text-900">Gender</label>
                <DropDown v-model="selected_gender" :options="gender" placeholder="Select Gender" class="w-full md:12" />
                <small style="color:red">Required</small>
            </div>
            <div class="field mb-4 col-12">
                <label for="nickname2" class="font-medium text-900">Cell Number</label>
                <MazPhoneNumberInput
                    v-model="cell_number"
                    v-model:country-code="countryCode"
                    show-code-on-list
                    :preferred-countries="['ZW', 'ZA', 'DE', 'US', 'GB']"
                    @update="cell_validation = $event,console.log(cell_validation.isValid)"
                />
                <small style="color:red">Required</small>
            </div>
            <div class="field mb-4 col-12 md:col-6">
                <label for="city2" class="font-medium text-900">National ID(Upload Photo)</label>
                <FileUpload :auto="true" mode="basic" style="width: fit-content;" name="photo" url="/emerald/upload" @upload="onAdvancedUpload($event)"  accept="image/*" :maxFileSize="5000000"/>
                <small style="color:red">Required</small>
                <Carousel v-if="uploaded_images.length > 0" :value="uploaded_images" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
                    <template #item="slotProps">
                        <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
                            <div class="mb-3">
                                <img :src="`images/${slotProps.data.image_url}`" class="w-6 shadow-2" />
                            </div>
                        </div>
                    </template>
                </Carousel>
            </div>
            <div class="field mb-4 col-6">
                <label for="nickname2" class="font-medium text-900">Physical Address</label>
                <Textarea v-model="physical_address" rows="5" cols="30" />
                <small style="color:red">Required</small>
            </div>
            <div class="field mb-4 col-6">
                <label for="nickname2" class="font-medium text-900">Place of Birth</label>
                <input v-model="place_of_birth" class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text">
            </div>
            <div class="field mb-4 col-6">
                <label for="nickname2" class="font-medium text-900">Marital Status</label>
                <DropDown v-model="selected_marital_status" :options="marital_status" placeholder="Select Marital Status" class="w-full md:12" />
                <small style="color:red">Required</small>
            </div>
            <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
            <div class="field mb-4 col-12 md:col-12">
                <p class="m-0 mb-4 p-0 text-600 line-height-3 mr-3">Employment Details</p>
            </div>
            <div class="field mb-4 col-6">
                <label for="nickname2" class="font-medium text-900">Employer Name</label>
                <input v-model="employer_name" class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text">
                
            </div>
            <div class="field mb-4 col-6">
                <label for="nickname2" class="font-medium text-900">Contact Numbers</label>
                <input v-model="contact_number" class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text">
            </div>
            <div class="field mb-4 col-6">
                <label for="nickname2" class="font-medium text-900">Occupation</label>
                <input v-model="occupation" class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text">
            </div>
            <div class="field mb-4 col-6">
                <label for="nickname2" class="font-medium text-900">Department</label>
                <input v-model="department" class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text">
            </div>
            <div class="field mb-4 col-6">
                <label for="nickname2" class="font-medium text-900">E.C Work Number</label>
                <input v-model="ec_number" class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text">
            </div>
            <div class="field mb-4 col-6">
                <label for="nickname2" class="font-medium text-900">Station Name</label>
                <input v-model="station_number" class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text">
            </div>
            <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
            <div class="field mb-4 col-6">
                <Button @click="add_dependent_modal = true" class="mb-4" label="Add Dependent" icon="pi pi-plus" />
                <Dialog v-model:visible="add_dependent_modal" modal header="Add Dependent" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                    <div class="p-dialog-content" data-pc-section="content">
                    <form class="flex flex-column gap-3 mt-3">
                        <div class="flex gap-3">
                        <div class="w-full">
                            <label for="cvc" class="block mb-1 text-color text-base">First Name</label>
                            <input v-model="dependent_first_name" class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" name="cvc" type="text" id="cvc">
                            <small style="color:red">Required</small>
                        </div>
                        <div class="w-full">
                            <label for="expiration" class="block mb-1 text-color text-base">Last Name</label>
                            <input v-model="dependent_last_name" class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" name="exp" type="text" id="expiration">
                            <small style="color:red">Required</small>
                        </div>
                        </div>
                        <div class="flex gap-3">
                        <div class="w-full">
                            <label for="cardholder" class="block mb-1 text-color text-base">Gender</label>
                          <DropDown v-model="selected_dependent_gender" :options="gender" placeholder="Select Gender" class="w-full md:12" />
                          <small style="color:red">Required</small>
                        </div>
                        <div class="w-full">
                            <label for="expiration" class="block mb-1 text-color text-base">Relationship to Principal</label>
                            <DropDown v-model="selected_relationship_to_principal" :options="relationships" placeholder="Select Relationship" class="w-full md:12" />
                            <small style="color:red">Required</small>
                        </div>
                        </div>
                        <div>
                        <label for="credit-card" class="block mb-1 text-color text-base">Date of Birth</label>
                        <span class="p-input-icon-left w-full">
                            <Calendar @date-select="findAge()" v-model="dependent_dob" :maxDate="maxDate" class="w-full md:12" />
                            <small style="color:red">Required</small>
                        </span>
                        </div>
                        <div v-if="is_over_eighteen === true">
                        <InlineMessage v-if="dependent_valid_id === false" severity="warn">ID Number must be in the format (15-225668V75)</InlineMessage>
                        <label for="credit-card" class="block mb-1 text-color text-base">ID Number</label>
                        <span class="p-input-icon-left w-full">
                            <i class="pi pi-credit-card"></i>
                            <input @keyup="isValidZimbabweanIDDependent()" v-model="dependent_id_number" class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" name="cc" type="text" id="credit-card" placeholder="14-155115A51">
                            <small style="color:red">Required</small>
                        </span>
                        </div>
                    </form>
                    </div>
                    <div class="p-dialog-footer" data-pc-section="footer">
                    <div class="border-top-1 surface-border pt-3 flex">
                        <button @click="add_dependent_modal = false" class="p-button p-component p-button-outlined w-6 mr-2" type="button" aria-label="Cancel" data-pc-name="button" data-pc-section="root" data-pd-ripple="true">
                        <span class="p-button-icon p-button-icon-left pi pi-times" data-pc-section="icon"></span>
                        <span class="p-button-label" data-pc-section="label">Cancel</span>
                        <!---->
                        <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
                        </button>
                        <Button @click="addToDependents()" class="p-button p-component w-6 ml-2" :disabled="
                        !dependent_first_name ||
                        !dependent_last_name ||
                        !selected_dependent_gender ||
                        !selected_relationship_to_principal ||
                        !dependent_dob ||
                        (is_over_eighteen && (!dependent_id_number || dependent_valid_id === false))
                    "  label="Save" />
                    </div>
                    </div>
                </Dialog>
            </div>
            <div class="field mb-4 col-12">
                <DataTable :value="dependents">
                <template #header>
                    <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                        <span class="text-xl text-900 font-bold">Dependecies</span>
                    </div>
                </template>
                <Column  header="First Name">
                    <template #body="slotProps">
                        {{ slotProps.data.first_name }}
                    </template>
                </Column>
                <Column  header="Last Name">
                    <template #body="slotProps">
                        {{ slotProps.data.last_name }}
                    </template>
                </Column>
                <Column  header="Gender">
                    <template #body="slotProps">
                        {{ slotProps.data.gender }}
                    </template>
                </Column>
                <Column  header="Date of Birth">
                    <template #body="slotProps">
                        {{ slotProps.data.dob }}
                    </template>
                </Column>
                <Column  header="ID Number">
                    <template #body="slotProps">
                        {{ slotProps.data.id_number }}
                    </template>
                </Column>
                <Column  header="Relationship">
                    <template #body="slotProps">
                        {{ slotProps.data.relationship }}
                    </template>
                </Column>
                <Column  header="Status">
                    <template #body="slotProps">
                        <Button @click="removefromDependency(slotProps.index)" icon="pi pi-trash" severity="danger" aria-label="Cancel" />
                    </template>
                </Column>
            </DataTable>
            </div>
            <div class="field mb-4 col-6">
                <label for="nickname2" class="font-medium text-900">Package Type</label>
                <DropDown v-model="selected_package_type" :options="package_types" placeholder="Select Package Type" class="w-full md:12" />
            </div>
            <div class="field mb-4 col-6">
                <label for="nickname2" class="font-medium text-900">Package Details</label>
                <DropDown v-model="selected_package_details" :options="package_details" placeholder="Select Package Details" class="w-full md:12" />
            </div>
            <div class="field mb-4 col-12">
                <label for="nickname2" class="font-medium text-900">Have you/your dependants suffered/ or is suffering from any of the following?(Tick boxes that apply)</label>
                <div v-for="category of categories" :key="category.key" class="tyr flex align-items-center">
                <Checkbox v-model="selectedCategories" :inputId="category.key" name="category" :value="category.name" />
                <label class="clabel" :for="category.key">{{ category.name }}</label>
            </div>
            </div>
            <div class="field mb-4 col-12">
                <label for="nickname2" class="font-medium text-900">IS THERE ANY HEALTH INFORMATION ABOUT YOU OR YOUR DEPENDANTS THAT YOU MAY WANT TO SHARE WITH US?</label>
                <Textarea v-model="other_information" rows="5" cols="30" />
            </div>
            <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
            <div class="field mb-4 col-12 md:col-12">
                <p class="m-0 mb-4 p-0 text-600 line-height-3 mr-3">Previous Medical Aid Cover Details</p>
            </div>
            <div class="field mb-4 col-3">
                <label for="nickname2" class="font-medium text-900">Society Name</label>
                <input v-model="society_name" class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text">
            </div>
            <div class="field mb-4 col-3">
                <label for="nickname2" class="font-medium text-900">Package Name</label>
                <input v-model="package_name" class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text">
            </div>
            <div class="field mb-4 col-3">
                <label for="nickname2" class="font-medium text-900">From Date</label>
                <Calendar v-model="from_date" class="w-full md:12" />
            </div>
            <div class="field mb-4 col-3">
                <label for="nickname2" class="font-medium text-900">To Date</label>
                <Calendar v-model="to_date" class="w-full md:12" />
            </div>
            <div class="field mb-4 col-12">
            <label for="visibility" class="block font-normal text-900 mb-2">Terms & Conditions</label>
            <div class="flex align-items-center">
                <Checkbox v-model="checked" :binary="true" />
                <span class="ml-2 font-normal text-base text-color-primary">By submitting, you aknowledge that you have read and understood, and agree to Emerald Medical Aid <a href="http://emerald.devpreview.net/?page_id=64">Terms and Conditions</a></span>
            </div>
            </div>
            <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
            <div class="flex col-12">
                <div class="col-6">
                <Button @click="navigateTo('https://emeraldmas.com', {external: true})" label="Cancel/Back"/>
                </div>
                <div class="col-6">
                <Button :loading="loading" @click="submitApplication()" label="Send Application" icon="pi pi-file" :disabled="!first_name || !last_name || !selected_titles || !date_of_birth || !id_number || valid_id === false || !selected_gender || cell_validation.isValid === false || !physical_address || !selected_marital_status || uploaded_images.length < 1 || checked === false" />
                </div>
            </div>
           
            </div>
        </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import { useFormStore } from "~~/stores/form";
import { useToast } from "primevue/usetoast";

const toast = useToast()
const formStore = useFormStore()
const add_dependent_modal = ref(false)
const first_name = ref()
const last_name = ref()
const selected_titles = ref()
const countryCode = ref('ZW')
const date_of_birth = ref()
const checked = ref(false)
const cell_validation = ref()
const valid_id = ref()
const dependent_valid_id = ref()
const id_number = ref()
const selected_gender = ref()
const membership_number = ref()
const cell_number = ref()
const dependent_dob = ref()
const physical_address = ref()
const place_of_birth = ref()
const other_information = ref()
const society_name = ref()
const package_name = ref()
const from_date = ref()
const to_date = ref()
const selected_marital_status = ref()
const loading = ref(false)
const employer_name = ref()
const contact_number = ref()
const occupation = ref()
const department = ref()
const ec_number = ref()
const minDate = ref(new Date());
const maxDate = ref(new Date());
const station_number = ref()
const dependent_first_name = ref()
const dependent_last_name = ref()
const selected_dependent_gender = ref()
const dependent_id_number = ref()
const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);
const gender = ref(['MALE', 'FEMALE','OTHER'])
const selected_title = ref()
const titles = ref(['MR','MRS','MISS'])
const selected_package_type = ref()
const selected_relationship_to_principal = ref()
const uploaded_images = ref<any>([])
const selected_package_details = ref()
const relationships = ref(["Son", "Daughter", "Spouse", "Mother", "Father", "Other"])
const package_types = ref(['INDIVIDUAL'])
const package_details = ref(['EXECUTIVE','PLATINUM'])
const marital_status = ref([
  'SINGLE',
  'MARRIED',
  'DIVORCED',
  'COMMON_LAW',
  'WIDOWED',
  'SEPARATED'
])
const dependents = ref([])
const categories = ref([
    {name: "HYPETENSION", key: "A"},
    {name: "EPILEPSY", key: "B"},
    {name: "RENAL", key: "C"},
    {name: "LUNG", key: "D"},
    {name: "BLOOD DISEASES", key: "E"},
    {name: "STROKE", key: "F"},
    {name: "CANCER", key: "G"},
    {name: "LIVER", key: "H"},
    {name: "PSYCHATRIC", key: "I"},
    {name: "OTHER", key: "J"},
]);
const is_over_eighteen = ref(false)
const selectedCategories = ref([]);
const findAge = () => {
    console.log("ageeeeeeeeeee",dependent_dob.value)
    const providedDate:any = new Date(dependent_dob.value);

    // Get the current date
    const currentDate:any = new Date();
    // Calculate the difference in milliseconds between the current date and the provided date
    const differenceMs = currentDate - providedDate;
    // Calculate the difference in years
    const differenceYears = differenceMs / (1000 * 60 * 60 * 24 * 365.25);
    is_over_eighteen.value = differenceYears >= 18;
    return differenceYears >= 18;
}
const addToDependents = () => {
    let data = {
        first_name: dependent_first_name.value,
        last_name: dependent_last_name.value,
        dob: dependent_dob.value,
        gender: selected_dependent_gender.value,
        id_number: dependent_id_number.value,
        relationship: selected_relationship_to_principal.value
    }
    dependents.value.push(data)
    dependent_first_name.value = null
    dependent_dob.value = null
    is_over_eighteen.value = false
    dependent_last_name.value = null
    selected_dependent_gender.value = null
    selected_relationship_to_principal.value = null
    dependent_id_number.value = null
    add_dependent_modal.value = false
    dependent_valid_id.value = null
}
const removefromDependency = (data) => {
    console.log(data)
    dependents.value.splice(data, 1);
}
const onAdvancedUpload = async (event:any) => {
        let {upload:{attachment_name},success} = await JSON.parse(event.xhr.response)
        if(success){
            toast.add({ severity: 'success', summary: 'Upload Success', detail: "Succesfully Uploaded Image", life: 5000 });
            let new_image:any = {
                image_url: attachment_name
            }
            console.log("adding new image")
            uploaded_images.value.push(new_image)
            console.log("new array is ",uploaded_images.value)
        }else {
            toast.add({ severity: 'warn', summary: 'Upload Failed', detail: "Failed to upload image", life: 5000 });
        }
 };

const  isValidZimbabweanID = () => {
  // Define the regular expression pattern
  const regex = /^\d{2}-\d{5,7}[A-Z]\d{2}$/;

  // Test the given ID number against the pattern
  valid_id.value = regex.test(id_number.value);
  return regex.test(id_number.value);
}
const  isValidZimbabweanIDDependent = () => {
  // Define the regular expression pattern
  const regex = /^\d{2}-\d{5,7}[A-Z]\d{2}$/;

  // Test the given ID number against the pattern
  dependent_valid_id.value = regex.test(dependent_id_number.value);
  return regex.test(id_number.value);
}
const submitApplication = () => {
    loading.value = true;
    let data = {
        first_name: first_name.value,
        last_name: last_name.value,
        title: selected_titles.value,
        date_of_birth: date_of_birth.value,
        id_number: id_number.value,
        gender: selected_gender.value,
        membership_number:membership_number.value,
        cell_number: cell_number.value,
        physical_address: physical_address.value,
        id_photos: uploaded_images.value,
        place_of_birth: place_of_birth.value,
        marital_status: selected_marital_status.value,
        employer_name: employer_name.value,
        employer_contact_number: contact_number.value,
        occupation: occupation.value,
        department: department.value,
        ec_number: ec_number.value,
        station_number: station_number.value,
        depandancy: dependents.value,
        package_type: selected_package_type.value,
        package_details: selected_package_details.value,
        previous_ailments: selectedCategories.value,
        other_information: other_information.value,
        previous_society_name: society_name.value,
        previous_package_name: package_name.value,
        from_date: from_date.value,
        to_date: to_date.value
    }

    let result = formStore.submitIndividualForm(data).then( async(data)=> {
       if(data.data.success) {
        loading.value = false
        toast.add({ severity: 'info', summary: 'Details Succesfully Sent', detail: "Navigating to Website", life: 3000 });
        await navigateTo('https://www.emeraldmas.com/', {
        external: true
        })
       }
       else{
        loading.value = false
        toast.add({ severity: 'error', summary: 'Failed to sent data', detail: data.data.message, life: 3000 });
        }
    })
}
</script>
<style>
.custom-shadow-2 {
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 5px 10px 0 rgba(41,61,102,.2);
    border: 1px solid #e1e8f5;
    padding: 24px 20px;
}
.parent-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 28vh;
}
input.p-inputtext.p-component {
    width: 100%;
}
img.image-height.block.w-full.border-round-top {
    height: 400px;
}
.tyr.flex.align-items-center {
    margin-top: 10px;
}
label.clabel {
    margin-left: 10px;
}
</style>