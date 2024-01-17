<template>
    <NuxtLayout name="dashboard">
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                    <div class="title mb-30">
                        <h2>E-Recruitment</h2>
                    </div>
                    </div>
                    <!-- end col -->
                    <div class="col-md-6">
                        <div class="breadcrumb-wrapper mb-30">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="/e-recruitment/dashboard/">E-Recruitment</a>
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
            <div class="card-style">
                    <TabView class="tabview-custom" ref="tabview4">
                                <TabPanel>
                                    <template #header>
                                        <i class="pi tab pi-plus"></i>
                                        <span>Create Vacancy</span>
                                    </template>
                                    <!-- <FieldSet legend="Add Job Details" :toggleable="true"> -->
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
                                        <div class="col-12 md:col-4">
                                            <div class="p-inputgroup">
                                                <Button class="btnty" @click="createPost()" label="Create Job Post" icon="pi pi-check" iconPos="right" v-bind="{ 'disabled': !selectedOpening || !description || !department || !hiring_manager || !deadline || !job_type || !experience || !salary || !location  }" :class="{ 'p-button-secondary': !selectedOpening || !description || !department || !hiring_manager || !deadline || !job_type || !experience || !salary || !location }"/>
                                            </div>
                                        </div>
                                     </div>
                                </TabPanel>
                                <TabPanel>
                                    <template #header>
                                        <i class="pi tab pi-folder-open"></i>
                                        <span>Job Posts</span>
                                    </template>
                                    <div class="col-12 md:col-12">
                             
                             <div class="card p-fluid">
                                     <div class="row">
                                     <OrderList v-model="vacancyList" listStyle="height:auto" dataKey="id">
                                             <template #header>
                                                 Current Job Post List
                                             </template>
                                             <template #item="slotProps">
                                                 <div class="p-caritem row">
                                                     <div class="col-4">
                                                         <span class="p-caritem-vin">{{slotProps.item.title}}</span>
                                                         
                                                       
                                                     </div>
                                                     <div class="col-8">
                                                         <div class="row">
                                                            <div class="col-3">
                                                                <Button @click="openQuestionaire(postId = slotProps.item.id)"  type="button" label="Create Questions" icon="pi pi-folder" class="p-button-warning questions" />
                                                             </div>
                                                             <div class="col-3">
                                                                <Button type="button" @click="openApplications(postId = slotProps.item.id)"  label="View Applicants" icon="pi pi-users" class="p-button-warning" />
                                                             </div>
                                                             <div class="col-3">
                                                                <Button type="button" :label="'STATUS:' +slotProps.item.status" :class="'p-button-warning' +slotProps.item.status"  />
                                                             </div>
                                                             <div class="col-3">
                                                                <Button icon="pi pi-eye" @click="openQuestionaireList(postId = slotProps.item.id)" class="p-button-rounded p-button-help mr-2"  />
                                                                <Button icon="pi pi-pencil" @click="openQuestionaireList(postId = slotProps.item.id)" class="p-button-rounded p-button-success mr-2"  />
                                                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" />
                                                             </div>
                                                         </div>
                                                     </div>
                                                 </div> 
              
                                             </template>
                                     </OrderList>
                                     </div>
                                     <div class="field col-12 md:col-8">
                 
                                     </div>
                             </div> 
                     
                        </div>
                                </TabPanel>
                                <TabPanel>
                                    <template #header>
                                        <i class="pi tab pi-users"></i>
                                        <span>Applications</span>
                                    </template>
                                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                                        cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
                                </TabPanel>
                                <TabPanel>
                                    <template #header>
                                        <i class="pi tab pi-search"></i>
                                        <span>Reports</span>
                                    </template>
                                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                                        cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
                                </TabPanel>
                                <TabPanel>
                                    <template #header>
                                        <i class="pi tab pi-user-edit"></i>
                                        <span>User Management</span>
                                    </template>
                                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                                        cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
                                </TabPanel>
                                <TabPanel>
                                    <template #header>
                                        <i class="pi tab pi-cog"></i>
                                        <span>Settings</span>
                                    </template>
                                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                                        cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
                                </TabPanel>
                    </TabView>
            </div>
        </div>
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
                <Button label="Close Dialog" icon="pi pi-times" @click="closeQuestionaire" class="p-button-text"/>
                <Button label="Create" icon="pi pi-check" @click="createQuestionaire()" autofocus />
            </template>
        </Dialog>
        <Dialog id="applications" header="View Applications" v-model:visible="displayApplication" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '80vw'}" :maximizable="true" :modal="true">
            <div  class="card p-fluid toprw">
            <div class="row toprow">
            <Panel v-if="displayResults === true" header="Results">
                <div class="grid">
                <div class="col-3 md:col-4">
                <div class="card rtyr">
                    <h5>Number of Questions</h5>
                    <div class="p-avatar p-component p-avatar-xl p-overlay-badge" style="background-color: rgb(76, 175, 79); color: rgb(255, 255, 255);"><span class="p-avatar-text">{{number_of_questions}}</span></div>
                </div>
                </div>
                <div class="col-3 md:col-4">
                <div class="card rtyr">
                    <h5>Number of Unstructured Questions</h5>
                    <div class="p-avatar p-component p-avatar-xl p-overlay-badge" style="background-color: rgb(76, 175, 79); color: rgb(255, 255, 255);"><span class="p-avatar-text">{{number_of_unstructured_questions}}</span></div>
                </div>
                </div>
                <div class="col-3 md:col-4">
                <div class="card rtyr">
                    <h5>Number of Passed Questions</h5>
                    <div class="p-avatar p-component p-avatar-xl p-overlay-badge" style="background-color: rgb(76, 175, 79); color: rgb(255, 255, 255);"><span class="p-avatar-text">{{number_of_passed_questions}}</span></div>
                </div>
                </div>
                <div class="col-3 md:col-4">
                <div class="card rtyr">
                    <h5>Percentage Pass</h5>
                    <div class="p-avatar p-component p-avatar-xl p-overlay-badge" style="background-color: rgb(76, 175, 79); color: rgb(255, 255, 255);"><span class="p-avatar-text">{{(number_of_passed_questions/(number_of_questions-number_of_unstructured_questions))* 100}}%</span></div>
                </div>
                </div>
                </div>
                <div class="row rtryr">
                    <div class="col-3 md:col-4">
                        <Button @click="closeResults" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined times" />
                    </div>
                </div>
            </Panel>
            </div>
            </div>
            <div  v-if="displayResults === false" class="card p-fluid">
            <div class="row">
            <OrderList v-model="applicationsList" listStyle="height:auto" dataKey="id">
                    <template #header>
                        Current Job Applications
                    </template>
                    <template #item="slotProps">
                        <div class="p-caritem row">
                            <div class="col-4">
                                <span class="p-caritem-vin">{{slotProps.item.applicant.first_name+" "+slotProps.item.applicant.last_name}}</span>
                                
                            
                            </div>
                            <div class="col-8">
                                <div class="row">
                                <div class="col-3">
                                    <Button @click="openResume(slotProps.item.applicant.resume)"  type="button" label="View Resume" icon="pi pi-eye" class="p-button-warning questions" />
                                    </div>
                                    <div class="col-3">
                                    <Button type="button" @click="openResults(slotProps.item.applicantId,slotProps.item.postingId)"  label="Exam Mark" icon="pi pi-check" class="p-button-warning" />
                                    </div>
                                    <div class="col-3">
                                    <Button type="button" :label="'STATUS:' +slotProps.item.status" :class="'p-button-warning' +slotProps.item.status"  />
                                    </div>
                                    <div class="col-3">
                                        <!-- <SplitButton  label="Actions" icon="pi pi-ellipsis-v" :model="items"></SplitButton> -->
                                        <div class="dropdown">
                                            <button class="p-button p-button-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <span class="p-button-label">ACTIONS</span>
                                                <span class="p-ink" role="presentation"></span>
                                            </button>
                                            <ul class="dropdown-menu p-tieredmenu p-tieredmenu-overlay" aria-labelledby="dropdownMenuButton1">
                                                <li><a @click="setStatusAsBestFit(slotProps.item.applicantId,slotProps.item.postingId,slotProps.item.id)" class="dropdown-item" href="#">Set As Best Fit</a></li>
                                                <li><a @click="setStatusAsModerateFit(slotProps.item.applicantId,slotProps.item.postingId,slotProps.item.id)" class="dropdown-item" href="#">Set As Moderate Fit</a></li>
                                                <li><a @click="setStatusAsNotFit(slotProps.item.applicantId,slotProps.item.postingId,slotProps.item.id)" class="dropdown-item" href="#">Set As Not Fit</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 

                    </template>
            </OrderList>
            </div>
            <div class="field col-12 md:col-8">

            </div>
    </div> 
            <template #footer>
                <Button label="Close Dialog" icon="pi pi-times" @click="closeApplications" class="p-button-text"/>
            </template>
        </Dialog>
        <Dialog header="Detail & Updates Modal" v-model:visible="displayQuestionsList" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :maximizable="true" :modal="true">
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
    import {useRecruitmentStore} from "~/stores/recruitment"
    import { storeToRefs } from "pinia";
    import Swal from 'sweetalert2';
    import { useToast } from 'primevue/usetoast';

    definePageMeta({
        middleware: "auth"
    });
    const toast = useToast();
    const recruitmentStore = useRecruitmentStore();
    const displayResults = ref(false);
    const number_of_questions = storeToRefs(recruitmentStore).number_of_questions;
    const number_of_passed_questions = storeToRefs(recruitmentStore).number_of_passed_questions;
    const number_of_unstructured_questions = storeToRefs(recruitmentStore).number_of_unstructured_questions
    const displayQuestionaire = ref(false);
    const displayApplication = ref(false);
    const displayQuestionsList = ref(false);
    const openings = storeToRefs(recruitmentStore).jobOpenings;
    const employees = storeToRefs(recruitmentStore).employeeData
    const selectedOpening = storeToRefs(recruitmentStore).selectedOpening
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
    const types = storeToRefs(recruitmentStore).types
    const is_editing = ref(false)
    const applicationsList = storeToRefs(recruitmentStore).applicationsList
    const question = storeToRefs(recruitmentStore).question
    const questionsList = storeToRefs(recruitmentStore).questionsList
    const score = storeToRefs(recruitmentStore).score
    const description = storeToRefs(recruitmentStore).description
    const department = storeToRefs(recruitmentStore).department
    const hiring_manager = storeToRefs(recruitmentStore).hiring_manager
    const deadline = storeToRefs(recruitmentStore).deadline
    const job_type = storeToRefs(recruitmentStore).job_type
    const experience = storeToRefs(recruitmentStore).experience
    const salary = storeToRefs(recruitmentStore).salary
    const location = storeToRefs(recruitmentStore).location
    const skills = storeToRefs(recruitmentStore).skills
    const vacancyList = storeToRefs(recruitmentStore).vacancyList
  
    onMounted(async ()=>{
    let vacancyList = await recruitmentStore.getAllJobPosts();
    let openings = await recruitmentStore.getJobOpenings();
    let result = await recruitmentStore.getEmployeesFromSage();
    });

    const test = ({textValue}) => {
        question.value = textValue;
    }
    const openQuestionaire = (arg) => {
            displayQuestionaire.value = true;
    };
    const closeResults = () => {
            displayResults.value = false;
    };
    const openResume = async (arg: String) => {
        let file_url = "./public/uploads/" + arg;
        let pdfBuffer = await recruitmentStore.viewPDF(file_url);

        //Open the pdf in another tab
        const arr = new Uint8Array(pdfBuffer);
        const file = new Blob([arr], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
    };
    const openResults = async (applicantId: String,postindId:String) => {
        let results = await recruitmentStore.getResults(applicantId,postindId);
        displayResults.value = true
    };
    const openApplications = async (arg) => {
        let applications = await recruitmentStore.getApplications(arg);
        displayApplication.value = true;
    };
    const closeQuestionaire =  () => {
        displayQuestionaire.value = false;
    };
    const closeApplications =  () => {
        displayApplication.value = false;
    };
    const openQuestionaireList = async (arg) => {
        let questions = await recruitmentStore.getAllQuestions();
        let jobList = await recruitmentStore.getQuestionDetail();
        displayQuestionsList.value = true
       
    }
    const openQuestionEdit = async (arg) => {
        is_editing.value = true
        let question = await recruitmentStore.getSingleQuestion();
        
    }
    const closeQuestionaireList = () => {
        displayQuestionsList.value = false
        is_editing.value = false
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
    const setStatusAsBestFit =  async (applicantId,postingId,applicationId) => {
            let status = "BestFit"
            let result = await recruitmentStore.updateApplicantStatus(applicantId,postingId,applicationId,status);
            if(result.data.success){

                toast.add({ severity: 'success', summary: 'Success', detail: 'Application Set As Best Fit', life: 3000});
                let applications = await recruitmentStore.getApplications(postingId);
                }else{
                toast.add({ severity: 'warn', summary: 'Error', detail: result.data.message, life: 3000});
                }
    };
    const setStatusAsNotFit =  async (applicantId,postingId,applicationId) => {
            let status = "NotFit"
            let result = await recruitmentStore.updateApplicantStatus(applicantId,postingId,applicationId,status);
            if(result.data.success){

                toast.add({ severity: 'success', summary: 'Success', detail: 'Application Set As Not Fit', life: 3000});
                let applications = await recruitmentStore.getApplications(postingId);
                }else{
                toast.add({ severity: 'warn', summary: 'Error', detail: result.data.message, life: 3000});
                }
    };
    const setStatusAsModerateFit =  async (applicantId,postingId,applicationId) => {
            let status = "Moderate"
            let result = await recruitmentStore.updateApplicantStatus(applicantId,postingId,applicationId,status);
            if(result.data.success){

                toast.add({ severity: 'success', summary: 'Success', detail: 'Application Set As Moderate Fit', life: 3000});
                let applications = await recruitmentStore.getApplications(postingId);
                }else{
                toast.add({ severity: 'warn', summary: 'Error', detail: result.data.message, life: 3000});
                }
    };
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
    const createQuestionaire = async () =>{
            let result = await recruitmentStore.createQuestionaire();
          
             if(result.data.success){
                // const loanTypes = await setupStore.getAllLoanTypes();
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

                }else{
                   Swal.fire({
                    title: 'Error!',
                    text: result.data.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                    })
                }
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
</script>

<style>
#applications .p-orderlist-controls {
    display: none;
}

.p-orderlist-list, .p-orderlist-item.p-highlight {
    overflow: visible !important;
}

.swal2-container {
    z-index: 1101 !important;
}

.card.p-fluid.toprw {
    margin-bottom: 10px;
}
.card.rtyr {
    background: var(--surface-card);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 2rem;
}

 i.pi.tab {
    font-family: 'primeicons';
    font-size: 22px;
    font-style: normal;
    margin-right: 20px;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
}
.fieldset p {
    line-height: 1.5;
    margin: 0;
}
.p-button.p-button-danger.p-button-outlined, .p-buttonset.p-button-danger > .p-button.p-button-outlined, .p-splitbutton.p-button-danger > .p-button.p-button-outlined {
    background-color: transparent;
    color: #EF4444;
    margin-top: 21px;
    border: 1px solid;
}
.p-chips-token {
    margin: 5px;
}
button.p-button.p-component.p-button-warningYes\/No {
    background-color: brown;
    border-color: brown;
}
.p-divider.p-component.p-divider-horizontal.p-divider-solid.p-divider-left.tryr {
    margin-top: 23px;
}
button.p-button.p-component.p-button-warningMultiChoice {
    background-color: black;
}
.p-chip.p-component.mr-2.mb-2.anerryangu {
    margin-top: 5px;
}
.row.rtryr {
    float: right;
}
button.p-button.p-component.p-button-warningUnStructured {
    background-color: darkcyan;
    border-color: darkcyan;
}
.p-editor-container {
    width: 100%;
}
button.p-button.p-component.p-button-warning.questions {
    background-color: darkslategrey;
    border-color: darkslategrey;
}
.p-chip.p-component.chiprangu {
    background-color: #6c7e73;
    color: white;
    margin: 5px;
    height: 25px;
}
.p-listbox .p-listbox-list .p-listbox-item.p-highlight {
    color: #ffffff;
    background: #02b55d !important;
}
button.p-button.p-component.btnty {
    width: 100%;
    color: #ffffff;
    background: #0d6efd;
    border: 1px solid #f8f9fa;
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    border-radius: 6px;
}
button.p-button.p-component.p-disabled.btnty.p-button-secondary {
    background-color: #c1c1c1;
}
.p-avatar.p-avatar-xl {
    width: 15rem;
    padding: 4px;
    margin: auto;
    padding-left: 96px;
    margin-top: 15px;
    padding-right: 96px;
    height: 4rem;
    font-size: 40px;
}
button.p-button.p-component.p-button-warningopen {
    background-color: #22C55E;
    border-color: #22c55e;
}
span.innercircle {
    border: black;
    border-radius: 18px;
    width: 25px;
    background-color: black;
    height: 25px;
    color: white;
    text-align: center;
}
div#pv_id_16 {
    width: 100%;
}
</style>