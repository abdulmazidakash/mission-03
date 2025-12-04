import { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/products.controller";

export const productRoute = (req:IncomingMessage, res:ServerResponse)=>{
    // console.log(req.url);
    // console.log(req.method);
    const url = req.url;
    const method = req.method;

    if(method === 'GET' && url === '/'){
        // console.log('eita root route')
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({message: 'eita root route'}));
    }else if(url?.startsWith('/products')){
        productController(req, res);
    }
    else{
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify({message: 'eikhane kichu nai'}));
    }

};
