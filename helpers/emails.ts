import nodemailer from "nodemailer";
const config = useRuntimeConfig();
let user = "137328aecc402e"
let pass = "314e08c03d6645"
let to = 'brianmhlanga9@gmail.com'
let port = 2525





const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'ZWL' });
};
export const sendIndividualEmail = async (result: any ) => {
  console.log("my result set",result)
  const htmlContent = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <title>Individual Application Form</title>
</head>
<style>
span.djk {
  background-color: #289621;
  color: white;
  padding: 5px;
  border-radius: 5px;
}
</style>
<body class="bg-gray-200 p-8">

    <div class="max-w-md mx-auto bg-white p-8 rounded shadow">
    <img src="https://www.emeraldmas.com/images/web/logo.png" alt="Logo" style="height: 50px;" />
        <h1 class="text-2xl font-bold mb-6">Individual Application Form</h1>

        <!-- Form -->
        
<form>
            <!-- Personal Information Section -->
            <div class="mb-6">
                <h2 class="text-lg font-bold mb-2">Personal Information</h2>
                <!-- Example fields -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">First Name:</label>
                        <span class="djk">${result.first_name}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">Last Name:</label>
                        <span class="djk">${result.last_name}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="Title">Title:</label>
                        <span class="djk">${result.title}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">DOB:</label>
                        <span class="djk">${result.date_of_birth}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">ID Number:</label>
                        <span class="djk">${result.id_number}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">Gender:</label>
                        <span class="djk">${result.gender}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">ID Photo:</label>
                        <img src="${config.FORMS_URL}images/${result.id_photos[0].image_url}" alt="Logo" style="height: 50px;" />
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">Membership Number:</label>
                        <span class="djk">${result.membership_number}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">Cell Number:</label>
                        <span class="djk">${result.cell_number}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">Physical Address:</label>
                        <span class="djk">${result.physical_address}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">Place of Birth:</label>
                        <span class="djk">${result.place_of_birth}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">Marital Status:</label>
                        <span class="djk">${result.marital_status}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">Employer Name:</label>
                        <span class="djk">${result.employer_name}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">Employer Contact Number:</label>
                        <span class="djk">${result.employer_contact_number}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">Occupation:</label>
                        <span class="djk">${result.occupation}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">Department:</label>
                        <span class="djk">${result.department}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">E.C Work Number:</label>
                        <span class="djk">${result.ec_number}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">Station Name:</label>
                        <span class="djk">${result.station_number}</span>
                    </div>
                </div>
                <!-- Dependencies Section -->
                <div class="mb-6 dependency">
                    <h2 class="text-lg font-bold mb-2">Dependencies</h2>
                    <!-- Check if there are dependencies -->
                    ${result.depandancy.length > 0
                        ? result.depandancy.map((dependency, index) => `
                            <div>
                                <label class="block mb-2" for="dependencyFirstName">Dependency First Name ${index+1}:</label>
                                <span class="djk">${dependency.first_name}</span>
                            </div>
                            <div>
                                <label class="block mb-2" for="dependencyLastName">Dependency Last Name ${index+1}:</label>
                                <span class="djk">${dependency.last_name}</span>
                            </div>
                            <div>
                            <label class="block mb-2" for="dependencyLastName">Dependency Last Name ${index+1}:</label>
                            <span class="djk">${dependency.dob}</span>
                        </div>
                            <div>
                                <label class="block mb-2" for="dependencyLastName">Dependency ID Number ${index+1}:</label>
                                <span class="djk">${dependency.id_number}</span>
                            </div>
                            <div>
                                <label class="block mb-2" for="dependencyLastName">Relationship To Principal ${index+1}:</label>
                                <span class="djk">${dependency.relationship}</span>
                            </div>
                            <!-- Add more fields as needed -->
                            ${index < result.depandancy.length - 1 ? '<hr class="solid" />' : ''}
                        `).join('')
                        : '<p class="text-gray-500">No dependencies found.</p>'
                    }
                </div>
              <div class="mb-6 ailments">
                    <h2 class="text-lg font-bold mb-2">Previous Ailments</h2>
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Check if previous_ailments exists and is an array -->
                        ${result.previous_ailments && Array.isArray(result.previous_ailments) ?
                            // If it's an array, loop through previous_ailments and display information
                            result.previous_ailments.map(ailment => `
                                <div>
                                    <label class="block mb-2" for="ailment">Ailment:</label>
                                    <span class="djk">${ailment}</span>
                                </div>
                                <!-- Add more fields as needed -->
                            `).join('') :
                            // If previous_ailments is not defined or not an array, display a message or handle accordingly
                            '<p>No previous ailments found</p>'
                        }
                      </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2" for="firstName">Package Type:</label>
                    <span class="djk">${result.package_type}</span>
                </div>
                <div>
                    <label class="block mb-2" for="firstName">Package Details:</label>
                    <span class="djk">${result.package_details}</span>
                </div>

            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2" for="firstName">Other Information:</label>
                    <span class="djk">${result.other_information}</span>
                </div>
                <div>
                    <label class="block mb-2" for="firstName">Previous Society Name:</label>
                    <span class="djk">${result.previous_society_name}</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2" for="firstName">Previous Society Package Name:</label>
                    <span class="djk">${result.previous_package_name}</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2" for="firstName">Date Joined Previous Society:</label>
                    <span class="djk">${result.from_date}</span>
                </div>
                <div>
                    <label class="block mb-2" for="firstName">Date Left Previous Society:</label>
                    <span class="djk">${result.to_date}</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2" for="firstName">Date of Application:</label>
                    <span class="djk">${result.created_at}</span>
                </div>
            </div>
            
                <!-- More fields go here... -->

            </div>
           <p class="mt-4">Powered by <a href="https://webdev.co.zw" target="_blank" class="text-blue-500 hover:underline">Webdev Media</a></p>
        </form>

    </div>

</body>

</html>

`;
      let transporter = nodemailer.createTransport({
        service: config.EMAIL_RECEIVER,
        host: config.EMAIL_HOST,
        port: config.EMAIL_PORT,
        secure: true,
        auth: {
          user: config.EMAIL_USER,
          pass: config.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      let info = await transporter.sendMail({
        from: '<registrations@emeraldmas.com>', // sender address
        to: config.EMAIL_RECEIVER, // list of receivers
        subject: "NOTIFICATION OF NEW REGISTRATION (INDIVIDUAL)", // Subject line // plain text body
        html: htmlContent, // html body
   
         })
}
export const sendCivilEmail = async (result: any ) => {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <title>Civil Servant Application Form</title>
</head>
<style>
span.djk {
  background-color: #289621;
  color: white;
  padding: 5px;
  border-radius: 5px;
}
</style>
<body class="bg-gray-200 p-8">

    <div class="max-w-md mx-auto bg-white p-8 rounded shadow">
    <img src="https://www.emeraldmas.com/images/web/logo.png" alt="Logo" style="height: 50px;" />
        <h1 class="text-2xl font-bold mb-6">Civil Servant Application Form</h1>

        <!-- Form -->
        
<form>
            <!-- Personal Information Section -->
            <div class="mb-6">
                <h2 class="text-lg font-bold mb-2">Personal Information</h2>
                <!-- Example fields -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">First Name:</label>
                        <span class="djk">${result.first_name}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">Last Name:</label>
                        <span class="djk">${result.last_name}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="Title">Title:</label>
                        <span class="djk">${result.title}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">DOB:</label>
                        <span class="djk">${result.date_of_birth}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">ID Number:</label>
                        <span class="djk">${result.id_number}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">Gender:</label>
                        <span class="djk">${result.gender}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2" for="firstName">ID Photo:</label>
                    <span class="djk">Link to ID Photo: ${config.FORMS_URL}images/${result.id_photos[0].image_url} <span>
                    <img src="${config.FORMS_URL}images/${result.id_photos[0].image_url}" alt="Logo" style="height: 50px;" />
                </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">Membership Number:</label>
                        <span class="djk">${result.membership_number}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">Cell Number:</label>
                        <span class="djk">${result.cell_number}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">Physical Address:</label>
                        <span class="djk">${result.physical_address}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">Place of Birth:</label>
                        <span class="djk">${result.place_of_birth}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">Marital Status:</label>
                        <span class="djk">${result.marital_status}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">Employer Name:</label>
                        <span class="djk">${result.employer_name}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">Employer Contact Number:</label>
                        <span class="djk">${result.employer_contact_number}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">Occupation:</label>
                        <span class="djk">${result.occupation}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">Department:</label>
                        <span class="djk">${result.department}</span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">E.C Work Number:</label>
                        <span class="djk">${result.ec_number}</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2" for="firstName">Station Name:</label>
                        <span class="djk">${result.station_number}</span>
                    </div>
                </div>
                <!-- Dependencies Section -->
                <div class="mb-6 dependency">
                    <h2 class="text-lg font-bold mb-2">Dependencies</h2>
                    <!-- Check if there are dependencies -->
                    ${result.depandancy.length > 0
                        ? result.depandancy.map((dependency, index) => `
                            <div>
                                <label class="block mb-2" for="dependencyFirstName">Dependency First Name ${index+1}:</label>
                                <span class="djk">${dependency.first_name}</span>
                            </div>
                            <div>
                                <label class="block mb-2" for="dependencyLastName">Dependency Last Name ${index+1}:</label>
                                <span class="djk">${dependency.last_name}</span>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block mb-2" for="firstName">ID Number:</label>
                                <span class="djk">${dependency.dob}</span>
                            </div>
                            </div>
                            <div>
                                <label class="block mb-2" for="dependencyLastName">Dependency ID Number ${index+1}:</label>
                                <span class="djk">${dependency.id_number}</span>
                            </div>
                            <div>
                                <label class="block mb-2" for="dependencyLastName">Relationship To Principal ${index+1}:</label>
                                <span class="djk">${dependency.relationship}</span>
                            </div>
                            <!-- Add more fields as needed -->
                            ${index < result.depandancy.length - 1 ? '<hr class="solid" />' : ''}
                        `).join('')
                        : '<p class="text-gray-500">No dependencies found.</p>'
                    }
                </div>
              <div class="mb-6 ailments">
                    <h2 class="text-lg font-bold mb-2">Previous Ailments</h2>
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Check if previous_ailments exists and is an array -->
                        ${result.previous_ailments && Array.isArray(result.previous_ailments) ?
                            // If it's an array, loop through previous_ailments and display information
                            result.previous_ailments.map(ailment => `
                                <div>
                                    <label class="block mb-2" for="ailment">Ailment:</label>
                                    <span class="djk">${ailment}</span>
                                </div>
                                <!-- Add more fields as needed -->
                            `).join('') :
                            // If previous_ailments is not defined or not an array, display a message or handle accordingly
                            '<p>No previous ailments found</p>'
                        }
                      </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2" for="firstName">Package Type:</label>
                    <span class="djk">${result.package_type}</span>
                </div>
                <div>
                    <label class="block mb-2" for="firstName">Package Details:</label>
                    <span class="djk">${result.package_details}</span>
                </div>

            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2" for="firstName">Other Information:</label>
                    <span class="djk">${result.other_information}</span>
                </div>
                <div>
                    <label class="block mb-2" for="firstName">Previous Society Name:</label>
                    <span class="djk">${result.previous_society_name}</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2" for="firstName">Previous Society Package Name:</label>
                    <span class="djk">${result.previous_package_name}</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2" for="firstName">Date Joined Previous Society:</label>
                    <span class="djk">${result.from_date}</span>
                </div>
                <div>
                    <label class="block mb-2" for="firstName">Date Left Previous Society:</label>
                    <span class="djk">${result.to_date}</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2" for="firstName">Date of Application:</label>
                    <span class="djk">${result.created_at}</span>
                </div>
            </div>
            
                <!-- More fields go here... -->

            </div>
           <p class="mt-4">Powered by <a href="https://webdev.co.zw" target="_blank" class="text-blue-500 hover:underline">Webdev Media</a></p>
        </form>

    </div>
    <form>
    <div class="max-w-md mx-auto bg-white p-8 rounded shadow mt-8">
        <h1 class="text-2xl font-bold mb-6">TY30 Form</h1>

        <!-- TY30 Form Fields -->
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block mb-2" for="ty30FirstName">First Name:</label>
                <span class="djk">${result.tyform.first_name}</span>
            </div>
            <div>
                <label class="block mb-2" for="ty30LastName">Last Name:</label>
                <span class="djk">${result.tyform.lastname}</span>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
        <div>
            <label class="block mb-2" for="ty30FirstName">ID Number:</label>
            <span class="djk">${result.tyform.id_number}</span>
        </div>
        <div>
            <label class="block mb-2" for="ty30LastName">Ministry:</label>
            <span class="djk">${result.tyform.ministry}</span>
        </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
        <div>
            <label class="block mb-2" for="ty30FirstName">Department Code:</label>
            <span class="djk">${result.tyform.department_code}</span>
        </div>
        <div>
            <label class="block mb-2" for="ty30LastName">Station Code:</label>
            <span class="djk">${result.tyform.station_code}</span>
        </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
        <div>
            <label class="block mb-2" for="ty30FirstName">Application Type:</label>
            <span class="djk">${result.tyform.selected_application_type}</span>
        </div>
        <div>
            <label class="block mb-2" for="ty30LastName">Card Type:</label>
            <span class="djk">${result.tyform.card_type}</span>
        </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
        <div>
            <label class="block mb-2" for="ty30FirstName">Section:</label>
            <span class="djk">${result.tyform.section}</span>
        </div>
        <div>
            <label class="block mb-2" for="ty30LastName">Subsection:</label>
            <span class="djk">${result.tyform.subsection}</span>
        </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
        <div>
            <label class="block mb-2" for="ty30FirstName">Employee Code Number:</label>
            <span class="djk">${result.tyform.employee_code_number}</span>
        </div>
        <div>
            <label class="block mb-2" for="ty30LastName">CD:</label>
            <span class="djk">${result.tyform.cd}</span>
        </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
        <div>
            <label class="block mb-2" for="ty30FirstName">Payee Code:</label>
            <span class="djk">${result.tyform.payee_code}</span>
        </div>
        <div>
            <label class="block mb-2" for="ty30LastName">Amount Deducted:</label>
            <span class="djk">${result.tyform.amount_deducted ? formatCurrency(result.tyform.amount_deducted) : formatCurrency(0)}</span>
        </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
        <div>
            <label class="block mb-2" for="ty30FirstName">From Date:</label>
            <span class="djk">${result.tyform.from_date_ty}</span>
        </div>
        <div>
            <label class="block mb-2" for="ty30LastName">To date:</label>
            <span class="djk">${result.tyform.to_date_ty}</span>
        </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
        <div>
            <label class="block mb-2" for="ty30FirstName">Policy Medical Aid Number:</label>
            <span class="djk">${result.tyform.policy_medical_aid_number}</span>
        </div>
        <div>
            <label class="block mb-2" for="ty30LastName">To date:</label>
            <span class="djk">${result.tyform.to_date_ty}</span>
        </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
        <div>
            <label class="block mb-2" for="ty30FirstName">Created At:</label>
            <span class="djk">${result.tyform.created_at}</span>
        </div>
        </div>
        <!-- Add more TY30 Form fields as needed -->

        <!-- Submit button for TY30 Form -->
       
    </div>
</form>

</body>

</html>

`;
let transporter = nodemailer.createTransport({
  service: config.EMAIL_RECEIVER,
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  secure: true,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

      let info = await transporter.sendMail({
        from: '<registrations@emeraldmas.com>', // sender address
        to: config.EMAIL_RECEIVER, // list of receivers
        subject: "NOTIFICATION OF NEW REGISTRATION (CIVIL SERVANT)", // Subject line // plain text body
        html: htmlContent, // html body
   
         })
}



