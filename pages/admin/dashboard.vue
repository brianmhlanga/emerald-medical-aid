<template>
    <NuxtLayout name="dashboard">
        <section class="section">
          <div class="container-fluid pt-5">
              <div  class="row">
                <div class="grid">
                <div class="col-12 lg:col-4 p-2">
                    <div class="shadow-2 surface-card border-round p-4 h-full">
                    <div class="flex align-items-start">
                        <div class="bg-blue-100 border-round inline-flex align-items-center justify-content-center" style="width: 52px; height: 52px;">
                        <img src="https://blocks.primevue.org/images/blocks/illustration/stats-illustration-1.svg" width="38" height="38">
                        </div>
                        <div class="ml-3 flex-1">
                        <span class="block text-900 mb-1 text-xl font-medium">Applicants</span>
                        <p class="text-600 mt-0 mb-5 text-sm"></p>
                        <div class="flex align-items-center justify-content-between">
                            <span class="text-700">Total</span>
                            <span class="font-bold text-700">{{applicants}}</span>
                        </div>
                        <ul class="list-none p-0 m-0 flex align-content-center mt-2 gap-2">
                            <li class="flex-1 bg-blue-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-blue-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-blue-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-blue-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-blue-500" style="height: 7px; border-radius: 3px;"></li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-12 lg:col-4 p-2">
                    <div class="shadow-2 surface-card border-round p-4 h-full">
                    <div class="flex align-items-start">
                        <div class="bg-blue-100 border-round inline-flex align-items-center justify-content-center" style="width: 52px; height: 52px;">
                        <img src="https://blocks.primevue.org/images/blocks/illustration/stats-illustration-2.svg" width="38" height="38">
                        </div>
                        <div class="ml-3 flex-1">
                        <span class="block text-900 mb-1 text-xl font-medium">Current Openings</span>
                        <div class="flex align-items-center justify-content-between">
                            <span class="text-700">Total</span>
                            <span class="font-bold text-700">{{ current_openings }}</span>
                        </div>
                        <ul class="list-none p-0 m-0 flex align-content-center mt-2 gap-2">
                            <li class="flex-1 bg-orange-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-orange-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-orange-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-orange-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-orange-500" style="height: 7px; border-radius: 3px;"></li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-12 lg:col-4 p-2">
                    <div class="shadow-2 surface-card border-round p-4 h-full">
                    <div class="flex align-items-start">
                        <div class="bg-blue-100 border-round inline-flex align-items-center justify-content-center" style="width: 52px; height: 52px;">
                        <img src="https://blocks.primevue.org/images/blocks/illustration/stats-illustration-3.svg" width="38" height="38">
                        </div>
                        <div class="ml-3 flex-1">
                        <span class="block text-900 mb-1 text-xl font-medium">Active Offers</span>
                        <div class="flex align-items-center justify-content-between">
                            <span class="text-700">Total</span>
                            <span class="font-bold text-700">12</span>
                        </div>
                        <ul class="list-none p-0 m-0 flex align-content-center mt-2 gap-2">
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-12 lg:col-4 p-2">
                    <div class="shadow-2 surface-card border-round p-4 h-full">
                    <div class="flex align-items-start">
                        <div class="bg-blue-100 border-round inline-flex align-items-center justify-content-center" style="width: 52px; height: 52px;">
                        <img src="https://blocks.primevue.org/images/blocks/illustration/stats-illustration-3.svg" width="38" height="38">
                        </div>
                        <div class="ml-3 flex-1">
                        <span class="block text-900 mb-1 text-xl font-medium">Closed Openings</span>
                        <div class="flex align-items-center justify-content-between">
                            <span class="text-700">Total</span>
                            <span class="font-bold text-700">{{ closed_openings }}</span>
                        </div>
                        <ul class="list-none p-0 m-0 flex align-content-center mt-2 gap-2">
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-12 lg:col-4 p-2">
                    <div class="shadow-2 surface-card border-round p-4 h-full">
                    <div class="flex align-items-start">
                        <div class="bg-blue-100 border-round inline-flex align-items-center justify-content-center" style="width: 52px; height: 52px;">
                        <img src="https://blocks.primevue.org/images/blocks/illustration/stats-illustration-3.svg" width="38" height="38">
                        </div>
                        <div class="ml-3 flex-1">
                        <span class="block text-900 mb-1 text-xl font-medium">Total Openings</span>
                        <div class="flex align-items-center justify-content-between">
                            <span class="text-700">Total</span>
                            <span class="font-bold text-700">{{total_openings}}</span>
                        </div>
                        <ul class="list-none p-0 m-0 flex align-content-center mt-2 gap-2">
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-12 lg:col-4 p-2">
                    <div class="shadow-2 surface-card border-round p-4 h-full">
                    <div class="flex align-items-start">
                        <div class="bg-blue-100 border-round inline-flex align-items-center justify-content-center" style="width: 52px; height: 52px;">
                        <img src="https://blocks.primevue.org/images/blocks/illustration/stats-illustration-3.svg" width="38" height="38">
                        </div>
                        <div class="ml-3 flex-1">
                        <span class="block text-900 mb-1 text-xl font-medium">Succesful Applicants</span>
                        <div class="flex align-items-center justify-content-between">
                            <span class="text-700">Total</span>
                            <span class="font-bold text-700">{{successful_applications}}</span>
                        </div>
                        <ul class="list-none p-0 m-0 flex align-content-center mt-2 gap-2">
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-12 lg:col-4 p-2">
                    <div class="shadow-2 surface-card border-round p-4 h-full">
                    <div class="flex align-items-start">
                        <div class="bg-blue-100 border-round inline-flex align-items-center justify-content-center" style="width: 52px; height: 52px;">
                        <img src="https://blocks.primevue.org/images/blocks/illustration/stats-illustration-3.svg" width="38" height="38">
                        </div>
                        <div class="ml-3 flex-1">
                        <span class="block text-900 mb-1 text-xl font-medium">Rejected Applicants</span>
                        <div class="flex align-items-center justify-content-between">
                            <span class="text-700">Total</span>
                            <span class="font-bold text-700">{{rejected_applications}}</span>
                        </div>
                        <ul class="list-none p-0 m-0 flex align-content-center mt-2 gap-2">
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                            <li class="flex-1 bg-purple-500" style="height: 7px; border-radius: 3px;"></li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
              </div>
          </div>
        </section>
    </NuxtLayout>
  </template>
  
  <script setup lang="ts">
    import { useToast } from "primevue/usetoast";
    import { storeToRefs } from "pinia";
    import { useStatisticsStore } from "~/stores/statistics";
    import {useAdminStore} from "~/stores/admin"
    import { useAuthStore } from '@/stores/auth';
    import { useSageStore } from "~/stores/sage";
    import moment from "moment";
    const sageStore = useSageStore()
    const adminStore =  useAdminStore()
    const statisticsStore = useStatisticsStore()
    const authStore = useAuthStore();
    const applicants = ref()
    const current_openings = ref()
    const closed_openings = ref()
    const total_openings = ref()
    const rejected_applications = ref()
    const successful_applications = ref()
    definePageMeta({ 
        middleware: ["auth"]
    });

    const formatCurrency = (value) => {

    return value.toLocaleString('en-US', { style: 'currency', currency: 'ZWL' });

    };

      onMounted(async() => {

       let statistics = await sageStore.getAllStatistics().then((data) => {
            
            console.log("dddddddddddddddddddd",data.data)
            applicants.value = data.data.applicants
            current_openings.value = data.data.active_openings
            closed_openings.value = data.data.closed_openings
            total_openings.value = data.data.job_postings
            rejected_applications.value = data.data.rejected_applications
            successful_applications.value = data.data.succesful_applications
       })
       
      });
  
  
   
  
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
   .icon-card{
    width: 110%;
  } 
  .dashboard{
    margin-right: 20px;
  }
  
  </style>