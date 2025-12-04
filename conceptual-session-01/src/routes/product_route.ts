import { IncomingMessage, ServerResponse } from "http";

export const productRoute = (req:IncomingMessage, res:ServerResponse)=>{
    // console.log(req.url);
    // console.log(req.method);
    const url = req.url;
    const method = req.method;

    if(method === 'GET' && url === '/'){
        // console.log('eita root route')
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({message: 'eita root route'}));
    }else{
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify({message: 'eikhane kichu nai'}));
    }

};
