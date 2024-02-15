import { j as defineStore } from '../server.mjs';
import axios from 'axios';

const useFormStore = defineStore("form", {
  state: () => ({}),
  getters: {},
  actions: {
    async submitIndividualForm(info) {
      var data = JSON.stringify({
        "data": info
      });
      var config = {
        method: "post",
        url: "/emerald/individual",
        headers: {
          "Content-Type": "application/json"
        },
        data
      };
      const result = await axios(config).then(function(response) {
        return {
          data: response.data,
          success: true
        };
      }).catch(function(error) {
        console.log(error);
        return {
          success: false
        };
      });
      return result;
    },
    async allProviders(info) {
      var data = JSON.stringify({
        "data": info
      });
      var config = {
        method: "post",
        url: "/emerald/allProviders",
        headers: {
          "Content-Type": "application/json"
        },
        data
      };
      const result = await axios(config).then(function(response) {
        return {
          data: response.data,
          success: true
        };
      }).catch(function(error) {
        console.log(error);
        return {
          success: false
        };
      });
      return result;
    },
    async searchType(info) {
      var data = JSON.stringify({
        "data": info
      });
      var config = {
        method: "post",
        url: "/emerald/searchProviderType",
        headers: {
          "Content-Type": "application/json"
        },
        data
      };
      const result = await axios(config).then(function(response) {
        return {
          data: response.data,
          success: true
        };
      }).catch(function(error) {
        console.log(error);
        return {
          success: false
        };
      });
      return result;
    },
    async searchProvince(info) {
      var data = JSON.stringify({
        "data": info
      });
      var config = {
        method: "post",
        url: "/emerald/searchProvince",
        headers: {
          "Content-Type": "application/json"
        },
        data
      };
      const result = await axios(config).then(function(response) {
        return {
          data: response.data,
          success: true
        };
      }).catch(function(error) {
        console.log(error);
        return {
          success: false
        };
      });
      return result;
    },
    async searchTown(info) {
      var data = JSON.stringify({
        "data": info
      });
      var config = {
        method: "post",
        url: "/emerald/searchTown",
        headers: {
          "Content-Type": "application/json"
        },
        data
      };
      const result = await axios(config).then(function(response) {
        return {
          data: response.data,
          success: true
        };
      }).catch(function(error) {
        console.log(error);
        return {
          success: false
        };
      });
      return result;
    },
    async searchName(info) {
      var data = JSON.stringify({
        "data": info
      });
      var config = {
        method: "post",
        url: "/emerald/searchName",
        headers: {
          "Content-Type": "application/json"
        },
        data
      };
      const result = await axios(config).then(function(response) {
        return {
          data: response.data,
          success: true
        };
      }).catch(function(error) {
        console.log(error);
        return {
          success: false
        };
      });
      return result;
    },
    async submitCivilForm(first) {
      var data = JSON.stringify({
        "data": first
      });
      var config = {
        method: "post",
        url: "/emerald/civil",
        headers: {
          "Content-Type": "application/json"
        },
        data
      };
      const result = await axios(config).then(function(response) {
        return {
          data: response.data,
          success: true
        };
      }).catch(function(error) {
        console.log(error);
        return {
          success: false
        };
      });
      return result;
    }
  }
});

export { useFormStore as u };
//# sourceMappingURL=form-6y2Dg9Vo.mjs.map
