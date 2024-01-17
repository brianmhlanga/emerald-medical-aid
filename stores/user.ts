import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: ()=>({
        user_id: 0,
        first_name: "", 
        last_name: "", 
        phone: null, 
        email: null, 
        date_joined: null, 
        is_active: null, 
        password: null,
        loggedIn: false,
        confirm_password: null,
        isLoading: false,
    }),
    getters: {},
    actions: {
      async  registerUser(){
            var data = JSON.stringify({
            "first_name": this.first_name,
            "last_name": this.last_name,
            "phone": this.phone,
            "email": this.email,
            "password": this.password
            });

            var config = {
                method: 'post',
                url: '/auth/register',
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
            return result;
        },
        async  registerApplicant(){
         var data = JSON.stringify({
         "first_name": this.first_name,
         "last_name": this.last_name,
         "phone": this.phone,
         "email": this.email,
         "password": this.password,
         "role": "APPLICANT"
         });

         var config = {
             method: 'post',
             url: '/auth/register',
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
         return result;
     },
        async getUser(id: BigInt){
         const data = {
            id: id
         }

         const config = {
            method: 'post',
            url: '/profiles/getUser',
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

         return result;
      },
        async getAllUsers(){

            const config = {
               method: 'post',
               url: '/profiles/getAllUsers',
               headers: { 
                  'Content-Type': 'application/json'
               }
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
   
            return result;
         }
    }
});