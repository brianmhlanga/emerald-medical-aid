import { d as defineEventHandler, r as readBody } from './nitro/node-server.mjs';
import { p as prisma } from './db.mjs';
import { a as sendIndividualEmail } from './emails.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';
import 'nodemailer';

const test = defineEventHandler(async (event) => {
  const { data: { first_name, last_name, title, date_of_birth, id_number, gender, membership_number, cell_number, physical_address, place_of_birth, marital_status, employer_name, employer_contact_number, occupation, department, ec_number, station_number, depandancy, package_type, package_details, previous_ailments, other_information, previous_society_name, previous_package_name, from_date, to_date } } = await readBody(event);
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
    response["profile"] = createProfile;
    response["success"] = true;
    await sendIndividualEmail();
  } catch (error) {
    console.log(error);
    response["success"] = false;
    response["message"] = error.toString();
  }
  return response;
});

export { test as default };
//# sourceMappingURL=test.mjs.map
