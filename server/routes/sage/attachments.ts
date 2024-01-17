import { readFiles } from 'h3-formidable';
import path from "path";
import { prisma } from '~/prisma/db';
import fs from 'fs';
import {fileTypeFromBuffer} from 'file-type';


export default defineEventHandler(async (event) => {
    console.log("in attachements endpoint")
    const response = {};
    const body = getQuery(event);
    const { files: { attachment: [ { filepath } ] } } = await readFiles(event, {
        includeFields: true
    });
    const fileExtension = await getFileExtension(filepath);
    console.log({fileExtension})
    let imageName = String(Date.now()) + String(Math.round(Math.random() * 10000000));
    let newPath = `${ path.join("public", "uploads", imageName) }${fileExtension}`;

    fs.copyFileSync(filepath, newPath);
    
    //Update Company
    try {
       const attachment = await prisma.attachments.create({
            data: {
                attachment_name: `${imageName}${fileExtension}`
            }
        });
        response['attachment'] = attachment
        response['success'] = true
    }
    catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };

    return response
})

async function getFileExtension(filepath) {
    const buffer = fs.readFileSync(filepath);
    const fileInfo = await fileTypeFromBuffer(buffer)
    return fileInfo ? `.${fileInfo.ext}` : '';
}