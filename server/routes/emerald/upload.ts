import { readFiles } from 'h3-formidable';
import path from "path";
import sharp from "sharp";
import { prisma } from '~/prisma/db';
import fs from 'fs';

export default defineEventHandler(async (event) => {
    const body = getQuery(event);
    //Destruct body
    let response: any = {}

    const { files: { photo: [ { filepath } ] } } = await readFiles(event, {
        includeFields: true
    });

    let imageName = String(performance.now()) + String(Math.round(Math.random() * 10000000));
    let newPath = `${ path.join("uploads", imageName) }.png`;

    sharp(filepath)
        .resize({
            width: 500,
            height: 500,
            fit: "contain",
            background: { r: 255, g: 255, b: 255, alpha: 0.0 }
        })
        .flatten({ background: '#fff' })
        .png()
        .toFile(newPath);
    
    //Update Company
    try {
      let upload =  await prisma.attachments.create({
            data: {
                attachment_name: `${ imageName }.png`
            }
        });
        response['upload'] =   upload
        response['success'] = true
    }
    catch (error) {
        console.log(error);

        response['message'] =   "Server error: " + error
        response['success'] = false
    }

    return response
})