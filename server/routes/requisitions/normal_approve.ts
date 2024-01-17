import { prisma } from "~~/prisma/db";
import { sendToApproverEmail } from "~~/helpers/emails";
import { forumNotification } from "~~/helpers/emails";
import { finalNotification } from "~~/helpers/emails";
import { approvalNotification } from "~~/helpers/emails";

export default defineEventHandler(async (event) => {
  const response = {};
  const { data: { id,approver_id } } = await readBody(event);
  try {
    let approvers;
  
    let tracking_email = await prisma.user.findUnique({
      where: {
        id: approver_id
      }
    })
    let count = await prisma.requisition.findUnique({
      where: {
        id,
      },
      include: {
        originator: true,
        approver: true,
        routing: {
          include: {
            approvers: true
          }
        }
      }
    });
    let current_approver = count.approver_id
    approvers = count.routing.approvers
    let approver_one = await prisma.user.findUnique({
      where: {
        id: approvers[1].approver_id
      }
    })
    let approver_two = await prisma.user.findUnique({
      where: {
        id: approvers[2].approver_id
      }
    })
    let approver_three = await prisma.user.findUnique({
      where: {
        id: approvers[3].approver_id
      }
    })
    // console.log("current approver id",current_approver)
    // console.log("approvers array",approvers)
      
    if (count.total < approvers[0].threshold && count.status !== "FORUM" && count.status !== "CLERK") {
        console.log("scenario 1")
        const center = await prisma.requisition.update({
          where: {
            id: id,
          },
          data: {
            status: "FORUM",
            approver_tracking: {
              create: {
                email: tracking_email.email
              }
            }
          },
          
        });
        forumNotification(count.originator.email,count.requisition_number,count.total)

        response["route"] = center;
        response["success"] = true;
    } else if (count.total > approvers[0].threshold && count.total < approvers[2].threshold && count.approver_id === approvers[0].approver_id && count.status !== "FORUM" && count.status !== "CLERK") {
      console.log("scenario 2")
        const center = await prisma.requisition.update({
          where: {
            id: id,
          },
          data: {
            status: "MOVING",
            approver_tracking: {
              create: {
                email: tracking_email.email
              }
            },
            approver_id: approvers[1].approver_id
            
          },
        });
        sendToApproverEmail(approver_one.email,count.requisition_number,count.total,count.originator.name,count.originator.surname)
        approvalNotification(count.originator.email,count.requisition_number,count.total,approver_one.name,approver_one.surname)
        response["route"] = center;
        response["success"] = true;
    }else if (count.total > approvers[0].threshold && count.total < approvers[2].threshold && count.approver_id === approvers[1].approver_id && count.status !== "FORUM" && count.status !== "CLERK") {
      console.log("scenario 3")
        const center = await prisma.requisition.update({
          where: {
            id: id,
          },
          data: {
            status: "FORUM",
            approver_tracking: {
              create: {
                email: tracking_email.email
              }
            }
          },
        });
        forumNotification(count.originator.email,count.requisition_number,count.total)
        response["route"] = center;
        response["success"] = true;
    } else if (count.total > approvers[0].threshold && count.total > approvers[1].threshold && count.approver_id === approvers[0].approver_id && count.status !== "FORUM" && count.status !== "CLERK") {
      console.log("scenario 4")
        const center = await prisma.requisition.update({
          where: {
            id: id,
          },
          data: {
            status: "MOVING",
            approver_tracking: {
              create: {
                email: tracking_email.email
              }
            },
            approver_id: approvers[1].approver_id
          },
        });
        sendToApproverEmail(approver_one.email,count.requisition_number,count.total,count.originator.name,count.originator.surname)
        approvalNotification(count.originator.email,count.requisition_number,count.total,approver_one.name,approver_one.surname)
        response["route"] = center;
        response["success"] = true;
    } 
    else if (count.total > approvers[0].threshold && count.total > approvers[1].threshold && count.approver_id === approvers[1].approver_id && count.status !== "FORUM" && count.status !== "CLERK") {
      console.log("scenario 5")
        const center = await prisma.requisition.update({
          where: {
            id: id,
          },
          data: {
            status: "MOVING",
            approver_tracking: {
              create: {
                email: tracking_email.email
              }
            },
            approver_id: approvers[2].approver_id
          },
        });
        sendToApproverEmail(approver_two.email,count.requisition_number,count.total,count.originator.name,count.originator.surname)
        approvalNotification(count.originator.email,count.requisition_number,count.total,approver_two.name,approver_two.surname)

        response["route"] = center;
        response["success"] = true;
    } 
    else if (count.total > approvers[0].threshold && count.total > approvers[1].threshold && count.approver_id === approvers[2].approver_id && count.status !== "FORUM" && count.status !== "CLERK") {
      console.log("scenario 6")
        const center = await prisma.requisition.update({
          where: {
            id: id,
          },
          data: {
            status: "MOVING",
            approver_tracking: {
              create: {
                email: tracking_email.email
              }
            },
            approver_id: approvers[3].approver_id
          },
        });
        sendToApproverEmail(approver_three.email,count.requisition_number,count.total,count.originator.name,count.originator.surname)
        approvalNotification(count.originator.email,count.requisition_number,count.total,approver_three.name,approver_three.surname)


        response["route"] = center;
        response["success"] = true;
    } 
    else if (count.total > approvers[0].threshold && count.total > approvers[1].threshold && count.approver_id === approvers[3].approver_id && count.status !== "FORUM" && count.status !== "CLERK") {
      console.log("scenario 7")
        const center = await prisma.requisition.update({
          where: {
            id: id,
          },
          data: {
            status: "FORUM",
            approver_tracking: {
              create: {
                email: tracking_email.email
              }
            },
            approver_id: approvers[2].approver_id
          },
        });
        forumNotification(count.originator.email,count.requisition_number,count.total)
        response["route"] = center;
        response["success"] = true;
    } 
      else if (count.status === "FORUM" && (count.current_forum_approvers + 1) < count.required_forum_approvers) {
       console.log("scenario 8")
       const center = await prisma.requisition.update({
        
        where: {
          id: id,
        },
        data: {
          current_forum_approvers: (count.current_forum_approvers + 1),
          status: "FORUM",
          approver_tracking: {
            create: {
              email: tracking_email.email
            }
          },
          forum_approvers:{
            create: {
              approver_id: approver_id
            }
          }
        },
      });

      response["route"] = center;
      response["success"] = true;
    }else if (count.status === "FORUM" && (count.current_forum_approvers + 1) >= count.required_forum_approvers) {
      console.log("scenario 8")
      const center = await prisma.requisition.update({
       where: {
         id: id,
       },
       data: {
         current_forum_approvers: (count.current_forum_approvers + 1),
         status: "CLERK",
         approver_tracking: {
          create: {
            email: tracking_email.email
          }
        },
         forum_approvers:{
           create: {
             approver_id: approver_id
           }
         }
       },
     });

     response["route"] = center;
     response["success"] = true;
   } else if (count.status === "CLERK") {
      console.log("scenario 9")
      const center = await prisma.requisition.update({
        where: {
          id: id,
        },
        data: {
          status: "APPROVED",
          approver_tracking: {
            create: {
              email: tracking_email.email
            }
          }
        },
      });
      finalNotification(count.originator.email,count.requisition_number,count.total)
      response["route"] = center;
      response["success"] = true;
    }
    
  } catch (error) {
    response["success"] = false;
    response["message"] = error.toString();
  }
  
  return response;
});
