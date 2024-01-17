const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const load = async () => {
    try {
        // await prisma.user.deleteMany();
        // console.log("Deleted records in user table");

        const lastLoginIpAddress = "127.0.0.1";

        //Hash password
        const password = "password";
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const demo_admin = await prisma.user.create({

           data: {

            name: "Demo",
            surname: "Demo",
            username: "Adminstrator",
            phone: "099999998",
            email: "admin@oacey.com",
            gender: "MALE",
            password: hash,
            profile: "ADMIN",
            salt: salt,
            account_status: "ACTIVE",
            title: "Mr",
            age: 23,
            current_logged_in_at: new Date(),
            last_logged_in_at: new Date()
           }

        }).then(()=> {
            console.log("Adminstrator created succesfully")
         })

        const demo_office = await prisma.user.create({

            data: {
 
             name: "HR",
             surname: "OFFICER",
             username: "HR OFFICER",
             phone: "0999999985",
             email: "officer@oacey.com",
             gender: "MALE",
             password: hash,
             profile: "HR_OFFICER",
             salt: salt,
             account_status: "ACTIVE",
             title: "Mr",
             age: 23,
             current_logged_in_at: new Date(),
             last_logged_in_at: new Date()
            }
 
         }).then(()=> {
            console.log("HR officer created succesfully")
         })

    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    };
}

load();