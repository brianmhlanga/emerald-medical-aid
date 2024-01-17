import { defineStore } from "pinia";
import axios from "axios";
import approvedRequisitions from "~/server/routes/statistics/approvedRequisitions";

export const useStatisticsStore = defineStore('statistics', {
  state: () => ({
    name: "",
    employees: null,
    centers: null,
    requisitions: null,
    users: null,
    companies: null,
    userRequisitions: null,
    approvedRequisitions: null,
    pendingRequisitions: null,
    rejectedRequisitions: null,
    draftedRequisitions: null
   
    
  }),
  getters: {
  },
  actions: {

    async getStatistics(){
      

        const config = {
           method: 'post',
           url: '/statistics/getStatistics',
           headers: { 
              'Content-Type': 'application/json'
           },
        }; 
  
        const result: any = await axios(config).then(function (response) {
           return {
              data: response.data,
              success: true
           }
        }).catch(function (error) {
           console.log(error);
  
           return {
              success: false
           }
        }); 
        console.log('statistics')
        console.log("simbaaa",result)
        this.requisitions = result.data.requisitions
        this.centers = result.data.centers
        this.users = result.data.users
        
        return result; 
     },
     async getRequisition(id){
      let data = {
         "originator_id": id
      }
      const config = {

         method: 'post',
         url: '/statistics/originatorRequisitions',
         headers: { 
            'Content-Type': 'application/json'
         },
         data: data
      }; 

      const result: any = await axios(config).then(function (response) {
         return {
            data: response.data,
            success: true
         }
      }).catch(function (error) {
         console.log(error);

         return {
            success: false
         }
      }); 
      console.log('statistics')
      console.log("simbaaa",result)
      this.userRequisitions = result.data.userRequisitions
      
      return result; 
   },
   async getapprovedRequisitions(id){
      let data = {
         "originator_id": id
      }
      const config = {

         method: 'post',
         url: '/statistics/approvedRequisitions',
         headers: { 
            'Content-Type': 'application/json'
         },
         data: data
      }; 

      const result: any = await axios(config).then(function (response) {
         return {
            data: response.data,
            success: true
         }
      }).catch(function (error) {
         console.log(error);

         return {
            success: false
         }
      }); 
      console.log('statistics')
      console.log("simbaaa",result)
      this.approvedRequisitions = result.data.approvedRequisitions
      
      return result; 
   },
   async getpendingRequisitions(id){
      let data = {
         "originator_id": id
      }
      const config = {

         method: 'post',
         url: '/statistics/pendingRequisitions',
         headers: { 
            'Content-Type': 'application/json'
         },
         data: data
      }; 

      const result: any = await axios(config).then(function (response) {
         return {
            data: response.data,
            success: true
         }
      }).catch(function (error) {
         console.log(error);

         return {
            success: false
         }
      }); 
      console.log('statistics')
      console.log("simbaaa",result)
      this.pendingRequisitions = result.data.pendingRequisitions
      
      return result; 
   },
   async getrejectedRequisitions(id){
      let data = {
         "originator_id": id
      }
      const config = {

         method: 'post',
         url: '/statistics/rejectedRequisitions',
         headers: { 
            'Content-Type': 'application/json'
         },
         data: data
      }; 

      const result: any = await axios(config).then(function (response) {
         return {
            data: response.data,
            success: true
         }
      }).catch(function (error) {
         console.log(error);

         return {
            success: false
         }
      }); 
      console.log('statistics')
      console.log("simbaaa",result)
      this.rejectedRequisitions = result.data.rejectedRequisitions
      
      return result; 
   },
   async getDraftedRequisitions(id){
      let data = {
         "originator_id": id
      }
      const config = {

         method: 'post',
         url: '/statistics/draftedRequisitions',
         headers: { 
            'Content-Type': 'application/json'
         },
         data: data
      }; 

      const result: any = await axios(config).then(function (response) {
         return {
            data: response.data,
            success: true
         }
      }).catch(function (error) {
         console.log(error);

         return {
            success: false
         }
      }); 
      console.log('statistics')
      console.log("simbaaa",result)
      this.draftedRequisitions = result.data.draftedRequisitions
      
      return result; 
   },
   
   
  }
});

