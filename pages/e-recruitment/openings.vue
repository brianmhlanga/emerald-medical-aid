<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-5">
                <div class="row">                  
                    <div  class="text-900 font-medium text-xl mb-3">Job Posts</div>
                    <div class="surface-card p-4 shadow-2 border-round p-fluid">
                        <div class="grid formgrid p-fluid">
                            <Button label="Add Job" @click="add_opening = true" class="mt-2 mb-2" icon="pi pi-plus" />

                            <div  class="field mb-4 col-12 md:col-12"> 
                               
                                <label for="customer_name" class="font-medium text-900">Job Posts</label> 
                                <DataTable :value="jobs" showGridlines tableStyle="min-width: 50rem">
                                    <Column field="price" header="Job Title">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.title}} 
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Department">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.department}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Hiring Manager">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.hiring_manager}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Job Type">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.job_type}}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Total Applicants">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.applications ? slotProps?.data?.applications.length : 0 }}
                                        </template>
                                    </Column>
                                    <Column field="rating" header="Status">
                                        <template #body="slotProps">
                                            {{slotProps?.data?.status}}
                                        </template>
                                    </Column>
                                    <Column header="Actions">
                                        <template #body="slotProps">
                                        <SplitButton
                                            icon="pi pi-ellipsis-v"
                                            :model="[
                                                { label: 'View Applications', icon: 'pi pi-fw pi-file', command: () => navigateTo(`/e-recruitment/applicants-${slotProps.data.id}`) },
                                                { label: 'Create Assesment', icon: 'pi pi-fw pi-plus', command: () => openQuestionaire(postId = slotProps.data.id) },
                                                { label: 'View Detail', icon: 'pi pi-fw pi-eye', command: () => openQuestionaireList(postId = slotProps.data.id) },
                                                { label: 'Update', icon: 'pi pi-fw pi-pencil', command: () => openQuestionaireList(postId = slotProps.data.id) },
                                                { label: 'Change Status', icon: 'pi pi-fw pi-pencil', command: () => openQuestionaireList(postId = slotProps.data.id) },
                                                { label: 'Analytics', icon: 'pi pi-fw pi-pencil', command: () => navigateTo(`/e-recruitment/openingStats-${slotProps.data.id}`) },
                                            ]"
                                        ></SplitButton>

                                    </template>
                                   </Column>
                                </DataTable>
                            </div>
                           </div> 
                    
                    </div>
                </div>
            </div>
        </section>
        <Dialog v-model:visible="add_opening" modal header="Add Job Opening" :style="{ width: '75vw' }">
            <div class="row">
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Job Title"/>
                    <InputText v-model="selectedOpening" placeholder="Enter Job Title"/>
                    <!-- <DropDown v-model="selectedOpening" :options="openings" optionLabel="longDescription" optionValue="longDescription" placeholder="Pick Available Vacancy" /> -->
                </div>
            </div>
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Job Description"/>
                    <Editor v-model="description" editorStyle="height: 320px"/>
                </div>
            </div>
            <div class="col-6 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Department"/>
                    <InputText v-model="department" placeholder="Enter Employees Department"/>
                </div>
            </div>
            <div class="col-6 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Hiring Manager"/>
                    <InputText v-model="hiring_manager" placeholder="Hiring Manager"/>
                    <!-- <DropDown v-model="hiring_manager" :options="employees" optionLabel="displayName" optionValue="displayName" placeholder="Pick Hiring Manager" /> -->
                </div>
            </div>
            <div class="col-6 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Application Deadline"/>
                    <Calendar v-model="deadline" inputId="basic"  autocomplete="off" />
                </div>
            </div>
            <div class="col-6 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Job Type"/>
                    <DropDown v-model="job_type" :options="types" optionLabel="name" optionValue="name" placeholder="Pick Available Vacancy" />
                </div>
            </div>
            <div class="col-6 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Experience in Years"/>
                    <InputText v-model="experience" placeholder="Enter Experience in Years" type="number"/>
                </div>
            </div>
            <div class="col-6 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Expected Salary"/>
                    <InputText v-model="salary" placeholder="Enter Expected Salary" type="number"/>
                </div>
            </div>
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Location"/>
                    <InputText v-model="location" placeholder="Enter Location"/>
                </div>
            </div>
            </div>
            <template #footer>
                <Button label="Add Opening" @click="createPost()" icon="pi pi-check"  autofocus /> 
            </template>
        </Dialog>
        <Dialog header="Create Questionaire" v-model:visible="displayQuestionaire" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :maximizable="true" :modal="true">
            <div class="row">
                <div class="col-12 md:col-4">
                    <div class="p-inputgroup">
                        <Button label="Question"/>
                        <Editor v-model="question" editorStyle="height: 200px"/>
                    </div>
                </div>
            <div class="col-12 md:col-4">
            <div class="p-inputgroup">
                <Button label="Question Types"/>
                <SelectButton v-model="question_type" :options="question_types" aria-labelledby="single" />
            </div>
            </div>
            <div v-if="question_type === 'Yes/No'" class="col-12 md:col-4">
            <div class="p-inputgroup">
                <Button label="Required Answer"/>
                <ToggleButton v-model="boolean_answer" onIcon="pi pi-check" offIcon="pi pi-times" class="w-full sm:w-10rem" aria-label="Confirmation" />
            </div>
            </div>
            <div v-if="question_type === 'MultiChoice'" class="col-12 md:col-4">
            <div class="p-inputgroup">
                <Button label="Set Up Options"/>
                <Chips :max="4" v-model="multichoice_options" :allowDuplicate="false">
                    <template #chip="slotProps">
                        <div>
                            <span><span class="innercircle">{{options[multichoice_options.indexOf(slotProps.value)]}}</span> {{slotProps.value}} </span>
                        </div>
                    </template>
                </Chips>
            </div>
            </div>
            <div v-if="question_type === 'MultiChoice'" class="col-12 md:col-4">
            <div class="p-inputgroup">
                <Button label="Required Answer"/>
                <ListBox v-model="multichoice_answer" :options="multichoice_options" optionLabel=""  style="width:100%" />
            </div>
            </div>
            <div class="col-6 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Mark"/>
                    <input class="p-inputtext  p-component p-inputnumber-input" v-model="score" id="minmax-buttons" role="spinbutton" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" type="number"/>
                </div>
            </div>
            </div>
            <template #footer>
                <Button label="Close Dialog" icon="pi pi-times" @click="displayQuestionaire = false" class="p-button-text"/>
                <Button label="Create" icon="pi pi-check" @click="createQuestionaire()" autofocus />
            </template>
        </Dialog>
        <Dialog header="Detail & Updates Modal" v-model:visible="displayQuestionsList"  :style="{ width: '75vw' }" :maximizable="true" :modal="true">
            <div v-if="is_editing === false" class="row">
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Job Title"/>
                    <InputText v-model="selectedOpening" placeholder="Enter Job Title"/>
                    <!-- <DropDown v-model="selectedOpening" :options="openings" optionLabel="longDescription" optionValue="longDescription" placeholder="Pick Available Vacancy" /> -->
                </div>
            </div>
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Job Description"/>
                    <Editor v-model="description" editorStyle="height: 150px"/>
                </div>
            </div>
            <div class="col-6 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Department"/>
                    <InputText v-model="department" placeholder="Enter Employees Department"/>
                </div>
            </div>
            <div class="col-6 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Hiring Manager"/>
                    <InputText v-model="hiring_manager" placeholder="Hiring Manager"/>
                    <!-- <DropDown v-model="hiring_manager" :options="employees" optionLabel="displayName" optionValue="displayName" placeholder="Pick Hiring Manager" /> -->
                </div>
            </div>
            <div class="col-6 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Application Deadline"/>
                    <Calendar v-model="deadline" inputId="basic"  autocomplete="off" />
                </div>
            </div>
            <div class="col-6 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Job Type"/>
                    <DropDown v-model="job_type" :options="types" optionLabel="name" optionValue="name" placeholder="Pick Available Vacancy" />
                </div>
            </div>
            <div class="col-6 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Experience in Years"/>
                    <InputText v-model="experience" placeholder="Enter Experience in Years" type="number"/>
                </div>
            </div>
            <div class="col-6 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Expected Salary"/>
                    <InputText v-model="salary" placeholder="Enter Expected Salary" type="number"/>
                </div>
            </div>
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Location"/>
                    <InputText v-model="location" placeholder="Enter Location"/>
                </div>
            </div>
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <Button class="btnty" @click="updatePost()" label="Update Job Post" icon="pi pi-check" iconPos="right" v-bind="{ 'disabled': !selectedOpening || !description || !department || !hiring_manager || !deadline || !job_type || !experience || !salary || !location  }" :class="{ 'p-button-secondary': !selectedOpening || !description || !department || !hiring_manager || !deadline || !job_type || !experience || !salary || !location }"/>
                </div>
            </div>
            </div>
            <div class="row">
                <OrderList v-if="is_editing === false" v-model="questionsList" listStyle="height:auto" dataKey="id">
                    <template #header>
                        List of Job Post Questions [Number of Questions: {{questionsList.length}}]
                    </template>
                    <template #item="slotProps">
                        <div class="p-caritem row">
                            <div  class="col-6">
                                <Chip label="Question" icon="pi pi-paperclip" class="mr-2 mb-2" /><br>
                                <span v-html="slotProps.item.question" class="p-caritem-vin"></span><br>
                                <Chip v-if="slotProps.item.question_type === 'MultiChoice' || slotProps.item.question_type === 'Yes/No'" label="Answer" icon="pi pi-check" class="mr-2 mb-2 anerryangu" /><br>
                                <span v-if="slotProps.item.question_type === 'MultiChoice'" v-html="slotProps.item.multichoice_answer" class="p-caritem-vin"></span>
                                <span v-else-if="slotProps.item.question_type === 'Yes/No'" v-html="slotProps.item.boolean_answer" class="p-caritem-vin"></span>
                            </div>
                            <div class="col-6">
                                <div class="row">
                                    
                                    <div class="col-4">
                                    <Button type="button" :label="'' +slotProps.item.question_type" :class="'p-button-warning' +slotProps.item.question_type"  />
                                    </div>
                                    <div class="col-8">
                                    <Button icon="pi pi-eye" @click="openQuestionEdit(postId = slotProps.item.id)" class="p-button-rounded p-button-help mr-2"  />
                                    <Button icon="pi pi-pencil" @click="openQuestionEdit(postId = slotProps.item.id)" class="p-button-rounded p-button-success mr-2"  />
                                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" />
                                    </div><br>
                                    <Chip v-if="slotProps.item.question_type === 'MultiChoice'" label="Options" icon="pi pi-clone" class="mr-2 mb-2" /><br>
                                    <div class="block">
                                    <Chip class="chiprangu" v-for="indicator in slotProps.item.options" :key="indicator.id">
                                        {{ indicator}}  
                                    </Chip>
                                    </div>
                                
                                </div>
                            </div>
                            <Divider />
                        </div> 

                    </template>
                </OrderList>
            <div  v-else-if="is_editing === true" class="row">
            <div class="col-12 md:col-4">
            <div class="p-inputgroup">
                <Button label="Question"/>
                <Editor v-model="question" editorStyle="height: 200px"/>
            </div>
            </div>
            <div class="col-12 md:col-4">
            <div class="p-inputgroup">
                <Button label="Question Types"/>
                <SelectButton v-model="question_type" :options="question_types" aria-labelledby="single" />
            </div>
            </div>
            <div v-if="question_type === 'Yes/No'" class="col-12 md:col-4">
            <div class="p-inputgroup">
                <Button label="Required Answer"/>
                <ToggleButton v-model="boolean_answer" onIcon="pi pi-check" offIcon="pi pi-times" class="w-full sm:w-10rem" aria-label="Confirmation" />
            </div>
            </div>
            <div v-if="question_type === 'MultiChoice'" class="col-12 md:col-4">
            <div class="p-inputgroup">
                <Button label="Set Up Options"/>
                <Chips :max="4" v-model="multichoice_options" :allowDuplicate="false">
                    <template #chip="slotProps">
                        <div>
                            <span><span class="innercircle">{{options[multichoice_options.indexOf(slotProps.value)]}}</span> {{slotProps.value}} </span>
                        </div>
                    </template>
                </Chips>
            </div>
            </div>
            <div v-if="question_type === 'MultiChoice'" class="col-12 md:col-4">
            <div class="p-inputgroup">
                <Button label="Required Answer"/>
                <ListBox v-model="multichoice_answer" :options="multichoice_options" optionLabel=""  style="width:100%" />
            </div>
            </div>
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Mark"/>
                    <input class="p-inputtext  p-component p-inputnumber-input" v-model="score" id="minmax-buttons" role="spinbutton" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" type="number"/>
                </div>
            </div>
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <Button class="btnty" @click="updateQuestionaire()" label="Update Question" icon="pi pi-check" iconPos="right" v-bind="{ 'disabled': !selectedOpening || !description || !department || !hiring_manager || !deadline || !job_type || !experience || !salary || !location  }" :class="{ 'p-button-secondary': !selectedOpening || !description || !department || !hiring_manager || !deadline || !job_type || !experience || !salary || !location }"/>
                </div>
            </div>
            </div>
            </div>
            <template #footer>
                <Button label="Close Dialog" icon="pi pi-times" @click="closeQuestionaireList" class="p-button-text"/>
            </template>
        </Dialog>
    </NuxtLayout>
 </template>
 <script setup lang="ts">
    import { useToast } from "primevue/usetoast";
    import { storeToRefs } from "pinia";
    import Swal from 'sweetalert2';
    import moment from "moment";
    import { ref } from 'vue';
    import { useAuthStore } from "~/stores/auth";
    import { useAdminStore } from "~/stores/admin";
    import { useConfirm } from "primevue/useconfirm";
    import { useSageStore } from "~/stores/sage";
    import { useRecruitmentStore } from "~/stores/recruitment";
    const confirm = useConfirm();
    const sageStore = useSageStore()
    const authStore = useAuthStore()
    const recruitmentStore = useRecruitmentStore()
    const adminStore = useAdminStore()
    const commentDialog = ref(false)
    const add_opening = ref()
    const pending = storeToRefs(adminStore).my_pending
    const requests = storeToRefs(adminStore).requests
    const toast = useToast()
    const addLineItem = ref<boolean>(false)
    const comments = ref()
    const requisitions = ref()
    const comment = ref()
    const displayQuestionaire = ref(false);
    const selectedOpening = storeToRefs(recruitmentStore).selectedOpening
    const description = storeToRefs(recruitmentStore).description
    const department = storeToRefs(recruitmentStore).department
    const hiring_manager = storeToRefs(recruitmentStore).hiring_manager
    const deadline = storeToRefs(recruitmentStore).deadline
    const job_type = storeToRefs(recruitmentStore).job_type
    const experience = storeToRefs(recruitmentStore).experience
    const salary = storeToRefs(recruitmentStore).salary
    const location = storeToRefs(recruitmentStore).location
    const types = storeToRefs(recruitmentStore).types
    const single_request = storeToRefs(adminStore).single_request
    const requisition_id = ref()
    const is_co_approver = storeToRefs(adminStore).is_co_approver
    const attachments = ref()
    const jobs = ref()
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
        const displayResults = ref(false);
    const number_of_questions = storeToRefs(recruitmentStore).number_of_questions;
    const number_of_passed_questions = storeToRefs(recruitmentStore).number_of_passed_questions;
    const number_of_unstructured_questions = storeToRefs(recruitmentStore).number_of_unstructured_questions
    const displayApplication = ref(false);
    const displayQuestionsList = ref(false);
    const openings = storeToRefs(recruitmentStore).jobOpenings;
    const employees = storeToRefs(recruitmentStore).employeeData
    const date1 = ref();
    const items = ref([
    {
        label: 'Mark As Best Fit',
        icon: 'pi pi-angle-double-up',
        command: async () => {
            let status = "BestFit"
        }
    },
    {
        label: 'Mark As Not Fit',
        icon: 'pi pi-angle-double-down',
        command: () => {
            toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
        }
    },
    {
        label: 'Mark As Moderate',
        icon: 'pi pi-angle-double-right',
        command: () => {
            toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
        }
    }
]);
    const postId = storeToRefs(recruitmentStore).postId
    const question_type = storeToRefs(recruitmentStore).question_type
    const question_types = storeToRefs(recruitmentStore).question_types
    const boolean_answer = storeToRefs(recruitmentStore).boolean_answer
    const multichoice_answer = storeToRefs(recruitmentStore).multichoice_answer
    const multichoice_options = storeToRefs(recruitmentStore).multichoice_options
    const options = storeToRefs(recruitmentStore).options
    const is_editing = ref(false)
    const applicationsList = storeToRefs(recruitmentStore).applicationsList
    const question = storeToRefs(recruitmentStore).question
    const questionsList = storeToRefs(recruitmentStore).questionsList
    const score = storeToRefs(recruitmentStore).score
    const skills = storeToRefs(recruitmentStore).skills
    const vacancyList = storeToRefs(recruitmentStore).vacancyList
  
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
        let job_posts = await recruitmentStore.getAllJobPosts().then((data) => {
            console.log(data)
            jobs.value = data?.data?.data
        })
    })
    const openQuestionaireList = async (arg) => {
        let questions = await recruitmentStore.getAllQuestions();
        let jobList = await recruitmentStore.getQuestionDetail();
        displayQuestionsList.value = true
       
    }
    const updatePost =  async () => {
            let result =  await recruitmentStore.updateJobPost();
            if(result.data.success){
                      Swal.fire({
                    title: 'Awesome',
                    text: 'Job Post Succesfully Updated',
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
    const openQuestionEdit = async (arg) => {
        is_editing.value = true
        let question = await recruitmentStore.getSingleQuestion();
        
    }
    const createQuestionaire = async () =>{
            let result = await recruitmentStore.createQuestionaire().then((dataa) => {
                console.log("data",dataa?.data?.success)
                if (dataa?.data?.success) {
                    displayQuestionaire.value = false
                    Swal.fire({
                    title: 'Awesome',
                    text: 'Question Successfully Created',
                    icon: 'success',
                    confirmButtonText: 'Done'})

                    question.value = "",
                    question_type.value = "",
                    multichoice_answer.value = "",
                    boolean_answer.value = false,
                    multichoice_options.value = [],
                    score.value = ""
                } else {
                    Swal.fire({
                    title: 'Error!',
                    text: dataa?.data.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                    })
                }
            })
        }
        const updateQuestionaire = async () =>{
            let result = await recruitmentStore.updateSingleQuestion();
          
             if(result.data.success){
                // const loanTypes = await setupStore.getAllLoanTypes();
                      Swal.fire({
                    title: 'Awesome',
                    text: 'Question Successfully Updated',
                    icon: 'success',
                    confirmButtonText: 'Done'})

                question.value = "",
                question_type.value = "",
                multichoice_answer.value = "",
                boolean_answer.value = false,
                multichoice_options.value = [],
                score.value = ""
                is_editing.value = false

                }else{
                   Swal.fire({
                    title: 'Error!',
                    text: result.data.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                    })
                }
        }

    const openApplications = async (arg) => {
        let applications = await recruitmentStore.getApplications(arg).then((data)=> {
            console.log("applicatins",data)
        })
    };
    const openQuestionaire = (arg) => {
            displayQuestionaire.value = true;
    };
    const closeQuestionaireList = () => {
        displayQuestionsList.value = false
        is_editing.value = false
    }
    const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'ZWL' });
    };
    const createPost =  async () => {
            let result =  await recruitmentStore.createJobPost();
            if(result.data.success){
                      Swal.fire({
                    title: 'Awesome',
                    text: 'Job Post Succesfully Created',
                    icon: 'success',
                    confirmButtonText: 'Done'})
                    add_opening.value = false
                    let job_posts = await recruitmentStore.getAllJobPosts().then((data) => {
                        console.log(data)
                        jobs.value = data?.data?.data
                    })
                
                }else{
                   Swal.fire({
                    title: 'Error!',
                    text: result.data.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                    })
                }
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
    .p-splitbutton.p-component.p-button-text {
    background-color: #3b82f6;
    color: white;
}
.p-splitbutton.p-button-text > .p-button {
    background-color: transparent;
    color: #ffffff;
    border-color: transparent;
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