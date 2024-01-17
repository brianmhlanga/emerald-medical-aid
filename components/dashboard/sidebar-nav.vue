<template>
  <div>
    <aside class="sidebar-nav-wrapper">
      <div @click="goToHome()" class="navbar-logo">
        <img width="180" src="/images/logo.png" alt="logo" style="margin-top: 10%; margin-bottom: 5px;">
      </div>
      <nav  class="sidebar-nav">
       
        <PanelMenu v-if="role === 'ADMIN'"  :model="recruitment_menus"/>
        <PanelMenu v-if="role === 'APPLICANT'"  :model="applicant_menus"/>
      </nav>
      <div class="promo-box">
        <h3>OACEY</h3>
        <p>{{currentYear()}}</p>
      </div>
    </aside>
    <div class="overlay"></div>
  </div>
</template>

<script setup lang="ts">
    import moment from 'moment';
    import { useToast } from "primevue/usetoast";
    import {useAuthStore} from "~~/stores/auth"
    import {FilterMatchMode,FilterOperator} from 'primevue/api';
    import { storeToRefs } from "pinia";

    const toast:any = useToast();
    const authStore:any = useAuthStore();

    const first_name = ref<string>();
    const last_name = ref<string>();
    const id = storeToRefs(authStore).id
    const id2 = ref(authStore.id)
    const role = ref<string>();
    console.log("hb",role.value,id.value,id2.value)

  const goToHome =async () => {

    navigateTo('/')
    
  }

  const currentYear = () => {

    let current_year = moment().year()
    return current_year
  }
  onMounted(async ()=>    {
    
    let result = authStore.me().then((data)=> {
      console.log(data)
      id.value = data?.user?.id
    })
  });


  const admin_menus = ref([
            {
                key: '1',
                label: 'Admin Menu',
                icon: 'pi pi-fw pi-cog',
                items: [{
                        key: '1_0',
                        label: 'Register Users',
                        icon: 'pi pi-fw pi-user-plus',
                        to: '/admin/register'
                    },
                    {
                        key: '1_1',
                        label: 'Create Routing',
                        icon: 'pi pi-fw pi-arrows-h',
                        to: '/admin/createRouting'
                    },
                    {
                        key: '1_2',
                        label: 'Create Companies',
                        icon: 'pi pi-fw pi-arrows-h',
                        to: '/admin/createCompanies'
                    }
                ]
            },
           
        ]);

  const officer_menus = ref([
      {
          key: '1',
          label: 'Originator Menu',
          icon: 'pi pi-fw pi-align-justify',
          items: [{
                  key: '1_0',
                  label: 'Report Generation',
                  icon: 'pi pi-fw pi-chart-pie',
                  to: '/officer/generate'
              },
              {
                  key: '1_1',
                  label: 'My Reports',
                  icon: 'pi pi-fw pi-clone',
                  to: '/officer/reports'
              }
          ]
      },
      
  ]);
  const bank_menus = ref([
      {
          key: '1',
          label: 'Bank File Generation',
          icon: 'pi pi-fw pi-qrcode',
          items: [{
                  key: '1_0',
                  label: 'File Generation',
                  icon: 'pi pi-fw pi-chart-pie',
                  to: '/officer/bank_file_generation'
              }
          ]
      },
      
  ]);
  const approval_menus = ref([
      {
          key: '1',
          label: 'Approver Menu',
          icon: 'pi pi-fw pi-align-justify',
          items: [{
                  key: '1_0',
                  label: 'Pending Approvals',
                  icon: 'pi pi-fw pi-chart-pie',
                  to: '/approvals/pending'
              }
          ]
      },
      
  ]);
  const recruitment_menus = ref([
      {
          key: '1',
          label: 'E-recruitment',
          icon: 'pi pi-fw pi-align-justify',
          items: [{
                  key: '1_0',
                  label: 'Dashboard',
                  icon: 'pi pi-fw pi-chart-pie',
                  to: '/'
              },
              {
                  key: '1_1',
                  label: 'Openings List',
                  icon: 'pi pi-fw pi-chart-pie',
                  to: '/e-recruitment/openings'
              }
          ]
      },
      
  ]);
  const applicant_menus = ref([
      {
          key: '1',
          label: 'E-recruitment',
          icon: 'pi pi-fw pi-align-justify',
          items: [{
                  key: '1_0',
                  label: 'Dashboard',
                  icon: 'pi pi-fw pi-chart-pie',
                  to: '/e-recruitment/client-dashboard'
              },
              {
                  key: '1_1',
                  label: 'My Applications',
                  icon: 'pi pi-fw pi-chart-pie',
                  to: '/e-recruitment/client-applications'
              }
          ]
      },
      
  ]);
  
       
        (async ()=>{
        let userData:any = await authStore.me().then(userData =>{
            console.log("myuser data"),
            console.log("my userData object",userData)
            let myArray2 = []
            if (userData && userData.user && userData.user.company_access && userData.user.company_access[0] && userData.user.company_access[0].access_list && userData.user.company_access[0].access_list.length > 0) 
                {
                myArray2 = userData.user.company_access[0].access_list;
                }
            first_name.value = userData.user.first_name;
            last_name.value = userData.user.last_name;
            if (userData && userData.user && userData.user.profile) {
                role.value = userData.user.profile;
                }
            });

        })();
        console.log("admin_menus",admin_menus)
  const logout = async () => {
  const result = await authStore.logout();

  if(result.success){
    window.location.href = "/login";
    if(!process.server){
      localStorage.userData = "{}";
    }
  }
}
</script>

<style>
  .p-datepicker.p-component {
    width: 350px;
    height: 450px; 
  }

  .sidebar-nav-wrapper {
    overflow: hidden !important;
  }
  nav.sidebar-nav {
    margin: 5px;
  }
  .p-panelmenu .p-panelmenu-header .p-panelmenu-header-content .p-panelmenu-header-action {
    padding: 1.25rem;
    font-weight: 500;
    font-size: 14px;
    color: black;
 }
</style>