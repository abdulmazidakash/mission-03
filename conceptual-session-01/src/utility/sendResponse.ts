import { ServerResponse } from "http";

export const sendResponse = (res: ServerResponse, success: boolean,statusCode: number, message?: string, data?: any) =>{
    const response = {
        success: success,
        message: message,
        data: data,
    };

    res.writeHead(statusCode, {"content-type": "application/json"});
    res.end(JSON.stringify(response))
}