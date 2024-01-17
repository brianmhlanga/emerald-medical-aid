import { defineStore } from 'pinia';
import axios from 'axios';

export const useRecruitmentStore = defineStore('recruitment', {
    state: ()=>({
        id: null,
        postId: null,
        profileId: null,
        password: null,
        firstname: null,
        lastname: null,
        email: null,
        views: null,
        status: null,
        date_of_birth: null,
        address: null,
        applicantId: null,
        gender: [
         {name: 'MALE'},
         {name: 'FEMALE'},
        ],
        selected_gender: null,
        id_number: null,
        phone: null,
        personal_strength: [],
        technical_skills: [],
        ethnicity: [
         {name: 'ASIAN'},
         {name: 'BLACK'},
         {name: 'COLOURED'},
         {name: 'INDIAN'},
         {name: 'WHITE'},
         {name: 'OTHER'},
        ],
        profileList: null,
        userData: null,
        profileInfo: null,
        selected_ethnicity: null,
        province: null,
        city: null,
        resultsList: null,
        resume: null,
        number_of_questions: null,
        number_of_passed_questions: null,
        number_of_unstructured_questions: null,
        availability: [
         {name: 'IMMEDIATLEY'},
         {name: '1 WEEK'},
         {name: '2 WEEKS'},
         {name: '3 WEEKS'},
         {name: '1 MONTH'},
         {name: '2 MONTHS'},
         {name: '3 MONTHS'},
         {name: '4 MONTHS'},
         {name: '5 MONTHS'},
         {name: '6 MONTHS'},
         {name: '6 MONTHS PLUS'},
         {name: '1 YEAR'},
         {name: '1 YEAR PLUS'},
        ],
        applicationsList: null,
        selected_availability: null,
        expected_salary: null,
        disability: [
         {name: 'NOT DISABLED'},
         {name: 'Mobility and Physical Impairments'},
         {name: 'Spinal Cord Disability'},
         {name: 'Head Injuries - Brain Disability'},
         {name: 'Vision Disability'},
         {name: 'Hearing Disability'},
        ],
        selected_disability: null,
        employment_status: [
         {name: 'Employed'},
         {name: 'Unemployed'},
         {name: '1st Time Job Seeker'},
         {name: 'Student Attachment'},
        ],
        convictions: [
         {name:'No Convictions'},
         {name:'Ex Convict'},
         {name:'On Parole'}             
        ],
        selected_conviction: null,
        selected_employment_status: null,
        openings: [
            {name: 'HR Manager'},
            {name: 'Marketing Executive'},
            {name: 'Software Developer'},
            {name: 'Web Designer'},
            {name: 'UI/UX Designer'}
        ],
        types: [
            {name: 'PERMANENT'},
            {name: 'FIXED_TERM_CONTRACT'},
            {name: 'PART_TIME',},
        ],
        employeeData: null,
        jobOpenings: null,
        selectedOpening: null,
        description: null,
        department: null,
        hiring_manager: null,
        deadline: null,
        job_type: null,
        experience: null,
        salary: null,
        location: null,
        skills: null,
        vacancyList: null,
        question_types: ['Yes/No','MultiChoice','UnStructured'],
        multichoice_options: [],
        multichoice_answer: null,
        question_type: null,
        boolean_answer: false,
        options: ['A','B','C','D'],
        question: null,
        score: null,
        questionsList: [],
        selectedCountry: null,
        countries: [ 
         {"name": "Afghanistan", "code": "AF"}, 
         {"name": "Albania", "code": "AL"}, 
         {"name": "Algeria", "code": "DZ"}, 
         {"name": "American Samoa", "code": "AS"}, 
         {"name": "Andorra", "code": "AD"}, 
         {"name": "Angola", "code": "AO"}, 
         {"name": "Anguilla", "code": "AI"}, 
         {"name": "Antarctica", "code": "AQ"}, 
         {"name": "Antigua and Barbuda", "code": "AG"}, 
         {"name": "Argentina", "code": "AR"}, 
         {"name": "Armenia", "code": "AM"}, 
         {"name": "Aruba", "code": "AW"}, 
         {"name": "Australia", "code": "AU"}, 
         {"name": "Austria", "code": "AT"}, 
         {"name": "Azerbaijan", "code": "AZ"}, 
         {"name": "Bahamas", "code": "BS"}, 
         {"name": "Bahrain", "code": "BH"}, 
         {"name": "Bangladesh", "code": "BD"}, 
         {"name": "Barbados", "code": "BB"}, 
         {"name": "Belarus", "code": "BY"}, 
         {"name": "Belgium", "code": "BE"}, 
         {"name": "Belize", "code": "BZ"}, 
         {"name": "Benin", "code": "BJ"}, 
         {"name": "Bermuda", "code": "BM"}, 
         {"name": "Bhutan", "code": "BT"}, 
         {"name": "Bolivia", "code": "BO"}, 
         {"name": "Bosnia and Herzegovina", "code": "BA"}, 
         {"name": "Botswana", "code": "BW"}, 
         {"name": "Bouvet Island", "code": "BV"}, 
         {"name": "Brazil", "code": "BR"}, 
         {"name": "British Indian Ocean Territory", "code": "IO"}, 
         {"name": "Brunei Darussalam", "code": "BN"}, 
         {"name": "Bulgaria", "code": "BG"}, 
         {"name": "Burkina Faso", "code": "BF"}, 
         {"name": "Burundi", "code": "BI"}, 
         {"name": "Cambodia", "code": "KH"}, 
         {"name": "Cameroon", "code": "CM"}, 
         {"name": "Canada", "code": "CA"}, 
         {"name": "Cape Verde", "code": "CV"}, 
         {"name": "Cayman Islands", "code": "KY"}, 
         {"name": "Central African Republic", "code": "CF"}, 
         {"name": "Chad", "code": "TD"}, 
         {"name": "Chile", "code": "CL"}, 
         {"name": "China", "code": "CN"}, 
         {"name": "Christmas Island", "code": "CX"}, 
         {"name": "Cocos (Keeling) Islands", "code": "CC"}, 
         {"name": "Colombia", "code": "CO"}, 
         {"name": "Comoros", "code": "KM"}, 
         {"name": "Congo", "code": "CG"}, 
         {"name": "Congo, The Democratic Republic of the", "code": "CD"}, 
         {"name": "Cook Islands", "code": "CK"}, 
         {"name": "Costa Rica", "code": "CR"}, 
         {"name": "Cote D\"Ivoire", "code": "CI"}, 
         {"name": "Croatia", "code": "HR"}, 
         {"name": "Cuba", "code": "CU"}, 
         {"name": "Cyprus", "code": "CY"}, 
         {"name": "Czech Republic", "code": "CZ"}, 
         {"name": "Denmark", "code": "DK"}, 
         {"name": "Djibouti", "code": "DJ"}, 
         {"name": "Dominica", "code": "DM"}, 
         {"name": "Dominican Republic", "code": "DO"}, 
         {"name": "Ecuador", "code": "EC"}, 
         {"name": "Egypt", "code": "EG"}, 
         {"name": "El Salvador", "code": "SV"}, 
         {"name": "Equatorial Guinea", "code": "GQ"}, 
         {"name": "Eritrea", "code": "ER"}, 
         {"name": "Estonia", "code": "EE"}, 
         {"name": "Ethiopia", "code": "ET"}, 
         {"name": "Falkland Islands (Malvinas)", "code": "FK"}, 
         {"name": "Faroe Islands", "code": "FO"}, 
         {"name": "Fiji", "code": "FJ"}, 
         {"name": "Finland", "code": "FI"}, 
         {"name": "France", "code": "FR"}, 
         {"name": "French Guiana", "code": "GF"}, 
         {"name": "French Polynesia", "code": "PF"}, 
         {"name": "French Southern Territories", "code": "TF"}, 
         {"name": "Gabon", "code": "GA"}, 
         {"name": "Gambia", "code": "GM"}, 
         {"name": "Georgia", "code": "GE"}, 
         {"name": "Germany", "code": "DE"}, 
         {"name": "Ghana", "code": "GH"}, 
         {"name": "Gibraltar", "code": "GI"}, 
         {"name": "Greece", "code": "GR"}, 
         {"name": "Greenland", "code": "GL"}, 
         {"name": "Grenada", "code": "GD"}, 
         {"name": "Guadeloupe", "code": "GP"}, 
         {"name": "Guam", "code": "GU"}, 
         {"name": "Guatemala", "code": "GT"}, 
         {"name": "Guernsey", "code": "GG"}, 
         {"name": "Guinea", "code": "GN"}, 
         {"name": "Guinea-Bissau", "code": "GW"}, 
         {"name": "Guyana", "code": "GY"}, 
         {"name": "Haiti", "code": "HT"}, 
         {"name": "Heard Island and Mcdonald Islands", "code": "HM"}, 
         {"name": "Holy See (Vatican City State)", "code": "VA"}, 
         {"name": "Honduras", "code": "HN"}, 
         {"name": "Hong Kong", "code": "HK"}, 
         {"name": "Hungary", "code": "HU"}, 
         {"name": "Iceland", "code": "IS"}, 
         {"name": "India", "code": "IN"}, 
         {"name": "Indonesia", "code": "ID"}, 
         {"name": "Iran, Islamic Republic Of", "code": "IR"}, 
         {"name": "Iraq", "code": "IQ"}, 
         {"name": "Ireland", "code": "IE"}, 
         {"name": "Isle of Man", "code": "IM"}, 
         {"name": "Israel", "code": "IL"}, 
         {"name": "Italy", "code": "IT"}, 
         {"name": "Jamaica", "code": "JM"}, 
         {"name": "Japan", "code": "JP"}, 
         {"name": "Jersey", "code": "JE"}, 
         {"name": "Jordan", "code": "JO"}, 
         {"name": "Kazakhstan", "code": "KZ"}, 
         {"name": "Kenya", "code": "KE"}, 
         {"name": "Kiribati", "code": "KI"}, 
         {"name": "Korea, Democratic People\"S Republic of", "code": "KP"}, 
         {"name": "Korea, Republic of", "code": "KR"}, 
         {"name": "Kuwait", "code": "KW"}, 
         {"name": "Kyrgyzstan", "code": "KG"}, 
         {"name": "Lao People\"S Democratic Republic", "code": "LA"}, 
         {"name": "Latvia", "code": "LV"}, 
         {"name": "Lebanon", "code": "LB"}, 
         {"name": "Lesotho", "code": "LS"}, 
         {"name": "Liberia", "code": "LR"}, 
         {"name": "Libyan Arab Jamahiriya", "code": "LY"}, 
         {"name": "Liechtenstein", "code": "LI"}, 
         {"name": "Lithuania", "code": "LT"}, 
         {"name": "Luxembourg", "code": "LU"}, 
         {"name": "Macao", "code": "MO"}, 
         {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"}, 
         {"name": "Madagascar", "code": "MG"}, 
         {"name": "Malawi", "code": "MW"}, 
         {"name": "Malaysia", "code": "MY"}, 
         {"name": "Maldives", "code": "MV"}, 
         {"name": "Mali", "code": "ML"}, 
         {"name": "Malta", "code": "MT"}, 
         {"name": "Marshall Islands", "code": "MH"}, 
         {"name": "Martinique", "code": "MQ"}, 
         {"name": "Mauritania", "code": "MR"}, 
         {"name": "Mauritius", "code": "MU"}, 
         {"name": "Mayotte", "code": "YT"}, 
         {"name": "Mexico", "code": "MX"}, 
         {"name": "Micronesia, Federated States of", "code": "FM"}, 
         {"name": "Moldova, Republic of", "code": "MD"}, 
         {"name": "Monaco", "code": "MC"}, 
         {"name": "Mongolia", "code": "MN"}, 
         {"name": "Montserrat", "code": "MS"}, 
         {"name": "Morocco", "code": "MA"}, 
         {"name": "Mozambique", "code": "MZ"}, 
         {"name": "Myanmar", "code": "MM"}, 
         {"name": "Namibia", "code": "NA"}, 
         {"name": "Nauru", "code": "NR"}, 
         {"name": "Nepal", "code": "NP"}, 
         {"name": "Netherlands", "code": "NL"}, 
         {"name": "Netherlands Antilles", "code": "AN"}, 
         {"name": "New Caledonia", "code": "NC"}, 
         {"name": "New Zealand", "code": "NZ"}, 
         {"name": "Nicaragua", "code": "NI"}, 
         {"name": "Niger", "code": "NE"}, 
         {"name": "Nigeria", "code": "NG"}, 
         {"name": "Niue", "code": "NU"}, 
         {"name": "Norfolk Island", "code": "NF"}, 
         {"name": "Northern Mariana Islands", "code": "MP"}, 
         {"name": "Norway", "code": "NO"}, 
         {"name": "Oman", "code": "OM"}, 
         {"name": "Pakistan", "code": "PK"}, 
         {"name": "Palau", "code": "PW"}, 
         {"name": "Palestinian Territory, Occupied", "code": "PS"}, 
         {"name": "Panama", "code": "PA"}, 
         {"name": "Papua New Guinea", "code": "PG"}, 
         {"name": "Paraguay", "code": "PY"}, 
         {"name": "Peru", "code": "PE"}, 
         {"name": "Philippines", "code": "PH"}, 
         {"name": "Pitcairn", "code": "PN"}, 
         {"name": "Poland", "code": "PL"}, 
         {"name": "Portugal", "code": "PT"}, 
         {"name": "Puerto Rico", "code": "PR"}, 
         {"name": "Qatar", "code": "QA"}, 
         {"name": "Reunion", "code": "RE"}, 
         {"name": "Romania", "code": "RO"}, 
         {"name": "Russian Federation", "code": "RU"}, 
         {"name": "RWANDA", "code": "RW"}, 
         {"name": "Saint Helena", "code": "SH"}, 
         {"name": "Saint Kitts and Nevis", "code": "KN"}, 
         {"name": "Saint Lucia", "code": "LC"}, 
         {"name": "Saint Pierre and Miquelon", "code": "PM"}, 
         {"name": "Saint Vincent and the Grenadines", "code": "VC"}, 
         {"name": "Samoa", "code": "WS"}, 
         {"name": "San Marino", "code": "SM"}, 
         {"name": "Sao Tome and Principe", "code": "ST"}, 
         {"name": "Saudi Arabia", "code": "SA"}, 
         {"name": "Senegal", "code": "SN"}, 
         {"name": "Serbia and Montenegro", "code": "CS"}, 
         {"name": "Seychelles", "code": "SC"}, 
         {"name": "Sierra Leone", "code": "SL"}, 
         {"name": "Singapore", "code": "SG"}, 
         {"name": "Slovakia", "code": "SK"}, 
         {"name": "Slovenia", "code": "SI"}, 
         {"name": "Solomon Islands", "code": "SB"}, 
         {"name": "Somalia", "code": "SO"}, 
         {"name": "South Africa", "code": "ZA"}, 
         {"name": "South Georgia and the South Sandwich Islands", "code": "GS"}, 
         {"name": "Spain", "code": "ES"}, 
         {"name": "Sri Lanka", "code": "LK"}, 
         {"name": "Sudan", "code": "SD"}, 
         {"name": "Suriname", "code": "SR"}, 
         {"name": "Svalbard and Jan Mayen", "code": "SJ"}, 
         {"name": "Swaziland", "code": "SZ"}, 
         {"name": "Sweden", "code": "SE"}, 
         {"name": "Switzerland", "code": "CH"}, 
         {"name": "Syrian Arab Republic", "code": "SY"}, 
         {"name": "Taiwan, Province of China", "code": "TW"}, 
         {"name": "Tajikistan", "code": "TJ"}, 
         {"name": "Tanzania, United Republic of", "code": "TZ"}, 
         {"name": "Thailand", "code": "TH"}, 
         {"name": "Timor-Leste", "code": "TL"}, 
         {"name": "Togo", "code": "TG"}, 
         {"name": "Tokelau", "code": "TK"}, 
         {"name": "Tonga", "code": "TO"}, 
         {"name": "Trinidad and Tobago", "code": "TT"}, 
         {"name": "Tunisia", "code": "TN"}, 
         {"name": "Turkey", "code": "TR"}, 
         {"name": "Turkmenistan", "code": "TM"}, 
         {"name": "Turks and Caicos Islands", "code": "TC"}, 
         {"name": "Tuvalu", "code": "TV"}, 
         {"name": "Uganda", "code": "UG"}, 
         {"name": "Ukraine", "code": "UA"}, 
         {"name": "United Arab Emirates", "code": "AE"}, 
         {"name": "United Kingdom", "code": "GB"}, 
         {"name": "United States", "code": "US"}, 
         {"name": "United States Minor Outlying Islands", "code": "UM"}, 
         {"name": "Uruguay", "code": "UY"}, 
         {"name": "Uzbekistan", "code": "UZ"}, 
         {"name": "Vanuatu", "code": "VU"}, 
         {"name": "Venezuela", "code": "VE"}, 
         {"name": "Viet Nam", "code": "VN"}, 
         {"name": "Virgin Islands, British", "code": "VG"}, 
         {"name": "Virgin Islands, U.S.", "code": "VI"}, 
         {"name": "Wallis and Futuna", "code": "WF"}, 
         {"name": "Western Sahara", "code": "EH"}, 
         {"name": "Yemen", "code": "YE"}, 
         {"name": "Zambia", "code": "ZM"}, 
         {"name": "Zimbabwe", "code": "ZW"} 
     ]
     
    }),
    getters: {
      UserDetails(state){
         this.id = state.userData.id
        }
    },
    actions: {
         async me(): Promise<any> {
            const userData = useCookie('user').value || "";
            const token = useCookie('token').value || "";
            console.log(token);
            this.userData = userData
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
        async getCookie(){
            console.log('Getting cookie');
   
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
               console.log("my cookie data response")
               console.log(JSON.stringify(response.data));
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
   
   async getEmployeesFromSage(){
      const response : any = await this.getCookie();
   
         const { PeopleEssUser, XSRFTOKEN } = response.data;
   
         const filteredPeopleEssUser = PeopleEssUser.split(/;/g)[0];
         const filteredXSRFTOKEN = XSRFTOKEN.split(/;/g)[0];
   
         const data = {
            PeopleEssUser: filteredPeopleEssUser,
            XSRFTOKEN: filteredXSRFTOKEN,
         }
   
         const config = {
            method: 'post',
            url: '/sage/getEmployees',
            headers: { 
               'Accept': '/',
               'Cache-Control': 'no-cache',
               'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
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
         
         this.employeeData = result.data.data.data.data;
         return result;
       },
       async getJobOpenings(){
         const response : any = await this.getCookie();
   
      
      
            const { PeopleEssUser, XSRFTOKEN } = response.data;
      
            const filteredPeopleEssUser = PeopleEssUser.split(/;/g)[0];
            const filteredXSRFTOKEN = XSRFTOKEN.split(/;/g)[0];
      
            const data = {
               PeopleEssUser: filteredPeopleEssUser,
               XSRFTOKEN: filteredXSRFTOKEN,
            }
      
            const config = {
               method: 'post',
               url: '/sage/getOpenings',
               headers: { 
                  'Accept': '/',
                  'Cache-Control': 'no-cache',
                  'Content-Type': 'application/json'
               },
               credentials: 'same-origin',
               data : data
            }; 
            
            const result: any = await axios(config).then(function (response) {
       
               return {
                     data: response.data,
                     success: true
                  }
            })
            .catch(function (error) {
               console.log("error");
               return {
                     success: false
                  }
            });
            console.log({result})
            this.jobOpenings = result.data.data.data.data;
            return result;
          },
          async  createJobPost(){
        
            var data = JSON.stringify({
             "title" : this.selectedOpening,
             "description": this.description,
             "department": this.department,
             "hiring_manager": this.hiring_manager,
             "deadline": this.deadline,
             "job_type": this.job_type,
             "experience":this.experience,
             "salary": this.salary,
             "location": this.location,
             "views": this.views,
             "status": this.status
             
            });
         
            var config = { 
                method: 'post',
                url: '/recruitment/create',
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
            console.log("my created vacancy")
            console.log({result})
            console.log(result.data.success)
            return result;
         },
         async  createPersonalDetails(info){
        
            var data = JSON.stringify({
             "data": info,
             
            });
         
            var config = { 
                method: 'post',
                url: '/recruitment/create_personal_details',
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
            console.log("my created vacancy")
            console.log({result})
            console.log(result.data.success)
            return result;
         },
         async  updatePersonalDetails(){
        
            var data = JSON.stringify({
             "id": this.profileId,
             "firstname": this.firstname,
             "lastname": this.lastname,
             "portal_id": this.userData.id,
             "email": this.email,
             "gender": this.selected_gender,
             "nationality": this.selectedCountry,
             "id_number": this.id_number,
             "date_of_birth": this.date_of_birth,
             "phone_number": this.phone,
             "ethnic_background": this.selected_ethnicity,
             "province": this.province,
             "city": this.city,
             "availability": this.selected_availability,
             "expected_salary": this.expected_salary,
             "disability": this.selected_disability,
             "employment_status": this.selected_employment_status,
             "convictions": this.selected_conviction,
             "address": this.address,
             "personal": this.personal_strength,
             "technical": this.technical_skills,
            });
         
            var config = { 
                method: 'post',
                url: '/recruitment/update_personal_details',
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
            console.log("my updated personal information")
            console.log({result})
            console.log(result.data.success)
            return result;
         },
         async  createApplication(){
        
            var data = JSON.stringify({
             "postingId": this.firstname,
             "applicanntId": this.lastname,
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
            console.log("my created vacancy")
            console.log({result})
            console.log(result.data.success)
            return result;
         },
         async  updateJobPost(){
        
            var data = JSON.stringify({
             "id": this.postId,
             "title" : this.selectedOpening,
             "description": this.description,
             "department": this.department,
             "hiring_manager": this.hiring_manager,
             "deadline": this.deadline,
             "job_type": this.job_type,
             "experience":this.experience,
             "salary": this.salary,
             "location": this.location,
             "views": this.views,
             "status": this.status
             
            });
         
            var config = { 
                method: 'post',
                url: '/recruitment/update',
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
            console.log("my created vacancy")
            console.log({result})
            console.log(result.data.success)
            return result;
         },
         async  createQuestionaire(){
            var data = JSON.stringify({
             "postingId" : this.postId,
             "question" : this.question,
             "question_type": this.question_type,
             "multichoice_answer": this.multichoice_answer,
             "boolean_answer": this.boolean_answer,
             "options": this.multichoice_options,
             "score": this.score,
            });
         
            var config = { 
                method: 'post',
                url: '/recruitment/questionaire/create',
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
            console.log("my created vacancy")
            console.log({result})
            console.log(result.data.success)
            return result;
         },
         
         async getAllJobPosts(){
      
         const config = { 
            method: 'post',
            url: '/recruitment/list',
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
         let   myvacancies = result.data
               console.log("my vancies")
               console.log(myvacancies.data)
               this.vacancyList = myvacancies.data
               
               
         return result;
      },
      async getApplications(arg){

         var data = JSON.stringify({
            "postingId" : arg,
           });

         const config = { 
            method: 'post',
            url: '/recruitment/applications',
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
         let   myapplications = result.data
               console.log("my applications")
               console.log(myapplications.postingApplications)
               this.applicationsList = myapplications.postingApplications
               
         return result;
      },
      async viewPDF (file_url: String){
         console.log({file_url})
         const config: any = {
             method: 'post',
             url: `/recruitment/view_pdf`,
             responseType: "arraybuffer",
             responseEncoding: "binary",
             headers: {
                 "Content-Type": "application/pdf"
             },
             data: {
                 file_url
             }
         };
          
         let result = await axios(config)
         .then(function (response) {
             let pdfBuffer = response.data;                    
             return pdfBuffer;
         })
         .catch(function (error) {
             console.log(error);
         });
         console.log("pdf result")
         console.log(result)
     
         return result;
        
      },
      async getPersonalInfo(){
         const userData = useCookie('user').value || "";
         var data = JSON.stringify({
            "sid" : this.userData.id,
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
               console.log("my personal information in recruitment")
               console.log(myprofile.profile_info)
               this.profileInfo = myprofile.profile_info
               this.profileId = myprofile.profile_info.id
               this.firstname = myprofile.profile_info.first_name
               this.lastname = myprofile.profile_info.last_name
               this.email = myprofile.profile_info.email
               this.id_number = myprofile.profile_info.id_number
               this.date_of_birth = myprofile.profile_info.date_of_birth
               this.phone = myprofile.profile_info.phone
               this.province = myprofile.profile_info.province
               this.city = myprofile.profile_info.city
               this.expected_salary = myprofile.profile_info.expected_salary
               this.technical_skills = myprofile.profile_info.technical_skills
               this.personal_strength = myprofile.profile_info.personal_strength
               this.selected_conviction = myprofile.profile_info.previous_convictions
               this.address = myprofile.profile_info.address
               this.selectedCountry = myprofile.profile_info.nationality
               this.selected_ethnicity = myprofile.profile_info.enthnicity
               this.selected_gender = myprofile.profile_info.gender
               this.selected_availability = myprofile.profile_info.availability
               this.selected_disability = myprofile.profile_info.disability
               this.selected_employment_status = myprofile.profile_info.employment_status
               this.resume = myprofile.profile_info.resume
               
               
         return result;
      },
      async getProfile(applicantId){

         var data = JSON.stringify({
            "portalId" : this.applicantId,
           });
         const config = { 
            method: 'post',
            url: '/recruitment/questionaire/applicant',
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
         let   myvacancies = result.data
               console.log("my profile")
               console.log(myvacancies.data[0])
               this.profileList = myvacancies.data[0].id
               
               
         return result;
      },
      async getAllQuestions(){

         const data = {
            postId: this.postId
         }
      
         const config = { 
            method: 'post',
            url: '/recruitment/questionaire/list',
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
         let   myquestions = result.data
               console.log("my questions")
               console.log(myquestions)
               this.questionsList = myquestions.data
               
               
         return result;
      },
      async getResults(applicantId,postingId){

         const data = {
            postingId: postingId,
            applicant_id: applicantId

         }
      
         const config = { 
            method: 'post',
            url: '/recruitment/results',
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
         let   myresults = result.data
               console.log("my results")
               console.log(myresults)
               this.resultsList = myresults
               this.number_of_passed_questions = myresults.passed._count.question
               this.number_of_questions = myresults.questions._count.question
               this.number_of_unstructured_questions = myresults.unstructure_questions._count.question
               
         return result;
      },
      async getExamQuestions(examId){

         const data = {
            postId: examId
         }
      
         const config = { 
            method: 'post',
            url: '/recruitment/questionaire/list',
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
         let   myquestions = result.data
               console.log("my questions")
               console.log(myquestions)
          let  myarray = myquestions.data
      //     myarray.map(list => {
      //       delete list.id
      //      return list
      //  });
               this.questionsList = myarray
               
               
         return result;
      },
      async getQuestionDetail(){

         const data = {
            id: this.postId
         }
      
         const config = { 
            method: 'post',
            url: '/recruitment/questionaire/detail',
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
         let   myquestion = result.data
               console.log("my question")
               console.log(myquestion)
               console.log(myquestion.loan_type.description)
               this.selectedOpening = myquestion.loan_type.title
               this.description = myquestion.loan_type.description
               this.department = myquestion.loan_type.department
               this.hiring_manager = myquestion.loan_type.hiring_manager
               this.deadline = myquestion.loan_type.deadline
               this.job_type = myquestion.loan_type.job_type
               this.experience = myquestion.loan_type.experience
               this.salary = myquestion.loan_type.salary
               this.location = myquestion.loan_type.location
               
               
               
         return result;
      },
      async getSingleQuestion(){

         const data = {
            id: this.postId
         }
      
         const config = { 
            method: 'post',
            url: '/recruitment/questionaire/single_detail',
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
      
         let   myquestion = result.data
               this.question = myquestion.question.question
               this.question_type = myquestion.question.question_type
               this.multichoice_answer = myquestion.question.multichoice_answer
               this.boolean_answer = myquestion.question.boolean_answer
               this.multichoice_options = myquestion.question.options
               this.score = myquestion.question.score

               
               
               
               
               
         return result;
      },
      async  updateSingleQuestion(){
         var data = JSON.stringify({
         "postingId": this.postId,
         "question" : this.question,
         "question_type": this.question_type,
         "multichoice_answer": this.multichoice_answer,
         "boolean_answer": this.boolean_answer,
         "options": this.multichoice_options,
         "score": this.score,
         });
      
         var config = { 
             method: 'post',
             url: '/recruitment/questionaire/single_update',
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
         console.log("my created vacancy")
         console.log({result})
         console.log(result.data.success)
         return result;
      },
      async  updateApplicantStatus(applicantId,postingId,applicationId,status){
         var data = JSON.stringify({
         "applicantId": applicantId,
         "postingId": postingId,
         "applicationId": applicationId,
         "status" : status,
         });
      
         var config = { 
             method: 'post',
             url: '/recruitment/application_update',
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
         console.log("my created vacancy")
         console.log({result})
         console.log(result.data.success)
         return result;
      },
      async  updateApplication(applicantId,status){
         var data = JSON.stringify({
         "applicationId": applicantId,
         "status" : status,
         });
      
         var config = { 
             method: 'post',
             url: '/recruitment/application_update',
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
         console.log("my created vacancy")
         console.log({result})
         console.log(result.data.success)
         return result;
      },
      async  createExamsAnswers(){
         var data = JSON.stringify({
         "questionList": this.questionsList
         });
      
         var config = { 
             method: 'post',
             url: '/recruitment/questionaire/answers',
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
         console.log("my posted solutions")
         console.log({result})
         console.log(result.data.success)
         return result;
      }
    }

});