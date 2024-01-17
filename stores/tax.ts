import { defineStore } from 'pinia';
import axios from 'axios';

export const useTaxStore = defineStore('tax', {
    state: ()=>({
        
        tax_code: "", 
        description: "", 
        current_rate: "",
        previous_rate: undefined,
        basis: undefined,
        effective_date: null, 
        sales_ledger_code: null, 
        ap_ledger_code: null
    }),
    getters: {},
    actions: {
      
        async  createTaxCodes(){

         const data = {
            "tax_code": this.tax_code,
            "description": this.description,
            "current_rate" : this.current_rate,
            "previous_rate": this.previous_rate,
            "basis": this.basis,
            "effective_date": this.effective_date,
            "sales_ledger_code":this.sales_ledger_code,
            "ap_ledger_code": this.ap_ledger_code
         }
            var config = {
                method: 'post',
                url: '/codes/create',
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
            console.log({result})
            return result;
        }
      }
   })