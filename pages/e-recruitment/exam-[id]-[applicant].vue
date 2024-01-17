<template>
    <NuxtLayout name="dashboard">
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                    <div class="title mb-30">
                        <h2>E-Recruitment Assesment-{{exam_number}}</h2>
                        <div class="p-chip p-component mr-2 mb-2 custom-chip" data-v-5b133aa7="">
                            <span class="p-chip-icon pi pi-hashtag"></span>
                            <div class="p-chip-text">Number of Questions: {{questions.length}}</div>
                        </div>
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
            <Panel class="panelMargin" v-for="(question, index) in questions" :key="question.id" :header="`Question ${index+1}`">
            <fieldset class="p-fieldset p-component" data-v-f31ebf78="">
                
                <div id="pv_id_646_content" class="p-toggleable-content" role="region" aria-labelledby="pv_id_646_header">
                <div class="p-fieldset-content">
                    <div class="row">
                        <p class="question">Question</p> <p class="question q" v-html="question.question"></p>
                    </div>
                </div>
                </div>
            </fieldset>
            <fieldset v-if="question.question_type === 'MultiChoice'" class="p-fieldset p-component" data-v-f31ebf78="">
                <div id="pv_id_646_content" class="p-toggleable-content" role="region" aria-labelledby="pv_id_646_header">
                <div class="p-fieldset-content">
                    <div v-for="option in question.options" :key="option.id" class="field-radiobutton">
                        <RadioButton v-model="question.student_multichoice_answer" @auxclick="compareMultichoice(index)" @click="compareMultichoice(index)" inputId="city1" name="city" :value="option"  />
                        <label for="city1">{{option}}</label>
                    </div>
                </div>
                </div>
            </fieldset>
            <fieldset v-if="question.question_type=== 'UnStructured'" class="p-fieldset p-component" data-v-f31ebf78="">
                <div id="pv_id_646_content" class="p-toggleable-content" role="region" aria-labelledby="pv_id_646_header">
                <div class="p-fieldset-content">
                <Editor v-model="question.student_unstructured_answer" @keyup="unStructured(index)" placeholder="Write your answer here" editorStyle="height: 150px"/>
                </div>
                </div>
            </fieldset>
            <fieldset v-if="question.question_type=== 'Yes/No'" class="p-fieldset p-component" data-v-f31ebf78="">
                <div id="pv_id_646_content" class="p-toggleable-content" role="region" aria-labelledby="pv_id_646_header">
                <div class="p-fieldset-content">
                    <div class="field-radiobutton">
                        <RadioButton v-model="question.student_boolean_answer" @auxclick="compareBoolean(index)" @click="compareBoolean(index)" inputId="city1" name="city" :value= true  />
                        <label for="city1">Yes</label>
                    </div>
                    <div class="field-radiobutton">
                        <RadioButton v-model="question.student_boolean_answer"  @auxclick="compareBoolean(index)" @click="compareBoolean(index)" inputId="city1" name="city" :value=false  />
                        <label for="city1">No</label>
                    </div>
                </div>
                </div>
            </fieldset>
            </Panel>
            <Panel class="panelMargin" header="Submit Solutions">
            <Button @click="submitSolutions" label="Submit" icon="pi pi-check" />
           </Panel>
        </div>
    </NuxtLayout>
</template>
    
<script setup lang="ts">
    import {useRecruitmentStore} from "~~/stores/recruitment"
    import { storeToRefs } from "pinia";
    import Swal from 'sweetalert2';
    import { useToast } from 'primevue/usetoast';
    import {useRoute} from "vue-router";
    

    definePageMeta({
        middleware: "auth"
    });

    onMounted(async ()=>{
    console.log(route.params.id);
    let exam = await recruitmentStore.getExamQuestions(route.params.id)
    let profile = await recruitmentStore.getProfile(route.params.applicant);
    let vacancyList = await recruitmentStore.getAllJobPosts();
    let openings = await recruitmentStore.getJobOpenings();
    let result = await recruitmentStore.getEmployeesFromSage();
    });
    const toast = useToast();
    const recruitmentStore = useRecruitmentStore();
    const route = useRoute();
    const checked1 = ref(false);
    const applicant_id = storeToRefs(recruitmentStore).profileList
    const questions = storeToRefs(recruitmentStore).questionsList
    const number_of_questions = storeToRefs(recruitmentStore).questionsList.value.length
    const products = storeToRefs(recruitmentStore).vacancyList
    const exam_number = route.params.id
    const layout = ref('grid');
    const sortKey = ref();
    const sortOrder = ref();
    const sortField = ref();
        const sortOptions = ref([
            {label: 'Price High to Low', value: '!price'},
            {label: 'Price Low to High', value: 'price'},
        ]);
        const compareBoolean = (index) => {
        if (recruitmentStore.questionsList[index].boolean_answer === recruitmentStore.questionsList[index].student_boolean_answer ){
            console.log("yabuda ka")
            recruitmentStore.questionsList[index].applicant_id = recruitmentStore.profileList
            recruitmentStore.questionsList[index].correct = false

        } else {
            recruitmentStore.questionsList[index].applicant_id = recruitmentStore.profileList
            recruitmentStore.questionsList[index].correct = true

        }
        };
        const compareMultichoice = (index) => {
        if (recruitmentStore.questionsList[index].multichoice_answer == recruitmentStore.questionsList[index].student_multichoice_answer ){
            
            recruitmentStore.questionsList[index].correct = true
            recruitmentStore.questionsList[index].applicant_id = recruitmentStore.profileList

        } else {
            
            recruitmentStore.questionsList[index].correct = false
            recruitmentStore.questionsList[index].applicant_id = recruitmentStore.profileList

        }
        };
        const unStructured = (index) => {
            recruitmentStore.questionsList[index].applicant_id = recruitmentStore.profileList
        };
        

    const onUpload = () => {
            toast.add({severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000});
    }
    const submitSolutions =  async () => {
            let result =  await recruitmentStore.createExamsAnswers();
            if(result.data.success){
                    toast.add({severity: 'success', summary: 'Success', detail: 'Exam Succesfully Completed', life: 3000});
                    navigateTo(`/e-recruitment/client-dashboard`);
                }else{
                   Swal.fire({
                    title: 'Error!',
                    text: result.data.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                    })
                }
    };
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
</script>

<style lang="scss" scoped>
.card {
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
}
p.question {
    font-style: oblique;
    font-weight: 700;
}
.p-panel.p-component.panelMargin {
    margin-bottom: 10px;
}
.p-fileupload.p-fileupload-advanced.p-component {
    width: 100%;
}
h5.toptext {
    margin-bottom: 15px;
}
.p-chip.p-component.mr-2.mb-2[data-v-5b133aa7] {
    background-color: #114105;
    width: 280px;
    color: white;
    display: flex;
}
fieldset.p-fieldset.p-component {
    margin-bottom: 10px;
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