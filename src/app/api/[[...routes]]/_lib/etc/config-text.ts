import fs from "fs/promises";
const UPLOAD_DIR = process.env.WIBU_UPLOAD_DIR;

async function configText(params: {name: string}){
    const {name} = params;
    if(!UPLOAD_DIR) {
        return {
            status: 500,
            body: {
                message: "WIBU_UPLOAD_DIR is not defined",
            },
        };
    }
    if(!name) {
        return {
            status: 400,
            body: {
                message: "Name is required",
            },
        };
    }
    const config = await fs.readFile(`${UPLOAD_DIR}/config/${name}.yml`, 'utf-8');
    return config;
}

export default configText;