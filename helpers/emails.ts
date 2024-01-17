import nodemailer from "nodemailer";
let host = "sandbox.smtp.mailtrap.io"
let user = "6dbedd4342a4f4"
let pass = "49a85f793f41c2"
let port = 2525


const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'ZWL' });
};
export const sendMovementEmail = async (to: string, requisition_number: string,total: number, receiver_name: string, receiver_surname ) => {
    let transporter = nodemailer.createTransport({
        host,
        port,
        auth: {
          user,
          pass
        },
      });

      let info = await transporter.sendMail({
        from: '<apps@oacey.com>', // sender address
        to: to, // list of receivers
        subject: "NOTIFICATION OF REQUISITION INITIATION", // Subject line
        text: `Your Requisition ${requisition_number} totalling ${formatCurrency(total)} has been sent to ${receiver_name} ${receiver_surname} awaiting approval`, // plain text body
        html: `<b>Your Requisition ${requisition_number} totalling ${formatCurrency(total)} has been sent to ${receiver_name} ${receiver_surname} awaiting approval`, // html body
      });
}

export const sendToApproverEmail = async (to: string, requisition_number: string,total: number, originator_name: string, originator_surname ) => {
  let transporter = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass
    },
  });

      let info = await transporter.sendMail({
        from: '<apps@oacey.com>', // sender address
        to: to, // list of receivers
        subject: "NOTIFICATION OF REQUISITION MOVEMENT", // Subject line
        text: `Your have Requisition ${requisition_number} totalling ${formatCurrency(total)} from  ${originator_name} ${originator_surname} is awaiting your approval`, // plain text body
        html: `<b>Your have Requisition ${requisition_number} totalling ${formatCurrency(total)} from  ${originator_name} ${originator_surname} is  awaiting your approval`, // html body
      });
}

export const approvalNotification = async (to: string, requisition_number: string,total: number, receiver_name: string, receiver_surname ) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "c75ab9280fa2bc",
          pass: "18ea6d3dcec941"
        },
      });

      let info = await transporter.sendMail({
        from: '<apps@oacey.com>', // sender address
        to: to, // list of receivers
        subject: "NOTIFICATION OF REQUISITION MOVEMENT", // Subject line
        text: `Your Requisition ${requisition_number} totalling ${formatCurrency(total)} is now awaiting approval from  ${receiver_name} ${receiver_surname}`, // plain text body
        html: `<b>Your Requisition ${requisition_number} totalling ${formatCurrency(total)} is now awaiting approval from  ${receiver_name} ${receiver_surname}`, // html body
      });
}
export const forumNotification = async (to: string, requisition_number: string,total: number) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "c75ab9280fa2bc",
          pass: "18ea6d3dcec941"
        },
      });

      let info = await transporter.sendMail({
        from: '<apps@oacey.com>', // sender address
        to: to, // list of receivers
        subject: "NOTIFICATION OF REQUISITION MOVEMENT", // Subject line
        text: `Your Requisition ${requisition_number} totalling ${formatCurrency(total)} is now awaiting approval from  the forum`, // plain text body
        html: `<b>Your Requisition ${requisition_number} totalling ${formatCurrency(total)} is now awaiting approval from  the forum`, // html body
      });
}

export const finalNotification = async (to: string, requisition_number: string,total: number) => {
  
  let transporter = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass
    },
  });

      let info = await transporter.sendMail({
        from: '<apps@oacey.com>', // sender address
        to: to, // list of receivers
        subject: "NOTIFICATION OF REQUISITION MOVEMENT", // Subject line
        text: `Your Requisition ${requisition_number} totalling ${formatCurrency(total)} is now Paid`, // plain text body
        html: `<b>Your Requisition ${requisition_number} totalling ${formatCurrency(total)} is now Paid`, // html body
      });
}
export const rejectedNotification = async (to: string, requisition_number: string,total: number,name:string,surname:string) => {
  let transporter = nodemailer.createTransport({
      host,
      port,
      auth: {
        user,
        pass
      },
    });

    let info = await transporter.sendMail({
      from: '<apps@oacey.com>', // sender address
      to: to, // list of receivers
      subject: "NOTIFICATION OF REQUISITION REJECTION", // Subject line
      text: `Your Requisition ${requisition_number} totalling ${formatCurrency(total)} has been rejected by ${name} ${surname}`, // plain text body
      html: `<b>Your Requisition ${requisition_number} totalling ${formatCurrency(total)} has been rejected by ${name} ${surname}`, // html body
    });
}
export const sendOverDueOriginator = async (requisitions) => {
  await Promise.all([
      ...requisitions.map( async({ originator,requisition_number,total,due_date  }) => {
        let transporter = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "c75ab9280fa2bc",
            pass: "18ea6d3dcec941"
          },
        });
        console.log("in schedulerrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        let info = await transporter.sendMail({
          from: '<apps@oacey.com>', // sender address
          to: originator.email, // list of receivers
          subject: "OVERDUE REQUISITIONS REMINDER", // Subject line
          text: `Your requisition ${requisition_number}, totalling  ${formatCurrency(total)} due on ${due_date} is now overdue, please check with the current approver for reasons of delays`, // plain text body
          html: `<b>Your requisition ${requisition_number}, totalling  ${formatCurrency(total)} due on ${due_date} is now overdue, please check with the current approver for reasons of delays</b>`, // html body
        });
      })
  ])
}
export const sendOverDueApprover = async (requisitions) => {
  await Promise.all([
      ...requisitions.map( async({ originator,approver,requisition_number,total,due_date  }) => {
        let transporter = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "c75ab9280fa2bc",
            pass: "18ea6d3dcec941"
          },
        });
        console.log("in schedulerrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        let info = await transporter.sendMail({
          from: '<apps@oacey.com>', // sender address
          to: approver.email, // list of receivers
          subject: "OVERDUE REQUISITIONS REMINDER", // Subject line
          text: `Requisition ${requisition_number} from ${originator.name} ${originator.surname}, totalling  ${formatCurrency(total)} due on ${due_date} is now overdue, please action it or notify originator on the delay reasons`, // plain text body
          html: `<b>Requisition ${requisition_number} from ${originator.name} ${originator.surname}, totalling  ${formatCurrency(total)} due on ${due_date} is now overdue, please action it or notify originator on the delay reasons</b>`, // html body
        });
      })
  ])
}

export const sendToPastApprovers = async (requisition_number,past_approvers) => {
  await Promise.all([
      ...past_approvers.map( async({ email  }) => {
        let transporter = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "c75ab9280fa2bc",
            pass: "18ea6d3dcec941"
          },
        });
        console.log("in schedulerrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        let info = await transporter.sendMail({
          from: '<apps@oacey.com>', // sender address
          to: email, // list of receivers
          subject: "REQUISITION SENT BACK NOTIFICATION", // Subject line
          text: `Requisition ${requisition_number} which you had approved has been sent back to originator`, // plain text body
          html: `<b>Requisition ${requisition_number} which you had approved has been sent back to originator</b>`, // html body
        });
      })
  ])
}