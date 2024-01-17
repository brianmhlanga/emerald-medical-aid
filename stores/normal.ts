import { defineStore } from 'pinia';
import axios from 'axios';

export const useNormalStore = defineStore('normal', {
    state: ()=>({
        routing: undefined,
        approvers: undefined
        
    }),
    getters: {},
    actions: {
       
  
        async  getRouting(info){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/routing/single',
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
            this.routing = result?.data?.single?.id
            this.approvers = result?.data?.single[0]
            console.log("mvbilimbi football club",result)
            return result;
        }
    }
   })