<template>
    <NuxtLayout name="auth">
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                    <div class="title mb-30">
                        <h2>E-Recruitment Recruitee Portal</h2>
                    </div>
                    </div>
                    <!-- end col -->
                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <div class="card-style middle">
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
                            <Button label="Password"/>
                            <InputText v-model="password" placeholder="Enter password" />
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
                    <div v-if="!id" class="col-12 md:col-12">
                            <Button @click="createPersonalDetails()" label="Create Profile Information" v-bind="{ 'disabled': !firstname || !lastname || !email || !selected_gender || !selectedCountry || !id_number || !date_of_birth || !phone || !selected_ethnicity || !province || !city || !selected_availability || !expected_salary || !selected_disability || !selected_employment_status || !selected_conviction || !address || !personal_strength || !technical_skills}" :class="{ 'p-button-secondary': !firstname || !lastname || !email || !selected_gender || !selectedCountry || !id_number || !date_of_birth || !phone || !selected_ethnicity || !province || !city || !selected_availability || !expected_salary || !selected_disability || !selected_employment_status || !selected_conviction || !address || !personal_strength || !technical_skills  }"/>
                    </div>
                    <div v-if="id" class="col-12 md:col-12">
                            <Button @click="updatePersonalDetails()" label="Update Profile Information" v-bind="{ 'disabled': !firstname || !lastname || !email || !selected_gender || !selectedCountry || !id_number || !date_of_birth || !phone || !selected_ethnicity || !province || !city || !selected_availability || !expected_salary || !selected_disability || !selected_employment_status || !selected_conviction || !address || !personal_strength || !technical_skills}" :class="{ 'p-button-secondary': !firstname || !lastname || !email || !selected_gender || !selectedCountry || !id_number || !date_of_birth || !phone || !selected_ethnicity || !province || !city || !selected_availability || !expected_salary || !selected_disability || !selected_employment_status || !selected_conviction || !address || !personal_strength || !technical_skills  }"/>
                    </div>
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
    
    const id = ref()
    const post_id = storeToRefs(recruitmentStore).postId
    const personal_strength = ref();
    const technical_skills = ref()
    const password = ref()
    const portal_id = storeToRefs(recruitmentStore).id
    const resume = storeToRefs(recruitmentStore).resume
    const firstname = ref()
    const lastname = ref()
    const email = ref()
    const gender = storeToRefs(recruitmentStore).gender;
    const selected_gender = ref()
    const id_number = ref();
    const phone = ref();
    const ethnicity = storeToRefs(recruitmentStore).ethnicity;
    const selected_ethnicity = ref();
    const province = ref();
    const city = ref();
    const countryService = ref(new CountryService());
    const date_of_birth = ref();
    const availability = storeToRefs(recruitmentStore).availability;
    const selected_availability = ref()
    const disability = storeToRefs(recruitmentStore).disability;
    const selected_disability = ref();
    const employment_status = storeToRefs(recruitmentStore).employment_status;
    const selected_employment_status = ref()
    const expected_salary = ref();
    const countries = storeToRefs(recruitmentStore).countries
    const address = ref()
    const selectedCountry = ref();
    const convictions = storeToRefs(recruitmentStore).convictions;
    const selected_conviction = ref()
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
        let applicant_personal_info = await recruitmentStore.getPersonalInfo();
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
            navigateTo(`/e-recruitment/exam-${postingId}-${5}`);
            toast.add({severity: 'success', summary: 'Success', detail: 'Application Initiated Please Complete The Exam', life: 8000});
            
            }else{
            toast.add({severity: 'error', summary: 'Error!', detail: result.data.message, life: 5000});
            }
        }
        if (check?.data?.status[0]?.applicantId === id.value) {
            toast.add({severity: 'warn', summary: 'Already Applied', detail: 'You have already applied to this vacancy', life: 5000});
        }
       
        
    };
    const createPersonalDetails =  async () => {
           console.log("inside create personal info")
           let message = {
            firstname: firstname.value,
            lastname: lastname.value,
            password: password.value,
            address: address.value,
            email: email.value,
            phone: phone.value,
            personal_strength: personal_strength.value,
            technical_skills: technical_skills.value,
            selected_employment_status: selected_employment_status.value,
            selected_conviction: selected_conviction.value,
            selected_availability: selected_availability.value,
            selected_disability: selected_disability.value,
            province: province.value,
            date_of_birth: date_of_birth.value,
            selectedCountry: selectedCountry.value,
            selected_ethnicity: selected_ethnicity.value,
            city: city.value,
            id_number: id_number.value,
            expected_salary: expected_salary.value,
            selected_gender: selected_gender.value
           }
           let result =  await recruitmentStore.createPersonalDetails(message);
          
           if(result.data.success){
            //    let applicant_personal_info = await authStore.getPersonalInfo();
               navigateTo('/e-recruitment/client-login')
               toast.add({severity: 'success', summary: 'Success', detail: 'Personal Information Created Succesfully', life: 5000});
               
               }else{
               toast.add({severity: 'error', summary: 'Error!', detail: result.data.message, life: 5000});
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