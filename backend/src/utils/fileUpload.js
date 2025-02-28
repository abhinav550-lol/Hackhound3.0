import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import config from '../config.js';
import AppError from '../err/AppError.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseFolder = path.join(__dirname, config.FILEUPLOAD_LOCATION);

export const createUserFolder = (id) => {
    const userFolder = path.join(baseFolder, id);
    if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder, { recursive: true });
    }
};

export const uploadSingleFile = (file, userFolder) => {
    return new Promise((resolve, reject) => {
        const uploadPath = path.join(userFolder, file.name);
        file.mv(uploadPath, (err) => {
            if (err) {
                reject(new AppError(500, `An Error Occurred while file upload. Error: ${err.message}`));
            } else {
                resolve(uploadPath);
            }
        });
    });
};

export const uploadFile = async (files, id) => {
    if (!Array.isArray(files)) {
        files = [files];
    }
    const userFolder = path.join(baseFolder, id);
    return Promise.all(files.map(file => uploadSingleFile(file, userFolder)));
};
