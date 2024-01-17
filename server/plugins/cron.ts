import { useScheduler } from "#scheduler";
import { prisma } from "~/prisma/db";
import moment from "moment";
import { sendOverDueOriginator } from "~/helpers/emails";
import { sendOverDueApprover } from "~/helpers/emails";

export default defineNitroPlugin(() => {
  startScheduler()
});

function startScheduler() {
  const scheduler = useScheduler();

  // scheduler.run(() => {
  //   sendOverdueRequisitionsOriginator();
  //   sendOverdueRequisitionsApprover()
  //   }).cron('* * * * *', 'Africa/Cairo');
    scheduler.run(() => {
        sendOverdueRequisitionsOriginator();
        sendOverdueRequisitionsApprover();
      }).cron('0 6 * * *', 'Africa/Cairo') 



  
}

const sendOverdueRequisitionsOriginator = async () => {
  const date = new Date();

  try {
    const scheduled = await prisma.requisition.findMany({
        where: {
            NOT: {
                status: {
                    in: ['APPROVED', 'REJECTED', 'DRAFT']
                }
            },
            due_date: {
                lt: new Date()
            }
        },
        include: {

            originator: true
        }
    });
   console.log("ssssssssssssssssssssssssss",scheduled)
   await sendOverDueOriginator(scheduled)
  
    // await sendBulkInvoicePDFEmail(scheduled, user.id, token);
  } catch (error){
    console.error(error)
  }
}
const sendOverdueRequisitionsApprover = async () => {
    const date = new Date();
  
    try {
      const scheduled = await prisma.requisition.findMany({
          where: {
              NOT: {
                  status: {
                      in: ['APPROVED', 'REJECTED', 'DRAFT','HISTORY','FORUM','CLERK']
                  }
              },
              due_date: {
                  lt: new Date()
              }
          },
          include: {
  
              originator: true,
              approver: true
          }
      });
     console.log("ssssssssssssssssssssssssss",scheduled)
     await sendOverDueApprover(scheduled)
    
    } catch (error){
      console.error(error)
    }
  }

