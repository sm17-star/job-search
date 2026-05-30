import DataURIParser from "datauri/parser.js"


import path from "path"

const getDatauri =(file)=>{
    const parser = new DataURIParser();
    const extension =path.extname(file.originalname).toString();
    return parser.format(extension, file.buffer);
}
export default getDatauri;