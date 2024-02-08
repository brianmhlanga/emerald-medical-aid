import { d as defineEventHandler, r as readBody } from './nitro/node-server.mjs';
import { p as prisma } from './db.mjs';
import { s as sendCivilEmail } from './emails.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';
import 'nodemailer';

const civil = defineEventHandler(async (event) => {
  const { data: { first_name, last_name, title, date_of_birth, id_number, gender, membership_number, cell_number, physical_address, place_of_birth, marital_status, employer_name, employer_contact_number, occupation, department, ec_number, station_number, depandancy, package_type, package_details, previous_ailments, other_information, previous_society_name, previous_package_name, from_date, to_date, ministry, department_code, station_code, selected_application_type, card_type, section, subsection, employee_code_number, cd, payee_code, amount_deducted, from_date_ty, to_date_ty, policy_medical_aid_number } } = await readBody(event);
  let response = {};
  try {
    const createProfile = await prisma.individual.create({
      data: {
        first_name,
        last_name,
        title,
        date_of_birth,
        id_number,
        gender,
        membership_number,
        cell_number,
        physical_address,
        place_of_birth,
        marital_status,
        employer_name,
        employer_contact_number,
        occupation,
        department,
        ec_number,
        station_number,
        depandancy: {
          createMany: {
            data: [
              ...depandancy
            ]
          }
        },
        tyform: {
          create: {
            first_name,
            last_name,
            id_number,
            ministry,
            department_code,
            station_code,
            selected_application_type,
            card_type,
            section,
            subsection,
            employee_code_number,
            cd,
            payee_code,
            amount_deducted,
            from_date_ty,
            to_date_ty,
            policy_medical_aid_number
          }
        },
        package_type,
        package_details,
        previous_ailments,
        other_information,
        previous_society_name,
        previous_package_name,
        from_date,
        to_date
      }
    });
    const createdProfile = await prisma.individual.findUnique({
      where: {
        id: createProfile.id
      },
      include: {
        depandancy: true,
        tyform: true
      }
    });
    response["profile"] = createProfile;
    response["success"] = true;
    await sendCivilEmail(createdProfile);
  } catch (error) {
    console.log(error);
    response["success"] = false;
    response["message"] = error.toString();
  }
  return response;
});

export { civil as default };
//# sourceMappingURL=civil.mjs.map
