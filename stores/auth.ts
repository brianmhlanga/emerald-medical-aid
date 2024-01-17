import { defineStore } from "pinia";
import Swal from "sweetalert2";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    access_levels: null,
    access_list: null,
    user_id : undefined,
    name: "",
    id: null,
    employee_id: null,
    email: null,
    login_email: null,
    login_password: null,
    first_name: null,
    last_name: null,
    phone: null,
    role: null,
    date: null,
    time: null,
    department: null,
    department_id: null,
    userData: undefined,
    applicantData: undefined,
    applicant_id: undefined,
    employeeData: null,
    employeeID: null,
    departmentID: null,
    profileInfo: null,
    profileId: null,
    editing_id: null,
    editing_portal_id: null,
    editing_first_name: null,
    editing_last_name: null,
    editing_email: null,
    editing_gender: null,
    editing_id_number: null,
    editing_phone: null,
    old_password: null,
    password: null,
    confirm_password: null,
    editing_enthnicity: null,
    editing_province: null,
    editing_city: null,
    editing_nationality: null,
    editing_availability: null,
    editing_disability: null,
    editing_employment_status: null,
    editing_expected_salary: null,
    editing_previous_convictions: null,
    editing_date_of_birth: null,
    editing_resume: null,
    editing_personal_strength: null,
    editing_technical_skills: null,
    editing_address: null,
    loginEmail : null,
    loginPassword : null
    
  }),
  getters: {
   UserDetails(state:any){
      this.id = state.userData.id
      this.email = state.userData.email
      this.first_name = state.userData.first_name
      this.last_name = state.userData.last_name
      this.phone = state.userData.phone
      this.access_list = state.userData.user.company_access[0].access_list
      this.role = state.userData.rolesondepartments[0].role
      this.department = state.userData.rolesondepartments[0].department.item
      this.department_id = state.userData.rolesondepartments[0].departmentId
   }
  },
  actions: {
   async  register(info: any){
      var data = JSON.stringify({
          "data": info,
      });
      var config = {
          method: 'post',
          url: '/auth/register',
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
   async login(info:any){
      var data = JSON.stringify({
         "data": info,
     });

      const config = {
         method: 'post',
         url: '/auth/login',
         headers: { 
            'Content-Type': 'application/json'
         },
         data : data
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
      const employee_data = result.data
      console.log("my employee data is")
      let success = result.data.success
      console.log({success})
      console.log(employee_data)
      this.employeeData = employee_data.employee
      

      return result;
   },
   async clientLogin() {
      const data = {
         "email": this.loginEmail,
         "password": this.loginPassword,
      }

      const config = {
         method: 'post',
         url: '/auth/client-login',
         headers: { 
            'Content-Type': 'application/json'
         },
         data : data
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
      const applicant_data = result.data
      console.log("my employee data is")
      let success = result.data.success
      console.log({success})
      console.log(applicant_data)
   
      

      return result;

   },
   async clientMe(): Promise<any>{
      const applicantData:any = useCookie('user').value;
      console.log(useCookie('applicant').value)
      const token = useCookie('token').value;
      const applicantID:any = useCookie('applicant_id').value;
      
      const accesslist = useCookie('permissions').value || [];
      console.log(token);
      this.applicantData = applicantData
      this.applicant_id = applicantData?.id
      console.log('my user data is',applicantData)
      // this.employeeID = employeeID
      return await $fetch('/auth/client-me', { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            token: token
        }) 
      }).then((data: any)=>{ 
        return data;
      }).catch((error)=>{
        console.log(error);
      });

   },
    async me(): Promise<any> {
      const userData:any = useCookie('user').value;
      console.log(useCookie('user').value)
      const token = useCookie('token').value;
      const employeeID:any = useCookie('employee_id').value;
      const departmentID = useCookie('employeeDepartmentID').value
      const accesslist = useCookie('permissions').value || [];
      console.log(token);
      this.userData = userData
      this.user_id = userData?.id
      console.log('my user data is',userData)
      this.employeeID = employeeID
      return await $fetch('/auth/me', { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            token: token
        }) 
      }).then((data: any)=>{ 
        return data;
      }).catch((error)=>{
        console.log(error);
      });
    },
       async getPersonalInfo(){

      var data = JSON.stringify({
         "sid" : this?.userData?.id,
        });
   
      const config = { 
         method: 'post',
         url: '/recruitment/getpersonal',
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
      let   myprofile = result.data
            console.log("my personal info")
            console.log(myprofile.profile_info)
            this.profileInfo = myprofile.profile_info
            this.profileId = myprofile.profile_info.id
            this.editing_id = myprofile.profile_info.id
            this.editing_portal_id = myprofile.profile_info.portal_id
            this.editing_first_name = myprofile.profile_info.first_name
            this.editing_last_name = myprofile.profile_info.last_name
            this.editing_email = myprofile.profile_info.email
            this.editing_gender = myprofile.profile_info.gender
            this.editing_id_number = myprofile.profile_info.id_number
            this.editing_phone = myprofile.profile_info.phone
            this.editing_enthnicity = myprofile.profile_info.enthnicity
            this.editing_province = myprofile.profile_info.province
            this.editing_city = myprofile.profile_info.city
            this.editing_nationality = myprofile.profile_info.nationality
            this.editing_availability = myprofile.profile_info.availability
            this.editing_disability = myprofile.profile_info.disability
            this.editing_employment_status = myprofile.profile_info.employment_status
            this.editing_expected_salary = myprofile.profile_info.expected_salary
            this.editing_previous_convictions = myprofile.profile_info.previous_convictions
            this.editing_date_of_birth = myprofile.profile_info.date_of_birth
            this.editing_resume = myprofile.profile_info.resume
            this.editing_personal_strength = myprofile.profile_info.personal_strength
            this.editing_technical_skills = myprofile.profile_info.technical_skills
            this.editing_address = myprofile.profile_info.address

            
            
      return result;
   },
    async  checkIfApplied(postingId){
        
      var data = JSON.stringify({
       "postingId": postingId,
       "applicantId": this.profileId,
      });
   
      var config = { 
          method: 'post',
          url: '/recruitment/check_if_applied',
          headers: {
              'Content-Type': 'application/json'
          },
          data : data

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
      console.log("my previous application")
      console.log({result})
      console.log(result.data.success)
      return result;
   },
   async  createApplication(postingId){
        
    var data = JSON.stringify({
     "postingId": postingId,
     "applicantId": this.profileId,
    });
 
    var config = { 
        method: 'post',
        url: '/recruitment/create_application',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
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
    console.log("my created application")
    console.log({result})
    console.log(result.data.success)
    return result;
 },
 async logout() {
   Swal.fire({
     icon: 'question',
     title: 'Log Out',
     text: 'Do you want to log out',
     showCancelButton: true
   }).then(async (result)=>{
     if(result.isConfirmed){  
       // Reset Offline DB

       // Clear session
       await $fetch('/auth/logout', { 
         method: "POST",
         headers: { "Content-Type": "application/json" },
       }).then(()=>{
         // Reload App
         reloadNuxtApp();
       }).catch((error)=>{
         console.log(error);
       });
     }
   });
 }
  }
});

