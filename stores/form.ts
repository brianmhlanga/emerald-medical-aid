import { defineStore } from "pinia";
import Swal from "sweetalert2";
import axios from "axios";

export const useFormStore = defineStore('form', {
  state: () => ({
   
    
  }),
  getters: {
  
  },
  actions: {
   async  submitIndividualForm(info: any){
      var data = JSON.stringify({
          "data": info,
      });
      var config = {
          method: 'post',
          url: '/emerald/individual',
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
   async  allProviders(info:any){
    var data = JSON.stringify({
        "data": info
    });
    var config = {
        method: 'post',
        url: '/emerald/allProviders',
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
 async  searchType(info:any){
    var data = JSON.stringify({
        "data": info
    });
    var config = {
        method: 'post',
        url: '/emerald/searchProviderType',
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
 async  searchProvince(info:any){
    var data = JSON.stringify({
        "data": info
    });
    var config = {
        method: 'post',
        url: '/emerald/searchProvince',
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
 async  searchTown(info:any){
    var data = JSON.stringify({
        "data": info
    });
    var config = {
        method: 'post',
        url: '/emerald/searchTown',
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
 async  searchName(info:any){
    var data = JSON.stringify({
        "data": info
    });
    var config = {
        method: 'post',
        url: '/emerald/searchName',
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
   async  submitCivilForm(first: any){
    var data = JSON.stringify({
        "data": first
    });
    var config = {
        method: 'post',
        url: '/emerald/civil',
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
 }
  }
});

