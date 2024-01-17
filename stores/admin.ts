import { defineStore } from 'pinia';
import axios from 'axios';

export const useAdminStore = defineStore('admin', {
    state: ()=>({
        
        name: "", 
        surname: "", 
        username: "",
        users: undefined,
        commodities: undefined,
        suppliers: undefined,
        selected_center: undefined,
        selectedCommodities: undefined,
        remainingBudget: 0,
        addresses: undefined,
        taxes: undefined,
        clerk_pending: undefined,
        requests: undefined,
        my_pending: undefined,
        is_co_approver: undefined,
        co_approved_count: undefined,
        single_request: undefined,
        selected_commodities: undefined,
        selected_buyer: undefined,
        buyer_id: undefined,
        buyers: undefined,
        user: undefined,
        centers: undefined,
        ledgers: undefined,
        phone: null, 
        email: null, 
        age: null,
        gender: null,
        profile: null,
        title:null,
        yearlyBudget: null,
        account_status: null,
        password: null,
        cost_id: null,
        budget_id: null,
        types: null,
        type: null,
        cost_commodities: null,
        budgets: [],
        originators: null,
        approvers: null

    }),
    getters: {},
    actions: {
        async  getUsers(){
            var config = {
                method: 'post',
                url: '/users/all',
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
            console.log({result})
            this.users = result?.data?.users
            return result;
        },
        async  getOriginators(){
            var config = {
                method: 'post',
                url: '/users/all_originators',
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
            console.log({result})
            this.originators = result?.data?.users
            return result;
        },
        async  getApprovers(){
            var config = {
                method: 'post',
                url: '/users/all_approvers',
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
            console.log("mbilimbi wangui warunye", result)
            this.approvers = result?.data?.users
            return result;
        },
        async  getBuyers(){
            var config = {
                method: 'post',
                url: '/users/buyers',
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
            console.log({result})
            this.buyers = result?.data?.buyers
            return result;
        },
        async  getUser(id){
            var data = JSON.stringify({
                "id": id,
                });
            var config = {
                method: 'post',
                url: '/users/single',
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
            this.user = result?.data?.user
            return result;
        },
        async  createRouting(info){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/routing/create',
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
        async createBudget(){
            var data = JSON.stringify({
                "name": this.name,
                "yearlyBudget": this.yearlyBudget,
                "cost_id": this.cost_id

            })
            var config = {
                method: 'post',
                url: '/budget/create',
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

            this.name = '';
            this.yearlyBudget = '';
            
            this.cost_id=""

            this.budgets.push({
                name: this.name,
                yearlyBudget: this.yearlyBudget,

            })

            return result;

        },
        async  getAllBudgets(){
            var config = {
                method: 'post',
                url: '/budget/all',
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
            this.budgets = result?.data?.centers
            console.log("hybhycbchyRunyararo",result)
            return result;
        },
        
        async  createRequest(info){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/requisitions/create',
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
        async  unDraftRequest(info){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/requisitions/undraft',
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
        async  updateRequest(info){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/requisitions/update',
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
        async  archiveRequest(info){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/requisitions/archive',
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
        async  createDraft(info){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/requisitions/draft',
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
        async  createCost(info){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/center/create',
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
        async  clerkApprove(id){
            var data = JSON.stringify({
                "id": id,
            });
            var config = {
                method: 'post',
                url: '/requisitions/clerk_approve',
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
        async  normalApprove(info){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/requisitions/normal_approve',
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
        async  clerkDecline(id){
            var data = JSON.stringify({
                "id": id,
            });
            var config = {
                method: 'post',
                url: '/requisitions/clerk_reject',
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
        async  createLedger(info){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/ledger/create',
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
        async  createSupplier(info){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/supplier/create',
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
    
        async  createTaxes(info){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/taxes/create',
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
        async  getAllTaxes(){
            var config = {
                method: 'post',
                url: '/taxes/all',
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
            this.taxes = result?.data?.taxes
            return result;
        },
        async  createAddresses(info){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/addresses/create',
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
        async  createTypes(info){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/types/create',
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
                url: '/comment/create',
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
        async  getAllAddresses(){
            var config = {
                method: 'post',
                url: '/addresses/all',
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
            this.addresses = result?.data?.addresses
            return result;
        },
        async  getAllTypes(){
            var config = {
                method: 'post',
                url: '/types/all',
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
            this.types = result?.data?.types
            return result;
        },
        async  getType(id){
            let data = {
                "id": id
            }
            var config = {
                method: 'post',
                url: '/types/single',
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
            this.type = result?.data?.type
            return result;
        },
        async  getPendingRequests(){
            var config = {
                method: 'post',
                url: '/requisitions/clerk_pending',
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
            this.clerk_pending = result?.data?.pending
            return result;
        },
        async  getMyPendingRequests(id){
            let data = {
                "id": id
            }
            var config = {
                method: 'post',
                url: '/requisitions/my_pending',
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
            this.my_pending = result?.data?.pending
            this.is_co_approver = result?.data?.pending[0]?.routing?.approvers[0].is_co_approver
            return result;
        },
        
        async  getRequests(id){
            let data = {
                "id": id
            }
            var config = {
                method: 'post',
                url: '/requisitions/myRequisitions',
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
            this.requests = result?.data?.requests
           
            return result;
            console.log("simbanjn", result)
        },
        async  getForumPendingRequests(id){
            let data = {
                "id": id
            }
            var config = {
                method: 'post',
                url: '/requisitions/forum_pending',
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
            this.my_pending = result?.data?.pending
            this.is_co_approver = result?.data?.pending[0]?.routing?.approvers[0].is_co_approver
            return result;
        },
        async  getClerkPending(id){
            let data = {
                "id": id
            }
            var config = {
                method: 'post',
                url: '/requisitions/clerk_pending',
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
            this.my_pending = result?.data?.pending
            this.is_co_approver = result?.data?.pending[0]?.routing?.approvers[0].is_co_approver
            return result;
        },
        async  getSingleRequest(id){
            let data = {
                "id": id
            }
            var config = {
                method: 'post',
                url: '/requisitions/single',
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
            this.single_request = result?.data?.pending
            return result;
        },
        async  getAllSuppliers(){
            var config = {
                method: 'post',
                url: '/supplier/all',
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
            this.suppliers = result?.data?.suppliers
            return result;
        },
        async  createCommodity(info){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/commodity/create',
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
        async  getAllCommodities(){
           
            var config = {
                method: 'post',
                url: '/commodity/all',
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
            this.commodities = result?.data?.commodities
            return result;
        },
        async  getManySelectedCommodities(id){
            let data = {
                "id": id
            }
            var config = {
                method: 'post',
                url: '/commodity/many',
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
            this.cost_commodities = result?.data?.commodities
            return result;
        },
        async  getSelectedCommodities(id,commodity_access){
            let data = {
                "id": id,
                "commodity_access": commodity_access
            }
            var config = {
                method: 'post',
                url: '/commodity/selected',
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
            this.selected_commodities = result?.data?.commodities?.cost_center?.cost_center
            return result;
        },
        async  getBudget(id){
            let data = {
                "id": id
            }
            var config = {
                method: 'post',
                url: '/budget/single',
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
            this.remainingBudget = result?.data?.budget?.remainingBudget
            this.yearlyBudget = result?.data?.budget?.yearlyBudget
            this.budget_id = result?.data?.budget?.id
            return result;
        },
        async  getSingle(id){
            let data = {
                "id": id
            }
            var config = {
                method: 'post',
                url: '/commodity/single',
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
            this.selected_buyer= result?.data?.single?.buyer?.user?.username
            this.buyer_id = result?.data?.single?.buyer?.id
            return result;
        },
        async  getSelectedSuppliers(id){
            let data = {
                "id": id
            }
            var config = {
                method: 'post',
                url: '/supplier/many',
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
            this.suppliers= result?.data?.suppliers
            return result;
        },
        async  getAllLedgers(){
            var config = {
                method: 'post',
                url: '/ledger/all',
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
            this.ledgers = result?.data?.ledgers
            return result;
        },
        async  getAllCost(){
            var config = {
                method: 'post',
                url: '/center/all',
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
            this.centers = result?.data?.centers
            return result;
        },
        async  getAllUsers(){
            var config = {
                method: 'post',
                url: '/users/all',
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
            this.users = result?.data?.users
            console.log("mbilimbi wadii",result)

            return result;
            
        },
        
      async  registerUser(){
            var data = JSON.stringify({
            "name": this.name,
            "surname": this.surname,
            "username": this.username,
            "phone": this.phone,
            "selected_center": this.selected_center,
            "selectedCommodities": this.selectedCommodities,
            "email": this.email,
            "title":  this.title,
            "age": this.age,
            "gender": this.gender,
            "profile":this.profile,
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
     }
    }
   })