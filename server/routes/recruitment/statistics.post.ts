// import { prisma } from "~~/prisma/db";
// export default defineEventHandler(async (event)=>{
//    const response = {};
//    const { } = await readBody(event);
//    try{
//      let applicants = await prisma.applicant.count()
//      let applications = await prisma.applications.count()
//      let requisitions = await prisma.requisition.count()

     
//     let employees_recruited = await prisma.applications.count({
//       where: {
//          status: "Employee"
//       }
//     })

//     let shortlisted = await prisma.applications.count({
//         where: {
//            status: "ShortList"
//         }
//       })
    
//     let remaining_budget = await prisma.budget.aggregate({
//       _sum: {
//          remainingBudget: true
//       }
//     })
//     response["users"] = users;
//     response["centers"] = centers;
//     response["requisitions"] = requisitions;
//     response['forum_pending'] = forum_pending;
//     response['approved_requisitions'] = approvedRequisitions;
//     response['forum_members'] = forum_members
//     response['total_expenditure'] = total_expenditure
//     response['members'] = members
//     response['cost_centers'] = cost_centers
//     response['total_budget'] = total_budget
//     response['remaining_budget'] = remaining_budget
//     // response["userRequisitions"] = userRequisitions;
//     // response["userCountRequisition"] = userCountRequisition
//     response["success"] = true;

     
//    }catch(error){
//        response["success"] = false
//        response['message'] = error.toString()
//    }
//    return response
// })