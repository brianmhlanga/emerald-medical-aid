import { prisma } from "~~/prisma/db";
export default defineEventHandler(async (event)=>{
   const response = {};
   const { } = await readBody(event);
   try{
     let users = await prisma.user.count()
     let applicants = await prisma.applicant.count()
     let job_postings = await prisma.jobPostings.count()
     let applications = await prisma.applications.count()
     let active_openings = await prisma.jobPostings.count({
       where: {
          status: "OPEN"
       }
     })
     let closed_openings = await prisma.jobPostings.count({
      where: {
         status: "CLOSED"
      }
    })
     let rejected_applicants = await prisma.applications.count({
      where: {
         status: "Regret"
      }
     })
     let succesfull_applicants = await prisma.applications.count({
        where:  {
             status: "Employee"
        }
     })

    response["users"] = users;
    response["applicants"] = applicants;
    response["job_postings"] = job_postings;
    response['applications'] = applications;
    response['rejected_applications'] = rejected_applicants;
    response['succesful_applications'] = succesfull_applicants;
    response['active_openings'] = active_openings;
    response['closed_openings'] = closed_openings;
    response["success"] = true;

     
   }catch(error){
       response["success"] = false
       response['message'] = error.toString()
   }
   return response
})