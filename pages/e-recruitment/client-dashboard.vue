<template>
    <NuxtLayout name="dashboard">
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                    <div class="title mb-30">
                        <h2>E-Recruitment Recruitee Portal</h2>
                    </div>
                    </div>
                    <!-- end col -->
                    <div class="col-md-6">
                        <div class="breadcrumb-wrapper mb-30">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="#">E-Recruitment</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                E-Recruitment
                            </li>
                            </ol>
                        </nav>
                        </div>
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- <div class="card-style middle">
                        <h5 class="toptext">Personal Details</h5>
                <div class="grid p-fluid">
                    <div class="col-4 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="First Name"/>
                          
                            <InputText v-model="firstname" placeholder="Enter Your First Name"/>
                        </div>
                    </div>
                    <div class="col-4 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="Last Name"/>
                            <InputText v-model="lastname" placeholder="Enter Your Last Name"/>
                        </div>
                    </div>
                    <div class="col-4 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="Email Address"/>
                            <InputText v-model="email" placeholder="Enter Your Email Address"/>
                        </div>
                    </div>
                    <div class="col-4 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="Gender"/>
                            <DropDown v-model="selected_gender" :options="gender" optionLabel="name" optionValue="name" placeholder="Select Your Gender" />
                        </div>
                    </div>
                    <div class="col-4 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="Nationality"/>
                            <AutoComplete v-model="selectedCountry" placeholder="Select Your Country" :suggestions="filteredCountries" @complete="searchCountry($event)" :dropdown="true" optionLabel="name" forceSelection>
                                <template #item="slotProps">
                                    <div class="country-item">
                                        <div class="ml-2">{{slotProps.item.name}}</div>
                                    </div>
                                </template>
                            </AutoComplete>
                        </div>
                    </div>
                    <div class="col-4 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="ID Number"/>
                            <InputText v-model="id_number" placeholder="Enter Your ID Number"/>
                        </div>
                    </div>
                    <div class="col-4 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="Date of Birth"/>
                            <Calendar inputId="dateformat" v-model="date_of_birth" dateFormat="mm-dd-yy" />
                        </div>
                    </div>
                    <div class="col-4 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="Phone Number"/>
                            <InputText v-model="phone" placeholder="Enter Your Phone"/>
                        </div>
                    </div>
                    <div class="col-4 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="Ethnic Background"/>
                            <DropDown v-model="selected_ethnicity" :options="ethnicity" optionLabel="name" optionValue="name" placeholder="Select Your Ethnicity" />
                        </div>
                    </div>
                    <div class="col-4 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="Province"/>
                            <InputText v-model="province" placeholder="Enter Your Province"/>
                        </div>
                    </div>
                    <div class="col-4 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="City"/>
                            <InputText v-model="city" placeholder="Enter Your City"/>
                        </div>
                    </div>
                    <div class="col-4 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="Availability Time Frame"/>
                            <DropDown v-model="selected_availability" :options="availability" optionLabel="name" optionValue="name" placeholder="Select Your Availability Period" />
                        </div>
                    </div>
                    <div class="col-4 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="Expected Salary"/>
                            <InputNumber inputId="currency-us" placeholder="Enter Your Salary" v-model="expected_salary" mode="currency" currency="USD" locale="en-US" />
                        </div>
                    </div>
                    <div class="col-4 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="Disablity"/>
                            <DropDown v-model="selected_disability" :options="disability" optionLabel="name" optionValue="name" placeholder="Select Your Disability Category" />
                        </div>
                    </div>
                    <div class="col-4 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="Employment Status"/>
                            <DropDown v-model="selected_employment_status" :options="employment_status" optionLabel="name" optionValue="name" placeholder="Select Your Current Employment Staus" />
                        </div>
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="Personal Strength"/>
                            <Chips v-model="personal_strength" />
                        </div>
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="Technical Skills"/>
                            <Chips v-model="technical_skills" />
                        </div>
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="p-inputgroup">
                            <SelectButton v-model="selected_conviction" :options="convictions" optionLabel="name" />
                        </div>
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="p-inputgroup">
                            <Editor v-model="address" placeholder="Enter your address here" editorStyle="height: 100px"/>
                        </div>
                    </div>
                    <div v-if="id" class="col-12 md:col-12">
                            <Button @click="updatePersonalDetails()" label="Update Profile Information" v-bind="{ 'disabled': !firstname || !lastname || !email || !selected_gender || !selectedCountry || !id_number || !date_of_birth || !phone || !selected_ethnicity || !province || !city || !selected_availability || !expected_salary || !selected_disability || !selected_employment_status || !selected_conviction || !address || !personal_strength || !technical_skills}" :class="{ 'p-button-secondary': !firstname || !lastname || !email || !selected_gender || !selectedCountry || !id_number || !date_of_birth || !phone || !selected_ethnicity || !province || !city || !selected_availability || !expected_salary || !selected_disability || !selected_employment_status || !selected_conviction || !address || !personal_strength || !technical_skills  }"/>
                    </div>
                </div>
            </div> -->
            <div class="card-style middle">
                        <h5 class="toptext">Upload Resume</h5>
                <div v-if="!id" class="grid p-fluid">
                <div class="col-12 md:col-12">
                    <p>Please update your personal information first to be able to upload your resume</p>
                </div>
                </div>
                <div v-if="id" class="grid p-fluid">
                    <div class="col-12 md:col-12">
                        <div class="p-inputgroup">
                            <FileUpload name="attachment" :multiple="true" :url="`/recruitment/upload?id=${id}`" @upload="onUpload($event)" accept="image/*,.pdf" :maxFileSize="10000000">
                                <template #empty>
                                    <p>Drag and drop files to here to upload.</p>
                                </template>
                            </FileUpload>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-style middle">
                        <h5 class="toptext">Search Filters</h5>
                <div class="grid p-fluid">
                    <div class="col-6 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="What"/>
                            <InputText placeholder="What job are you looking for?"/>
                        </div>
                    </div>
                    <div class="col-6 md:col-4">
                        <div class="p-inputgroup">
                            <Button label="Where"/>
                            <InputText placeholder="Which location would you prefer"/>
                        </div>
                    </div>
                    <div class="col-12 md:col-4">
                            <Button label="Search"/>
                    </div>
                </div>
            </div>
			<div class="card-style">
			<div class="row">
            
            <div v-if="!resume" class="card-style middle">
                <h5 class="toptext">Job Posts</h5>
                <div  class="grid p-fluid">
                <div class="col-12 md:col-4">
                    <p>Please upload your resume to view the current jobs on offer</p>
                </div>
                </div>
            </div>
            
			<Card v-if="resume" v-for="indicator in products" :key="indicator.id" style="width: 20em">
           
            <template #title>
                {{ indicator.title}}
            </template>
            <template #subtitle>
				<div class="row">
					<Chip :label="(indicator.deadline.slice(0,10))" icon="pi pi-clock" class="mr-2 mb-2" />
					<Chip :label="indicator.location" icon="pi pi-map-marker" class="mr-2 mb-2" />
					<Chip :label="indicator.salary+` USD`" icon="pi pi-money-bill" class="mr-2 mb-2" />
					<Chip :label="indicator.experience+` years`" icon="pi pi-money-bill" class="mr-2 mb-2" />
				</div>
            </template>
            <template #content>
                <ScrollPanel style="width: 250px; height: 200px">
                    <p v-html="indicator.description"></p>
                    <ScrollTop target="parent" :threshold="100" class="custom-scrolltop" icon="pi pi-arrow-up" />
                </ScrollPanel>
            </template>
            <template #footer>
            <Button class="applybutton" icon="pi pi-inbox" @click="createApplication(indicator.id)" label="Apply" />
            </template>
        </Card>
	    </div>
	    </div>
        </div>
    </NuxtLayout>
</template>
    
<script setup lang="ts">
    import {useAuthStore} from "~~/stores/auth";
    import {useRecruitmentStore} from "~~/stores/recruitment";
    import {FilterService,FilterMatchMode} from 'primevue/api';
    import { storeToRefs } from "pinia";
    import Swal from 'sweetalert2';
    import CountryService from '~~/services/CountryService';
    import { useToast } from 'primevue/usetoast';
    import auth from "~~/middleware/auth";
    

    definePageMeta({
        middleware: "auth"
    });

    let applicant_id: Number = null; 

    const toast = useToast();
    const authStore = useAuthStore();
    const recruitmentStore = useRecruitmentStore();
    
    const id = storeToRefs(authStore).id
    const post_id = storeToRefs(recruitmentStore).postId
    const personal_strength = storeToRefs(recruitmentStore).personal_strength;
    const technical_skills = storeToRefs(recruitmentStore).technical_skills
    const portal_id = storeToRefs(recruitmentStore).id
    const resume = storeToRefs(recruitmentStore).resume
    const firstname = storeToRefs(recruitmentStore).firstname;
    const lastname = storeToRefs(recruitmentStore).lastname;
    const email = storeToRefs(recruitmentStore).email;
    const gender = storeToRefs(recruitmentStore).gender;
    const selected_gender = storeToRefs(recruitmentStore).selected_gender
    const id_number = storeToRefs(recruitmentStore).id_number;
    const phone = storeToRefs(recruitmentStore).phone;
    const ethnicity = storeToRefs(recruitmentStore).ethnicity;
    const selected_ethnicity = storeToRefs(recruitmentStore).selected_ethnicity;
    const province = storeToRefs(recruitmentStore).province;
    const city = storeToRefs(recruitmentStore).city;
    const countryService = ref(new CountryService());
    const date_of_birth = storeToRefs(recruitmentStore).date_of_birth;
    const availability = storeToRefs(recruitmentStore).availability;
    const selected_availability = storeToRefs(recruitmentStore).selected_availability
    const disability = storeToRefs(recruitmentStore).disability;
    const selected_disability = storeToRefs(recruitmentStore).selected_disability;
    const employment_status = storeToRefs(recruitmentStore).employment_status;
    const selected_employment_status = storeToRefs(recruitmentStore).selected_employment_status
    const expected_salary = storeToRefs(recruitmentStore).expected_salary;
    const countries = storeToRefs(recruitmentStore).countries
    const address = storeToRefs(recruitmentStore).address
    const selectedCountry = storeToRefs(recruitmentStore).selectedCountry;
    const convictions = storeToRefs(recruitmentStore).convictions;
    const selected_conviction = storeToRefs(recruitmentStore).selected_conviction
    const products = storeToRefs(recruitmentStore).vacancyList;
    const filteredCountries = ref();
    const layout = ref('grid');
    const sortKey = ref();
    const sortOrder = ref();
    const sortField = ref();
    const sortOptions = ref([
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'},
    ]);

    const searchCountry = (event) => {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    filteredCountries.value = [...countries.value];
                }
                else {
                    filteredCountries.value = countries.value.filter((country) => {
                        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                    });
                }
            }, 250);
        };
    const onUpload = async (event) => {
        let { user: { id } } = await authStore.me();
        applicant_id = id;

        let applicant_personal_info = await authStore.getPersonalInfo().then((data) => {
            resume.value = data?.data?.profile_info?.resume
        });
        toast.add({severity: 'success', summary: 'Success', detail: 'Resume Uploaded Succesfully', life: 5000});
    }
    const createPost =  async () => {
            let result =  await recruitmentStore.createJobPost();
            if(result.data.success){
                      Swal.fire({
                    title: 'Awesome',
                    text: 'Job Post Succesfully Created',
                    icon: 'success',
                    confirmButtonText: 'Done'})
                
                }else{
                   Swal.fire({
                    title: 'Error!',
                    text: result.data.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                    })
                }
    };

   
    const createApplication =  async (postingId) => {
        let check = await authStore.checkIfApplied(postingId);
        if (check.data.status.length === 0 ) {
            console.log("now trying to start exam")
        let result =  await authStore.createApplication(postingId);
        if(result.data.success){
            console.log("please navigate to exam")
            navigateTo(`/e-recruitment/exam-${postingId}-${id.value}`);
            toast.add({severity: 'success', summary: 'Success', detail: 'Application Initiated Please Complete The Exam', life: 8000});
            
            }else{
            toast.add({severity: 'error', summary: 'Error!', detail: result.data.message, life: 5000});
            }
        }
        if (check?.data?.status[0]?.applicantId === id.value) {
            toast.add({severity: 'warn', summary: 'Already Applied', detail: 'You have already applied to this vacancy', life: 5000});
        }
       
        
    };

    const updatePersonalDetails =  async () => {
           
            let result =  await recruitmentStore.updatePersonalDetails();
           
            if(result.data.success){
                let applicant_personal_info = await authStore.getPersonalInfo();
                toast.add({severity: 'success', summary: 'Success', detail: 'Personal Information Updated Succesfully', life: 5000});
                
                }else{
                toast.add({severity: 'error', summary: 'Error!', detail: result.data.message, life: 5000});
                }
    };

    onMounted(async ()=>{
        let { user: { id } } = await authStore.me();
        applicant_id = id;

        let applicant_personal_info = await authStore.getPersonalInfo().then((data) => {
            resume.value = data?.data?.profile_info?.resume
        });
        let vacancyList = await recruitmentStore.getAllJobPosts();
        let openings = await recruitmentStore.getJobOpenings();
        let result = await recruitmentStore.getEmployeesFromSage();
        countryService.value.getCountries().then(data => countries.value = data);

    });
</script>

<style lang="scss" scoped>
.card {
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
}
.p-chips .p-chips-multiple-container .p-chips-token {
    padding: 0.375rem 0.75rem;
    margin-right: 0.5rem;
    background: #dee2e6;
    color: #495057;
    margin-bottom: 5px;
    border-radius: 16px;
}
button.p-button.p-component.applybutton {
    width: 100%;
}
.p-chips .p-chips-multiple-container .p-chips-token {
    padding: 0.375rem 0.75rem;
    margin-right: 0.5rem;
    background: #dee2e6;
    margin-bottom: 4px;
    color: #495057;
    border-radius: 16px;
}
.p-fileupload.p-fileupload-advanced.p-component {
    width: 100%;
}
h5.toptext {
    margin-bottom: 15px;
}
.card-style {
    background: #fff;
    box-sizing: border-box;
    padding: 25px 30px !important;
    position: relative;
    border: 1px solid #fff;
    box-shadow: 0px 10px 20px rgb(200 208 216 / 0%);
    border-radius: 10px;
}
.p-fluid .p-inputgroup .p-button {
    width: auto;
    margin: auto;
}
.card-style.middle {
    margin-bottom: 25px;
}
.p-dropdown {
    width: 14rem;
    font-weight: normal;
}

.product-name {
	font-size: 1.5rem;
	font-weight: 700;
}

.product-description {
	margin: 0 0 1rem 0;
}
.p-chip.p-component.mr-2.mb-2 {
    width: 130px;
    display: flex;
}

.product-category-icon {
	vertical-align: middle;
	margin-right: .5rem;
}

.product-category {
	font-weight: 600;
	vertical-align: middle;
}

::v-deep(.product-list-item) {
	display: flex;
	align-items: center;
	padding: 1rem;
	width: 100%;

	img {
		width: 50px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin-right: 2rem;
	}

	.product-list-detail {
		flex: 1 1 0;
	}

	.p-rating {
		margin: 0 0 .5rem 0;
	}

	.product-price {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: .5rem;
		align-self: flex-end;
	}

	.product-list-action {
		display: flex;
		flex-direction: column;
	}

	.p-button {
		margin-bottom: .5rem;
	}
}

::v-deep(.product-grid-item) {
	margin: .5rem;
	border: 1px solid var(--surface-border);

	.product-grid-item-top,
	.product-grid-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	img {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin: 2rem 0;
	}

	.product-grid-item-content {
		text-align: center;
	}

	.product-price {
		font-size: 1.5rem;
		font-weight: 600;
	}
}

@media screen and (max-width: 576px) {
	.product-list-item {
		flex-direction: column;
		align-items: center;

		img {
			margin: 2rem 0;
		}

		.product-list-detail {
			text-align: center;
		}

		.product-price {
			align-self: center;
		}

		.product-list-action {
			display: flex;
			flex-direction: column;
		}
		.p-card.p-component {
			margin-right: 45px;
			margin-bottom: 45px;
		}

		.product-list-action {
			margin-top: 2rem;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}
	}
}
.p-card.p-component {
    margin-right: 45px;
    margin-bottom: 45px;
}
</style>