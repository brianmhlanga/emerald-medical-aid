import { defineStore } from "pinia";
import axios from "axios";

export const useSageStore = defineStore('sage', {
  state: () => ({
    name: "",
    companies: null,
    favour_companies: null,
    errorInformation: null,
    
   
    
  }),
  getters: {
  },
  actions: {

    async getCookie(){
        //console.log('Getting cookie');

        const config = {
           method: 'post',
           url: "/sage/getCookies",
           headers: { 
              
              'Accept': '/',
              'Cache-Control': 'no-cache',
              'Content-Type': 'application/json'
           },
           credentials: 'same-origin'
        }; 

        axios.defaults.withCredentials = true;
        
        return axios(config).then(function (response) {
           //console.log(JSON.stringify(response.data));
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
     },
     async getSageCompanies(){
        //Start loader
        const response:any = await this.getCookie();
        this.errorInformation = response.data.success
       console.log(response);
        if(response.success){

           const { PeopleEssUser, XSRFTOKEN } = response.data;
  
           const filteredPeopleEssUser = PeopleEssUser.split(/;/g)[0];
           const filteredXSRFTOKEN = XSRFTOKEN.split(/;/g)[0];

           
           const data = {
              PeopleEssUser: filteredPeopleEssUser,
              XSRFTOKEN: filteredXSRFTOKEN
              
           }

           const config = {
              method: 'post',
              url: '/sage/getCompanies',
              headers: { 
                 'Accept': '/',
                 'Cache-Control': 'no-cache',
                 'Content-Type': 'application/json'
              },
              credentials: 'same-origin',
              data: data
           }; 
   
           axios.defaults.withCredentials = true;
           
           const result: any = await axios(config).then(function (response) {
              //console.log("My employees");
              //console.log(JSON.stringify(response.data));
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

           //Switch off loader
           console.log("logging",result.data.data)
           this.companies = result.data
           return result;
        }else{
           //Switch off loader

           console.log('Failed Getting the Business Rules. Please try again by reloading the page.');

           return {
              message: "Failed Authenticaiton",
              success: false
           }
        }
     },
     async getActiveCompanyRules(range){
      //Start loader
      const response:any = await this.getCookie();
     // console.log(response);
    
      if(response.success){

         const { PeopleEssUser, XSRFTOKEN } = response.data;

         const filteredPeopleEssUser = PeopleEssUser.split(/;/g)[0];
         const filteredXSRFTOKEN = XSRFTOKEN.split(/;/g)[0];

         
         const data = {
            PeopleEssUser: filteredPeopleEssUser,
            XSRFTOKEN: filteredXSRFTOKEN,
            DateRange: range
            
         }

         const config = {
            method: 'post',
            url: '/sage/getCompanyRules',
            headers: { 
               'Accept': '/',
               'Cache-Control': 'no-cache',
               'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            data: data
         }; 
 
         axios.defaults.withCredentials = true;
         
         const result: any = await axios(config).then(function (response) {
            //console.log("My employees");
            //console.log(JSON.stringify(response.data));
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

         //Switch off loader
         console.log("logging",result.data.data)
         this.companies = result.data
         return result;
      }else{
 

         console.log('Failed Getting the Business Rules. Please try again by reloading the page.');

         return {
            message: "Failed Authenticaiton",
            success: false
         }
      }
   },
   async getAllDefinitions(){
      //Start loader
      const response :any= await this.getCookie();
     // console.log(response);
    
      if(response.success){

         const { PeopleEssUser, XSRFTOKEN } = response.data;

         const filteredPeopleEssUser = PeopleEssUser.split(/;/g)[0];
         const filteredXSRFTOKEN = XSRFTOKEN.split(/;/g)[0];

         
         const data = {
            PeopleEssUser: filteredPeopleEssUser,
            XSRFTOKEN: filteredXSRFTOKEN
            
         }

         const config = {
            method: 'post',
            url: '/sage/getDefinitions',
            headers: { 
               'Accept': '/',
               'Cache-Control': 'no-cache',
               'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            data: data
         }; 
 
         axios.defaults.withCredentials = true;
         
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
         //Switch off loader
         console.log("logging",result.data.data)
         this.companies = result.data
         return result;
      }else{
         //Switch off loader

         console.log('Failed Getting the Business Rules. Please try again by reloading the page.');

         return {
            message: "Failed Authenticaiton",
            success: false
         }
      }
   },
   async getReport(companyID,periodNumber){
      //Start loader
      const response :any = await this.getCookie();
     // console.log(response);
    
      if(response.success){

         const { PeopleEssUser, XSRFTOKEN } = response.data;

         const filteredPeopleEssUser = PeopleEssUser.split(/;/g)[0];
         const filteredXSRFTOKEN = XSRFTOKEN.split(/;/g)[0];

         
         const data = {
            PeopleEssUser: filteredPeopleEssUser,
            XSRFTOKEN: filteredXSRFTOKEN,
            companyID: companyID,
            periodNumber: periodNumber
         }

         const config = {
            method: 'post',
            url: '/sage/getReport',
            headers: {
               'Accept': '/',
               'Cache-Control': 'no-cache',
               'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            data: data
         }; 
 
         axios.defaults.withCredentials = true;
         
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
         //Switch off loader
         console.log("logging",result.data.data)
         this.companies = result.data
         return result;
      }else{
         //Switch off loader
         console.log('Failed Getting the Business Rules. Please try again by reloading the page.');
         return {
            message: "Failed Authenticaiton",
            success: false
         }
      }
   },
   async bankFileGeneration(companyID,paymentDate){
      //Start loader
      const response: any= await this.getCookie();
     // console.log(response);
    
      if(response.success){

         const { PeopleEssUser, XSRFTOKEN } = response.data;

         const filteredPeopleEssUser = PeopleEssUser.split(/;/g)[0];
         const filteredXSRFTOKEN = XSRFTOKEN.split(/;/g)[0];

         
         const data = {
            PeopleEssUser: filteredPeopleEssUser,
            XSRFTOKEN: filteredXSRFTOKEN,
            companyID: companyID,
            paymentDate: paymentDate
         }

         const config = {
            method: 'post',
            url: '/sage/generateBankFile',
            headers: {
               'Accept': '/',
               'Cache-Control': 'no-cache',
               'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            data: data
         }; 
 
         axios.defaults.withCredentials = true;
         
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
         //Switch off loader
        
         this.companies = result.data
         return result;
      }else{
         //Switch off loader

         console.log('Failed Getting the Business Rules. Please try again by reloading the page.');

         return {
            message: "Failed Authenticaiton",
            success: false
         }
      }
   },
   async  createRequisition(info){
      var data = JSON.stringify({
          "data": info,
      });
      var config = {
          method: 'post',
          url: '/sage/createReport',
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
      })
      .catch(function (error) {
          console.log(error);
          return {
              success: false
           }
      });
      return result;
  },
  async  updateRequisition(id,attachment){
   var data = JSON.stringify({
       "id": id,
       "attachment": attachment
   });
   var config = {
       method: 'post',
       url: '/sage/updateReport',
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
   })
   .catch(function (error) {
       console.log(error);
       return {
           success: false
        }
   });
   return result;
},
  async  getApprovals(id){
   var data = JSON.stringify({
       "id": id,
   });
   var config = {
       method: 'post',
       url: '/sage/getApprovals',
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
   })
   .catch(function (error) {
       console.log(error);
       return {
           success: false
        }
   });
   return result;
},
async  createCompany(info){
   var data = JSON.stringify({
       "data": info,
   });
   var config = {
       method: 'post',
       url: '/sage/createCompany',
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
   })
   .catch(function (error) {
       console.log(error);
       return {
           success: false
        }
   });
   return result;
},
async  getAllCompanies(){
   var config = {
       method: 'post',
       url: '/sage/allCompanies',
       headers: { 
           'Content-Type': 'application/json'
       }
   };

   const result: any = await axios(config).then(function (response) {
       return {
           data: response.data,
           success: true
        }
   })
   .catch(function (error) {
       console.log(error);
       return {
           success: false
        }
   });
   this.favour_companies = result?.data?.companies
   return result;
},
async  getAllStatistics(){
   var config = {
       method: 'post',
       url: '/sage/getStatistics',
       headers: { 
           'Content-Type': 'application/json'
       }
   };

   const result: any = await axios(config).then(function (response) {
       return {
           data: response.data,
           success: true
        }
   })
   .catch(function (error) {
       console.log(error);
       return {
           success: false
        }
   });
   return result;
},
async  myApprovals(id){
   var data = JSON.stringify({
       "id": id,
   });
   var config = {
       method: 'post',
       url: '/sage/myApprovals',
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
   })
   .catch(function (error) {
       console.log(error);
       return {
           success: false
        }
   });
   return result;
},
async  approveRequisition(id){
   var data = JSON.stringify({
       "id": id,
   });
   var config = {
       method: 'post',
       url: '/sage/approveReport',
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
   })
   .catch(function (error) {
       console.log(error);
       return {
           success: false
        }
   });
   return result;
},
async  rejectRequisition(id){
   var data = JSON.stringify({
       "id": id,
   });
   var config = {
       method: 'post',
       url: '/sage/rejectReport',
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
   })
   .catch(function (error) {
       console.log(error);
       return {
           success: false
        }
   });
   return result;
},
async  addComment(info){
   var data = JSON.stringify({
       "data": info,
   });
   var config = {
       method: 'post',
       url: '/sage/comment',
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
   })
   .catch(function (error) {
       console.log(error);
       return {
           success: false
        }
   });
   return result;
},
async  getSingle(id){
   console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",id)
   var data = JSON.stringify({
       "id": id,
   });
   var config = {
       method: 'post',
       url: '/sage/getSingle',
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
   })
   .catch(function (error) {
       console.log(error);
       return {
           success: false
        }
   });
   return result;
},

   
   
  }
});

