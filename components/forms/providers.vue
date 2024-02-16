<template>
    <CommonMenubar />
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
    <div class="flex justify-content-between flex-wrap">
        <div class="flex align-items-center mb-4 md:mb-0">
        <div class="text-900 font-bold text-3xl">Service Providers</div>
        <span class="p-badge p-component ml-3 bg-gray-200 text-gray-900 p-0 border-circle" data-pc-name="badge" data-pc-section="root">{{ number_of_records ? number_of_records : 0 }}</span>
        </div>
        <div>
        </div>
    </div>
    <p class="text-600 text-xl">You can search through the service providers, and filters through using Name of provider, Province or Town/City.</p>
    <div class="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left" role="separator" aria-orientation="horizontal" data-pc-name="divider" data-pc-section="root" styleclass="w-full border-gray-200" style="justify-content: center;">
        <!---->
    </div>
    <div class="grid grid-nogutter align-items-center">
        <MultiSelect @change="searchType()" v-model="selected_provider_type" :options="provider_types" placeholder="Select Provider Type" :maxSelectedLabels="3" class="w-full md:w-20rem mr-2" />
        <InputText @keyup="searchText()" v-model="text_to_search" class="w-full md:w-20rem mr-2" placeholder="Search with Provider Name" />
        <MultiSelect @change="searchProvince()" v-model="selected_provinces" :options="provinces" placeholder="Select Province" :maxSelectedLabels="3" class="w-full md:w-20rem mr-2" />
        <MultiSelect @change="searchTown()" v-model="selected_towns" :options="towns" placeholder="Select Town" :maxSelectedLabels="3" class="w-full md:w-20rem mr-2" />
        <div class="col-12 mt-3">
            <div class="grid -mt-3 -ml-3 -mr-3 align-items-center justify-content-center lg:justify-content-start">
            <div v-for="provider in providers" class="xs:col-12 sm:col-6 lg:col-3 p-0">
                <div class="surface-card m-3 border-round shadow-2">
                <div class="flex flex-column w-full p-4">
                    <span class="text-900 font-medium text-xl border-200 pb-2" style="border-bottom: 1px solid;">{{provider?.name}}</span>
                    <span class="text-600 border-200 pb-2 pt-2" style="border-bottom: 1px solid;">
                    <i class="pi pi-fw pi-briefcase mr-2 text-2xl" ></i>{{provider?.type}}
                    </span>
                    <span class="text-600 border-200 pb-2 pt-2" style="border-bottom: 1px solid;">
                    <i class="pi pi-fw pi-home mr-2 text-2xl" ></i>{{provider?.address}}
                    </span>
                    <span class="text-600 border-200 pb-2 pt-2" style="border-bottom: 1px solid;">
                    <i class="pi pi-fw pi-phone mr-2 text-2xl" ></i>{{provider?.contact}}
                    </span>
                    <span class="text-600 border-200 pb-2 pt-2" style="border-bottom: 1px solid;">
                    <i class="pi pi-fw pi-building mr-2 text-2xl" ></i>{{provider?.town}}
                    </span>
                    <span class="text-600 border-200 pb-2 pt-2" style="border-bottom: 1px solid;">
                    <i class="pi pi-fw pi-map-marker mr-2 text-2xl" ></i>{{provider?.province}}
                    </span>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    <Paginator  @page="changeArray()" v-model:first="first" v :rows="items_per_page" :totalRecords="number_of_records ? number_of_records : 0"></Paginator>
    </div>
</template>
<script setup lang="ts">
import { useFormStore } from "~~/stores/form";
import { useToast } from "primevue/usetoast";

const toast = useToast()
const formStore = useFormStore()
const number_of_records = ref(0)
const providers = ref([])
const first = ref(0)
const items_per_page = ref(12)
const selected_provider_type = ref()
const text_to_search = ref()
const provider_types = ref([
    "Ambulance services",
    "General Practiotioner",
    "Opticians",
    "Dentist",
    "Pharmacy",
    "Xrays and Scans",
    "Gynecologist",
    "Hospital",
    "Ophthalmologist / Eye Specialist",
    "Obstetrician & Gynecologist",
    "Specialist Obstetrics and Gynaecologist",
    "Ophtalmologist/ Eye Specialist",
    "Specialist Physician",
    "Cancer Specialist",
    "Ophtalmologist Eye Specialist",
    "General Surgeon",
    "Medical Centre",
    "General & Plastics Surgeon",
    "Physician",
    "Obtsetrian and gynaecologist",
    "Radiology",
    "Paediastrician",
    "Eye Specialist",
    "Physio Therapist",
    "Optometrists",
    "Physiotherapist",
    "Specialist Trauma & Orthopaedics",
    "Consultant Specialist Surgeon",
    "Ear, nose and throat Clinic",
    "Specialists Centre",
    "Eye Specialists",
    "Laboratory",
    "Clinic",
    "Hospital",
    "General practiotioner",
    "General Practitioner",
    "Optician",
    "Physiotherapists",
    "Physiotherapy",
    "Specialist Surgeon",
    "Surgeon",
    "Anaesthetist",
    "Oncologist",
    "Cardiologist",
    "optician",
    "Pathology",
    "Hospital",
    "psychologist",
    "Ambulance",
    "Paediatrician",
    "Genera practitioner"
])
const selected_provinces = ref()
const provinces = ref([
    "Harare",
    "Mashonaland West",
    "Midlands",
    "Matabeleland North",
    "Bulawayo",
    "Matebeleland North",
    "Masvingo",
    "Mashonaland",
    "Manicaland",
    "Matabeleland South",
    "Mashonaland East",
    "Mashonaland Central"
  ]);
const selected_towns = ref()
const towns = ref([
    "Harare",
    "Bulawayo",
    "Kwekwe",
    "Gweru",
    "Mutare",
    "Masvingo",
    "Chitungwiza",
    "Norton",
    "Murombedzi",
    "Mhondoro",
    "Chegutu",
    "Kadoma",
    "Sanyati",
    "Gokwe",
    "Nkayi",
    "Dete",
    "Maphisa",
    "Shurugwi",
    "Mberengwa",
    "Zvishavane",
    "Mvuma",
    "Esigodini",
    "Plumtree",
    "Tsholotsho",
    "Filabusi",
    "Gwanda",
    "Victoria falls",
    "Binga",
    "Lupane",
    "Hwange",
    "Chiredzi",
    "Chivu",
    "Murambinda",
    "Gutu",
    "Ngundu",
    "Jerera",
    "Chivi",
    "Nyika",
    "Rutenga",
    "Beitbridge",
    "Nyabira",
    "Banket",
    "Chinhoyi",
    "Karoi",
    "Kariba",
    "Ruwa",
    "Goromonzi",
    "Wedza",
    "Marondera",
    "Macheke",
    "Rusape",
    "Nyanga",
    "Nyazura",
    "Honde",
    "Watsomba",
    "Nyanyadzi",
    "Birchenough bridge",
    "Chipinge",
    "Chimanimani",
    "Checheche",
    "Murewa",
    "Mutawatawa",
    "Mutoko",
    "Domboshava",
    "Guruve",
    "Bindura",
    "Shamva",
    "Mt Darwin",
    "Concession",
    "Mvurwi",
    "Glendale"
  ])
const searchType = async () => {
    if (selected_provider_type.value.length > 0) {
        let data  = {
        my_params: selected_provider_type.value,
        first: first.value,
        last: items_per_page.value
    }
    let search_result = await formStore.searchType(data).then((result) => {
        providers.value = result?.data?.profile
        number_of_records.value = result?.data?.total
    })
    } else {
        let data = {
        first: 0,
        last: items_per_page.value
    }
    let providerss = formStore.allProviders(data).then((result)=> {
        console.log("providers",result)
        providers.value = result?.data?.profile
        number_of_records.value = result?.data?.total
    })
    }
    
}
const searchProvince = async () => {
    if (selected_provinces.value.length > 0) {
        let data  = {
        my_params: selected_provinces.value,
        first: first.value,
        last: items_per_page.value
    }
    let search_result = await formStore.searchProvince(data).then((result) => {
        providers.value = result?.data?.profile
        number_of_records.value = result?.data?.total
    })
    } else {
        let data = {
        first: 0,
        last: items_per_page.value
    }
    let providerss = formStore.allProviders(data).then((result)=> {
        console.log("providers",result)
        providers.value = result?.data?.profile
        number_of_records.value = result?.data?.total
    })
    }
    
}
const searchText = async () => {
    if(text_to_search.value != null) {
        let data  = {
        my_params: text_to_search.value,
        first: first.value,
        last: items_per_page.value
        }
        let search_result = await formStore.searchName(data).then((result) => {
            providers.value = result?.data?.profile
            number_of_records.value = result?.data?.total
        })
    } else {
        let data = {
        first: 0,
        last: items_per_page.value
        }
        let providerss = formStore.allProviders(data).then((result)=> {
            console.log("providers",result)
            providers.value = result?.data?.profile
            number_of_records.value = result?.data?.total
        })
    }
}
const searchTown = async () => {
    if (selected_towns.value.length > 0) {
        let data  = {
        my_params: selected_towns.value,
        first: first.value,
        last: items_per_page.value
    }
    let search_result = await formStore.searchTown(data).then((result) => {
        providers.value = result?.data?.profile
        number_of_records.value = result?.data?.total
    })
    } else {
        let data = {
        first: 0,
        last: items_per_page.value
    }
    let providerss = formStore.allProviders(data).then((result)=> {
        console.log("providers",result)
        providers.value = result?.data?.profile
        number_of_records.value = result?.data?.total
    })
    }
    
}
const changeArray = async () => {
    let data = {
        first: first.value,
        last: items_per_page.value
    }
    let providerss = formStore.allProviders(data).then((result)=> {
        providers.value = result?.data?.profile
        number_of_records.value = result?.data?.total
    })
}
onMounted(() => {
    let data = {
        first: 0,
        last: items_per_page.value
    }
    let providerss = formStore.allProviders(data).then((result)=> {
        console.log("providers",result)
        providers.value = result?.data?.profile
        number_of_records.value = result?.data?.total
    })
})
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